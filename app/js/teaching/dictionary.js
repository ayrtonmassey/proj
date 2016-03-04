var DICTIONARY = {
    dataflow_analysis: "A technique for gathering information at various points in a Control-Flow Graph",
    control_flow_graph: "A graph representing the possible execution paths of a computer program.",
    dataflow_equation: "An equation (or set of equations) which can be used to perform data-flow analysis.",
    // Reaching Definitions
    reaching_definition: "A definition of a variable 'reaches' a block if there exists at least one path from its definition to the block along which it is not overwritten.",
    variable_definition: "A variable is defined when a new value is stored in it.",
    definition_killed: "A definition is killed when the variable it belongs to is re-defined.",
    definition_generated: "A definition is generated when a variable is defined.",
    // Liveness Analysis
    live_variable: "A variable is 'live' if its current value will be used later in the program's execution.",
    variable_use: "A variable is used when its value is read.",
    live_in: "A variable is live-in to a block if its value will be used in that block or a subsequent block.",
    live_out: "A variable is live-out to a block if its value will be used in a subsequent block.",
    compiler: "A compiler translates code from one language into another. The most common form of compiler takes code from a high-level language, such as C or Java, and translates it into instructions which can be understood by a machine.",
    optimizing_compiler: "A compiler can make programs faster by re-arranging instructions or removing them entirely. This is known as compiler optimisation.",
    cfg: "Abbreviation of Control-Flow Graph.",
    branch: "A branch occurs when an instruction has two possible successors. For example, an if-else statement is a branching statement after which we might jump to either the 'if' or 'else' blocks of code.",
    iterative: "An iterative process is one which involves repetition.",
}
