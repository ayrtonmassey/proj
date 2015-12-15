var DFA = {
    // Directions
    FORWARD: 'forward',
    BACKWARD: 'backward',
    
    // Orderings
    POSTORDER: 'postorder',
    PREORDER: 'preorder',
    REVERSE_POSTORDER: 'reverse_postorder',

    // Functions
    MEET: 'meet',
    TRANSFER: 'transfer',
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
