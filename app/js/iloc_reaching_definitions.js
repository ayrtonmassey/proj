var defgen = function (node,v_def) {
    var operations = node.operations.map(function(operation) {
        // Assign defintion indexes to all definitions
        if(operation.targets != undefined) {
            for (t of operation.targets) {
                t.index = "{0},{1}".format(node.index,node.operations.indexOf(operation));
            }
        }
        return operation;
    }).filter(function(operation) {
        // Filter to those which are assignments
        return (operation instanceof ILOC.NormalOperation);
    });
    
    var out_set = new ValueSet([]);
    // For each operation
    for(o of operations) {
        // If this operation has targets
        if(o.targets != undefined) {
            for(t of o.targets) {
                // Then it generates each target t
                // Add t to the out set
                out_set.add(t);
            }
        }
    };
    return out_set;    
};

var defkill = function (node, v_def) {
    var operations = node.operations.map(function(operation) {
        // Assign defintion indexes to all definitions
        if(operation.targets != undefined) {
            for (t of operation.targets) {
                t.index = "{0},{1}".format(node.index,node.operations.indexOf(operation));
            }
        }
        return operation;
    }).filter(function(operation) {
        // Filter to those which are assignments
        return (operation instanceof ILOC.NormalOperation);
    });
    
    out_set = new ValueSet([]);
    // For each value in v_def
    for (v of v_def.values()) {
        // Compare to each operation
        for(o of operations) {
            // If this operation has targets
            if(o.targets != undefined) {
                for(t of o.targets) {
                    // If v is in this operation's targets:
                    if(v.type == t.type && v.name == t.name && v.index != t.index) {
                        // It redefines v
                        // Add it to the out set
                        out_set.add(v);
                    }
                }
            }
        }
    };
    if(node.index == 3) {
        console.log(out_set);
    }
    return out_set;
};
    
var v_def = function(graph) {
    var operations = [].concat.apply([], graph.nodes.map(function(node) {
        return node.operations.map(function(operation) {
            // Assign defintion indexes to all definitions
            if(operation.targets != undefined) {
                for (t of operation.targets) {
                    t.index = "{0},{1}".format(node.index,node.operations.indexOf(operation));
                }
            }
            return operation;
        });
    })).filter(function(operation) {
        // Filter to those which are assignments
        return (operation instanceof ILOC.NormalOperation);
    });
    
    // Return all the target operands of said operations
    return new ValueSet(
        [].concat.apply([], operations.map(function(operation) {
            if (operation.targets != undefined) {
                return operation.targets;
            } else {
                return [];
            }
        }))
    );
}

var iloc_reaching_definitions = new DFAFramework({
    meet: function(node, graph, highlight) {
        var in_set = new ValueSet([]);
        var preds  = graph.nodes.filter(function(p) {
            if(graph.adjacency[p.index][node.index] == 1) {
                return true;
            }
        });
        for(p of preds) {
            for(def of p.out_set.values()) {
                in_set.add(def);
            }
        };
        return [in_set,preds];
    },
    transfer: function(node, in_set, v_def) {
        var set1 = defgen(node, v_def); // set1 = gen[B]

        var set2 = new ValueSet(in_set.values()); // set2 = in[B]

        for(v of defkill(node, v_def).values()) {
            set2.delete(v);
        } // set2 = in[B] - kill[B]
        
        for(v of set2.values()) {
            set1.add(v); // set1 = gen[B] U (in[B] - kill[B])
        }
        
        return [set1,[node]];
    },
    meet_latex: "\\[\\text{In}(n) = \\bigcup_{p \\in preds} \\text{Out}(p)\\]",
    transfer_latex: "\\[\\text{Out}(n) = \\text{DefGen}(n) \\cup \\big{(}\\text{In}(n) \\setminus \\text{DefKill}(n)\\big{)}\\]",
    transfer_value_set: v_def,
    direction: DFA.FORWARD,
    top: new ValueSet([]),
    name: "ILOC Reaching Definitions",
});
