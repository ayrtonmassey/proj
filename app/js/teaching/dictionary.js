var DICTIONARY = {
    dataflow_analysis: "A technique for gathering information at various points in a Control-Flow Graph",
    control_flow_graph: "A graph representing the possible execution paths of a computer program.",
    dataflow_equation: "An equation (or set of equations) which can be used to perform data-flow analysis.",
    // Reaching Definitions
    reaching_definition: "A definition of a variable 'reaches' a block if there exists at least one path from its definition to the block along which it is not overwritten.",
    variable_definition: "A variable is defined when a new value is stored in it.",
    variable: "In computing, a variable is a data item which may take on more than one value during the execution of a program.",
    expression: "An expression is a collection of variables and operators which together express a value, such as x+y or reversed(list).",
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
    round_robin: "An iterative process in which items are processed in a specific order, often in a circular manner.",
    local_information: "Information obtained in local scope, i.e. without considering any other sources.",
    available_expression: "An expression is 'available' if it has been computed along all paths leading to the current node.",
    postorder: "An ordering in which we visit a node's children before visiting that node.",
    reverse_postorder: "Post-order in reverse. Calculate post-order, then reverse the list. This is a parent-first approach.",
    predecessor: "A node's predecessors are the nodes which come before it, i.e. nodes which have edges from them to this node.",
    ordering: "An ordering defines the order in which we visit nodes in a graph or tree, such as post-order, in-order or pre-order.",
    successor: "A nodes's successors are the nodes which come after it, i.e. nodes which have edges to them from this node.",
    efficiency: "How quickly an algorithm or process can be executed. A faster algorithm is said to be more efficient.",
    direction: "The direction in which data flows; for example, if values are propagated from the entry of the CFG to the exit the analysis is in the forward direction.",
    forward_analysis: "An analysis in which the values at a node depend upon the values at that node's predecessors, such as reaching definitions.",
    backward_analysis: "An analysis in which the values at a node depend upon the values at that node's successors, such as liveness analysis.",
    meet_semilattice: "A structure which defines the ordering of values according to a meet function.",
    terminate: "An algorithm terminates if there is some condition under which it will stop executing. The opposite of becoming stuck in an infinite loop.",
    meet_function: "A function which defines how values are propagated between nodes in a control-flow graph.",
    transfer_function: "A function which defines how values are propagated through nodes in a control-flow graph.",
    domain: "The set of values to be considered.",
    boundary: "In a generic data-flow framework, the boundary defines the initial value of the starting point of the analysis.",
    intersection: "The intersection of two sets is the values they have in common, e.g. {a, b} ∩ {b, c} = {c}",
    union: "The union of two sets is all of the values they both contain, e.g. {a, b} ∪ {b, c} = {a, b, c}",
    top: "The top element in an ordering is the minimum (or smallest) element with respect to that ordering. All other elements have a greater value than this value.",
}
