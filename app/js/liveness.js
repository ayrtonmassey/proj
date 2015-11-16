var defs = function (node,v_def) {
    switch(node.constructor.name) {
    case "Assignment":
        return new ValueSet([new Use({name: node.definition.name})]);
        break;
    case "Branch":
        return new ValueSet([]);
        break;
    default:
        throw new ReferenceError("Expected a subclass of Node, received an " + (node.constructor.name));
        break;
    }
};

var uses = function (node, v_def) {
    switch(node.constructor.name) {
        case "Assignment":
            return new ValueSet(node.uses.values());
            break;
        case "Branch":
            return new ValueSet(node.uses.values());
            break;
        default:
            throw new ReferenceError("Expected a subclass of Node, received an " + (node.constructor.name));
            break;
    }
};

var v_use = function(graph) {
    var set = new ValueSet([]);
    for(n of graph.nodes) {
        for(u of n.uses.values()) {
            set.add(u);
        }
    }
    return set;
}

var liveness = new DFAFramework({
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
        return [out_set, succ];
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
        
        return [set1, [node]];
    },
    meet_latex: "\\[\\text{Out}(n) = \\bigcup_{s \\in succ} \\text{In}(s)\\]",
    transfer_latex: "\\[\\text{In}(n) = \\text{Use}(n) \\cup \\big{(}\\text{Out}(n) \\setminus \\text{Def}(n)\\big{)}\\]",
    transfer_value_set: v_use,
    direction: DFA.BACKWARD,
    top: new ValueSet([]),
    name: "Liveness Analysis",
});
