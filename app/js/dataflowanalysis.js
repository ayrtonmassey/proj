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

    /* Find the value set for definitions */
    graph.nodes.map(function(node) {
        if(node.constructor.name == "Assignment") {
            node.definition.index = node.index;
        }
    });
    
    this.v_def = new ValueSet(this.graph.nodes.filter(function(node) {
        if(node.constructor.name == "Assignment") {
            return true;
        }
    }).map(function(node) {
        if(node.constructor.name == "Assignment") {
            return node.definition;
        }
    }));
    
    this.v_use = new ValueSet([]);
    for(n of graph.nodes) {
        for(u of n.uses.values()) {
            this.v_use.add(u);
        }
    }    
    
    switch(kwargs.transfer_value_set) {
        case "definitions":
            this.transfer_value_set = this.v_def;
            break;
        case "uses":
            this.transfer_value_set = this.v_use;
            break;
        default:
            throw new ReferenceError("Expected 'definitions', 'uses'; got " + top);
            break;
    }

    this.top = (function(top) {
        switch(top) {
            case 'empty':
                return new ValueSet([]);
                break;
            case 'all_def':
                return this.v_def;
                break;
            case 'all_use':
                return this.v_use;
                break;
            default:
                throw new ReferenceError("Expected 'all', 'all_def', 'all_use'; got " + top);
                break;
        }
    })(kwargs.top);
    
}


function RoundRobinIterator (kwargs) {

    this.framework = kwargs.framework;
    
    this.canvas = $('#dataFlowCanvas');

    this.canvas.html("<table id=\"dataFlowTable\" class=\"table\"><thead></thead><tbody></tbody></table>");

    this.table = $('#dataFlowTable');
    
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
            $("#code").append("I"+i+": "+this.framework.graph.nodes[i].instruction+"\n");
        }
    }

    /*
     *  Reset the code panel.
     */
    this.reset_equations = function() {
        $("#meet").html(this.framework.meet_latex);
        $("#transfer").html(this.framework.transfer_latex);
    }

    /*
     *  reset the UI.
     */
    this.reset = function() {
        this.reset_equations();
        this.reset_title();
        this.reset_table();
        this.reset_code();
    }
    
    this.print_result_row = function(label) {
        // Update the table of results
        var row_string = "<tr>";
        row_string = row_string.concat("<td rowspan=\"2\">" + label + "</td>")
            row_string = row_string.concat("<td>In</td>");
        for(var i = 0; i < graph.nodes.length; i++) {
            row_string = row_string.concat("<td>" + this.framework.graph.nodes[i].in_set + "</td>");
        }
        row_string = row_string.concat("</tr>");
        row_string = row_string.concat("<tr>");
        row_string = row_string.concat("<td>Out</td>");
        for(var i = 0; i < graph.nodes.length; i++) {
            row_string = row_string.concat("<td>" + this.framework.graph.nodes[i].out_set + "</td>");
        }
        row_string = row_string.concat("</tr>");
        
        this.table_body.append(row_string);
    }
    
    
    this.round_robin = function(order) {
        for(var i = 0; i < order.length; i++) {
            var node = this.framework.graph.nodes[order[i]];
            if(this.framework.direction==DFA.BACKWARD) {
                node.out_set = this.framework.top;
                node.in_set  = this.framework.transfer(node, node.out_set, this.framework.transfer_value_set);
            } else {
                node.in_set  = this.framework.top;
                node.out_set = this.framework.transfer(node, node.in_set, this.framework.transfer_value_set);
            }
        }
        this.print_result_row("Initial");
        
        var r = 1;
        do {
            var changed = false;
            for(var i = 0; i < order.length; i++) {
                if(this.framework.direction==DFA.BACKWARD) {
                    var node = this.framework.graph.nodes[order[i]];

                    var old_out  = new ValueSet(node.out_set.values());
                    node.out_set = this.framework.meet(node,this.framework.graph);
                    changed = changed || !compare_value_sets(node.out_set,old_out);
                    
                    var old_in = new ValueSet(node.in_set.values());
                    node.in_set = this.framework.transfer(node, node.out_set, this.framework.transfer_value_set);
                    changed = changed || !compare_value_sets(node.in_set,old_in);
                } else {
                    var node = this.framework.graph.nodes[order[i]];
                    
                    var old_in = new ValueSet(node.in_set.values());
                    node.in_set  = this.framework.meet(node,this.framework.graph);
                    changed = changed || !compare_value_sets(node.in_set,old_in);
                    
                    var old_out = new ValueSet(node.out_set.values());
                    node.out_set = this.framework.transfer(node, node.in_set, this.framework.transfer_value_set);
                    changed = changed || !compare_value_sets(node.out_set,old_out);
                }
            }

            this.print_result_row(""+r);
            
            r++;
            
        } while(changed);
    }

    this.run = function() {
        this.reset();
        this.round_robin(this.framework.order);
    }

}
