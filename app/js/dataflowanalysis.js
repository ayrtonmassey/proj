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
    
    this.canvas = $('#dataFlowCanvas');

    this.canvas.html("<table id=\"dataFlowTable\" class=\"table table-bordered table-striped\" style=\"box-shadow: 0 -1px 0px #ddd\"><thead></thead><tbody></tbody></table>");

    this.table = $('#dataFlowTable');

    // Iteration variables
    this.round=0;
    this.order_index=0;
    this.changed=false;
    this.finished=false;
    this.set_to_calculate=DFA.MEET;

    this.reset_graph = function() {
        this.graph.sets = {};
    }
    
    /*
     *  Reset the play controls.
     */
    this.reset_controls = function() {
        $("#fast-backward").off("click").click({dfa:this}, function(event) {
            event.data.dfa.fast_backward();
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
        for(var i = 0; i < this.graph.nodes.length; i++) {
            this.graph.nodes[i].in_set = new ValueSet([]);
            this.graph.nodes[i].out_set = new ValueSet([]);
        }
        
        // Reset variables.
        this.order_index = 0;
        this.round = 0;
        this.changed = false;
        this.finished = false;
        this.set_to_calculate=DFA.MEET;
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
        this.table_head.append("<th style=\"border-right:1px solid #ddd;\"></th>");
        this.table_head.append("<th style=\"border-right:1px solid #ddd;\"></th>");
        this.table_head.append("<th colspan=\"{0}\">Instruction</th>".format(this.graph.nodes.length));
        this.table_head.append("</tr>");
        this.table_head.append("<tr>");
        this.table_head.append("<th style=\"border-right:1px solid #ddd;\">Round</th>");
        this.table_head.append("<th style=\"border-right:1px solid #ddd;\">Set</th>");
        for(var i = 0; i < graph.nodes.length; i++) {
            this.table_head.append("<th style=\"border-right:1px solid #ddd; border-top: 1px solid #ddd;\">" + "I" + i + "</th>")
        }
        this.table_head.append("</tr>");
    }

    this.reset_highlight = function() {
        $(".meet-light-highlight").each(function() {
            $(this).removeClass("meet-light-highlight")
        });
        $(".meet-dark-highlight").each(function() {
            $(this).removeClass("meet-dark-highlight")
        });
        $(".transfer-light-highlight").each(function() {
            $(this).removeClass("transfer-light-highlight")
        });        
        $(".transfer-dark-highlight").each(function() {
            $(this).removeClass("transfer-dark-highlight")
        });
    }

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
        for(var i = 0; i < this.graph.nodes.length; i++) {
            $("#code").append("<span id=\"instruction-{0}\" class=\"instruction\">I".format(i)+i+": "+this.graph.nodes[i].instruction+"\n");
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
        this.reset_highlight();
        this.init();
    }
    
    this.print_result_row_template = function(label) {
        // Update the table of results
        var row_string = "<tr id=\"round-{0}\">".format(this.round);
        row_string = row_string.concat("<td rowspan=\"2\" style=\"text-align: center; vertical-align: middle;\">" + label + "</td>")
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
        $("#round-{0}-in-{1}".format(round, i)).html(this.graph.nodes[i].in_set.toString());
    }
    
    this.fill_out_result = function(round,i) {
        $("#round-{0}-out-{1}".format(round, i)).html(this.graph.nodes[i].out_set.toString());
    }

    this.meet_highlight = function(dark_node,light_nodes) {
        $(".meet-light-highlight").each(function() {
            $(this).removeClass("meet-light-highlight")
        });
        $(".meet-dark-highlight").each(function() {
            $(this).removeClass("meet-dark--highlight")
        });
        for(node of light_nodes) {
            $("#round-{0}-{1}-{2}".format(this.round - 1,(this.framework.direction == DFA.FORWARD ? "out" : "in"),this.graph.nodes.indexOf(node))).addClass("meet-light-highlight");
            $("#instruction-{0}".format(this.graph.nodes.indexOf(node))).addClass("meet-light-highlight");
        }
        $("#round-{0}-{1}-{2}".format(this.round,(this.framework.direction == DFA.FORWARD ? "in" : "out"),this.graph.nodes.indexOf(dark_node))).addClass("meet-dark-highlight");
        $("#instruction-{0}".format(this.graph.nodes.indexOf(dark_node))).addClass("meet-dark-highlight");
        $("#meet").addClass("meet-light-highlight");
    }

    this.transfer_highlight = function(dark_node,light_nodes) {
        $(".transfer-light-highlight").each(function() {
            $(this).removeClass("transfer-light-highlight")
        });        
        $(".transfer-dark-highlight").each(function() {
            $(this).removeClass("transfer-dark-highlight")
        });
        for(node of light_nodes) {
            $("#round-{0}-{1}-{2}".format(this.round,(this.framework.direction == DFA.FORWARD ? "in" : "out"),this.graph.nodes.indexOf(node))).addClass("transfer-light-highlight");
            $("#instruction-{0}".format(this.graph.nodes.indexOf(node))).addClass("transfer-light-highlight");
        }
        $("#round-{0}-{1}-{2}".format(this.round,(this.framework.direction == DFA.FORWARD ? "out" : "in"),this.graph.nodes.indexOf(dark_node))).addClass("transfer-dark-highlight");
        $("#instruction-{0}".format(this.graph.nodes.indexOf(dark_node))).addClass("transfer-dark-highlight");
        $("#transfer").addClass("transfer-light-highlight");
    }

    this.meet = function() {
        if(this.framework.direction==DFA.BACKWARD) {
            var node = this.graph.nodes[this.order[this.order_index]];
            
            var old_out  = new ValueSet(node.out_set.values());
            result = this.framework.meet(node,this.graph,this.meet_highlight);
            node.out_set = result[0]
            modified_nodes = result[1]
            this.meet_highlight(node,modified_nodes);
            this.changed = this.changed || !compare_value_sets(node.out_set,old_out);
            this.fill_out_result(this.round,this.order[this.order_index]);
        } else {
            var node = this.graph.nodes[this.order[this.order_index]];
            
            var old_in = new ValueSet(node.in_set.values());
            result = this.framework.meet(node,this.graph);
            node.in_set = result[0]
            modified_nodes = result[1]
            this.meet_highlight(node, modified_nodes);
            this.changed = this.changed || !compare_value_sets(node.in_set,old_in);
            this.fill_in_result(this.round,this.order[this.order_index]);
        }
        this.set_to_calculate=DFA.TRANSFER;
    }

    this.transfer = function() {
        if(this.framework.direction==DFA.BACKWARD) {
            var node = this.graph.nodes[this.order[this.order_index]];
            
            var old_in = new ValueSet(node.in_set.values());
            result = this.framework.transfer(node, node.out_set, this.transfer_value_set);
            node.in_set = result[0];
            modified_nodes = result[1];
            this.transfer_highlight(node,modified_nodes);
            this.changed = this.changed || !compare_value_sets(node.in_set,old_in);
            this.fill_in_result(this.round,this.order[this.order_index]);
        } else {
            var node = this.graph.nodes[this.order[this.order_index]];

            var old_out = new ValueSet(node.out_set.values());
            result = this.framework.transfer(node, node.in_set, this.transfer_value_set);
            node.out_set = result[0];
            modified_nodes = result[1];
            this.transfer_highlight(node,modified_nodes);
            this.changed = this.changed || !compare_value_sets(node.out_set,old_out);
            this.fill_out_result(this.round,this.order[this.order_index]);
        }
        this.set_to_calculate=DFA.MEET;
    }
    
    this.iterate = function() {
        this.reset_highlight();
        if(this.set_to_calculate==DFA.MEET) {
            this.meet();
        } else {
            this.transfer();
            this.order_index++;
        }
    }

    this.new_round = function() {
        this.round++;
        this.order_index=0;
        this.changed=false;
        this.set_to_calculate=DFA.MEET;
        this.print_result_row_template(this.round);
    }
    
    this.step_forward = function() {
        if (this.finished) return;
        if(this.order_index >= this.order.length) {
            if (!this.changed) {
                this.finished=true;
                return;
            } else {
                this.new_round();
            }
        }
        this.iterate();
    }
    
    this.init = function() {
        this.print_result_row_template("Initial");
        while(this.order_index < this.order.length) {
            var node = this.graph.nodes[this.order[this.order_index]];
            if(this.framework.direction==DFA.BACKWARD) {
                node.out_set = new ValueSet(this.framework.top.values());
                this.fill_out_result(this.round,this.order[this.order_index]);
                node.in_set = new ValueSet(this.framework.top.values());
                this.transfer();
                this.fill_in_result(this.round,this.order[this.order_index]);
            } else {
                node.in_set = new ValueSet(this.framework.top.values());
                this.fill_in_result(this.round,this.order[this.order_index]);
                node.out_set = new ValueSet(this.framework.top.values());
                this.transfer();
                this.fill_out_result(this.round,this.order[this.order_index]);
            }
            this.order_index++;
        }

        this.changed=true;
        this.reset_highlight();
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

    this.fast_backward = function() {
        this.reset();
    }

    this.run = function() {
        this.reset();
    }

}
