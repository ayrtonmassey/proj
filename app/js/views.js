function View(kwargs) {
    this.canvas = $(kwargs.canvas);
    this.parent = kwargs.parent;
    
    var _this = this
    
    this.reset = function() {
        throw new ReferenceError("function {0}.reset() has not been implemented.".format(_this.constructor.name));
    }
    
    this.init = function() {
        throw new ReferenceError("function {0}.init() has not been implemented.".format(_this.constructor.name));
    }

    this.template = function() {
        throw new ReferenceError("field {0}.template has not been defined.".format(_this.constructor.name));
    }
}


function SimulatorView(kwargs) {
    View.call(this, kwargs);
    
    this.simulator = kwargs.simulator;
    
    var _this = this;
    this.simulator.on('reset', function() {
        _this.reset();
    });
}

SimulatorView.prototype = Object.create(View.prototype);
SimulatorView.prototype.constructor = SimulatorView


function TemplateView(kwargs) {    
    View.call(this, kwargs);

    this.template = Handlebars.templates['template.hbs']

    this.reset = function() {
        
    }

    this.init = function() {
        
    }
}

TemplateView.prototype = Object.create(View.prototype);
TemplateView.prototype.constructor = TemplateView


function RoundRobinSimulatorView(kwargs) {
    SimulatorView.call(this, kwargs);

    this.template = Handlebars.templates['roundrobin.hbs'];
    
    // this.update = function() {

    // }

    this.reset = function() {
        // Do nothing.
    }

    this.init = function() {
        this.simulator.init();
        
        this.canvas.html(this.template());
        
        this.results_view = new RoundRobinResultsView({
            canvas: '#results-canvas',
            simulator: this.simulator,
        });
        this.code_view = new CodeView({
            canvas: '#code-canvas',
            simulator: this.simulator,
        });
        this.framework_view = new FrameworkView({
            canvas: '#framework-canvas',
            simulator: this.simulator,
        });
        this.sim_controls_view = new SimControlsView({
            canvas: '#sim-controls-canvas',
            simulator: this.simulator,
        });
        this.cfg_view = new CFGView({
            canvas: '#cfg-canvas',
            simulator: this.simulator,
        });

        this.results_view.init();
        this.code_view.init();
        this.framework_view.init();
        this.sim_controls_view.init();
        this.cfg_view.init();

        this.simulator.reset();
    }
}

RoundRobinSimulatorView.prototype = Object.create(SimulatorView.prototype);
RoundRobinSimulatorView.prototype.constructor = RoundRobinSimulatorView


