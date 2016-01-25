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

        this.toHTML = function() {
            var string = "<td>{0}</td>".format(this.opcode);
            if (this.sources.length > 0) {
                count = 0;
                // Print all the sources
                for(s of this.sources) {
                    string += "<td>{0}</td>".format(s.toHTML());
                    count += 1;
                }
                // Pad up to 2 cols
                while (count < 2) {
                    string += "<td></td>";
                    count += 1;
                }
                string += "<td>{0}</td>".format(this.operator_symbol);
            } else {
                string += "<td></td><td></td><td></td>";
            }
            if (this.targets.length > 0) {
                count = 0;
                // Print all the sources
                for(t of this.targets) {
                    string += "<td>{0}</td>".format(t.toHTML());
                    count += 1;
                }
                // Pad up to 2 cols
                while (count < 2) {
                    string += "<td></td>";
                    count += 1;
                }
            } else {
                string += "<td></td><td></td>";
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
    NormalOperation: function NormalOperation(kwargs) {
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
    ControlFlowOperation: function ControlFlowOperation(kwargs) {
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
    Operand: function Operand(kwargs) {
        Node.call(this, kwargs);
        ValueMixin.call(this, kwargs);
        this.type = kwargs.type;
        this.name = kwargs.name;
        this.index = kwargs.index;

        this.toString = function() {
            switch(this.type) {
            case ILOC.OPERAND_TYPES.register:
                return "r"+this.name + (this.index != undefined ? "<{0}>".format(this.index) : "");
            default:
                return this.name;
            }
        }
        
        this.toHTML = function() {
            switch(this.type) {
            case ILOC.OPERAND_TYPES.register:
                return "r"+this.name + (this.index != undefined ? "<sub>" + this.index + "</sub>" : "");
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

    CFG: function CFG(kwargs) {
        Graph.call(this, kwargs);

        this.to_code = function() {
            return this.nodes.map(function(node) {
                var instruction_string = '{0} '.format((node.label ? node.label + ":" : "")).pad(" ", 5, true);
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
                    if(o.opcode == ILOC.CONTROL_FLOW_OPCODES.nop) {
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
            if (n.operations[n.operations.length - 1] instanceof ILOC.NormalOperation) {
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
