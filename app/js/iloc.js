/*
 * A Template.
 */
function Template(kwargs) {
    Node.call(this, kwargs);
    
};

Template.prototype = Object.create(Node.prototype);
Template.prototype.constructor = Template;


/*
 * Nodes for ILOC AST, based on the ILOC grammar from:
 *
 * Engineering a Compiler, K. Cooper & L. Torczon, Appendix A, p. 727
 * 
 */

/*
 * A IlocProgram.
 */
function IlocProgram(kwargs) {
    Node.call(this, kwargs);
    this.instructions = kwargs.instructions;
    
    this.toString = function() {
        var string = "";
        for(i of this.instructions) {
            string += i.toString() + "\n";
        }
        return string;
    }
};

IlocProgram.prototype = Object.create(Node.prototype);
IlocProgram.prototype.constructor = IlocProgram;


/*
 * An Instruction.
 */
function Instruction(kwargs) {
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
};

Instruction.prototype = Object.create(Node.prototype);
Instruction.prototype.constructor = Instruction;


/*
 * An Operation
 */
function Operation(kwargs) {
    Node.call(this, kwargs);
    this.opcode = kwargs.opcode;
    this.sources = kwargs.sources;
    this.targets = kwargs.targets;

    this.toString = function() {
        var string = this.opcode + " ";
        for(s of this.sources) {
            string += s.toString() + ",";
        }
        string += " " + this.operator_symbol + " ";
        for(t of this.targets) {
            string += t.toString() + ",";
        }
        return string;
    }
};

Operation.prototype = Object.create(Node.prototype);
Operation.prototype.constructor = Operation;


var NORMAL_OPCODES = {
    nop: 'nop',
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
    jumpI: 'jumpI',
    jump: 'jump',
    tbl: 'tbl',
}

/*
 * A NormalOperation.
 *
 * Inherits from Operation.
 */
function NormalOperation(kwargs) {
    Operation.call(this, kwargs);

    this.operator_symbol = "=>";
    if (!(NORMAL_OPCODES.hasOwnProperty(this.opcode))) {
        throw ReferenceError("Invalid OpCode {0} assigned to NormalOperation".format(this.opcode))
    }
};

NormalOperation.prototype = Object.create(Operation.prototype);
NormalOperation.prototype.constructor = NormalOperation;


var CONTROL_FLOW_OPCODES = {
    cbr: 'cbr',
    jump: 'jump',
    jumpI: 'jumpI',
    cbr_LT: 'cbr_LT',
    cbr_LE: 'cbr_LE',
    cbr_EQ: 'cbr_EQ',
    cbr_GE: 'cbr_GE',
    cbr_GT: 'cbr_GT',
    cbr_NE: 'cbr_NE',
}

/*
 * A ControlFlowOperation.
 *
 * Inherits from Operation.
 */
function ControlFlowOperation(kwargs) {
    Operation.call(this, kwargs);

    this.operator_symbol = "->";
    if (!(CONTROL_FLOW_OPCODES.hasOwnProperty(this.opcode))) {
        throw ReferenceError("Invalid OpCode {0} assigned to ControlFlowOperation".format(this.opcode))
    }
};

ControlFlowOperation.prototype = Object.create(Operation.prototype);
ControlFlowOperation.prototype.constructor = ControlFlowOperation;



var OPERAND_TYPES = {
    register: 'register',
    num: 'num',
    label: 'label',
}

/*
 * An Operand.
 */
function Operand(kwargs) {
    Node.call(this, kwargs);
    this.type = kwargs.type;
    this.name = kwargs.name;

    this.toString = function() {
        switch(this.type) {
        case OPERAND_TYPES.register:
            return "r"+this.name;
        default:
            return this.name;
        }
    }
};

Operand.prototype = Object.create(Node.prototype);
Operand.prototype.constructor = Operand;

code = "\
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