function CodeView(kwargs) {
    SimulatorView.call(this, kwargs);

    this.template = Handlebars.templates['code.hbs'];
    this.code_display_template  = Handlebars.templates['code_display.hbs'];
    this.code_editor_template   = Handlebars.templates['code_editor.hbs'];
    this.code_controls_template = Handlebars.templates['code_controls.hbs'];
    
    this.update = function () {
        this.reset_highlight();

        for(read of this.simulator.state.read_nodes) {
            $("#instruction-{0}".format(
                read.node.index
            ))
                .addClass(this.simulator.state.func)
                .addClass("read")
                .addClass("highlight");
        }
        
        for(modified of this.simulator.state.modified_nodes) {
            $("#instruction-{0}".format(
                modified.node.index
            ))
                .addClass(this.simulator.state.func)
                .addClass("modified")
                .addClass("highlight");
        }        
    }

    this.reset_highlight = function () {
        var _this = this;
        $(".instruction").each(function() {
            $(this)
                .removeClass(_this.simulator.state.func)
                .removeClass("meet")
                .removeClass("transfer")
                .removeClass("read")
                .removeClass("modified")
                .removeClass("highlight");
        });
    }    
    
    this.reset = function() {
        this.code_text = this.simulator.cfg.to_code();
        
        this.code_display.html(this.code_display_template({
            nodes: this.simulator.cfg.nodes
        }));

        this.code_editor_textarea.val(this.code_text);

        this.display_code();
        
        this.reset_highlight();
    }

    this.display_code = function() {
        this.code_display.show();
        this.code_sim_controls.show();
        
        this.code_editor.hide();
        this.code_edit_controls.hide();
    }

    this.edit_code = function() {
        this.code_editor.show();
        this.code_edit_controls.show();

        this.code_display.hide();
        this.code_sim_controls.hide();
    }

    this.sim_code = function(code) {
        this.simulator.sim_code(code);
    }
    
    this.init = function() {
        this.canvas.html(this.template());
        
        this.code_display = $('#code-display');
        
        this.code_editor = $('#code-editor');
        console.log(this.code_editor);
        this.code_editor.html(this.code_editor_template({code: this.code_text}));
        this.code_editor_textarea = $('#code-editor > textarea');
        this.code_editor.hide();
        
        this.code_controls = $('#code-controls');
        this.code_controls.html(this.code_controls_template());
        
        this.code_edit_controls = $('#code-controls-edit');
        this.code_edit_controls.hide();
        this.code_sim_controls  = $('#code-controls-sim'); 
        
        var _this = this;
        
        this.code_edit_controls.find('#btn-cancel-edit').on('click', function() {
            _this.reset();
            _this.display_code();
        });
        
        this.code_edit_controls.find('#btn-sim').on('click', function() {
            _this.sim_code(_this.code_editor_textarea.val());
        });
        
        this.code_sim_controls.find('#btn-edit').on('click', function() {
            _this.edit_code();
        });

        this.simulator.on('update', function() {
            _this.update();
        });
        
        this.reset();
    }
}

CodeView.prototype = Object.create(SimulatorView.prototype);
CodeView.prototype.constructor = CodeView


function FrameworkView(kwargs) {
    SimulatorView.call(this, kwargs);

    this.template = Handlebars.templates['framework.hbs'];
    
    this.update = function() {
        // Highlight Meet
        $('#framework-order').children().each(function() {
            $(this)
                .removeClass("transfer")
                .removeClass("meet")
                .removeClass("highlight");
        });

        if (this.simulator.state.meet) {
            this.meet_function.addClass("highlight");
            this.transfer_function.removeClass("highlight");

            for(modified of this.simulator.state.modified_nodes) {
                $('#framework-order>.order-index.node-{0}'.format(modified.node.index))
                    .addClass("meet")
                    .addClass("highlight");
            }
        } else if (this.simulator.state.transfer) {
            this.transfer_function.addClass("highlight");
            this.meet_function.removeClass("highlight");
            
            for(modified of this.simulator.state.modified_nodes) {
                $('#framework-order>.order-index.node-{0}'.format(modified.node.index))
                    .addClass("transfer")
                    .addClass("highlight");
            }
        }
    }

    this.reset = function() {
        this.title.html(this.simulator.framework.name);
        
        this.meet_function.removeClass("highlight");
        this.meet_function.html(this.simulator.framework.meet_latex);
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,this.meet_function.id]);
        
        this.transfer_function.removeClass("highlight");
        this.transfer_function.html(this.simulator.framework.transfer_latex);
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,this.transfer_function.id]);

        var order_html = this.simulator.order.map(function(i) {
            return '<div class="order-index node-{0}">{0}</div>'.format(i);
        }).join('<div class="flex text-center">→</div>').concat('<div class="flex-max"></div>');

        this.order.html(order_html);
        
        this.order.children().each(function() {
            $(this).removeClass("highlight")
                .removeClass("meet")
                .removeClass("transfer");
        });
    }
    
    this.init = function() {
        this.canvas.html(this.template());
        
        this.title = $('#framework-title');
        this.meet_function = $('#framework-meet');
        this.transfer_function = $('#framework-transfer');
        this.order = $('#framework-order');

        var _this = this;
        this.simulator.on('update', function() {
            _this.update();
        });
        
        this.reset();
    }
}

