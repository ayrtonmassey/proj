var DFA = {
    FORWARD: 0,
    BACKWARD: 1,

    // Orderings
    POSTORDER: 0,
    PREORDER: 1,
    REVERSE_POSTORDER: 2,
}

function DFAFramework (kwargs) {

    this.name     = kwargs.name;

    this.meet_latex     = kwargs.meet_latex;

    this.transfer_latex = kwargs.transfer_latex;
    
    this.graph    = kwargs.graph;
    
    this.meet     = kwargs.meet;
    
    this.transfer = kwargs.transfer;
    
    this.direction = kwargs.direction;

    this.order    = (function(order) {
        switch(order) {
            case DFA.POSTORDER:
                return graph.postorder();
                break;
            case DFA.PREORDER:
                return graph.preorder();
                break;
            case DFA.REVERSE_POSTORDER:
                return graph.postorder().reverse();
                break;
            default:
                return graph.postorder().reverse();
        }
    })(kwargs.order);
    
    this.transfer_value_set = kwargs.transfer_value_set;
    
    this.top = kwargs.top;
    
}


function RoundRobinIterator (kwargs) {

    this.framework = kwargs.framework;
    
    this.canvas = $('#dataFlowCanvas');

    this.canvas.html("<table id=\"dataFlowTable\" class=\"table\"><thead></thead><tbody></tbody></table>");

    this.table = $('#dataFlowTable');

    // Iteration variables
    this.round=0;
    this.order_index=0;
    this.order=this.framework.order;
    this.changed=false;
    this.finished=false;

    /*
     *  Reset the play controls.
     */
    this.reset_controls = function() {
        $("#fast-backward").off("click").click({dfa:this}, function(event) {
            event.data.dfa.reset();
        });
        $("#step-forward").off("click").click({dfa:this}, function(event) {
            event.data.dfa.step_forward();
        });
        $("#play").off("click").click({dfa:this}, function(event) {
            event.data.dfa.play();
        });
        $("#fast-forward").off("click").click({dfa:this}, function(event) {
            event.data.dfa.fast_forward();
        });
    }

    /*
     *  Reset state variables.
     */
    this.reset_state = function() {
        // Reset data sets.
        for(var i = 0; i < this.framework.graph.nodes.length; i++) {
            this.framework.graph.nodes[i].in_set = ValueSet([]);
            this.framework.graph.nodes[i].out_set = ValueSet([]);
        }

        // Reset variables.
        this.order_index = 0;
        this.round = 0;
        this.changed = false;
        this.finished = false;
    }
    
    /*
     *  Reset the table of results.
     */
    this.reset_table = function() {
        this.table.html("");
        this.table.append("<thead></thead><tbody></tbody>");
        this.table_head = this.table.find("thead");
        this.table_body = this.table.find("tbody");
        this.table_head.append("<tr>");
        this.table_head.append("<th colspan=\"2\">Round</th>");
        for(var i = 0; i < graph.nodes.length; i++) {
            this.table_head.append("<th>" + "I" + i + "</th>")
        }
        this.table_head.append("</tr>");
    },

    /*
     *  Reset the analysis title.
     */
    this.reset_title = function() {
        $("#dataFlowName").text(this.framework.name);
    }

    /*
     *  Reset the code panel.
     */
    this.reset_code = function() {
        $("#code").html("");
        for(var i = 0; i < this.framework.graph.nodes.length; i++) {
            $("#code").append("<span id=\"instruction-{0}\" class=\"instruction\">I".format(i)+i+": "+this.framework.graph.nodes[i].instruction+"\n");
        }
    }

    /*
     *  Reset the code panel.
     */
    this.reset_equations = function() {
        $("#meet").html(this.framework.meet_latex);
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,"meet"]);
        $("#transfer").html(this.framework.transfer_latex);
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,"transfer"]);
    }

    /*
     *  Reset the UI.
     */
    this.reset = function() {
        this.reset_state();
        this.reset_equations();
        this.reset_title();
        this.reset_table();
        this.reset_code();
        this.reset_controls();
        this.init();
    }
    
    this.print_result_row_template = function(label) {
        // Update the table of results
        var row_string = "<tr id=\"round-{0}\">".format(this.round);
        row_string = row_string.concat("<td rowspan=\"2\">" + label + "</td>")
            row_string = row_string.concat("<td>In</td>");
        for(var i = 0; i < graph.nodes.length; i++) {
            row_string = row_string.concat("<td id=\"round-{0}-in-{1}\" class=\"in result\"></td>".format(this.round, i));
        }
        row_string = row_string.concat("</tr>");
        row_string = row_string.concat("<tr>");
        row_string = row_string.concat("<td>Out</td>");
        for(var i = 0; i < graph.nodes.length; i++) {
            row_string = row_string.concat("<td id=\"round-{0}-out-{1}\" class=\"out result\"></td>".format(this.round, i));
        }
        row_string = row_string.concat("</tr>");
        
        this.table_body.append(row_string);
    }

    this.fill_in_result = function(round,i) {
        $(".in.highlight").each(function() {
            $(this).removeClass("highlight")
        });
        $(".instruction.highlight").each(function() {
            $(this).removeClass("highlight")
        });
        $("#round-{0}-in-{1}".format(round, i)).html(this.framework.graph.nodes[i].in_set.toString());
        $("#round-{0}-in-{1}".format(round, i)).addClass("highlight");
        $("#instruction-{0}".format(i)).addClass("highlight");
    }
    
    this.fill_out_result = function(round,i) {
        $(".out.highlight").each(function() {
            $(this).removeClass("highlight")
        });
        $(".instruction.highlight").each(function() {
            $(this).removeClass("highlight")
        });
        $("#round-{0}-out-{1}".format(round, i)).html(this.framework.graph.nodes[i].out_set.toString());
        $("#round-{0}-out-{1}".format(round, i)).addClass("highlight");
        $("#instruction-{0}".format(i)).addClass("highlight");
    }

    this.new_round = function() {
        this.round++;
        this.order_index=0;
        this.changed=false;
        this.print_result_row_template(this.round);
    }
    
    this.step_forward = function() {
        if (this.finished) return;
        if(this.order_index >= this.framework.order.length) {
            if (!this.changed) {
                this.finished=true;
                return;
            } else {
                this.new_round();
            }
        }
        this.iterate();
        this.order_index++;
    }

    this.iterate = function() {
        if(this.framework.direction==DFA.BACKWARD) {
            var node = this.framework.graph.nodes[this.framework.order[this.order_index]];
            
            var old_out  = new ValueSet(node.out_set.values());
            node.out_set = this.framework.meet(node,this.framework.graph);
            this.changed = this.changed || !compare_value_sets(node.out_set,old_out);
            this.fill_out_result(this.round,this.framework.order[this.order_index]);
            
            var old_in = new ValueSet(node.in_set.values());
            node.in_set = this.framework.transfer(node, node.out_set, this.framework.transfer_value_set);
            this.changed = this.changed || !compare_value_sets(node.in_set,old_in);
            this.fill_in_result(this.round,this.framework.order[this.order_index]);
        } else {
            var node = this.framework.graph.nodes[this.framework.order[this.order_index]];
            
            var old_in = new ValueSet(node.in_set.values());
            node.in_set  = this.framework.meet(node,this.framework.graph);
            this.changed = this.changed || !compare_value_sets(node.in_set,old_in);
            this.fill_in_result(this.round,this.framework.order[this.order_index]);
            
            var old_out = new ValueSet(node.out_set.values());
            node.out_set = this.framework.transfer(node, node.in_set, this.framework.transfer_value_set);
            this.changed = this.changed || !compare_value_sets(node.out_set,old_out);
            this.fill_out_result(this.round,this.framework.order[this.order_index]);
        }
    }
    
    this.init = function() {
        this.print_result_row_template("Initial");
        
        for(; this.order_index < this.framework.order.length; this.order_index++) {
            var node = this.framework.graph.nodes[this.framework.order[this.order_index]];
            if(this.framework.direction==DFA.BACKWARD) {
                node.out_set = this.framework.top;
                this.fill_out_result(this.round,this.framework.order[this.order_index]);
                node.in_set  = this.framework.transfer(node, node.out_set, this.framework.transfer_value_set);
                this.fill_in_result(this.round,this.framework.order[this.order_index]);
            } else {
                node.in_set  = this.framework.top;
                this.fill_in_result(this.round,this.framework.order[this.order_index]);
                node.out_set = this.framework.transfer(node, node.in_set, this.framework.transfer_value_set);
                this.fill_out_result(this.round,this.framework.order[this.order_index]);
            }
        }

        this.changed=true;
    }

    this.play = function() {
        if (this.finished) return;
        _this = this;
        setTimeout(function() { _this.step_forward(); _this.play() }, 500);
    }
    
    this.fast_forward = function() {
        if (this.finished) return;
        do {
            this.step_forward();
        } while(!this.finished);
    }

    this.run = function() {
        this.reset();
    }

}