var ast = new IlocProgram({
    instructions: [
        new Instruction({
            label: undefined,
            operations: [
                new NormalOperation({
                    opcode: NORMAL_OPCODES.loadI,
                    sources: [
                        new Operand({
                            type: OPERAND_TYPES.num,
                            name: '2',
                        }),
                    ],
                    targets: [
                        new Operand({
                            type: OPERAND_TYPES.register,
                            name: 'a',
                        }),
                    ],
                }),
                new NormalOperation({
                    opcode: NORMAL_OPCODES.load,
                    sources: [
                        new Operand({
                            type: OPERAND_TYPES.register,
                            name: 'b',
                        }),
                    ],
                    targets: [
                        new Operand({
                            type: OPERAND_TYPES.register,
                            name: 'x',
                        }),
                    ],
                }),
                new NormalOperation({
                    opcode: NORMAL_OPCODES.addI,
                    sources: [
                        new Operand({
                            type: OPERAND_TYPES.register,
                            name: 'a',
                        }),
                        new Operand({
                            type: OPERAND_TYPES.num,
                            name: '1',
                        }),
                    ],
                    targets: [
                        new Operand({
                            type: OPERAND_TYPES.register,
                            name: 'a',
                        }),
                    ],
                }),
                new NormalOperation({
                    opcode: NORMAL_OPCODES.loadI,
                    sources: [
                        new Operand({
                            type: OPERAND_TYPES.num,
                            name: '0',
                        }),
                    ],
                    targets: [
                        new Operand({
                            type: OPERAND_TYPES.register,
                            name: '0',
                        }),
                    ],
                }),
                new NormalOperation({
                    opcode: NORMAL_OPCODES.cmp_GE,
                    sources: [
                        new Operand({
                            type: OPERAND_TYPES.register,
                            name: 'x',
                        }),
                        new Operand({
                            type: OPERAND_TYPES.register,
                            name: '0',
                        }),
                    ],
                    targets: [
                        new Operand({
                            type: OPERAND_TYPES.register,
                            name: 'comp',
                        }),
                    ],
                }),
                new ControlFlowOperation({
                    opcode: CONTROL_FLOW_OPCODES.cbr,
                    sources: [
                        new Operand({
                            type: OPERAND_TYPES.register,
                            name: 'comp',
                        }),
                    ],
                    targets: [
                        new Operand({
                            type: OPERAND_TYPES.label,
                            name: 'L1',
                        }),
                        new Operand({
                            type: OPERAND_TYPES.label,
                            name: 'L2',
                        }),
                    ],
                }),
            ],
        }),
        new Instruction({
            label: 'L1',
            operations: [
                new NormalOperation({
                    opcode: NORMAL_OPCODES.i2i,
                    sources: [
                        new Operand({
                            type: OPERAND_TYPES.register,
                            name: 'x',
                        }),
                    ],
                    targets: [
                        new Operand({
                            type: OPERAND_TYPES.register,
                            name: 'a',
                        }),
                    ],
                }),
                new NormalOperation({
                    opcode: NORMAL_OPCODES.add,
                    sources: [
                        new Operand({
                            type: OPERAND_TYPES.register,
                            name: 'a',
                        }),
                        new Operand({
                            type: OPERAND_TYPES.register,
                            name: 'b',
                        }),
                    ],
                    targets: [
                        new Operand({
                            type: OPERAND_TYPES.register,
                            name: 'c',
                        }),
                    ],
                }),
                new ControlFlowOperation({
                    opcode: CONTROL_FLOW_OPCODES.jump,
                    sources: [
                    ],
                    targets: [
                        new Operand({
                            type: OPERAND_TYPES.label,
                            name: 'L3',
                        }),
                    ],
                }),
            ],
        }),
        new Instruction({
            label: 'L2',
            operations: [
                new NormalOperation({
                    opcode: NORMAL_OPCODES.addI,
                    sources: [
                        new Operand({
                            type: OPERAND_TYPES.register,
                            name: 'b',
                        }),
                        new Operand({
                            type: OPERAND_TYPES.num,
                            name: '1',
                        }),
                    ],
                    targets: [
                        new Operand({
                            type: OPERAND_TYPES.register,
                            name: 'c',
                        }),
                    ],
                }),
            ],
        }),
        new Instruction({
            label: 'L3',
            operations: [
                new NormalOperation({
                    opcode: NORMAL_OPCODES.add,
                    sources: [
                        new Operand({
                            type: OPERAND_TYPES.register,
                            name: 'a',
                        }),
                        new Operand({
                            type: OPERAND_TYPES.register,
                            name: 'c',
                        }),
                    ],
                    targets: [
                        new Operand({
                            type: OPERAND_TYPES.register,
                            name: 'd',
                        }),
                    ],
                }),
            ],
        }),
    ]
});

console.log(code)
console.log(ast);
console.log(ast.toString());
