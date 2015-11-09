graph = new Graph();

graph.add_node(new Assignment({
    instruction: "a = 2",
    definition:  new Definition({name: "a"}),
    expression:  new Expression({expression: "2"}),
    uses:        new ValueSet([]),
}));

graph.add_node(new Assignment({
    instruction: "b = x + 1",
    definition:  new Definition({name: "b"}),
    expression:  new Expression({expression: "x + 1"}),
    uses:        new ValueSet([
        new Use({name: "x"}),
    ]),
}));

graph.add_node(new Assignment({
    instruction: "c = a * 3",
    definition:  new Definition({name: "c"}),
    expression:  new Expression({expression: "a * 3"}),
    uses:        new ValueSet([
        new Use({name: "a"}),
    ]),
}));

graph.add_node(new Assignment({
    instruction: "a = 4",
    definition:  new Definition({name: "a"}),
    expression:  new Expression({expression: "4"}),
    uses:        new ValueSet([]),
}));

graph.add_node(new Assignment({
    instruction: "d = a",
    definition:  new Definition({name: "d"}),
    expression:  new Expression({expression: "a"}),
    uses:        new ValueSet([
        new Use({name: "a"})
    ]),
}));

graph.add_node(new Branch({
    instruction: "return d",
    expression:  new Expression({expression: "d"}),
    uses:        new ValueSet([
        new Use({name: "d"})
    ]),
}));

graph.add_edge(graph.nodes[0],graph.nodes[1]);
graph.add_edge(graph.nodes[1],graph.nodes[2]);
graph.add_edge(graph.nodes[2],graph.nodes[3]);
graph.add_edge(graph.nodes[3],graph.nodes[4]);
graph.add_edge(graph.nodes[4],graph.nodes[5]);

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
            return node.uses;
            break;
        case "Branch":
            return node.uses;
            break;
        default:
            throw new ReferenceError("Expected a subclass of Node, received an " + (node.constructor.name));
            break;
    }
};

var liveness = new DFAFramework({
    graph: graph,
    meet: function(node, graph) {
        var out_set = new ValueSet([]);
        var succ  = this.graph.nodes.filter(function(s) {
            if(this.graph.adjacency[node.index][s.index] == 1) {
                return true;
            }
        })
        for(s of succ) {
            for(use of s.in_set.values()) {
                out_set.add(use);
            }
        };
        return out_set;
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
        
        return set1;
    },
    meet_latex: "\\[\\text{Out}(n) = \\bigcup_{s \\in succ} \\text{In}(s)\\]",
    transfer_latex: "\\[\\text{In}(n) = \\text{Use}(n) \\cup \\big{(}\\text{Out}(n) \\setminus \\text{Def}(n)\\big{)}\\]",
    transfer_value_set: "uses",
    order: DFA.POSTORDER,
    direction: DFA.BACKWARD,
    top: "empty",
    name: "Liveness Analysis",
});
