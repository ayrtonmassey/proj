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

var simulator = new RoundRobinSimulator({
    framework: iloc_liveness,
    ordering:  DFA.POSTORDER,
    // framework:  iloc_reaching_definitions,
    // ordering:   DFA.REVERSE_POSTORDER,
    code:       iloc_code,
    play_speed: 100,
});
    
var view = new RoundRobinSimulatorView({
    canvas: '#canvas',
    simulator: simulator,
});

view.init();
