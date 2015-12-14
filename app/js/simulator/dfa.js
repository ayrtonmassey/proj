var DFA = {
    // Directions
    FORWARD: 0,
    BACKWARD: 1,

    // Orderings
    POSTORDER: 0,
    PREORDER: 1,
    REVERSE_POSTORDER: 2,

    // Functions
    MEET: 0,
    TRANSFER: 1,
}

function DFAFramework (kwargs) {
    this.name = kwargs.name;
    this.meet_latex = kwargs.meet_latex;
    this.transfer_latex = kwargs.transfer_latex;
    this.meet = kwargs.meet;
    this.transfer = kwargs.transfer;
    this.direction = kwargs.direction;
    this.value_domain = kwargs.value_domain;
    this.local_sets = kwargs.local_sets;
    this.top = kwargs.top;
}
