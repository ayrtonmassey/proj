function SimulatorView(kwargs) {
    View.call(this, kwargs);
    
    this.simulator = kwargs.simulator;
    
    var _this = this;
    this.simulator.on('reset', function() {
        _this.reset();
    });

    this.reset = function() {
        throw new ReferenceError("function {0}.reset() has not been implemented.".format(_this.constructor.name));
    }
}

SimulatorView.prototype = Object.create(View.prototype);
SimulatorView.prototype.constructor = SimulatorView


function RoundRobinSimulatorView(kwargs) {
    SimulatorView.call(this, kwargs);

    var _this = this;

    this.template_root = 'simulator/';
    this.template = this.get_template('roundrobin');
    
    // this.update = function() {

    // }

    this.reset = function() {
        // Do nothing.
    }

    this.init = function() {
        $('#page-title').html("Simulator");
        
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
        this.lattice_view = new LatticeView({
            canvas: '#lattice-canvas',
            simulator: this.simulator,
        });
        this.cfg_view = new CFGView({
            canvas: '#cfg-canvas',
            simulator: this.simulator,
            draw_points: CFG_FLAGS.SHOW_NO_POINTS,
            show_points_button: true,
        });

        this.results_view.init();
        this.code_view.init();
        this.framework_view.init();
        this.sim_controls_view.init();
        this.lattice_view.init();
        this.cfg_view.init();

        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            _this.cfg_view.update();
        });
        
        this.simulator.reset();
    }
}

RoundRobinSimulatorView.prototype = Object.create(SimulatorView.prototype);
RoundRobinSimulatorView.prototype.constructor = RoundRobinSimulatorView


function CodeView(kwargs) {
    SimulatorView.call(this, kwargs);

    this.template_root = 'simulator/code/';
    this.template = this.get_template('main');
    this.code_display_template  = this.get_template('display');
    this.code_editor_template   = this.get_template('editor');
    this.code_controls_template = this.get_template('controls');
    
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
        try {
            this.simulator.sim_code(code);
            this.code_alert.show();
            this.code_alert_content.html("Loaded code successfully!");
            this.code_alert
                .addClass('alert-success')
                .removeClass('alert-danger');
        } catch(err) {
            this.code_alert.show();
            this.code_alert_content.html(err.message);
            this.code_alert
                .addClass('alert-danger')
                .removeClass('alert-success');
        }
    }
    
    this.init = function() {
        this.canvas.html(this.template());
        
        this.code_display = $('#code-display');
        
        this.code_editor = $('#code-editor');
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

        this.code_alert = $('#code-alert');
        this.code_alert_content = $('#code-alert-content');
        
        this.code_alert.find('#btn-hide-alert').on('click', function() {
            _this.code_alert.hide();
        });
        
        this.code_alert.hide();

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

    this.template_root = 'simulator/framework/';
    this.template = this.get_template('main');
    
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
        }).join('<div class="flex text-center">→</div>');

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

    this.template_root = 'simulator/results/';
    this.template = this.get_template('main');

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

    this.template_root = 'simulator/sim_controls/';
    this.template = this.get_template('main');

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
        this.play_button.prop('disabled', false).show();
        this.pause_button.prop('disabled', true).hide();
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

var CFG_FLAGS = {
    SHOW_NO_POINTS     : 0,
    SHOW_TOUCHED_POINTS: 1,
    SHOW_ALL_POINTS    : 2,
}

