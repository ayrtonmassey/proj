var vardef = function (node, v_expr) {
    // Return all the source operands of this nodes' operations
    return new ValueSet(
        [].concat.apply([], node.operations.filter(function(operation) {
            // filter to just assignments
            return (operation instanceof ILOC.NormalOperation ||
                    operation instanceof ILOC.MemoryLoadOperation);
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

var exprkill = function(node, v_expr) {
    var defs = vardef(node, v_expr);
    return new ValueSet(
        [].concat.apply(
            [],
            v_expr.values().filter(function(expr) {
                var killed = false;
                for(v of defs.values()) {
                    /* Expression killed if lhs or rhs in defs */
                    killed = killed || (
                        (
                            expr.lhs.type == v.type &&
                                expr.lhs.name == v.name
                        ) || (
                            expr.rhs.type == v.type &&
                                expr.rhs.name == v.name
                        )
                    );
                }
                return killed;
            })
        )
    );
}

var deexpr = function (node, v_expr) {
    // Return all the source operands of this nodes' operations
    var exprgen = new ValueSet(
        [].concat.apply(
            [],
            node.operations.map(function(operation) {
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
            })
        )
    );
    for(v of exprkill(node, v_expr).values()) {
        exprgen.delete(v);
    }
    return exprgen;
};

var iloc_avail_expressions = new DFAFramework({
    meet: function(node, graph) {
        var read_nodes = [];
        var modified_nodes = [];
        
        var preds = graph.nodes.filter(function(p) {
            if(graph.adjacency[p.index][node.index] == 1) {
                return true;
            }
        });

        var pred_sets = [];
        
        for(p of preds) {
            pred_sets.push(p.sets.transfer);

            read_nodes.push({
                node: p,
                sets: ['transfer'],
            })
        };

        var meet_set;
        if (pred_sets.length > 0) {
            meet_set = pred_sets.reduce(function(v1, v2) {
                return v1.intersect(v2)
            })
        } else {
            meet_set = new ValueSet([]);
        }

        node.sets.meet = meet_set;

        modified_nodes.push({
            node: node,
            sets: ['meet'],
        })
        
        return {modified_nodes: modified_nodes, read_nodes: read_nodes};
    },
    meet_op: function(set1, set2) {
        return set1.intersect(set2);
    },
    transfer: function(node) {
        var read_nodes = [];
        var modified_nodes = [];

        var transfer_set = new ValueSet(node.sets.deexpr.values()); // transfer_set = use[B]

        var meet_set = new ValueSet(node.sets.meet.values()); // meet_set = out[B]
        
        for(v of node.sets.exprkill.values()) {
            meet_set.delete(v);
        } // meet_set = out[B] - def[B]
        
        for(v of meet_set.values()) {
            transfer_set.add(v); // transfer_set = use[B] U (out[B] - def[B])
        }

        node.sets.transfer = transfer_set;

        read_nodes.push({
            node: node,
            sets: ['meet', 'use', 'def'],
        })

        modified_nodes.push({
            node: node,
            sets: ['transfer'],
        })
        
        return {read_nodes: read_nodes, modified_nodes: modified_nodes };
    },
    meet_latex: "\\[\\text{In}(n) = \\bigcup_{p \\in preds} \\text{Out}(p)\\]",
    transfer_latex: "\\[\\text{Out}(n) = \\text{DEExpr}(n) \\cup \\big{(}\\text{In}(n) \\setminus \\text{ExprKill}(n)\\big{)}\\]",
    local_sets: {
        deexpr: deexpr,
        exprkill: exprkill,
    },
    value_domain: DFA.EXPRESSIONS,
    direction: DFA.FORWARD,
    top: DFA.ALL,
    boundary: DFA.NONE,
    name: "Available Expressions",
    id: "AVAILABLE_EXPRESSIONS",
});
