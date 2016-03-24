var DFA = {
    // Directions
    FORWARD: 'FORWARD',
    BACKWARD: 'BACKWARD',
    
    // ORDERINGS
    POSTORDER: 'POSTORDER',
    PREORDER: 'PREORDER',
    REVERSE_POSTORDER: 'REVERSE_POSTORDER',

    // Functions
    MEET: 'meet',
    TRANSFER: 'transfer',

    // Sets
    IN: 'in',
    OUT: 'out',

    // Actions
    READ: 'read',
    MODIFIED: 'modified',

    HIGHLIGHT: 'highlight',

    // Top/Bot Sets
    ALL: 'all',
    NONE: 'none',

    // Value Sets
    VARIABLES: 'variables',
    DEFINITIONS: 'definitions',
    EXPRESSIONS: 'expressions',
}

function DFAFramework (kwargs) {
    this.name = kwargs.name;
    this.meet_latex = kwargs.meet_latex;
    this.transfer_latex = kwargs.transfer_latex;
    this.meet = kwargs.meet;
    this.meet_op = kwargs.meet_op;
    this.transfer = kwargs.transfer;
    this.direction = kwargs.direction;
    this.value_domain = kwargs.value_domain;
    this.local_sets = kwargs.local_sets;
    this.boundary = kwargs.boundary || kwargs.top;
    this.top = kwargs.top;

    this.id = kwargs.id;
    DFA[kwargs.id] = this;

    this.find_definitions = function(cfg) {
        var operations = [].concat.apply([], cfg.nodes.map(function(node) {
            return node.operations;
        })).filter(function(operation) {
            // Filter to those which are assignments
            return (operation instanceof ILOC.NormalOperation ||
                    operation instanceof ILOC.MemoryLoadOperation);
        });
        
        // Return all the target operands of said operations
        return new ValueSet(
            [].concat.apply([], operations.map(function(operation) {
                if (operation.targets != undefined) {
                    return operation.targets.filter(function(operand) {
                        return (operand.type == ILOC.OPERAND_TYPES.register);
                    });
                } else {
                    return [];
                }
            }))
        );
    }

    this.find_variables = function(cfg) {
        // Find all operations in the graph
        var operations = [].concat.apply([], graph.nodes.map(function(node) {
            return node.operations.map(function(operation) {
                return operation;
            });
        }))
        
        // Return all the source operands of said operations
        return new ValueSet(
            [].concat.apply([], operations.map(function(operation) {
                var ret = [];
                if (operation.sources != undefined) {
                    ret = ret.concat(operation.sources);
                }
                if (operation instanceof ILOC.MemoryStoreOperation) {
                    if (operation.targets != undefined) {
                        ret = ret.concat(operation.targets);
                    }
                }
                return ret;
            })).filter(function(variable) {
                // Filter to just registers (variables)
                return (variable.type == ILOC.OPERAND_TYPES.register)
            })
        );
    }

    this.find_expressions = function(cfg) {
        var operations = [].concat.apply([], graph.nodes.map(function(node) {
            return node.operations.map(function(operation) {
                return operation;
            });
        }))

        // Return all the source operands of said operations
        return new ValueSet(
            [].concat.apply([], operations.map(function(operation) {
                var ret = [];
                if (operation instanceof ILOC.NormalOperation &&
                    operation.opcode in ILOC.OPCODE_SYMBOLS) {
                    var expr = new Expression({
                        lhs: operation.sources[0],
                        rhs: operation.sources[1],
                        opcode: operation.opcode,
                    });
                    ret.push(expr);
                }
                return ret;
            }))
        );
    }
    
    this.distinct_values = function(cfg) {
        switch(this.value_domain) {
        case DFA.DEFINITIONS:
            return this.find_definitions(cfg);
        case DFA.VARIABLES:
            return this.find_variables(cfg);
        case DFA.EXPRESSIONS:
            return this.find_expressions(cfg);
        default:
            throw new ReferenceError("Unrecognised value set {0} in {1}".format(this.value_domain, this.constructor.name));
        }
    }   
    
    this.lattice_value_sets = function(cfg) {
        var values = this.distinct_values(cfg);

        return combine(values.values()).map(function(a) {
            return new ValueSet(a);
        });
    }

    this.build_lattice = function(cfg) {
        var value_sets = this.lattice_value_sets(cfg);
        var top;
        switch(this.top) {
        case DFA.ALL:
            top=this.distinct_values(cfg);
            break;
        case DFA.NONE:
            top=new ValueSet([]);
            break;
        default:
            throw new ReferenceError("Unknown lattice top value: expected 'all' or 'none', got {0}".format(this.top));
        }
        var lattice = new Lattice({
            top       : top,
            value_sets: value_sets,
            meet_op   : this.meet_op,
        });
        
        return lattice;
    }
}