function CFGView(kwargs) {    
    SimulatorView.call(this, kwargs);
    
    var _this = this
    
    this.template_root = 'simulator/cfg/';
    this.template = this.get_template('main');
    this.node_template = this.get_template('node');
    this.point_template = this.get_template('point');

    // Default to not showing points
    this.draw_points = kwargs.draw_points || CFG_FLAGS.SHOW_NO_POINTS;
    this.show_points_button = kwargs.show_points_button || false;

    this.draw = function() {
        // // Fancy transition code:
        // this.g.graph().transition = function(selection) {
        //     return selection.transition().duration(500);
        // };
        
        // Render the graph into svg g
        this.render(this.svgGroup, this.g);
    }

    this.construct_graph = function() {
        // Add nodes
        for(node of this.simulator.cfg.nodes) {
            _this.g.setNode('{0}'.format(node.index),
                            {
                                labelType: "html",
                                label: this.node_template({
                                    content: new Handlebars.SafeString(
                                        node.toHTML()
                                    ),
                                    index: node.index
                                }),
                                rx: 5,
                                ry: 5,
                            });
            _this.g.node('{0}'.format(node.index)).id = 'graph-node-{0}'.format(node.index)
        }

        // Add edges
        for(i = 0; i < this.simulator.cfg.nodes.length; i++) {
            for(j = 0; j < this.simulator.cfg.nodes.length; j++) {
                if(this.simulator.cfg.adjacency[i][j] == 1) {
                    this.g.setEdge('{0}'.format(i), '{0}'.format(j));
                }
            }
        }
    }
    
    this.add_point = function(node, set) {
        // Check set is valid
        if (set != DFA.IN && set != DFA.OUT) {
            throw new ReferenceError('Expected DFA.IN or DFA.OUT, got "{0}"'.format(set));
        }
        
        var point_id = '{0}-{1}'.format(node.index, set);
        var node_id = '{0}'.format(node.index)
        
        // Add point
        var point = _this.g.setNode(
            point_id,
            {
                labelType: 'html',
                label: this.point_template({
                    content: new Handlebars.SafeString(
                        node.sets[this.simulator.io_to_mt(set)].toHTML()
                    ),
                    set: titleCase(set),
                    index: node.index,
                }),
                rx: 15,
                ry: 15,
                style: 'stroke: #9a162c',
                class: 'point'
            });

        this.point_ids.push(point_id);

        this.g.node(point_id).id = 'graph-node-{0}'.format(point_id);
        this.g.node(point_id).set = set;
        this.g.node(point_id).dagre_id = point_id;
        this.g.node(point_id).dagre_id = point_id;
        this.g.node(point_id).node_index = node.index;

        // Add edges from / to in / out points
        if (set == DFA.IN) {
            this.g.setEdge(point_id, node_id);

            // Update edges entering node
            for(i = 0; i < this.simulator.cfg.nodes.length; i++) {
                if(this.simulator.cfg.adjacency[i][node.index] == 1) {
                    // If we're showing points for the prev node
                    var prev_node_id;
                    if (this.g.node('{0}-out'.format(i))) {
                        prev_node_id = '{0}-out'.format(i);
                    } else {
                        prev_node_id = '{0}'.format(i);
                    }
                    
                    // Remove edge from prev to node
                    this.g.removeEdge(prev_node_id, node_id);
                    
                    // Add edge from prev to point
                    this.g.setEdge(prev_node_id, point_id);
                }
            }            
        } else if (set == DFA.OUT) {
            this.g.setEdge(node_id, point_id);

            // Update edges leaving node
            for(i = 0; i < this.simulator.cfg.nodes.length; i++) {
                if(this.simulator.cfg.adjacency[node.index][i] == 1) {
                    // If we're showing points for the next node
                    var next_node_id;
                    if (this.g.node('{0}-in'.format(i))) {
                        next_node_id = '{0}-in'.format(i);
                    } else {
                        next_node_id = '{0}'.format(i);
                    }
                    
                    // Remove edge from node to next
                    this.g.removeEdge(node_id, next_node_id);
                    
                    // Add edge from point to next
                    this.g.setEdge(point_id, next_node_id);
                }
            }
        }
    }

    this.remove_point = function(node, set) {
        // Check set is valid
        if (set != DFA.IN && set != DFA.OUT) {
            throw new ReferenceError('Expected DFA.IN or DFA.OUT, got "{0}"'.format(set));
        }
        
        var point_id = '{0}-{1}'.format(node.index, set);
        var node_id = '{0}'.format(node.index)

        // Remove point
        this.g.removeNode(point_id);

        var index = this.point_ids.indexOf(point_id);
        if (index > -1) {
            this.point_ids.splice(index,1);
        }

        // Add edges from / to in / out points
        if (set == DFA.IN) {
            this.g.removeEdge(point_id, node_id);

            // Update edges entering node
            for(i = 0; i < this.simulator.cfg.nodes.length; i++) {
                if(this.simulator.cfg.adjacency[i][node.index] == 1) {
                    // If we're showing points for the next node
                    var prev_node_id;
                    if (this.g.node('{0}-out'.format(i))) {
                        prev_node_id = '{0}-out'.format(i);
                    } else {
                        prev_node_id = '{0}'.format(i);
                    }
                    
                    // Remove edge from prev to point
                    this.g.removeEdge(prev_node_id, point_id);
                    
                    // Add edge from prev to node
                    this.g.setEdge(prev_node_id, node_id);
                }
            } 
        } else if (set == DFA.OUT) {
            this.g.removeEdge(node_id, point_id);
            
            // Update edges leaving node
            for(i = 0; i < this.simulator.cfg.nodes.length; i++) {
                if(this.simulator.cfg.adjacency[node.index][i] == 1) {
                    // If we're showing points for the next node
                    var next_node_id;
                    if (this.g.node('{0}-in'.format(i))) {
                        next_node_id = '{0}-in'.format(i);
                    } else {
                        next_node_id = '{0}'.format(i);
                    }
                    
                    // Remove edge from point to next
                    this.g.removeEdge(point_id, next_node_id);
                    
                    // Add edge from node to next
                    this.g.setEdge(node_id, next_node_id);
                }
            }
        }
    }

    this.add_all_points = function() {
        // Update nodes.
        for(node of this.simulator.cfg.nodes) {
            this.add_point(node, DFA.IN);
            this.add_point(node, DFA.OUT);
        }
    }

    this.remove_all_points = function() {
        // Update nodes.
        for(node of this.simulator.cfg.nodes) {
            this.remove_point(node, DFA.IN);
            this.remove_point(node, DFA.OUT);
        }
    }
    
    this.show_all_points = function() {
        this.draw_points = CFG_FLAGS.SHOW_ALL_POINTS;

        this.add_all_points();
    }
    
    this.show_no_points = function() {
        this.draw_points = CFG_FLAGS.SHOW_NO_POINTS;

        this.remove_all_points();
    }

    this.show_touched_points = function() {
        this.draw_points = CFG_FLAGS.SHOW_TOUCHED_POINTS;
    }

    // Backward compatibility
    this.hide_points = this.show_no_points;

    this.reset_edge_highlights = function() {
        if (this.g._edgeObjs != undefined) {
            $.each(
                this.g._edgeObjs,
                function(k,edge) {
                    _this.g.setEdge(
                        edge.v,
                        edge.w,
                        {
                            style: 'stroke: #333; fill: rgba(0,0,0,0)',
                            arrowheadStyle: '',
                        }
                    );
                }
            );
        }
    }
    
    this.reset_node_highlights = function () {
        $('.node').each(function() {
            $(this)[0].classList.remove(DFA.READ);
            $(this)[0].classList.remove(DFA.MODIFIED);
            $(this)[0].classList.remove(DFA.MEET);
            $(this)[0].classList.remove(DFA.TRANSFER);
            $(this)[0].classList.remove(DFA.HIGHLIGHT);
        });
    }
    
    this.reset_highlight = function() {
        this.reset_edge_highlights();
        this.reset_node_highlights();
    }

    this.update_points = function() {
        for (point_id of this.point_ids) {
            var point = this.g.node(point_id);
            var set   = point.set;
            var node  = this.simulator.cfg.nodes[point.node_index];
            
            point.label = this.point_template({
                    content: new Handlebars.SafeString(
                        node.sets[this.simulator.io_to_mt(set)].toHTML()
                    ),
                    set: titleCase(set),
                    index: node.index,
            });
        }
    }

    this.highlight_node = function(elem, state, func) {
        switch(state) {
        case DFA.READ:
            elem[0].classList.add(DFA.READ);
            elem[0].classList.remove(DFA.MODIFIED);
            elem[0].classList.add(DFA.HIGHLIGHT);
            elem[0].classList.add(func);
            break;
        case DFA.MODIFIED:
            elem[0].classList.add(DFA.MODIFIED);
            elem[0].classList.remove(DFA.READ);
            elem[0].classList.add(DFA.HIGHLIGHT);
            elem[0].classList.add(func);
            break;
        default:
            throw new ReferenceError('Expected DFA.READ or DFA.MODIFIED, got "{0}"'.format(state))
        }
    }
    
    this.update_highlight = function() {
        // Add highlighting
        for(read of this.simulator.state.read_nodes) {
            for (set of read.sets) {
                if (set == DFA.MEET || set == DFA.TRANSFER) {
                    var point_elem = $("#graph-node-{0}-{1}".format(
                        read.node.index,
                        this.simulator.mt_to_io(set)
                    ));
                    if (point_elem.length > 0) {
                        this.highlight_node(point_elem, DFA.READ, this.simulator.state.func);
                    } else {
                        this.highlight_node(
                            $("#graph-node-{0}".format(read.node.index)),
                            DFA.READ,
                            this.simulator.state.func
                        );
                    }
                }
            }
        }
        
        for(modified of this.simulator.state.modified_nodes) {
            for (set of modified.sets) {
                if (set == DFA.MEET || set == DFA.TRANSFER) {
                    var point_elem = $("#graph-node-{0}-{1}".format(
                        modified.node.index,
                        this.simulator.mt_to_io(set)
                    ));
                    
                    if (point_elem.length > 0) {
                        this.highlight_node(point_elem, DFA.MODIFIED, this.simulator.state.func);
                    } else {
                        this.highlight_node(
                            $("#graph-node-{0}".format(modified.node.index)),
                            DFA.MODIFIED,
                            this.simulator.state.func
                        );
                    }
                }
            }
        }
    }
    
    this.update = function() {
        this.reset_highlight();
        
        // Add points, if we're showing them
        if (this.draw_points & CFG_FLAGS.SHOW_TOUCHED_POINTS) {
            this.remove_all_points();

            for(read of this.simulator.state.read_nodes) {
                for (set of read.sets) {
                    if (set == DFA.MEET || set == DFA.TRANSFER) {
                        var set = this.simulator.mt_to_io(set);
                        this.add_point(read.node, set);
                    }
                }
            }
            
            for(modified of this.simulator.state.modified_nodes) {
                for (set of modified.sets) {
                    if (set == DFA.MEET || set == DFA.TRANSFER) {
                        var set = this.simulator.mt_to_io(set);
                        this.add_point(modified.node, set);
                    }
                }
            }
        }            

        // Add set value tooltips
        for(node of this.simulator.cfg.nodes) {
            $("#graph-node-{0}".format(node.index))
                .attr("title",
                      (function(v) {
                          var str = "";
                          for (set in v.sets) {
                              str += "<p>{0}: {1}</p>".format(set, v.sets[set].toHTML());
                          }
                          return str;
                      })(node)
                     )
                .tipsy({ gravity: "w", opacity: 1, html: true });
        }

        this.update_points();
        
        this.draw();

        this.update_highlight();

        this.graph_properties.height = this.g.graph().height;
        this.graph_properties.width  = this.g.graph().width;
        
        this.translate_graph();
    }

    this.translate_graph = function() {
        var xCenterOffset = (_this.canvas.width() - _this.graph_properties.width)
            / 2 * _this.graph_properties.scale;
        var yCenterOffset = (_this.canvas.height() - _this.graph_properties.height)
            / 2 * _this.graph_properties.scale;
        _this.svgGroup.attr("transform", "translate(" +
                            (xCenterOffset + _this.graph_properties.offset_x) + ", " +
                            (yCenterOffset + _this.graph_properties.offset_y) + ")" +
                            "scale(" + _this.graph_properties.scale + ")");
    }
    
    this.reset = function() {
        this.g = new dagreD3.graphlib.Graph({compound:true})
            .setGraph({})
            .setDefaultEdgeLabel(function() { return {}; });

        this.svg.html("");
        // Add the graph element to the SVG
        this.svgGroup = this.svg.append("g");
        
        var zoom = d3.behavior.zoom().on("zoom", function() {        
            _this.graph_properties = {
                scale: d3.event.scale,
                offset_x: d3.event.translate[0],
                offset_y: d3.event.translate[1],
                height: _this.g.graph().height,
                width: _this.g.graph().width,
            }
            _this.translate_graph();
        });

        this.svg.call(zoom);

        this.construct_graph();
        this.point_ids = [];

        if(this.draw_points & CFG_FLAGS.SHOW_ALL_POINTS) {
            this.show_all_points();
        } else if(this.draw_points & CFG_FLAGS.SHOW_TOUCHED_POINTS) {
            this.show_touched_points();
        } else {
            this.show_no_points();
        }

        this.graph_properties = {
            scale: 1.0,
            offset_x: 0.0,
            offset_y: 0.0,
            height: 0.0,
            width: 0.0,
        }
                
        this.update();
                
        this.translate_graph();
    }

    this.init_show_points_button = function() {
        this.canvas.append(this.get_template('btn-show-points')());

        if(this.draw_points & CFG_FLAGS.SHOW_ALL_POINTS) {
            $('#btn-show-points').html("All")
                .addClass("btn-success")
                .removeClass("btn-info")
                .removeClass("btn-danger");
        } else if(this.draw_points & CFG_FLAGS.SHOW_TOUCHED_POINTS) {
            $('#btn-show-points').html("Current")
                .removeClass("btn-success")
                .addClass("btn-info")
                .removeClass("btn-danger");
        } else {
            $('#btn-show-points').html("None")
                .removeClass("btn-success")
                .removeClass("btn-info")
                .addClass("btn-danger");
        }
        
        $('#btn-show-points').on('click', function() {
            if (_this.draw_points & CFG_FLAGS.SHOW_ALL_POINTS) {
                _this.show_touched_points();
                $(this).html("Current")
                    .removeClass("btn-success")
                    .addClass("btn-info")
                    .removeClass("btn-danger");
            } else if (_this.draw_points & CFG_FLAGS.SHOW_TOUCHED_POINTS) {
                _this.show_no_points();
                $(this).html("None")
                    .removeClass("btn-success")
                    .removeClass("btn-info")
                    .addClass("btn-danger");
            } else {
                _this.show_all_points();
                $(this).html("All")
                    .addClass("btn-success")
                    .removeClass("btn-info")
                    .removeClass("btn-danger");
            }
            
            _this.update();
        });
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

        if (this.show_points_button) {
            this.init_show_points_button()
        }
    }

}

