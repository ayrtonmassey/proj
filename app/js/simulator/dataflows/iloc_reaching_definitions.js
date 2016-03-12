var defgen = function (node, v_def) {
    var operations = node.operations.filter(function(operation) {
        // Filter to those which are assignments
        return (operation instanceof ILOC.NormalOperation ||
                operation instanceof ILOC.MemoryLoadOperation);
    });
    
    var out_set = new ValueSet([]);
    // For each operation
    for(o of operations) {
        // If this operation has targets
        if(o.targets != undefined) {
            for(t of o.targets) {
                // Then it generates each target t
                // Add t to the out set
                if (t.type == ILOC.OPERAND_TYPES.register) {
                    out_set.add(t);
                }
            }
        }
    };
    return out_set;    
};

var defkill = function (node, v_def) {
    var operations = node.operations.filter(function(operation) {
        // Filter to those which are assignments
        return (operation instanceof ILOC.NormalOperation ||
                operation instanceof ILOC.MemoryLoadOperation);
    });
    
    out_set = new ValueSet([]);
    for(o of operations) {
        // If this operation has targets
        if(o.targets != undefined) {
            for(t of o.targets) {
                if (t.type == ILOC.OPERAND_TYPES.register) {
                    for (v of v_def.values()) {
                        // If v is in this operation's targets:
                        if(v.type == t.type && v.name == t.name && v.index != t.index) {
                            // It redefines v
                            // Add v to the kill set
                            out_set.add(v);
                        }
                    }
                    // Also add t
                    out_set.add(t);
                }
            }
        }
    }
    
    return out_set;
};
    
var iloc_reaching_definitions = new DFAFramework({
    meet: function(node, cfg) {
        var read_nodes = [];
        var modified_nodes = [];
        
        var meet_set = new ValueSet([]);
        
        var preds  = cfg.nodes.filter(function(p) {
            if(cfg.adjacency[p.index][node.index] == 1) {
                return true;
            }
        });
        
        for(p of preds) {
            for(def of p.sets.transfer.values()) {
                meet_set.add(def);
            }

            read_nodes.push({
                node: p,
                sets: ['transfer'],
            })
        };

        node.sets.meet = meet_set;        

        modified_nodes.push({
            node: node,
            sets: ['meet'],
        })
        
        return {modified_nodes: modified_nodes, read_nodes: read_nodes};
    },
    meet_op: function(set1, set2) {
        return set1.union(set2);
    },
    transfer: function(node, cfg) {
        var read_nodes = [];
        var modified_nodes = [];
        
        var transfer_set = new ValueSet(node.sets.defgen.values()); // transfer_set = gen[B]

        var meet_set = new ValueSet(node.sets.meet.values()); // meet_set = in[B]

        for(v of node.sets.defkill.values()) {
            meet_set.delete(v);
        } // meet_set = in[B] - kill[B]
        
        for(v of meet_set.values()) {
            transfer_set.add(v); // transfer_set = gen[B] U (in[B] - kill[B])
        }

        node.sets.transfer = transfer_set;

        read_nodes.push({
            node: node,
            sets: ['meet', 'defgen', 'defkill'],
        })

        modified_nodes.push({
            node: node,
            sets: ['transfer'],
        })
        
        return {read_nodes: read_nodes, modified_nodes: modified_nodes };
    },
    meet_latex: "\\[\\text{In}(n) = \\bigcup_{p \\in preds} \\text{Out}(p)\\]",
    transfer_latex: "\\[\\text{Out}(n) = \\text{DefGen}(n) \\cup \\big{(}\\text{In}(n) \\setminus \\text{DefKill}(n)\\big{)}\\]",
    value_domain: DFA.DEFINITIONS,
    local_sets: {
        defgen: defgen,
        defkill: defkill,
    },
    direction: DFA.FORWARD,
    top: new ValueSet([]),
    name: "Reaching Definitions",
    id: "REACHING_DEFINITIONS",
});
