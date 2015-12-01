/*
 * ILOC Namespace
 */
var ILOC = {
    /*
     * Nodes for ILOC AST, based on the ILOC grammar from:
     *
     * Engineering a Compiler, K. Cooper & L. Torczon, Appendix A, p. 727
     * 
     */

    /*
     * A IlocProgram.
     */
    IlocProgram: function(kwargs) {
        Node.call(this, kwargs);
        this.instructions = kwargs.instructions;
        
        this.toString = function() {
            var string = "";
            for(i of this.instructions) {
                string += i.toString() + "\n";
            }
            return string;
        }
    },

    /*
     * An Instruction.
     */
    Instruction: function(kwargs) {
        Node.call(this, kwargs);
        this.operations = kwargs.operations;
        this.label = kwargs.label;
        
        this.toString = function() {
            var string = "";
            if (this.label != undefined) {
                string += this.label + ": ";
            }
            for(o of this.operations) {
                string += o.toString() + "\n";
            }
            return string;
        }
    },

    /*
     * An Operation
     */
    Operation: function(kwargs) {
        Node.call(this, kwargs);
        this.opcode = kwargs.opcode;
        this.sources = kwargs.sources;
        this.targets = kwargs.targets;

        this.toString = function() {
            var string = this.opcode + " ";
            if (this.sources != null) {
                for(s of this.sources) {
                    string += s.toString() + ",";
                }
                string += " " + this.operator_symbol + " ";
            }
            if (this.targets != null) {
                for(t of this.targets) {
                    string += t.toString() + ",";
                }
            }
            return string;
        }
    },

    NORMAL_OPCODES: {
        add: 'add',
        sub: 'sub',
        mult: 'mult',
        div: 'div',
        addI: 'addI',
        subI: 'subI',
        rsubI: 'rsubI',
        multI: 'multI',
        divI: 'divI',
        rdivI: 'rdivI',
        and: 'and',
        andI: 'andI',
        or: 'or',
        orI: 'orI',
        xor: 'xor',
        xorI: 'xorI',
        lshift: 'lshift',
        lshiftI: 'lshiftI',
        rshift: 'rshift',
        rshiftI: 'rshiftI',
        load: 'load',
        loadAI: 'loadAI',
        loadAO: 'loadAO',
        cload: 'cload',
        cloadAI: 'cloadAI',
        cloadAO: 'cloadAO',
        loadI: 'loadI',
        store: 'store',
        storeAI: 'storeAI',
        storeAO: 'storeAO',
        cstore: 'cstore',
        cstoreAI: 'cstoreAI',
        cstoreAO: 'cstoreAO',
        i2i: 'i2i',
        c2c: 'c2c',
        c2i: 'c2i',
        i2c: 'i2c',
        cmp_LT: 'cmp_LT',
        cmp_LE: 'cmp_LE',
        cmp_EQ: 'cmp_EQ',
        cmp_GE: 'cmp_GE',
        cmp_GT: 'cmp_GT',
        cmp_NE: 'cmp_NE',
        comp: 'comp',
        tbl: 'tbl',
    },

    /*
     * A NormalOperation.
     *
     * Inherits from Operation.
     */
    NormalOperation: function(kwargs) {
        ILOC.Operation.call(this, kwargs);
        
        this.operator_symbol = "=>";
        if (!(ILOC.NORMAL_OPCODES.hasOwnProperty(this.opcode))) {
            throw ReferenceError("Invalid OpCode {0} assigned to NormalOperation".format(this.opcode))
        }
    },

    CONTROL_FLOW_OPCODES: {
        nop: 'nop',
        cbr: 'cbr',
        jump: 'jump',
        jumpI: 'jumpI',
        cbr_LT: 'cbr_LT',
        cbr_LE: 'cbr_LE',
        cbr_EQ: 'cbr_EQ',
        cbr_GE: 'cbr_GE',
        cbr_GT: 'cbr_GT',
        cbr_NE: 'cbr_NE',
    },
    
    /*
     * A ControlFlowOperation.
     *
     * Inherits from Operation.
     */
    ControlFlowOperation: function(kwargs) {
        ILOC.Operation.call(this, kwargs);
        
        this.operator_symbol = "->";
        if (!(ILOC.CONTROL_FLOW_OPCODES.hasOwnProperty(this.opcode))) {
            throw ReferenceError("Invalid OpCode {0} assigned to ControlFlowOperation".format(this.opcode))
        }
    },
    
    OPERAND_TYPES : {
        register: 'register',
        num: 'num',
        label: 'label',
    },

    /*
     * An Operand.
     */
    Operand: function(kwargs) {
        Node.call(this, kwargs);
        this.type = kwargs.type;
        this.name = kwargs.name;

        this.toString = function() {
            switch(this.type) {
            case ILOC.OPERAND_TYPES.register:
                return "r"+this.name;
            default:
                return this.name;
            }
        }
    },
    
}