CFGView.prototype = Object.create(SimulatorView.prototype);
CFGView.prototype.constructor = CFGView;


function LatticeView(kwargs) {    
    SimulatorView.call(this, kwargs);
    
    var _this = this
    
    this.template_root = 'simulator/lattice/';
    this.template = this.get_template('main');
    this.node_template = this.get_template('node');

    this.display_toggle = true;
    
    this.draw = function() {
        this.g.graph().transition = function(selection) {
            return selection.transition().duration(500);
        };
        
        // Render the graph into svg g
        this.render(this.svgGroup, this.g);
    }

    this.reset_highlight = function() {
        if (undefined != this.g._edgeObjs) {
            $.each(
                this.g._edgeObjs,
                function(k,edge) {
                    _this.g.setEdge(
                        edge.v,
                        edge.w,
                        {
                            style: "stroke: #000; fill: rgba(0,0,0,0);",
                            arrowheadStyle: "stroke: #000; fill: #000;",
                        }
                    );
                }
            );
        }
        
        $('#lattice-svg g.node').each(function() {
            $(this).attr("class","node");
        });
    }
    
    this.update = function() {
        this.reset_highlight();

        if (this.simulator.state.func == DFA.MEET) {
            for(read_node of this.simulator.state.read_nodes) {
                for (set of read_node.sets) {
                    $('#lattice-node-{0}'.format(
                        this.simulator.lattice.get_node(read_node.node.sets[set]).index)
                     ).attr(
                         'class',
                         '{0} {1} {2} {3}'.format('node', 'read', 'meet', 'highlight')
                     );
                }
            }

            for(modified_node of this.simulator.state.modified_nodes) {
                for (set of modified_node.sets) {
                    $('#lattice-node-{0}'.format(
                        this.simulator.lattice.get_node(modified_node.node.sets[set]).index)
                     ).attr(
                         'class',
                         '{0} {1} {2} {3}'.format('node', 'modified', 'meet', 'highlight')
                     );
                }
            }
        }
        
        this.draw();

        this.graph_properties.height = this.g.graph().height;
        this.graph_properties.width  = this.g.graph().width;
        
        this.translate_graph();
    }

    this.translate_graph = function() {
        var xCenterOffset = (_this.canvas.width() - _this.graph_properties.width)
            / 2 * _this.graph_properties.scale;
        var yCenterOffset = (_this.canvas.height() - _this.graph_properties.height)
            / 2 * _this.graph_properties.scale;
        _this.svgGroup.attr("transform", "translate(" +
                            (xCenterOffset + _this.graph_properties.offset_x) + ", " +
                            (yCenterOffset + _this.graph_properties.offset_y) + ")" +
                            "scale(" + _this.graph_properties.scale + ")");
    }

    this.construct_graph = function() {
        // Update nodes.
        for(node of this.simulator.lattice.nodes) {
            _this.g.setNode('{0}'.format(node.index),
                            {
                                labelType: "html",
                                label: this.node_template({
                                    content: new Handlebars.SafeString(
                                        node.value_set.toHTML()
                                    ),
                                    index: node.index
                                }),
                                rx: 5,
                                ry: 5,
                            });
            _this.g.node('{0}'.format(node.index)).id = 'lattice-node-{0}'.format(node.index);
        }
        
        // Update edges.
        for(i = 0; i < this.simulator.lattice.nodes.length; i++) {
            for(j = 0; j < this.simulator.lattice.nodes.length; j++) {
                if(this.simulator.lattice.adjacency[i][j] == 1) {
                    this.g.setEdge('{0}'.format(i), '{0}'.format(j), {
                        lineInterpolate: 'basis',
                    });
                } else if(this.simulator.lattice.adjacency[i][j] == 0) {
                    this.g.removeEdge('{0}'.format(i), '{0}'.format(j));
                }
            }
        }
    }
    
    this.reset = function() {
        this.init();
        
        if (this.simulator.lattice != null) {
            this.g = new dagreD3.graphlib.Graph({compound:true})
                .setGraph({})
                .setDefaultEdgeLabel(function() { return {}; });

            this.construct_graph();
            
            this.svg.html("");
            // Add the graph element to the SVG
            this.svgGroup = this.svg.append("g");
            
            var zoom = d3.behavior.zoom().on("zoom", function() {        
                _this.graph_properties = {
                    scale: d3.event.scale,
                    offset_x: d3.event.translate[0],
                    offset_y: d3.event.translate[1],
                    height: _this.g.graph().height,
                    width: _this.g.graph().width,
                }
                _this.translate_graph();
            });

            this.svg.call(zoom);

            this.graph_properties = {
                scale: 1.0,
                offset_x: 0.0,
                offset_y: 0.0,
                height: 0.0,
                width: 0.0,
            }
            
            this.update();
            
            this.translate_graph();
        }     
    }

    this.init = function() {
        // If the lattice is null, then we won't show it
        if (this.simulator.lattice != null) {
            this.displaying = true;
            
            this.canvas.html(this.template());
            
            // Create the renderer
            this.render = new dagreD3.render();
            
            // Set up an SVG group so that we can translate the final graph.
            this.svg = d3.select("#lattice-svg");
            
            this.simulator.on('update', function() {
                _this.update();
            });
            
            this.canvas.append(this.get_template('btn-lattice-collapse')());
            
            if (_this.display_toggle) {
                _this.canvas.parent().addClass('flex-max').attr('style', '');
                $('#btn-lattice-collapse').html('<i class="fa fa-minus"></i>')
                    .addClass("btn-danger")
                    .removeClass("btn-success");
            } else {
                _this.canvas.parent().removeClass('flex-max').attr('style', 'flex: 0 0 5em;');
                $('#btn-lattice-collapse').html('<i class="fa fa-plus"></i>')
                    .removeClass("btn-danger")
                    .addClass("btn-success");
            }
            
            $('#btn-lattice-collapse').on('click', function() {
                if (_this.display_toggle) {
                    _this.display_toggle = false;
                    _this.svg.attr('style','display: none;');
                    _this.canvas.parent().removeClass('flex-max').attr('style', 'flex: 0 0 5em;');
                    $('#btn-lattice-collapse').html('<i class="fa fa-plus"></i>')
                        .removeClass("btn-danger")
                        .addClass("btn-success");
                } else {
                    _this.display_toggle = true;
                    _this.svg.attr('style','');
                    _this.canvas.parent().addClass('flex-max').attr('style', '');
                    $('#btn-lattice-collapse').html('<i class="fa fa-minus"></i>')
                        .addClass("btn-danger")
                        .removeClass("btn-success");
                }
            });
        } else {
            this.displaying = false;
            _this.canvas.html('<p class="alert alert-danger" style="margin-bottom: 0; width: 100%;">Cannot display lattice - number of values exceeds minimum.</p>');
            _this.canvas.parent().removeClass('flex-max').attr('style', 'flex: 0 0 6em;');
        }
    }

}

