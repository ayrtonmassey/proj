/*
 * ILOC Namespace
 */
var ILOC = {
    /*
     * Nodes for the ILOC AST, based on the ILOC grammar from:
     *
     * Engineering a Compiler, K. Cooper & L. Torczon, Appendix A,
     * p. 727
     * 
     */

    /*
     * A IlocProgram.
     */
    IlocProgram: function IlocProgram(kwargs) {
        Node.call(this, kwargs);
        this.instructions = kwargs.instructions;
        
        this.toString = function() {
            var string = "";
            for(i of this.instructions) {
                string += i.toString() + "\n";
            }
            return string;
        }

        this.toHTML = function() {
            var string = "<table><tbody><tr>";
            string += this.instructions.map(function(ins) {
                return ins.toHTML();
            }).join("</tr><tr>");
            string += "</tr></tbody></table>";
            return string;
        }
    },

    /*
     * An Instruction.
     */
    Instruction: function Instruction(kwargs) {
        Node.call(this, kwargs);
        this.operations = kwargs.operations;
        this.label = kwargs.label;
        
        this.toString = function() {
            var string = "";
            if (this.label != undefined) {
                string += this.label + ": ";
            }
            for(o of this.operations) {
                string += o.toString();
            }
            return string;
        }

        this.toHTML = function() {
            var string = "<td>";
            if (this.label != undefined) {
                string += this.label + ": ";
            }
            string += "</td>";
            string += this.operations.map(function(op) {
                return op.toHTML();
            }).join("</tr><tr><td></td>");
            return string;
        }
    },

    /*
     * An Operation
     */
    Operation: function Operation(kwargs) {
        Node.call(this, kwargs);
        this.opcode = kwargs.opcode;
        this.sources = kwargs.sources;
        this.targets = kwargs.targets;

        this.toString = function() {
            var string = this.opcode + " ";
            if (this.sources.length > 0) {
                for(s of this.sources) {
                    string += s.toString() + ",";
                }
                string += " " + this.operator_symbol + " ";
            }
            if (this.targets.length > 0) {
                for(t of this.targets) {
                    string += t.toString() + ",";
                }
            }
            return string;
        }

        this.get_string_components = function() {
            var components = [
                this.opcode
            ]
            if (this.sources.length > 0) {
                var count = 0;
                // Print all the sources
                for(s of this.sources) {
                    components.push(s.toHTML());
                    count += 1;
                }
                // Pad up to 2 cols
                while (count < 2) {
                    components.push("");
                    count += 1;
                }
                components.push(this.operator_symbol);
            } else {
                components = components.concat(['','','']);
            }
            if (this.targets.length > 0) {
                var count = 0;
                // Print all the sources
                for(t of this.targets) {
                    components.push(t.toHTML());
                    count += 1;
                }
                // Pad up to 2 cols
                while (count < 2) {
                    components.push('');
                    count += 1;
                }
            } else {
                components = components.concat(['','']);
            }
            return components
        }
        
        this.toHTML = function() {
            return this.get_string_components().map(function(e) {
                return '<td>' + e + '</td>';
            }).join('');
        }

        this.check_operand_pattern = function check_operand_pattern(dest, operands, pattern) {
            for (var i=0; i < operands.length; i++) {
                if (pattern.charAt(i) == 'r' && operands[i].type != ILOC.OPERAND_TYPES.register) {
                    throw new ReferenceError('{0} expected {1} {2} to be register, found {3}'.format(
                        this.opcode,
                        dest,
                        i,
                        operands[i].type
                    ));
                } else if (pattern.charAt(i) == 'n' && operands[i].type != ILOC.OPERAND_TYPES.num) {
                    throw new ReferenceError('{0} expected {1} {2} to be num, found {3}'.format(
                        this.opcode,
                        dest,
                        i,
                        operands[i].type
                    ));
                } else if (pattern.charAt(i) == 'l' && operands[i].type != ILOC.OPERAND_TYPES.label) {
                    throw new ReferenceError('{0} expected {1} {2} to be label, found {3}'.format(
                        this.opcode,
                        dest,
                        i,
                        operands[i].type
                    ));
                } else if (pattern.charAt(i) == 'c' && operands[i].type != ILOC.OPERAND_TYPES.cc) {
                    throw new ReferenceError('{0} expected {1} {2} to be cc, found {3}'.format(
                        this.opcode,
                        dest,
                        i,
                        operands[i].type
                    ));
                }
            }
        }
    },

    MEMORY_STORE_OPCODES: {
        store: { 
            name: 'store',
            sources: 'r',
            targets: 'r',
        },
        storeAI: { 
            name: 'storeAI',
            sources: 'r',
            targets: 'rn',
        },
        storeAO: { 
            name: 'storeAO',
            sources: 'r',
            targets: 'rr',
        },
        cstore: { 
            name: 'cstore',
            sources: 'r',
            targets: 'r',
        },
        cstoreAI: { 
            name: 'cstoreAI',
            sources: 'r',
            targets: 'rn',
        },
        cstoreAO: { 
            name: 'cstoreAO',
            sources: 'r',
            targets: 'rr',
        },
    },

    /*
     * An Operation which stores to Memory.
     *
     * Inherits from Operation.
     */
    MemoryStoreOperation: function MemoryStoreOperation(kwargs) {
        ILOC.Operation.call(this, kwargs);

        // Store parent func
        this.operation_string_components = this.get_string_components;
        this.get_string_components = function() {
            var components = this.operation_string_components();
            // Add Mem(
            components[components.length-2] = 'Mem('+components[components.length-2];
            // Add +
            if(components[components.length-1] != '') {
                components[components.length-1] = '+ ' + components[components.length-1];
            }
            // Add )
            components[components.length-1] = components[components.length-1]+')';
            return components;
        }
        
        this.operator_symbol = "=>";
        if (!(ILOC.MEMORY_STORE_OPCODES.hasOwnProperty(this.opcode))) {
            throw new ReferenceError("Invalid OpCode {0} assigned to MemoryStoreOperation".format(this.opcode))
        }
        
        // Check number of operands
        if (this.sources.length != ILOC.MEMORY_STORE_OPCODES[this.opcode].sources.length) {
            throw new ReferenceError ('{0} expected {1} sources, found {2}'.format(
                this.opcode,
                ILOC.MEMORY_STORE_OPCODES[this.opcode].sources.length,
                this.sources.length
            ));
        }

        if (this.targets.length != ILOC.MEMORY_STORE_OPCODES[this.opcode].targets.length) {
            throw new ReferenceError ('{0} expected {1} targets, found {2}'.format(
                this.opcode,
                ILOC.MEMORY_STORE_OPCODES[this.opcode].targets.length,
                this.targets.length
            ));
        }

        this.check_operand_pattern('source', this.sources, ILOC.MEMORY_STORE_OPCODES[this.opcode].sources);
        this.check_operand_pattern('target', this.targets, ILOC.MEMORY_STORE_OPCODES[this.opcode].targets);
    },

    MEMORY_LOAD_OPCODES: {
        load: { 
            name: 'load',
            sources: 'r',
            targets: 'r',
        },
        loadAI: { 
            name: 'loadAI',
            sources: 'rn',
            targets: 'r',
        },
        loadAO: { 
            name: 'loadAO',
            sources: 'rr',
            targets: 'r',
        },
        cload: { 
            name: 'cload',
            sources: 'r',
            targets: 'r',
        },
        cloadAI: { 
            name: 'cloadAI',
            sources: 'rn',
            targets: 'r',
        },
        cloadAO: { 
            name: 'cloadAO',
            sources: 'rr',
            targets: 'r',
        },
        loadI: { 
            name: 'loadI',
            sources: 'n',
            targets: 'r',
        },
    },

    /*
     * An Operation which loads from Memory.
     *
     * Inherits from Operation.
     */
    MemoryLoadOperation: function MemoryLoadOperation(kwargs) {
        ILOC.Operation.call(this, kwargs);

        // Store parent func
        this.operation_string_components = this.get_string_components;
        this.get_string_components = function() {
            var components = this.operation_string_components();
            if (this.opcode != ILOC.MEMORY_LOAD_OPCODES.loadI.name) {
                // Add Mem(
                components[1] = 'Mem('+components[1];
                // Add +
                if(components[2] != '') {
                    components[2] = '+ ' + components[2];
                }
                // Add )
                components[2] = components[2]+')';
            }
            return components
        }
        
        this.operator_symbol = "=>";
        if (!(ILOC.MEMORY_LOAD_OPCODES.hasOwnProperty(this.opcode))) {
            throw new ReferenceError("Invalid OpCode {0} assigned to MemoryLoadOperation".format(this.opcode))
        }
        
        // Check number of operands
        if (this.sources.length != ILOC.MEMORY_LOAD_OPCODES[this.opcode].sources.length) {
            throw new ReferenceError ('{0} expected {1} sources, found {2}'.format(
                this.opcode,
                ILOC.MEMORY_LOAD_OPCODES[this.opcode].sources.length,
                this.sources.length
            ));
        }

        if (this.targets.length != ILOC.MEMORY_LOAD_OPCODES[this.opcode].targets.length) {
            throw new ReferenceError ('{0} expected {1} targets, found {2}'.format(
                this.opcode,
                ILOC.MEMORY_LOAD_OPCODES[this.opcode].targets.length,
                this.targets.length
            ));
        }

        this.check_operand_pattern('source', this.sources, ILOC.MEMORY_LOAD_OPCODES[this.opcode].sources);
        this.check_operand_pattern('target', this.targets, ILOC.MEMORY_LOAD_OPCODES[this.opcode].targets);
    },
    
    // Patterns: r = reg, n = num, l = label, c = comp
    NORMAL_OPCODES: {
        add: {
            opcode : 'add',
            sources: 'rr',
            targets: 'r',
        },
        sub: {
            name: 'sub',
            sources: 'rr',
            targets: 'r',
        },
        mult: { 
            name: 'mult',
            sources: 'rr',
            targets: 'r',
        },
        div: { 
            name: 'div',
            sources: 'rr',
            targets: 'r',
        },
        addI: { 
            name: 'addI',
            sources: 'rn',
            targets: 'r',
        },
        subI: { 
            name: 'subI',
            sources: 'rn',
            targets: 'r',
        },
        rsubI: { 
            name: 'rsubI',
            sources: 'rn',
            targets: 'r',
        },
        multI: { 
            name: 'multI',
            sources: 'rn',
            targets: 'r',
        },
        divI: { 
            name: 'divI',
            sources: 'rn',
            targets: 'r',
        },
        rdivI: { 
            name: 'rdivI',
            sources: 'rn',
            targets: 'r',
        },
        and: { 
            name: 'and',
            sources: 'rr',
            targets: 'r',
        },
        andI: { 
            name: 'andI',
            sources: 'rn',
            targets: 'r',
        },
        or: { 
            name: 'or',
            sources: 'rr',
            targets: 'r',
        },
        orI: { 
            name: 'orI',
            sources: 'rn',
            targets: 'r',
        },
        xor: { 
            name: 'xor',
            sources: 'rn',
            targets: 'r',
        },
        xorI: { 
            name: 'xorI',
            sources: 'rn',
            targets: 'r',
        },
        lshift: { 
            name: 'lshift',
            sources: 'rr',
            targets: 'r',
        },
        lshiftI: { 
            name: 'lshiftI',
            sources: 'rn',
            targets: 'r',
        },
        rshift: { 
            name: 'rshift',
            sources: 'rn',
            targets: 'r',
        },
        rshiftI: { 
            name: 'rshiftI',
            sources: 'rn',
            targets: 'r',
        },
        i2i: { 
            name: 'i2i',
            sources: 'r',
            targets: 'r',
        },
        c2c: { 
            name: 'c2c',
            sources: 'r',
            targets: 'r',
        },
        c2i: { 
            name: 'c2i',
            sources: 'r',
            targets: 'r',
        },
        i2c: { 
            name: 'i2c',
            sources: 'r',
            targets: 'r',
        },
        cmp_LT: { 
            name: 'cmp_LT',
            sources: 'rr',
            targets: 'r',
        },
        cmp_LE: { 
            name: 'cmp_LE',
            sources: 'rr',
            targets: 'r',
        },
        cmp_EQ: { 
            name: 'cmp_EQ',
            sources: 'rr',
            targets: 'r',
        },
        cmp_GE: { 
            name: 'cmp_GE',
            sources: 'rr',
            targets: 'r',
        },
        cmp_GT: { 
            name: 'cmp_GT',
            sources: 'rr',
            targets: 'r',
        },
        cmp_NE: { 
            name: 'cmp_NE',
            sources: 'rr',
            targets: 'r',
        },
        comp: { 
            name: 'comp',
            sources: 'rr',
            targets: 'c',
        },
        tbl: { 
            name: 'tbl',
            sources: 'rl',
            targets: '',
        },
    },
    
    /*
     * A NormalOperation.
     *
     * Inherits from Operation.
     */
    NormalOperation: function NormalOperation(kwargs) {
        ILOC.Operation.call(this, kwargs);
        
        this.operator_symbol = "=>";
        if (!(ILOC.NORMAL_OPCODES.hasOwnProperty(this.opcode))) {
            throw new ReferenceError("Invalid OpCode {0} assigned to NormalOperation".format(this.opcode))
        }
        
        // Check number of operands
        if (this.sources.length != ILOC.NORMAL_OPCODES[this.opcode].sources.length) {
            throw new ReferenceError ('{0} expected {1} sources, found {2}'.format(
                this.opcode,
                ILOC.NORMAL_OPCODES[this.opcode].sources.length,
                this.sources.length
            ));
        }

        if (this.targets.length != ILOC.NORMAL_OPCODES[this.opcode].targets.length) {
            throw new ReferenceError ('{0} expected {1} targets, found {2}'.format(
                this.opcode,
                ILOC.NORMAL_OPCODES[this.opcode].targets.length,
                this.targets.length
            ));
        }

        this.check_operand_pattern('source', this.sources, ILOC.NORMAL_OPCODES[this.opcode].sources);
        this.check_operand_pattern('target', this.targets, ILOC.NORMAL_OPCODES[this.opcode].targets);
    },

    CONTROL_FLOW_OPCODES: {
        nop: {
            name: 'nop',
            sources: '',
            targets: '',
        },
        cbr: {
            name: 'cbr',
            sources: 'r',
            targets: 'll',
        },
        jump: { 
            name: 'jump',
            sources: '',
            targets: 'r',
        },
        jumpI: { 
            name: 'jumpI',
            sources: '',
            targets: 'l',
        },
        cbr_LT: { 
            name: 'cbr_LT',
            sources: 'c',
            targets: 'll',
        },
        cbr_LE: { 
            name: 'cbr_LE',
            sources: 'c',
            targets: 'll',
        },
        cbr_EQ: { 
            name: 'cbr_EQ',
            sources: 'c',
            targets: 'll',
        },
        cbr_GE: { 
            name: 'cbr_GE',
            sources: 'c',
            targets: 'll',
        },
        cbr_GT: { 
            name: 'cbr_GT',
            sources: 'c',
            targets: 'll',
        },
        cbr_NE: { 
            name: 'cbr_NE',
            sources: 'c',
            targets: 'll',
        },
    },
    
    /*
     * A ControlFlowOperation.
     *
     * Inherits from Operation.
     */
    ControlFlowOperation: function ControlFlowOperation(kwargs) {
        ILOC.Operation.call(this, kwargs);
        
        this.operator_symbol = "->";
        if (!(ILOC.CONTROL_FLOW_OPCODES.hasOwnProperty(this.opcode))) {
            throw new ReferenceError("Invalid OpCode {0} assigned to ControlFlowOperation".format(this.opcode))
        }

        // Check number of operands
        if (this.sources.length != ILOC.CONTROL_FLOW_OPCODES[this.opcode].sources.length) {
            throw new ReferenceError ('{0} expected {1} sources, found {2}'.format(
                this.opcode,
                ILOC.CONTROL_FLOW_OPCODES[this.opcode].sources.length,
                this.sources.length
            ));
        }

        if (this.targets.length != ILOC.CONTROL_FLOW_OPCODES[this.opcode].targets.length) {
            throw new ReferenceError ('{0} expected {1} targets, found {2}'.format(
                this.opcode,
                ILOC.CONTROL_FLOW_OPCODES[this.opcode].targets.length,
                this.targets.length
            ));
        }

        this.check_operand_pattern('source', this.sources, ILOC.CONTROL_FLOW_OPCODES[this.opcode].sources);
        this.check_operand_pattern('target', this.targets, ILOC.CONTROL_FLOW_OPCODES[this.opcode].targets);
    },
    
    OPERAND_TYPES : {
        register: 'register',
        num: 'num',
        label: 'label',
        cc: 'cc',
    },

    /*
     * An Operand.
     */
    Operand: function Operand(kwargs) {
        Node.call(this, kwargs);
        ValueMixin.call(this, kwargs);
        this.type = kwargs.type;
        this.name = kwargs.name;
        this.index = kwargs.index;

        this.toString = function() {
            switch(this.type) {
            case ILOC.OPERAND_TYPES.register:
                return "r"+this.name + (this.index != undefined ? "_{0}".format(this.index) : "");
            case ILOC.OPERAND_TYPES.cc:
                return this.name + (this.index != undefined ? "_{0}".format(this.index) : "");
            default:
                return this.name;
            }
        }
        
        this.toHTML = function() {
            switch(this.type) {
            case ILOC.OPERAND_TYPES.register:
                return "r"+this.name + (this.index != undefined ? "<sub>" + this.index + "</sub>" : "");
            case ILOC.OPERAND_TYPES.cc:
                return this.name + (this.index != undefined ? "<sub>" + this.index + "</sub>" : "");
            default:
                return this.name;
            }
        }

        this.compare=function(v2) {
            if(v2 instanceof ILOC.Operand) {
                var same = (this.name == v2.name) && (this.type == v2.type);
                if(this.index != undefined && v2.index != undefined) {
                    same = same && (this.index == v2.index);
                }
                return same;
            } else {
                return false;
            }
        }
    },

    OPCODE_SYMBOLS: {
        'add'    : '+',
        'addI'   : '+',
        'mul'    : '*',
        'mulI'   : '*',
        'sub'    : '-',
        'subI'   : '-',
        'rsubI'  : '-',
        'div'    : '/',
        'divI'   : '/',
        'rdivI'  : '/',
        'and'    : '&',
        'andI'   : '&',
        'or'     : '|',
        'orI'    : '|',
        'xor'    : '&oplus;',
        'xorI'   : '&oplus;',
        'rshift' : '>>',
        'rshiftI': '>>',
        'lshift' : '<<',
        'lshiftI': '<<',
        'cmp_LE' : '<=',
        'cmp_LT' : '<',
        'cmp_GE' : '>=',
        'cmp_GT' : '>',
        'cmp_NE' : '!=',
        'cmp_EQ' : '==',
    },

    CFG: function CFG(kwargs) {
        Graph.call(this, kwargs);

        this.to_code = function() {
            return this.nodes.map(function(node) {
                var instruction_string = '{0} '.format((node.label ? node.label + ":" : "")).pad(" ", 5, false);
                instruction_string += node.operations.map(function(op) {
                    return op.opcode.pad(" ", 8) + op.sources.map(function(oper) {
                        return ((oper.type == ILOC.OPERAND_TYPES.register ? 'r' : '') + oper.name).pad(" ", 5);
                    }).join(", ").pad(" ", 12) + " " + (op.sources.length > 0 ? op.operator_symbol : "  ") + " " + op.targets.map(function(oper) {
                        return ((oper.type == ILOC.OPERAND_TYPES.register ? 'r' : '') + oper.name).pad(" ", 5);
                    }).join(", ");
                }).join("\n".pad(" ", 5));
                return instruction_string;
            }).join("\n");
        }
    },

    build_CFG: function build_CFG(iloc_program) {
        if(!(iloc_program instanceof ILOC.IlocProgram)) {
            throw TypeError("Must pass an instance of IlocProgram to build_CFG");
        }

        graph = new ILOC.CFG();

        labels = {}
        for(i of iloc_program.instructions) {
            graph.add_node(i);
            if(i.label != undefined) {
                labels[i.label] = i;
            }
        }
        for(n of graph.nodes) {
            // TODO: Handle branch from within middle of instruction.
            for(o of n.operations) {
                if(o instanceof ILOC.ControlFlowOperation) {
                    // If the node is a nop:
                    if(o.opcode == ILOC.CONTROL_FLOW_OPCODES.nop.name) {
                        // If this node is not the last node:
                        if(graph.nodes.indexOf(n) < graph.nodes.length - 1) {
                            // Add an edge to the following node.
                            graph.add_edge(n,graph.nodes[graph.nodes.indexOf(n)+1]);
                        }
                    } else {
                        // This node branches, so
                        for (t of o.targets) {
                            // Add each branch target as an edge from this node.
                            graph.add_edge(n,graph.nodes[graph.nodes.indexOf(labels[t])]);
                        }
                    }
                }
            }
            if (n.operations[n.operations.length - 1] instanceof ILOC.NormalOperation ||
                n.operations[n.operations.length - 1] instanceof ILOC.MemoryStoreOperation ||
                n.operations[n.operations.length - 1] instanceof ILOC.MemoryLoadOperation) {
                // NormalOperations do not branch, so
                // If this node is not the last node:
                if(graph.nodes.indexOf(n) < graph.nodes.length - 1) {
                    // Add an edge to the following node.
                    graph.add_edge(n,graph.nodes[graph.nodes.indexOf(n)+1]);
                }
            }
        }
        
        return graph;
    }
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

ILOC.MemoryStoreOperation.prototype = Object.create(ILOC.Operation.prototype);
ILOC.MemoryStoreOperation.prototype.constructor = ILOC.MemoryStoreOperation;

ILOC.MemoryLoadOperation.prototype = Object.create(ILOC.Operation.prototype);
ILOC.MemoryLoadOperation.prototype.constructor = ILOC.MemoryLoadOperation;

ILOC.Operand.prototype = Object.create(Node.prototype);
ILOC.Operand.prototype.constructor = ILOC.Operand;


// Build a parser using peg.js

try{
    // grammar = Handlebars.templates['grammar.pegjs']();
    ILOC.parser = iloc_parser;// PEG.buildParser(grammar);
} catch (ex) {
    console.log(ex);
    console.log(ex.message);
    console.log(ex.location);
}