FrameworkView.prototype = Object.create(SimulatorView.prototype);
FrameworkView.prototype.constructor = FrameworkView


function RoundRobinResultsView(kwargs) {
    SimulatorView.call(this, kwargs);

    this.template = Handlebars.templates['results.hbs'];

    this.new_round = function(round) {
        $("#round-row").append("<td colspan=\"2\" class=\"text-center\">{0}</td>".format(this.simulator.state.round));
        $("#set-row").append("<td class=\"text-center\">In</td><td class=\"text-center\">Out</td>");
        
        for (node of this.simulator.cfg.nodes) {
            $('.result-row.node-{0}'.format(node.index))
                .append(
                    '<td class="round-{0} set-{1} node-{2} result unvisited">{3}</td>'.format(
                        this.simulator.state.round,
                        (this.simulator.framework.direction == DFA.FORWARD ? DFA.MEET : DFA.TRANSFER),
                        node.index,
                        node.sets[(this.simulator.framework.direction == DFA.FORWARD ? DFA.MEET : DFA.TRANSFER)].toHTML()
                    )
                );
            $('.result-row.node-{0}'.format(node.index))
                .append(
                    '<td class="round-{0} set-{1} node-{2} result unvisited">{3}</td>'.format(
                        this.simulator.state.round,
                        (this.simulator.framework.direction == DFA.FORWARD ? DFA.TRANSFER : DFA.MEET),
                        node.index,
                        node.sets[(this.simulator.framework.direction == DFA.FORWARD ? DFA.TRANSFER : DFA.MEET)].toHTML()
                    )
                );
        }
    }
    
    this.iterate = function() {
              // Round behind
        while(this.last_update.round < this.simulator.state.round ||
              // Correct round, order index behind
              (this.last_update.round == this.simulator.state.round &&
               this.last_update.order_index < this.simulator.state.order_index) ||
              // Correct round & index, one function behind
              (this.last_update.round == this.simulator.state.round &&
               this.last_update.order_index == this.simulator.state.order_index &&
               this.last_update.func == DFA.MEET &&
               this.last_update.func != this.simulator.state.func)
             ){

            if(this.last_update.func == DFA.MEET) {
                this.last_update.func = DFA.TRANSFER
            } else {
                this.last_update.func = DFA.MEET;
                this.last_update.order_index++;
                if(this.last_update.order_index >= this.simulator.order.length) {
                    this.last_update.round++;
                    this.last_update.order_index = 0;
                }
            }
            
            console.log("{0}:\t{1}\t{2}\t{3}".format("last_update".pad(" ",10),this.last_update.round,this.last_update.order_index,this.last_update.func))
            
            node = this.simulator.cfg.nodes[this.simulator.order[this.last_update.order_index]];
                
            $(".round-{0}.set-{1}.node-{2}.result".format(this.last_update.round, this.last_update.func, node.index))
                .html(node.sets[this.last_update.func].toHTML())
                .addClass("visited")
                .removeClass("unvisited");
        }

        this.reset_highlight();

        for(read of this.simulator.state.read_nodes) {
            for (set of read.sets) {
                var elem;
                if(set in this.simulator.framework.local_sets) {
                    elem = $(".set-{0}.node-{1}.result".format(
                        set,
                        read.node.index
                    ));
                } else {
                    elem = $(".round-{0}.set-{1}.node-{2}.result".format(
                        this.simulator.state.round,
                        set,
                        read.node.index
                    ));
                }

                elem.addClass(this.simulator.state.func)
                    .addClass("read")
                    .addClass("highlight");
            }
        }
        
        for(modified of this.simulator.state.modified_nodes) {
            for (set of modified.sets) {
                var elem;
                if(set in this.simulator.framework.local_sets) {
                    elem = $(".set-{0}.node-{1}.result".format(
                        set,
                        modified.node.index
                    ));
                } else {
                    elem = $(".round-{0}.set-{1}.node-{2}.result".format(
                        this.simulator.state.round,
                        set,
                        modified.node.index
                    ));
                }

                elem.addClass(this.simulator.state.func)
                    .addClass("modified")
                    .addClass("highlight");
            }
        }
    }
    
    this.reset_highlight = function() {
        $(".result").each(function() {
            $(this)
                .removeClass("meet")
                .removeClass("transfer")
                .removeClass("read")
                .removeClass("modified")
                .removeClass("highlight");
        });
    }

    this.reset_results = function() {
        $(".result-row").remove("td");
        for (node of this.simulator.cfg.nodes) {
            for (set in this.simulator.framework.local_sets) {
                $('.result-row.node-{0}'.format(node.index))
                    .append(
                        '<td class="round-{0} set-{1} node-{2} result">{3}</td>'.format(
                            this.simulator.state.round,
                            set,
                            node.index,
                            node.sets[set].toHTML()
                        )
                    );
            }
            $('.result-row.node-{0}'.format(node.index))
                .append('<td class="cell-grey"></td>');
        }
    }

    this.reset = function() {
        this.canvas.html(this.template({
            nodes: this.simulator.cfg.nodes
        }));
        
        this.results_table = $('#results-table');
        
        for (set in this.simulator.framework.local_sets) {
            $("#round-header").before('<td rowspan="2">{0}</td>'.format(set));
        }
        
        this.reset_results();
        this.reset_highlight();

        this.last_update = {
            round: 0,
            order_index: this.simulator.order.length,
            func: this.simulator.func,
        }
    }
    
    this.init = function() {
        this.reset();

        var _this = this;
        this.simulator.on('iterate',function() {
            _this.iterate();
        });

        this.simulator.on('new_round',function() {
            _this.new_round();
        });
    }
}