/*
 * An Operand.
 */
function Expression(kwargs) {
    ValueMixin.call(this, kwargs);
    
    this.lhs = kwargs.lhs;
    this.rhs = kwargs.rhs;
    this.opcode = kwargs.opcode;
    
    this.toString = function() {
        return '{0} {1} {2}'.format(
            this.lhs.toString(),
            ILOC.OPCODE_SYMBOLS[this.opcode],
            this.rhs.toString()
        )
    }
    
    this.toHTML = function() {
        return '{0} {1} {2}'.format(
            this.lhs.toHTML(),
            ILOC.OPCODE_SYMBOLS[this.opcode],
            this.rhs.toHTML()
        )
    }

    this.compare=function(v2) {
        if(v2 instanceof Expression) {
            return (
                (this.lhs.name == v2.lhs.name) &&
                    (this.lhs.type == v2.lhs.type) &&
                    (this.rhs.name == v2.rhs.name) &&
                    (this.rhs.type == v2.rhs.type) &&
                    (ILOC.OPCODE_SYMBOLS[this.opcode] == ILOC.OPCODE_SYMBOLS[v2.opcode])
            );
        } else {
            return false;
        }
    }

    this.key=function() {
        return "Expression,{0},{1},{2},{3},{4}".format(ILOC.OPCODE_SYMBOLS[this.opcode], this.lhs.name, this.lhs.type, this.rhs.name, this.rhs.type);
    }
}


function Lattice (kwargs) {
    Graph.call(this, kwargs);

    this.top        = kwargs.top;
    this.value_sets = kwargs.value_sets;
    this.meet_op    = kwargs.meet_op;

    this.paths_available = [];

    this.get_node = function(value_set) {
        for (node of this.nodes) {
            if (compare_value_sets(value_set, node.value_set)) {
                return node;
            }
        }
        throw new ReferenceError("Could not find node with value set {0} in this lattice.".format(value_set.toString()));
    }

    this.transitive_reduction = function() {
        for (var i = 0; i < this.nodes.length; i++) {
            this.adjacency[i][i] = 0;
        }
        for (var i = 0; i < this.nodes.length; i++) {
            for (var j = 0; j < this.nodes.length; j++) {
                if (this.adjacency[i][j] == 1) {
                    for (var k = 0; k < this.nodes.length; k++) {
                        if (this.adjacency[j][k] == 1) {
                            this.adjacency[i][k] = 0;
                        }
                    }
                }
            }
        }
    }
    
    this.init = function () {
        // Create the top element
        var top = new LatticeNode({
            value_set: new ValueSet(this.top.values()),
        });
        this.add_node(top);

        if (this.top.values().length > 0) {
            this.add_node(new LatticeNode({
                value_set: new ValueSet([]),
            }));
        }

        // Create all the nodes
        for(var i = 0; i < this.value_sets.length; i++) {
            if (!compare_value_sets(this.value_sets[i], this.top)) {
                var node = new LatticeNode({
                    value_set: new ValueSet(this.value_sets[i].values()),
                });
                this.add_node(node);
            }
        }

        // Find the meet of equally-ordered values
        for(var i = 0; i < this.value_sets.length - 1; i++) {
            for (var j = i + 1; j < this.value_sets.length; j++) {
                var result = this.meet_op(this.value_sets[i], this.value_sets[j]);
                var node_i = this.get_node(this.value_sets[i]);
                var node_j = this.get_node(this.value_sets[j]);
                var node_r = this.get_node(result);
                this.add_edge(node_i, node_r);
                this.add_edge(node_j, node_r);
            }
        }

        for(node of this.nodes) {
            this.add_edge(top, node);
        }

        this.transitive_reduction();
    }

    this.init();
}


/*
 *  A Lattice node.
 *
 *  Represents a value set from the lattice.
 */
function LatticeNode (kwargs) {
    
    this.value_set = kwargs.value_set;
    
    this.toString= function() {
        return this.value_set.toString();
    }

    this.toHTML=function(){
        return this.value_set.toHTML();
    }
};
