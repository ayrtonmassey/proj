graph = new Graph();

graph.add_node(new Assignment({
    instruction: "a = 2",
    definition:  new Definition({name: "a"}),
    expression:  new Expression({expression: "2"}),
}));

graph.add_node(new Assignment({
    instruction: "b = x + 1",
    definition:  new Definition({name: "b"}),
    expression:  new Expression({expression: "x + 1"}),
}));

graph.add_node(new Assignment({
    instruction: "c = a * 3",
    definition:  new Definition({name: "c"}),
    expression:  new Expression({expression: "a * 3"}),
}));

graph.add_node(new Assignment({
    instruction: "a = 4",
    definition:  new Definition({name: "a"}),
    expression:  new Expression({expression: "4"}),
}));

graph.add_node(new Assignment({
    instruction: "d = a",
    definition:  new Definition({name: "d"}),
    expression:  new Expression({expression: "a"}),
}));

graph.add_node(new Branch({
    instruction: "return d",
    expression: new Expression({expression: "d"}),
}));

graph.add_edge(graph.nodes[0],graph.nodes[1]);
graph.add_edge(graph.nodes[1],graph.nodes[2]);
graph.add_edge(graph.nodes[2],graph.nodes[3]);
graph.add_edge(graph.nodes[3],graph.nodes[4]);
graph.add_edge(graph.nodes[4],graph.nodes[5]);

var defgen = function (node,v_def) {
    switch(node.constructor.name) {
    case "Assignment":
        return new Set([node.definition]);
        break;
    case "Branch":
        return new Set([]);
        break;
    default:
        throw new ReferenceError("Expected a subclass of Node, received an " + (node.constructor.name));
        break;
    }
};

var defkill = function (node, v_def) {
    switch(node.constructor.name) {
    case "Assignment":
        out_set = new Set([]);
        for (v of v_def.values()) {
            if(v.name == node.definition.name && v.index != node.definition.index) {
                out_set.add(v)
            }
        };
        return out_set;
        break;
    case "Branch":
        return new Set([]);
        break;
    default:
        throw new ReferenceError("Expected a subclass of Node, received an " + (node.constructor.name));
        break;
    }
};

var dfa = new DFAFramework({
    graph: graph,
    meet: function(node, graph) {
        var in_set = new Set([]);
        var preds  = graph.nodes.filter(function(p) {
            if(graph.adjacency[p.index][node.index] == 1) {
                return true;
            }
        })
        for(p of preds) {
            for(def of p.out_set.values()) {
                in_set.add(def);
            }
        };
        return in_set;
    },
    transfer: function(node, in_set, value_set) {
        var set1 = defgen(node, value_set); // set1 = gen[B]

        var set2 = new Set(in_set.values()); // set2 = in[B]
        
        for(v of defkill(node, value_set).values()) {
            set2.delete(v);
        } // set2 = in[B] - kill[B]
        
        for(v of set2.values()) {
            set1.add(v); // set1 = gen[B] U (in[B] - kill[B])
        }
        
        return set1;
    },
    meet_latex: "\\[\\text{In}(n) = \\bigcup_{p \\in preds} \\text{Out}(p)\\]",
    transfer_latex: "\\[\\text{Out}(n) = \\text{DefGen}(n) \\cup \\big{(}\\text{In}(n) \\setminus \\text{DefKill}(n)\\big{)}\\]",
    transfer_value_set: "definitions",
    order: "reverse postorder",
    top: "empty",
    name: "Reaching Definitions",
});

dfa.run();