RoundRobinResultsView.prototype = Object.create(SimulatorView.prototype);
RoundRobinResultsView.prototype.constructor = RoundRobinResultsView


function SimControlsView(kwargs) {
    SimulatorView.call(this, kwargs);
    
    this.template = Handlebars.templates['sim_controls.hbs'];

    var _this = this;
    
    this.finished = function() {
        _this.play_button.prop('disabled', true).show();
        _this.pause_button.prop('disabled', true).hide();
        _this.fast_forward_button.prop('disabled', true);
        _this.step_forward_button.prop('disabled', true);
    }

    this.play = function() {
        this.play_button.prop('disabled', true).hide();
        this.pause_button.prop('disabled', false).show();
        this.simulator.play();
    }

    this.pause = function() {
        this.play_button.prop('disabled', false).show();
        this.pause_button.prop('disabled', true).hide();
        this.simulator.pause();
    }
    
    this.reset = function() {        
        this.play_button.prop('disabled', false);
        this.fast_forward_button.prop('disabled', false);
        this.step_forward_button.prop('disabled', false);
    }
    
    this.init = function() {
        this.canvas.html(this.template());
        
        this.pause_button         = $("#sim-controls>#pause");
        this.play_button          = $("#sim-controls>#play");
        this.step_forward_button  = $("#sim-controls>#step-forward");
        this.fast_forward_button  = $("#sim-controls>#fast-forward");
        this.fast_backward_button = $("#sim-controls>#fast-backward");

        this.pause_button.hide();

        this.fast_backward_button.off("click").click({view:this}, function(event) {
            event.data.view.simulator.fast_backward();
        });
        
        this.step_forward_button.off("click").click({view:this}, function(event) {
            event.data.view.simulator.step_forward();
        });
        
        this.play_button.off("click").click({view:this}, function(event) {
            event.data.view.play();
        });

        this.pause_button.off("click").click({view:this}, function(event) {
            event.data.view.pause();
        });
        
        this.fast_forward_button.off("click").click({view:this}, function(event) {
            event.data.view.simulator.fast_forward();
        });
        
        this.reset();

        this.simulator.on('finished', function() {
            _this.finished();
        });
    }
}

