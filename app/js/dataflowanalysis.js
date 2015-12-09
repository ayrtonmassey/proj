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
    this.transfer_value_set = kwargs.transfer_value_set;
    this.local_sets = kwargs.local_sets;
    this.top = kwargs.top;
}


function RoundRobinIterator (kwargs) {

    this.graph = kwargs.graph;

    this.framework = kwargs.framework;
    this.transfer_value_set = this.framework.transfer_value_set(this.graph);
    
    this.order = (function(order) {
        switch(order) {
            case DFA.POSTORDER:
                return this.graph.postorder();
                break;
            case DFA.PREORDER:
                return this.graph.preorder();
                break;
            case DFA.REVERSE_POSTORDER:
                return this.graph.postorder().reverse();
                break;
            default:
                return this.graph.postorder().reverse();
        }
    })(kwargs.order);

    // Iteration variables
    this.round=1;
    this.order_index=0;
    this.changed=false;
    this.finished=false;
    this.set_to_calculate=DFA.MEET;

    /*
     *  Reset state variables.
     */
    this.reset_state = function() {
        // Reset data sets.
        for(node of this.graph.nodes) {
            node.in_set = new ValueSet([]);
            node.out_set = new ValueSet([]);
            for(local_set in this.framework.local_sets) {
                node[local_set] = this.framework.local_sets[local_set](node);
            }
        }
        
        // Reset variables.
        this.order_index = 0;
        this.round = 0;
        this.changed = false;
        this.finished = false;
        this.set_to_calculate=DFA.MEET;
    }    

    /*
     *  Reset the UI.
     */
    this.reset = function() {
        this.reset_state();
        this.init();
    }
    
    this.meet = function() {
        var node;
        var modified_nodes;
        var result_calculated;
        var result;
        if(this.framework.direction==DFA.BACKWARD) {
            node = this.graph.nodes[this.order[this.order_index]];
            
            var old_out  = new ValueSet(node.out_set.values());
            result = this.framework.meet(node,this.graph,this.meet_highlight);
            node.out_set = result.value_set;
            result_calculated = "out";
            this.changed = this.changed || !compare_value_sets(node.out_set,old_out);
        } else {
            node = this.graph.nodes[this.order[this.order_index]];
            
            var old_in = new ValueSet(node.in_set.values());
            result = this.framework.meet(node,this.graph);
            node.in_set = result.value_set;
            result_calculated = "in";
            this.changed = this.changed || !compare_value_sets(node.in_set,old_in);
        }
        this.set_to_calculate=DFA.TRANSFER;
        return $.extend(result, result, { node: node, result_calculated: result_calculated, type: "meet" });
    }

    this.transfer = function() {
        var node;
        var modified_nodes;
        var result_calculated;
        var result
        if(this.framework.direction==DFA.BACKWARD) {
            node = this.graph.nodes[this.order[this.order_index]];
            
            var old_in = new ValueSet(node.in_set.values());
            result = this.framework.transfer(node, node.out_set, this.transfer_value_set);
            node.in_set = result.value_set;
            modified_nodes = result.modified_nodes;
            this.changed = this.changed || !compare_value_sets(node.in_set,old_in);
            result_calculated = "in";
        } else {
            node = this.graph.nodes[this.order[this.order_index]];

            var old_out = new ValueSet(node.out_set.values());
            result = this.framework.transfer(node, node.in_set, this.transfer_value_set);
            node.out_set = result.value_set;
            modified_nodes = result.modified_nodes;
            result_calculated = "out";
            this.changed = this.changed || !compare_value_sets(node.out_set,old_out);
        }
        this.set_to_calculate=DFA.MEET;
        return $.extend(result, result, { node: node, result_calculated: result_calculated, type: "transfer" });
    }
    
    this.iterate = function() {
        var result = { finished: false, new_round: false };
        if(this.order_index >= this.order.length) {
            if (!this.changed) {
                this.finished=true;
                result.finished=true;
                return result;
            } else {
                this.new_round();
                result.new_round = true;
            }
        }
        if(this.set_to_calculate==DFA.MEET) {
            $.extend(result, result, this.meet());
        } else {
            $.extend(result, result, this.transfer());
            this.order_index++;
        }
        return result;
    }

    this.new_round = function() {
        this.round++;
        this.order_index=0;
        this.changed=false;
        this.set_to_calculate=DFA.MEET;
    }
        
    this.init = function() {
        while(this.order_index < this.order.length) {
            var node = this.graph.nodes[this.order[this.order_index]];
            if(this.framework.direction==DFA.BACKWARD) {
                node.out_set = new ValueSet(this.framework.top.values());
                node.in_set = new ValueSet(this.framework.top.values());
            } else {
                node.in_set = new ValueSet(this.framework.top.values());
                node.out_set = new ValueSet(this.framework.top.values());
            }
            this.order_index++;
        }

        this.changed=true;
    }

}