LatticeView.prototype = Object.create(SimulatorView.prototype);
LatticeView.prototype.constructor = Lattice;


function LatticeTestbedView(kwargs) {
    SimulatorView.call(this, kwargs);

    this.template = Handlebars.templates['test/lattice.hbs'];
    
    // this.update = function() {

    // }

    this.reset = function() {
        // Do nothing.
    }

    this.init = function() {
        this.simulator.init();
        
        this.canvas.html(this.template());
        
        this.sim_controls_view = new SimControlsView({
            canvas: '#sim-controls-canvas',
            simulator: this.simulator,
        });
        this.lattice_view = new LatticeView({
            canvas: '#lattice-canvas',
            simulator: this.simulator,
        });

        this.sim_controls_view.init();
        this.lattice_view.init();

        this.simulator.reset();
    }
}

LatticeTestbedView.prototype = Object.create(SimulatorView.prototype);
LatticeTestbedView.prototype.constructor = LatticeTestbedView

function CFGTestbedView(kwargs) {
    SimulatorView.call(this, kwargs);

    this.template = Handlebars.templates['test/cfg.hbs'];
    
    // this.update = function() {

    // }

    this.reset = function() {
        // Do nothing.
    }

    this.init = function() {
        this.simulator.init();
        
        this.canvas.html(this.template());
        
        this.sim_controls_view = new SimControlsView({
            canvas: '#sim-controls-canvas',
            simulator: this.simulator,
        });
        
        this.cfg_view = new CFGView({
            canvas: '#cfg-canvas',
            simulator: this.simulator,
            draw_points: CFG_FLAGS.SHOW_TOUCHED_POINTS,
        });

        this.sim_controls_view.init();
        this.cfg_view.init();

        this.simulator.reset();
    }
}

CFGTestbedView.prototype = Object.create(SimulatorView.prototype);
CFGTestbedView.prototype.constructor = CFGTestbedView