// Assign proper constructors to each class

ILOC.IlocProgram.prototype = Object.create(Node.prototype);
ILOC.IlocProgram.prototype.constructor = ILOC.IlocProgram;

ILOC.Instruction.prototype = Object.create(Node.prototype);
ILOC.Instruction.prototype.constructor = ILOC.Instruction;

ILOC.Operation.prototype = Object.create(Node.prototype);
ILOC.Operation.prototype.constructor = ILOC.Operation;

ILOC.NormalOperation.prototype = Object.create(ILOC.Operation.prototype);
ILOC.NormalOperation.prototype.constructor = ILOC.NormalOperation;

ILOC.ControlFlowOperation.prototype = Object.create(ILOC.Operation.prototype);
ILOC.ControlFlowOperation.prototype.constructor = ILOC.ControlFlowOperation;

ILOC.Operand.prototype = Object.create(Node.prototype);
ILOC.Operand.prototype.constructor = ILOC.Operand;


// Build a parser using peg.js

try{
    ILOC.parser = PEG.buildParser(iloc_grammar);
} catch (ex) {
    console.log(ex);
    console.log(ex.message);
    console.log(ex.location);
}


// Test the parser

iloc_code = "\
L0: nop \n\
    loadI  2         => ra        \n\
    load   rb        => rx        \n\
    addI   ra   , 1  => ra        \n\
    loadI  0         => r0        \n\
    cmp_GE rx   , r0 => rcomp     \n\
    cbr    rcomp     -> L1   , L2 \n\
L1: i2i    rx        => ra        \n\
    add    ra   , rb => rc        \n\
    jump   L3                     \n\
L2: addI   rb   , 1  => rc        \n\
L3: add    ra   , rc => rd        \n\
"

try{
    var parsed_ast = ILOC.parser.parse(iloc_code);
} catch (ex) {
    console.log(ex);
    console.log(ex.message);
    console.log(ex.location);
}

