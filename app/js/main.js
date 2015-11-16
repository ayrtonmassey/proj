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
    instruction: "if d > b",
    expression:  new Expression({expression: "d > b"}),
    uses:        new ValueSet([
        new Use({name: "d"}),
        new Use({name: "b"})
    ]),
}));

graph.add_node(new Branch({
    instruction: "  return d",
    expression:  new Expression({expression: "d"}),
    uses:        new ValueSet([
        new Use({name: "d"})
    ]),
}));

graph.add_node(new Branch({
    instruction: "return c",
    expression:  new Expression({expression: "c"}),
    uses:        new ValueSet([
        new Use({name: "c"})
    ]),
}));

graph.add_edge(graph.nodes[0],graph.nodes[1]);
graph.add_edge(graph.nodes[1],graph.nodes[2]);
graph.add_edge(graph.nodes[2],graph.nodes[3]);
graph.add_edge(graph.nodes[3],graph.nodes[4]);
graph.add_edge(graph.nodes[4],graph.nodes[5]);
graph.add_edge(graph.nodes[5],graph.nodes[6]);
graph.add_edge(graph.nodes[5],graph.nodes[7]);

/* Find the value set for definitions */
graph.nodes.map(function(node) {
    if(node.constructor.name == "Assignment") {
        node.definition.index = node.index;
    }
});


rr = new RoundRobinIterator({
    framework: reaching_definitions,
    graph:     graph,
    order:     DFA.REVERSE_POSTORDER,
});

rr.run();