SimControlsView.prototype = Object.create(SimulatorView.prototype);
SimControlsView.prototype.constructor = SimControlsView


function CFGView(kwargs) {    
    SimulatorView.call(this, kwargs);

    var _this = this
    
    this.template = Handlebars.templates['cfg.hbs'];
    this.node_template = Handlebars.templates['node.hbs'];

    this.draw = function() {
        this.g.graph().transition = function(selection) {
            return selection.transition().duration(500);
        };
        
        // Render the graph into svg g
        this.render(this.svgGroup, this.g);                
    }

    this.reset_highlight = function() {
        $('#cfg-svg g.node').each(function() {
            $(this).attr("class","node");
        });
    }
    
    this.update = function() {
        this.reset_highlight();

        // Add highlighting
        for(read of this.simulator.state.read_nodes) {
            $("#graph-node-{0}".format(
                read.node.index
            ))
                .attr('class','{0} {1} {2} {3}'.format(
                    'node',
                    this.simulator.state.func,
                    "read",
                    "highlight"
                ));
        }
        
        for(modified of this.simulator.state.modified_nodes) {
            $("#graph-node-{0}".format(
                modified.node.index
            ))
                .attr('class','{0} {1} {2} {3}'.format(
                    'node',
                    this.simulator.state.func,
                    "modified",
                    "highlight"
                ));
        }
        
        // Update edges.
        for(i = 0; i < this.simulator.cfg.nodes.length; i++) {
            for(j = 0; j < this.simulator.cfg.nodes.length; j++) {
                if(this.simulator.cfg.adjacency[i][j] == 1) {
                    this.g.setEdge('{0}'.format(i), '{0}'.format(j));
                } else if(this.simulator.cfg.adjacency[i][j] == 0) {
                    this.g.removeEdge('{0}'.format(i), '{0}'.format(j));
                }
            }
        }
        
        // Update nodes.
        for(node of this.simulator.cfg.nodes) {
            _this.g.setNode('{0}'.format(node.index),
                            {
                                labelType: "html",
                                label: this.node_template({content: new Handlebars.SafeString(node.toHTML())}),
                                rx: 5,
                                ry: 5,
                            });
            _this.g.node('{0}'.format(node.index)).id = 'graph-node-{0}'.format(node.index)
        }

        this.draw();
    }
    
    this.reset = function() {
        this.g = new dagreD3.graphlib.Graph({compound:true})
            .setGraph({})
            .setDefaultEdgeLabel(function() { return {}; });
        
        // Add all the nodes to the CFG.
        for(node of this.simulator.cfg.nodes) {
            _this.g.setNode('{0}'.format(node.index),
                            {
                                labelType: "html",
                                label: this.node_template({content: new Handlebars.SafeString(node.toHTML())}),
                                rx: 5,
                                ry: 5,
                            });
            _this.g.node('{0}'.format(node.index)).id = 'graph-node-{0}'.format(node.index)
        }
        
        // Add the edges from the adjacency matrix.
        for(i = 0; i < this.simulator.cfg.nodes.length; i++) {
            for(j = 0; j < this.simulator.cfg.nodes.length; j++) {
                if(this.simulator.cfg.adjacency[i][j] == 1) {
                    _this.g.setEdge('{0}'.format(i), '{0}'.format(j));
                }
            }
        }
            
        this.svg.html("");
        // Add the graph element to the SVG
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

    this.init = function() {
        this.canvas.html(this.template());
        
        // Create the renderer
        this.render = new dagreD3.render();
        
        // Set up an SVG group so that we can translate the final graph.
        this.svg = d3.select("#cfg-svg");

        this.simulator.on('update', function() {
            _this.update();
        });
    }
}

CFGView.prototype = Object.create(SimulatorView.prototype);
CFGView.prototype.constructor = CFGView;
