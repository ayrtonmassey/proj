function Node (kwargs) {
    
    this.instruction = kwargs.instruction;
    
};


function Assignment (kwargs) {
    Node.call(this, kwargs);
    this.definition = kwargs.definition
    this.expression = kwargs.expression
};

Assignment.prototype = Object.create(Node.prototype);
Assignment.prototype.constructor = Assignment


function Branch (kwargs) {
    Node.call(this, kwargs);
    this.definition = kwargs.definition
    this.expression = kwargs.expression
};

Branch.prototype = Object.create(Node.prototype);
Branch.prototype.constructor = Branch


function Definition(kwargs) {
    this.name = kwargs.name;
}

function Expression(kwargs) {
    this.expression = kwargs.expression;
}


function Graph (kwargs) {
    
    this.nodes     = [];
    this.adjacency = [];
    
    /*
     * Add a node to the Graph.
     */
    this.add_node = function(node) {
        var new_row = [0];
        for(var i = 0; i < this.nodes.length; i++) { // For each node A in adj-matrix
            this.adjacency[i].push(0);               // Add the (lack of) edge A->B
            new_row.push(0);                    // Add the (lack of) edge B->A
        }
        node.index = this.nodes.length     // Set the index of the node in the adj-matrix
        node.graph = this
        this.nodes.push(node);        // Add node B
        this.adjacency.push(new_row); // Add edges for B to adj-matrix
    }

    /*
     * Add an edge from n1 -> n2.
     */
    this.add_edge = function(n1,n2) {
        this.adjacency[n1.index][n2.index] = 1
    }

    this.traverse_postorder = function(index, order, visited) {
        visited.push(i);
        var edges = this.adjacency[index];
        for (var i = 0; i < edges.length; i++) {
            if(visited.indexOf(i) == -1 && edges[i] == 1) {
                var result = this.traverse_postorder(i,order,visited);
                order.concat(result[0]);
                visited.concat(result[1]);
            }
        }
        order.push(index);
        return [order,visited];
    }
    
    this.traverse_preorder = function(index, order, visited) {
        visited.push(i);
        order.push(index);
        var edges = this.adjacency[index];
        for (var i = 0; i < edges.length; i++) {
            if(visited.indexOf(i) == -1 && edges[i] == 1) {
                var result = this.traverse_preorder(i,order,visited);
                order.concat(result[0]);
                visited.concat(result[1]);
            }
        }
        return [order,visited];
    }

    this.postorder = function() {
        return this.traverse_postorder(0,[],[])[0];
    }

    this.preorder = function() {
        return this.traverse_preorder(0,[],[])[0];
    }
    
};

function DFAFramework (kwargs) {

    this.name     = kwargs.name;

    this.meet_latex = kwargs.meet_latex;

    this.transfer_latex = kwargs.transfer_latex;
    
    this.graph    = kwargs.graph;
    
    this.meet     = kwargs.meet;
    this.transfer = kwargs.transfer;
    
    this.table    = $('#dataFlowTable');

    this.order    = (function(order) {
        switch(order) {
            case 'postorder':
                return graph.postorder();
                break;
            case 'preorder':
                return graph.preorder();
                break;
            case 'reverse postorder':
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
    })
        
    this.v_def = new Set(this.graph.nodes.filter(function(node) {
        if(node.constructor.name == "Assignment") {
            return true;
        }
    }).map(function(node) {
        if(node.constructor.name == "Assignment") {
            return node.definition;
        }
    }));
    
    switch(kwargs.transfer_value_set) {
    case "definitions":
        this.transfer_value_set = this.v_def;
        break;
    default:
        throw new ReferenceError("Expected 'definitions'; got " + top);
        break;
    }

    this.top = (function(top) {
        switch(top) {
            case 'empty':
                return new Set();
                break;
            case 'all_def':
                return this.v_def;
                break;
            default:
                throw new ReferenceError("Expected 'all', 'all_def'; got " + top);
                break;
        }
    })(kwargs.top);

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
        $("#dataFlowName").text(this.name);
    }

    /*
     *  Reset the code panel.
     */
    this.reset_code = function() {
        $("#code").html("");
        for(var i = 0; i < graph.nodes.length; i++) {
            $("#code").append("I"+i+": "+graph.nodes[i].instruction+"\n");
        }
    }

    /*
     *  Reset the code panel.
     */
    this.reset_equations = function() {
        $("#meet").html(this.meet_latex);
        $("#transfer").html(this.transfer_latex);
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
    
    this.compare_value_sets = function(v1,v2) {
        if(v1.size == v2.size) {
            for(v of v1.values()) {
                if(!v2.has(v)) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    this.value_set_to_string = function(value_set) {
        var string = "{ ";
        for(v of value_set.values()) {
            switch(v.constructor.name) {
            case "Definition":
                string += (v.name + "<sub>" + v.index + "</sub>");
                break;
            default:
                throw new ReferenceError("Expected a value, got " + v.constructor.name);
                break;
            }
            string += ", ";
        }
        return string + " }";
    }

    this.print_result_row = function(label) {
        // Update the table of results
        var row_string = "<tr>";
        row_string = row_string.concat("<td rowspan=\"2\">" + label + "</td>")
        row_string = row_string.concat("<td>In</td>");
        for(var i = 0; i < graph.nodes.length; i++) {
            row_string = row_string.concat("<td>" + this.value_set_to_string(this.graph.nodes[i].in_set) + "</td>");
        }
        row_string = row_string.concat("</tr>");
        row_string = row_string.concat("<tr>");
        row_string = row_string.concat("<td>Out</td>");
        for(var i = 0; i < graph.nodes.length; i++) {
            row_string = row_string.concat("<td>" + this.value_set_to_string(this.graph.nodes[i].out_set) + "</td>");
        }
        row_string = row_string.concat("</tr>");
        
        this.table_body.append(row_string);
    }
    
    
    this.round_robin = function(order) {
        for(var i = 0; i < order.length; i++) {
            var node = this.graph.nodes[order[i]];
            node.in_set  = this.top;
            node.out_set = this.transfer(node, node.in_set, this.transfer_value_set);
        }
        this.print_result_row("Initial");
        
        var r = 1;
        do {
            var out_changed = false;
            for(var i = 0; i < order.length; i++) {
                var node = this.graph.nodes[order[i]];
                node.in_set  = this.meet(node,this.graph);
                var old_out = node.out_set
                node.out_set = this.transfer(node, node.in_set, this.transfer_value_set);
                out_changed = out_changed || !this.compare_value_sets(node.out_set,old_out)
            }

            this.print_result_row(""+r);
            
            r++;
            
        } while(out_changed);
    }

    this.run = function() {
        this.reset();
        this.round_robin(this.order);
    }
    
};
