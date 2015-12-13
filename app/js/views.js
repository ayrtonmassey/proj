function RoundRobinIteratorView(kwargs) {

    this.framework = kwargs.framework;
    this.order = kwargs.order;
    this.code_text = kwargs.default_code;

    this.edit_code = function() {
        var code_html = '\
          <textarea id="code-editor">{0}</textarea>\
          '.format(this.code_text);
        this.code.html(code_html);
        var code_controls_html = '<div>\
            <button id="code-btn-sim" class="btn btn-primary btn-sm">Simulate</button>\
            <button id="code-btn-cancel-edit" class="btn btn-danger btn-sm">Cancel</button>\
          </div>\
          '
        this.code_controls.html(code_controls_html);
        var _this = this
        $('#code-btn-cancel-edit').on('click', function() {
            _this.display_code();
        });
        $('#code-btn-sim').on('click', function() {
            _this.sim_code($('#code-editor').val());
        });
    }

    this.reset_iterator = function(graph) {
        console.log("Resetting iterator...");
        this.iterator = new RoundRobinIterator({
            framework: this.framework,
            order: this.order,
            graph: graph,
        });
        this.iterator.reset();
        console.log("... iterator reset!");
    }

    this.display_code = function(code) {
        var code_html = '\
          <table class="table borderless iloc">\
            <tbody>{0}</tbody>\
          </table>\
          '.format(
              this.iterator.graph.nodes.map(function(node){
                  return "<tr id=\"instruction-{0}\" class=\"instruction\">{1}</tr>".format(
                      node.index,
                      node.toHTML()
                  );
              }).join("")
          )
        this.code.html(code_html);
        var code_controls_html = '\
          <div>\
            <button id="code-btn-edit" class="btn btn-primary btn-sm">Edit</button>\
          </div>\
          '
        this.code_controls.html(code_controls_html);
        var _this = this
        $('#code-btn-edit').on('click', function() {
            _this.edit_code();
        });
    }

    this.sim_code = function(code) {
        this.code_text = code;
        this.reset_iterator(ILOC.build_CFG(ILOC.parser.parse(code)));
        this.reset_controls();
        this.reset_table();
        this.reset_local_information();
        this.reset_cfg_view();
        this.display_code();
        this.reset_highlight();
    }
    
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
        $("#local-header").prop('colspan', Object.keys(this.framework.local_sets).length)
        for(local_set in this.framework.local_sets) {
            $("#round-header").before("<td rowspan=\"2\" class=\"text-center\" style=\"vertical-align: middle\">{0}</td>".format(local_set))
            for(node of this.iterator.graph.nodes) {
                $("#result-row-ins-{0}".format(node.index)).append(
                    "<td class=\"{0} result\">{1}</td>".format(local_set, node[local_set].toHTML())
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

    this.reset_cfg_view = function() {
        console.log(this.iterator);
        this.cfg_view = new CFGView({canvas: '#cfg', cfg: this.iterator.graph});
        this.cfg_view.init();
    }
    
    /*
     *  Reset the analysis title.
     */
    this.reset_title = function() {
        this.title.text(this.framework.name);
    }

    /*
     *  Reset the equations panel.
     */
    this.reset_equations = function() {
        $("#meet").html(this.framework.meet_latex);
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,"meet"]);
        $("#transfer").html(this.framework.transfer_latex);
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
        $("#round-{0}-in-{1}".format(round, node.index))
            .html(node.in_set.toHTML());
    }
    
    this.fill_out_result = function(round,node) {
        $("#round-{0}-out-{1}".format(round, node.index))
            .html(node.out_set.toHTML());
    }
    
    this.visited_highlight = function(round, node, set) {
        $("#round-{0}-{1}-{2}".format(round, set, node.index))
            .addClass("visited-highlight")
            .removeClass("unvisited-highlight");;
    }

    this.meet_highlight = function(dark_node,light_nodes,local_info) {
        this.reset_highlight();

        // Add the highlight to the light nodes
        for(node of light_nodes) {
            $("#round-{0}-{1}-{2}".format(
                this.iterator.round,
                (this.framework.direction == DFA.FORWARD ? "out" : "in"),
                node.index
            )
             ).addClass("meet-light-highlight");
            // And related code instructions
            $("#instruction-{0}".format(node.index)).addClass("meet-light-highlight");

            // Highlight local sets
            for(set of local_info) {
                $("#result-row-ins-{0} .result.{1}".format(node.index, set)).addClass("meet-light-highlight");
            }

            // Higlight CFG nodes
            $("#graph-node-{0}".format(node.index)).addClass("meet-light-highlight");
        }

        // Add the highlight to the dark node
        $("#round-{0}-{1}-{2}".format(
            this.iterator.round,
            (this.framework.direction == DFA.FORWARD ? "in" : "out"),
            dark_node.index
        )
         ).addClass("meet-dark-highlight");

        // And the related instruction
        $("#instruction-{0}".format(dark_node.index)).addClass("meet-dark-highlight");

        // Higlight CFG nodes
        $("#graph-node-{0}".format(dark_node.index)).addClass("meet-dark-highlight");

        // Highlight the meet function
        this.meet_function.addClass("meet-light-highlight");
    }

    this.transfer_highlight = function(dark_node,light_nodes,local_info) {
        this.reset_highlight();

        // Add the highlight to all light nodes
        for(node of light_nodes) {
            $("#round-{0}-{1}-{2}".format(
                this.iterator.round,
                (this.framework.direction == DFA.FORWARD ? "in" : "out"),
                node.index
            )
             ).addClass("transfer-light-highlight");
            
            // And the related instructions
            $("#instruction-{0}".format(node.index)).addClass("transfer-light-highlight");

            // Highlight local sets
            for(set of local_info) {
                $("#result-row-ins-{0} .result.{1}".format(node.index, set)).addClass("transfer-light-highlight");
            }

            // Higlight CFG nodes
            $("#graph-node-{0}".format(node.index)).addClass("transfer-light-highlight");
        }

        // Add the highlight to the dark node        
        $("#round-{0}-{1}-{2}".format(
            this.iterator.round,
            (this.framework.direction == DFA.FORWARD ? "out" : "in"),
            dark_node.index
        )
         ).addClass("transfer-dark-highlight");

        // And the related instruction
        $("#instruction-{0}".format(this.iterator.graph.nodes.indexOf(dark_node))).addClass("transfer-dark-highlight");
        
        // Higlight CFG nodes
        $("#graph-node-{0}".format(dark_node.index)).addClass("transfer-dark-highlight");

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

        this.cfg_view.update();
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
        this.reset_title();
        this.reset_equations();
        this.sim_code(this.code_text);
    }

    this.init = function() {
        this.canvas = $('#canvas');
        
        this.canvas.html("\n\
          <div id=\"left-column\" class=\"col-xs-3 fixed\"> \n\
            <div id=\"code-container\"> \n\
            </div> \n\
            <div id=\"code-controls\"> \n\
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
            <div id=\"cfg\"> \n\
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
        this.code = $('#code-container');
        this.code_controls = $('#code-controls');
        this.controls = $('#controls');
        this.meet_function = $('#meet');
        this.transfer_function = $('#transfer');

        this.reset()
    }    
}

function CFGView(kwargs) {
    this.cfg = kwargs.cfg;
    this.canvas = $(kwargs.canvas);
    this.init = function() {
        this.canvas.html('\
          <svg id="svg-canvas"> \n\
          </svg>\
          ')

        this.g = new dagreD3.graphlib.Graph({compound:true})
            .setGraph({})
            .setDefaultEdgeLabel(function() { return {}; });

        var _this = this
        
        // Add all the nodes to the CFG.
        for(node of this.cfg.nodes) {
            _this.g.setNode('{0}'.format(node.index),
                      {
                          labelType: "html",
                          label: "<div><table class='iloc'>\
                                    <tbody> \
                                      <tr>{0}</tr> \
                                    </tbody> \
                                  </table></div>".format(node.toHTML()),
                          rx: 5,
                          ry: 5,
                      });
            _this.g.node('{0}'.format(node.index)).id = 'graph-node-{0}'.format(node.index)
        }

        // Add the edges from the adjacency matrix.
        for(i = 0; i < this.cfg.nodes.length; i++) {
            for(j = 0; j < this.cfg.nodes.length; j++) {
                if(this.cfg.adjacency[i][j] == 1) {
                    _this.g.setEdge('{0}'.format(i), '{0}'.format(j));
                }
            }
        }


        // Create the renderer
        this.render = new dagreD3.render();

        // Set up an SVG group so that we can translate the final graph.
        this.svg = d3.select("svg");
        this.svgGroup = this.svg.append("g");
        
        var zoom = d3.behavior.zoom().on("zoom", function() {
            // Center the graph
            var xCenterOffset = (_this.canvas.width() - _this.g.graph().width) / 2;
            _this.svgGroup.attr("transform", "translate(" + (xCenterOffset + d3.event.translate[0]) + ", " + d3.event.translate[1] + ")" +
                                "scale(" + d3.event.scale + ")");
        });

        this.svg.call(zoom);

        // Render the graph into svg g
        this.render(this.svgGroup, this.g);
        
        var xCenterOffset = (this.canvas.width() - this.g.graph().width) / 2;
        this.svgGroup.attr("transform", "translate(" + xCenterOffset + ", 20)");
    }
    
    this.update = function() {
        // Update edges.
        for(i = 0; i < this.cfg.nodes.length; i++) {
            for(j = 0; j < this.cfg.nodes.length; j++) {
                if(this.cfg.adjacency[i][j] == 1) {
                    this.g.setEdge('{0}'.format(i), '{0}'.format(j));
                } else if(this.cfg.adjacency[i][j] == 0) {
                    this.g.removeEdge('{0}'.format(i), '{0}'.format(j));
                }
            }
        }

        // Update nodes.
        for(i = 0; i < this.cfg.nodes.length; i++) {
            for(node of this.cfg.nodes) {
                this.g.node('{0}'.format(node.index)).label = "\
                  <div><table class='iloc'>\
                    <tbody> \
                      <tr>{0}</tr> \
                    </tbody> \
                  </table></div>".format(node.toHTML());
            }
        }

        this.tryDraw();
    }

    this.tryDraw = function() {
        this.g.graph().transition = function(selection) {
            return selection.transition().duration(500);
        };
        
        // Render the graph into svg g
        this.render(this.svgGroup, this.g);
    }
    
}
