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
            <th id="local-header">Local Information</th> \n\
            <th id="global-header" colspan="99999">Global Information</th> \n\
          </tr> \n\
          <tr id="round-row"> \n\
            <th rowspan="2" style="border-right:1px solid #ddd; vertical-align: middle">Instruction</th> \n\
            <th id="round-header">Round</th> \n\
          </tr> \n\
          <tr id="set-row"> \n\
            <th>Set</th> \n\
            <span id="set-headers"> \n\
            </span> \n\
          </tr> \n\
          {1} \n\
          '.format(
              this.iterator.graph.nodes.length,
              this.iterator.graph.nodes.map(function(node) {
                  return '<tr id="result-row-ins-{0}"><th>{0}</th></tr>'.format(node.index);
              }).join('')
          );
        
        this.table_head.html(table_head_html);
    }

    this.reset_local_information = function() {
        $("#local-header").prop('colspan', Object.keys(this.iterator.framework.local_sets).length)
        for(local_set in this.iterator.framework.local_sets) {
            $("#round-header").before("<td rowspan=\"2\" class=\"text-center\" style=\"vertical-align: middle\">{0}</td>".format(local_set))
            for(node of this.iterator.graph.nodes) {
                $("#result-row-ins-{0}".format(node.index)).append(
                    "<td class=\"{0} result\">{1}</td>".format(local_set, node[local_set])
                );
            }
        }
        
        for(node of this.iterator.graph.nodes) {
            $("#result-row-ins-{0}".format(node.index)).append(
                "<td class=\"cell-grey\"></td>"
            );
        }
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

    this.print_iteration_column = function(round) {
        $("#round-row").append("<td colspan=\"2\" class=\"text-center\">{0}</td>".format(round));
        $("#set-row").append("<td class=\"text-center\">In</td><td class=\"text-center\">Out</td>".format(round));
        for(node of this.iterator.graph.nodes) {
            $("#result-row-ins-{0}".format(node.index)).append(
                '<td id="round-{0}-in-{1}" class="in result unvisited-highlight">{2}</td>'.format(
                    round,
                    node.index,
                    node.in_set.toHTML()
                ));
            $("#result-row-ins-{0}".format(node.index)).append(
                '<td id="round-{0}-out-{1}" class="out result unvisited-highlight">{2}</td>'.format(
                    round,
                    node.index,
                    node.out_set.toHTML()
                ));
        }
    }

    this.fill_in_result = function(round,node) {
        $("#round-{0}-in-{1}".format(round, node.index)).html(node.in_set.toHTML());
    }
    
    this.fill_out_result = function(round,node) {
        $("#round-{0}-out-{1}".format(round, node.index)).html(node.out_set.toHTML());
    }
    
    this.visited_highlight = function(round, node, set) {
        $("#round-{0}-{1}-{2}".format(round, set, node.index)).addClass("visited-highlight").removeClass("unvisited-highlight");;
    }

    this.meet_highlight = function(dark_node,light_nodes,local_info) {
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

            // Highlight local sets
            for(set of local_info) {
                $("#result-row-ins-{0} .result.{1}".format(node.index, set)).addClass("meet-light-highlight");
            }
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

    this.transfer_highlight = function(dark_node,light_nodes,local_info) {
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

            // Highlight local sets
            for(set of local_info) {
                $("#result-row-ins-{0} .result.{1}".format(node.index, set)).addClass("transfer-light-highlight");
            }
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
            this.print_iteration_column(this.iterator.round);
        }
        
        if(result.type == "meet") {
            this.meet_highlight(result.node, result.modified_nodes, result.local_sets);
        } else {
            this.transfer_highlight(result.node, result.modified_nodes, result.local_sets);
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
        this.reset_equations();
        this.reset_table();
        this.reset_local_information();
    }

    this.init = function() {
        this.canvas = $('#canvas');
        
        this.canvas.html("\n\
          <div id=\"left-column\" class=\"col-xs-3 fixed\"> \n\
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
          <div id=\"right-column\" class=\"col-xs-offset-3 col-xs-9\"> \n\
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
            <div id=\"result-container\"> \n\
              <table id=\"table\" class=\"table table-bordered\"> \n\
              </table> \n\
            </div> \n\
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
