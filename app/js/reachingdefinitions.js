var defgen = function (node,v_def) {
    switch(node.constructor.name) {
    case "Assignment":
        return new ValueSet([node.definition]);
        break;
    case "Branch":
        return new ValueSet([]);
        break;
    default:
        throw new ReferenceError("Expected a subclass of Node, received an " + (node.constructor.name));
        break;
    }
};

var defkill = function (node, v_def) {
    switch(node.constructor.name) {
    case "Assignment":
        out_set = new ValueSet([]);
        for (v of v_def.values()) {
            if(v.name == node.definition.name && v.index != node.definition.index) {
                out_set.add(v)
            }
        };
        return out_set;
        break;
    case "Branch":
        return new ValueSet([]);
        break;
    default:
        throw new ReferenceError("Expected a subclass of Node, received an " + (node.constructor.name));
        break;
    }
};
    
var v_def = function(graph) {
    return new ValueSet(graph.nodes.filter(function(node) {
        if(node.constructor.name == "Assignment") {
            return true;
        }
    }).map(function(node) {
        if(node.constructor.name == "Assignment") {
            return node.definition;
        }
    }));
}

var reaching_definitions = new DFAFramework({
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
    transfer: function(node, in_set, value_set) {
        var set1 = defgen(node, value_set); // set1 = gen[B]

        var set2 = new ValueSet(in_set.values()); // set2 = in[B]
        
        for(v of defkill(node, value_set).values()) {
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
    name: "Reaching Definitions",
});