var ast = new ILOC.IlocProgram({
    instructions: [
        new ILOC.Instruction({
            label: undefined,
            operations: [
                new ILOC.NormalOperation({
                    opcode: ILOC.NORMAL_OPCODES.loadI,
                    sources: [
                        new ILOC.Operand({
                            type: ILOC.OPERAND_TYPES.num,
                            name: '2',
                        }),
                    ],
                    targets: [
                        new ILOC.Operand({
                            type: ILOC.OPERAND_TYPES.register,
                            name: 'a',
                        }),
                    ],
                }),
                new ILOC.NormalOperation({
                    opcode: ILOC.NORMAL_OPCODES.load,
                    sources: [
                        new ILOC.Operand({
                            type: ILOC.OPERAND_TYPES.register,
                            name: 'b',
                        }),
                    ],
                    targets: [
                        new ILOC.Operand({
                            type: ILOC.OPERAND_TYPES.register,
                            name: 'x',
                        }),
                    ],
                }),
                new ILOC.NormalOperation({
                    opcode: ILOC.NORMAL_OPCODES.addI,
                    sources: [
                        new ILOC.Operand({
                            type: ILOC.OPERAND_TYPES.register,
                            name: 'a',
                        }),
                        new ILOC.Operand({
                            type: ILOC.OPERAND_TYPES.num,
                            name: '1',
                        }),
                    ],
                    targets: [
                        new ILOC.Operand({
                            type: ILOC.OPERAND_TYPES.register,
                            name: 'a',
                        }),
                    ],
                }),
                new ILOC.NormalOperation({
                    opcode: ILOC.NORMAL_OPCODES.loadI,
                    sources: [
                        new ILOC.Operand({
                            type: ILOC.OPERAND_TYPES.num,
                            name: '0',
                        }),
                    ],
                    targets: [
                        new ILOC.Operand({
                            type: ILOC.OPERAND_TYPES.register,
                            name: '0',
                        }),
                    ],
                }),
                new ILOC.NormalOperation({
                    opcode: ILOC.NORMAL_OPCODES.cmp_GE,
                    sources: [
                        new ILOC.Operand({
                            type: ILOC.OPERAND_TYPES.register,
                            name: 'x',
                        }),
                        new ILOC.Operand({
                            type: ILOC.OPERAND_TYPES.register,
                            name: '0',
                        }),
                    ],
                    targets: [
                        new ILOC.Operand({
                            type: ILOC.OPERAND_TYPES.register,
                            name: 'comp',
                        }),
                    ],
                }),
                new ILOC.ControlFlowOperation({
                    opcode: ILOC.CONTROL_FLOW_OPCODES.cbr,
                    sources: [
                        new ILOC.Operand({
                            type: ILOC.OPERAND_TYPES.register,
                            name: 'comp',
                        }),
                    ],
                    targets: [
                        new ILOC.Operand({
                            type: ILOC.OPERAND_TYPES.label,
                            name: 'L1',
                        }),
                        new ILOC.Operand({
                            type: ILOC.OPERAND_TYPES.label,
                            name: 'L2',
                        }),
                    ],
                }),
            ],
        }),
        new ILOC.Instruction({
            label: new ILOC.Operand({
                type: ILOC.OPERAND_TYPES.label,
                name: 'L1',
            }),
            operations: [
                new ILOC.NormalOperation({
                    opcode: ILOC.NORMAL_OPCODES.i2i,
                    sources: [
                        new ILOC.Operand({
                            type: ILOC.OPERAND_TYPES.register,
                            name: 'x',
                        }),
                    ],
                    targets: [
                        new ILOC.Operand({
                            type: ILOC.OPERAND_TYPES.register,
                            name: 'a',
                        }),
                    ],
                }),
                new ILOC.NormalOperation({
                    opcode: ILOC.NORMAL_OPCODES.add,
                    sources: [
                        new ILOC.Operand({
                            type: ILOC.OPERAND_TYPES.register,
                            name: 'a',
                        }),
                        new ILOC.Operand({
                            type: ILOC.OPERAND_TYPES.register,
                            name: 'b',
                        }),
                    ],
                    targets: [
                        new ILOC.Operand({
                            type: ILOC.OPERAND_TYPES.register,
                            name: 'c',
                        }),
                    ],
                }),
                new ILOC.ControlFlowOperation({
                    opcode: ILOC.CONTROL_FLOW_OPCODES.jump,
                    sources: [
                    ],
                    targets: [
                        new ILOC.Operand({
                            type: ILOC.OPERAND_TYPES.label,
                            name: 'L3',
                        }),
                    ],
                }),
            ],
        }),
        new ILOC.Instruction({
            label: new ILOC.Operand({
                type: ILOC.OPERAND_TYPES.label,
                name: 'L2',
            }),
            operations: [
                new ILOC.NormalOperation({
                    opcode: ILOC.NORMAL_OPCODES.addI,
                    sources: [
                        new ILOC.Operand({
                            type: ILOC.OPERAND_TYPES.register,
                            name: 'b',
                        }),
                        new ILOC.Operand({
                            type: ILOC.OPERAND_TYPES.num,
                            name: '1',
                        }),
                    ],
                    targets: [
                        new ILOC.Operand({
                            type: ILOC.OPERAND_TYPES.register,
                            name: 'c',
                        }),
                    ],
                }),
            ],
        }),
        new ILOC.Instruction({
            label: new ILOC.Operand({
                type: ILOC.OPERAND_TYPES.label,
                name: 'L3',
            }),
            operations: [
                new ILOC.NormalOperation({
                    opcode: ILOC.NORMAL_OPCODES.add,
                    sources: [
                        new ILOC.Operand({
                            type: ILOC.OPERAND_TYPES.register,
                            name: 'a',
                        }),
                        new ILOC.Operand({
                            type: ILOC.OPERAND_TYPES.register,
                            name: 'c',
                        }),
                    ],
                    targets: [
                        new ILOC.Operand({
                            type: ILOC.OPERAND_TYPES.register,
                            name: 'd',
                        }),
                    ],
                }),
            ],
        }),
    ]
});

console.log(iloc_code)
console.log(ast);
console.log(ast.toString());
console.log(parsed_ast);
if(parsed_ast != undefined) {
    console.log(parsed_ast.toString());
}
