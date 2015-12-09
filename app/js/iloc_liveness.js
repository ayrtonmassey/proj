var defs = function (node,v_def) {
    // Return all the source operands of this nodes' operations
    return new ValueSet(
        [].concat.apply([], node.operations.filter(function(operation) {
            // filter to just assignments
            return (operation instanceof ILOC.NormalOperation);
        }).map(function(operation) {
            if (operation.targets != undefined) {
                return operation.targets;
            } else {
                return [];
            }
        })).filter(function(target) {
            // Filter to just registers (variables)
            return (target.type == ILOC.OPERAND_TYPES.register)
        })
    );
};

var uses = function (node, v_def) {
    // Return all the source operands of this nodes' operations
    return new ValueSet(
        [].concat.apply([], node.operations.map(function(operation) {
            if (operation.sources != undefined) {
                return operation.sources;
            } else {
                return [];
            }
        })).filter(function(source) {
            // Filter to just registers (variables)
            return (source.type == ILOC.OPERAND_TYPES.register)
        })
    );
};

var v_use = function(graph) {
    // Find all operations in the graph
    var operations = [].concat.apply([], graph.nodes.map(function(node) {
        return node.operations.map(function(operation) {
            return operation;
        });
    }))
    
    // Return all the source operands of said operations
    return new ValueSet(
        [].concat.apply([], operations.map(function(operation) {
            if (operation.sources != undefined) {
                return operation.sources;
            } else {
                return [];
            }
        })).filter(function(source) {
            // Filter to just registers (variables)
            return (source.type == ILOC.OPERAND_TYPES.register)
        })
    );
}

var iloc_liveness = new DFAFramework({
    meet: function(node, graph) {
        var out_set = new ValueSet([]);
        var succ  = graph.nodes.filter(function(s) {
            if(graph.adjacency[node.index][s.index] == 1) {
                return true;
            }
        })
        for(s of succ) {
            for(use of s.in_set.values()) {
                out_set.add(use);
            }
        };
        return {value_set: out_set, modified_nodes: succ};
    },
    transfer: function(node, out_set, value_set) {
        var set1 = uses(node, value_set); // set1 = use[B]

        var set2 = new ValueSet(out_set.values()); // set2 = in[B]
        
        for(v of defs(node, value_set).values()) {
            set2.delete(v);
        } // set2 = in[B] - def[B]
        
        for(v of set2.values()) {
            set1.add(v); // set1 = use[B] U (in[B] - def[B])
        }
        
        return {value_set: set1, modified_nodes: [node]};
    },
    meet_latex: "\\[\\text{Out}(n) = \\bigcup_{s \\in succ} \\text{In}(s)\\]",
    transfer_latex: "\\[\\text{In}(n) = \\text{Use}(n) \\cup \\big{(}\\text{Out}(n) \\setminus \\text{Def}(n)\\big{)}\\]",
    transfer_value_set: v_use,
    direction: DFA.BACKWARD,
    top: new ValueSet([]),
    name: "ILOC Liveness Analysis",
});
