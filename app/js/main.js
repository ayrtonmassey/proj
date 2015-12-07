// Test the parser

iloc_code = "\
L0: nop \n\
    loadI  2         => ra        \n\
    load   rb        => rx        \n\
    addI   ra   , 1  => ra        \n\
    loadI  0         => r0        \n\
    cmp_GE rx   , r0 => rcomp     \n\
    cbr    rcomp     -> L1   , L2 \n\
L1: i2i    rx        => ra        \n\
    add    ra   , rb => rc        \n\
    jump   L3                     \n\
L2: addI   rb   , 1  => rc        \n\
L3: add    ra   , rc => rd        \n\
"

try{
    var parsed_ast = ILOC.parser.parse(iloc_code);
} catch (ex) {
    console.log(ex);
    console.log(ex.message);
    console.log(ex.location);
}

graph = ILOC.build_CFG(parsed_ast);

rr = new RoundRobinIterator({
    framework: iloc_reaching_definitions,
    // framework: iloc_liveness,
    graph:     graph,
    order:     DFA.REVERSE_POSTORDER,
});

rr.run();
