function RoundRobinIteratorView(kwargs) {

    this.iterator = kwargs.iterator;
    
    /*
     *  Reset the play controls.
     */
    this.reset_controls = function() {
        $("#fast-forward").prop('disabled', false);
        $("#step-forward").prop('disabled', false);
        $("#play").prop('disabled', false);
        $("#fast-backward").off("click").click({view:this}, function(event) {
            event.data.view.fast_backward();
        });
        $("#step-forward").off("click").click({view:this}, function(event) {
            event.data.view.step_forward();
        });
        $("#play").off("click").click({view:this}, function(event) {
            event.data.view.play();
        });
        $("#fast-forward").off("click").click({view:this}, function(event) {
            event.data.view.fast_forward();
        });
    }

    /*
     *  Reset the table of results.
     */
    this.reset_table = function() {
        this.table.html('<thead id="table-head"></thead><tbody id="table-body"></tbody>');
        this.table_head = $("#table-head");
        this.table_body = $("#table-body");
        var table_head_html = '\n\
          <tr> \n\
            <th style="border-right:1px solid #ddd;"></th> \n\
            <th style=\"border-right:1px solid #ddd;"></th> \n\
            <th colspan=\"{0}\">Instruction</th> \n\
          </tr> \n\
          <tr> \n\
            <th style="border-right:1px solid #ddd;">Round</th> \n\
          <th style="border-right:1px solid #ddd;">Set</th> \n\
        '.format(this.iterator.graph.nodes.length);
        
        for(var i = 0; i < this.iterator.graph.nodes.length; i++) {
            table_head_html += '<th style="border-right:1px solid #ddd; border-top: 1px solid #ddd;">I{0}</th>'.format(i);
        }
        
        table_head_html+='</tr>';
        
        this.table_head.html(table_head_html);
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
        this.title.text(this.iterator.framework.name);
    }
    
    /*
     *  Reset the code panel.
     */
    this.reset_code = function() {
        var code_html = '<table class="table borderless"><tbody>{0}</tbody></table>'.format(
            this.iterator.graph.nodes.map(function(node){
                return "<tr id=\"instruction-{0}\" class=\"instruction\">{1}</tr>".format(node.index,node.toHTML());
            }).join("")
        )
        this.code.html(code_html);
    }

    /*
     *  Reset the equations panel.
     */
    this.reset_equations = function() {
        $("#meet").html(this.iterator.framework.meet_latex);
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,"meet"]);
        $("#transfer").html(this.iterator.framework.transfer_latex);
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,"transfer"]);
    }

    this.print_result_template = function(label) {
        // Print the round # & label for the "In" row
        var row_string = "\n\
          <tr id=\"round-{0}\"> \n\
            <td rowspan=\"2\" style=\"text-align: center; vertical-align: middle;\"> \n\
              {1} \n\
            </td> \n\
            <td>In</td> \n\
        ".format(this.iterator.round, label);

        // Print each entry for the "In" row
        for(var i = 0; i < graph.nodes.length; i++) {
            row_string += '<td id="round-{0}-in-{1}" class="in result">{2}</td>'.format(
                this.iterator.round,
                i,
                this.iterator.graph.nodes[i].in_set.toHTML()
            );
        }

        // Print the label for the "Out" row
        row_string += "</tr> \n\
        <tr> \n\
          <td>Out</td> \n\
        "

        // Print each entry for the "Out" row
        for(var i = 0; i < graph.nodes.length; i++) {
            row_string += '<td id="round-{0}-out-{1}" class="out result">{2}</td>'.format(
                this.iterator.round,
                i,
                this.iterator.graph.nodes[i].out_set.toHTML()
            );
        }

        row_string += '</tr>'

        this.table_body.append(row_string);
    }

    this.fill_in_result = function(round,node) {
        $("#round-{0}-in-{1}".format(round, node.index)).html(node.in_set.toHTML());
    }
    
    this.fill_out_result = function(round,node) {
        $("#round-{0}-out-{1}".format(round, node.index)).html(node.out_set.toHTML());
    }
    
    this.visited_highlight = function(round, node, set) {
        $("#round-{0}-{1}-{2}".format(round, set, node.index)).addClass("visited-highlight");
    }

    this.meet_highlight = function(dark_node,light_nodes) {
        this.reset_highlight();

        // Add the highlight to the light nodes
        for(node of light_nodes) {
            $("#round-{0}-{1}-{2}".format(
                this.iterator.round,
                (this.iterator.framework.direction == DFA.FORWARD ? "out" : "in"),
                node.index
            )
             ).addClass("meet-light-highlight");
            // And related code instructions
            $("#instruction-{0}".format(node.index)).addClass("meet-light-highlight");
        }

        // Add the highlight to the dark node
        $("#round-{0}-{1}-{2}".format(
            this.iterator.round,
            (this.iterator.framework.direction == DFA.FORWARD ? "in" : "out"),
            dark_node.index
        )
         ).addClass("meet-dark-highlight");

        // And the related instruction
        $("#instruction-{0}".format(dark_node.index)).addClass("meet-dark-highlight");

        // Highlight the meet function
        this.meet_function.addClass("meet-light-highlight");
    }

    this.transfer_highlight = function(dark_node,light_nodes) {
        this.reset_highlight();

        // Add the highlight to all light nodes
        for(node of light_nodes) {
            $("#round-{0}-{1}-{2}".format(
                this.iterator.round,
                (this.iterator.framework.direction == DFA.FORWARD ? "in" : "out"),
                node.index
            )
             ).addClass("transfer-light-highlight");
            
            // And the related instructions
            $("#instruction-{0}".format(node.index)).addClass("transfer-light-highlight");
        }

        // Add the highlight to the dark node        
        $("#round-{0}-{1}-{2}".format(
            this.iterator.round,
            (this.iterator.framework.direction == DFA.FORWARD ? "out" : "in"),
            dark_node.index
        )
         ).addClass("transfer-dark-highlight");

        // And the related instruction
        $("#instruction-{0}".format(this.iterator.graph.nodes.indexOf(dark_node))).addClass("transfer-dark-highlight");

        // Add the highlight to the transfer function
        this.transfer_function.addClass("transfer-light-highlight");
    }

    this.step_forward = function() {
        result = this.iterator.iterate();
        
        if (result.finished) {
            $("#fast-forward").prop('disabled', true);
            $("#step-forward").prop('disabled', true);
            $("#play").prop('disabled', true);
            // Do not proceed
            return;
        }

        this.reset_highlight();

        if (result.new_round) {
            this.print_result_template(this.iterator.round);
        }
        
        if(result.type == "meet") {
            this.meet_highlight(result.node,result.modified_nodes);
        } else {
            this.transfer_highlight(result.node,result.modified_nodes);
        }

        if(result.result_calculated == "in") {
            this.fill_in_result(this.iterator.round, result.node);
        } else {
            this.fill_out_result(this.iterator.round, result.node);
        }

        this.visited_highlight(this.iterator.round, result.node, result.result_calculated);
    }
    
    this.play = function() {
        if (this.iterator.finished) return;
        _this = this;
        setTimeout(function() { _this.step_forward(); _this.play() }, 500);
    }
    
    this.fast_forward = function() {
        if (this.iterator.finished) return;
        do {
            this.step_forward();
        } while(!this.iterator.finished);
    }
    
    this.fast_backward = function() {
        this.reset();
    }

    this.reset = function() {
        // Reset the iterator
        this.iterator.reset();
        
        this.reset_title();
        this.reset_highlight();
        this.reset_code();
        this.reset_controls();
        this.reset_table();
        this.reset_equations();
        
        // Print the initial row
        this.print_result_template("Initial");

        // Set the initial row to be visited
        for(node of this.iterator.graph.nodes) {
            this.fill_in_result(this.iterator.round, node);
            this.fill_out_result(this.iterator.round, node);
            this.visited_highlight(this.iterator.round, node, "in");
            this.visited_highlight(this.iterator.round, node, "out");
        }
    }

    this.init = function() {
        this.canvas = $('#canvas');
        
        this.canvas.html("\n\
          <div id=\"left-column\" class=\"col-xs-3\"> \n\
            <div id=\"code-container\"> \n\
              <table id=\"code\"> \n\
              </table> \n\
            </div> \n\
            <div id=\"controls\" class=\"btn-group\"> \n\
              <button id=\"fast-backward\" class=\"btn btn-default\"> \n\
                <span class=\"fa fa-fast-backward\"></span> \n\
              </button> \n\
              <button id=\"step-forward\" class=\"btn btn-default\"> \n\
                <span class=\"fa fa-step-forward\"></span> \n\
              </button> \n\
              <button id=\"play\" class=\"btn btn-default\"> \n\
                <span class=\"fa fa-play\"></span> \n\
              </button> \n\
              <button id=\"fast-forward\" class=\"btn btn-default\"> \n\
                <span class=\"fa fa-fast-forward\"></span> \n\
              </button> \n\
            </div> \n\
          </div> \n\
          <div id=\"right-column\" class=\"col-xs-9\"> \n\
            <h1 id=\"title\"></h1> \n\
            <table class=\"table borderless\"> \n\
              <thead> \n\
                <th>Meet Function</th> \n\
                <th>Transfer Function</th> \n\
              </thead> \n\
              <tbody> \n\
                <td id=\"meet\" class=\"col-xs-6\"></td> \n\
                <td id=\"transfer\" class=\"col-xs-6\"></td> \n\
              </tbody> \n\
            </table> \n\
            <table id=\"table\" class=\"table table-bordered\" style=\"box-shadow: 0 -1px 0px #ddd\"> \n\
            </table> \n\
          </div> \n\
        ");
        
        this.table = $('#table');
        this.title = $('#title');
        this.code = $('#code');
        this.controls = $('#controls');
        this.meet_function = $('#meet');
        this.transfer_function = $('#transfer');
        
        this.reset()
    }
    
}
