function LessonIntroView(kwargs) {
    TutorialView.call(this, kwargs);

    var _this = this;

    this.main_view = kwargs.main_view;
    this.next_lesson = kwargs.next_lesson;

    this.template_root = 'teaching/lesson/intro/';
    this.template = this.get_template('main');
        
    this.clear = function() {
        _this.text.html("");
    }

    this.update_math = function() {
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);
    }

    this.steps = [
        function step_00() {
            _this.step_title.html("Introduction");
            // Update the text
            _this.text.html(_this.get_template('step_00')());
            
            // Hide the CFG
            _this.cfg_canvas.hide();
        },
        function step_01() {
            _this.step_title.html("What is Data-Flow Analysis?");
            _this.clear();
            _this.text.html(_this.get_template('step_01')());
            
        },
        function step_02() {
            _this.step_title.html("Control-Flow Graphs");
            _this.clear();
            _this.text.html(_this.get_template('step_02')());
            
        },
        function step_03() {
            _this.text.append(_this.get_template('step_03')());

            // Show the CFG
            _this.cfg_canvas.show();
            
            // Reset the CFG code
            var iloc_code = _this.get_template('example', 'iloc')();
            _this.simulator.sim_code(iloc_code);
            
            _this.cfg_view.g = new dagreD3.graphlib.Graph({compound:true})
                .setGraph({})
                .setDefaultEdgeLabel(function() { return {}; });

            _this.cfg_view.svg.html("");
            // Add the graph element to the SVG
            _this.cfg_view.svgGroup = _this.cfg_view.svg.append("g");

            _this.cfg_view.g.setNode('0',
                                     {
                                         label: '...',
                                         rx: 15,
                                         ry: 15,
                                         style: 'stroke: rgba(0,0,0,0);'
                                     });            

            _this.cfg_view.g.setNode('1',
                                     {
                                         labelType: 'html',
                                         label: '<span style="font-family: monospace;">loadI 0 => r<sub>x</sub></span>',
                                         rx: 15,
                                         ry: 15,
                                     });
            
            _this.cfg_view.g.setNode('2',
                            {
                                labelType: 'html',
                                label: '<span style="font-family: monospace;">add r<sub>x</sub> r<sub>y</sub> => r<sub>z</sub></span>',
                                rx: 15,
                                ry: 15,
                            });

            _this.cfg_view.g.setNode('3',
                                     {
                                         label: '...',
                                         rx: 15,
                                         ry: 15,
                                         style: 'stroke: rgba(0,0,0,0);'
                                     });

            _this.cfg_view.g.setEdge('0','1');
            _this.cfg_view.g.setEdge('1','2');
            _this.cfg_view.g.setEdge('2','3');

            _this.cfg_view.draw();

            _this.cfg_view.graph_properties.height = _this.cfg_view.g.graph().height;
            _this.cfg_view.graph_properties.width  = _this.cfg_view.g.graph().width;
            
            var xCenterOffset = (_this.cfg_view.canvas.width() - _this.cfg_view.graph_properties.width)
                / 2 * _this.cfg_view.graph_properties.scale;
            var yCenterOffset = (_this.cfg_view.canvas.height() - _this.cfg_view.graph_properties.height)
                / 2 * _this.cfg_view.graph_properties.scale;
            _this.cfg_view.svgGroup.attr("transform", "translate(" +
                                (xCenterOffset + _this.cfg_view.graph_properties.offset_x) + ", " +
                                (yCenterOffset + _this.cfg_view.graph_properties.offset_y) + ")" +
                                "scale(" + _this.cfg_view.graph_properties.scale + ")");
        },
        function step_04() {
            _this.text.append(_this.get_template('step_04')());

            _this.cfg_view.g = new dagreD3.graphlib.Graph({compound:true})
                .setGraph({})
                .setDefaultEdgeLabel(function() { return {}; });

            _this.cfg_view.svg.html("");
            // Add the graph element to the SVG
            _this.cfg_view.svgGroup = _this.cfg_view.svg.append("g");

            _this.cfg_view.g.setNode('0',
                                     {
                                         label: '...',
                                         rx: 15,
                                         ry: 15,
                                         style: 'stroke: rgba(0,0,0,0);'
                                     });            

            _this.cfg_view.g.setNode('1',
                                     {
                                         labelType: 'html',
                                         label: '<span style="font-family: monospace;">cbr r<sub>x</sub> -> L1 L2</span>',
                                         rx: 15,
                                         ry: 15,
                                     });

            _this.cfg_view.g.setNode('2',
                            {
                                labelType: 'html',
                                label: '<span style="font-family: monospace;">L1: add r<sub>x</sub> r<sub>y</sub> => r<sub>z</sub></span>',
                                rx: 15,
                                ry: 15,
                            });
            
            
            _this.cfg_view.g.setNode('3',
                            {
                                labelType: 'html',
                                label: '<span style="font-family: monospace;">L2: sub r<sub>x</sub> r<sub>y</sub> => r<sub>z</sub></span>',
                                rx: 15,
                                ry: 15,
                            });

            _this.cfg_view.g.setNode('4',
                                     {
                                         label: '...',
                                         rx: 15,
                                         ry: 15,
                                         style: 'stroke: rgba(0,0,0,0);'
                                     });

            _this.cfg_view.g.setNode('5',
                                     {
                                         label: '...',
                                         rx: 15,
                                         ry: 15,
                                         style: 'stroke: rgba(0,0,0,0);'
                                     });

            _this.cfg_view.g.setEdge('0','1');
            _this.cfg_view.g.setEdge('1','2');
            _this.cfg_view.g.setEdge('1','3');
            _this.cfg_view.g.setEdge('2','4');
            _this.cfg_view.g.setEdge('3','5');

            _this.cfg_view.draw();

            _this.cfg_view.graph_properties.height = _this.cfg_view.g.graph().height;
            _this.cfg_view.graph_properties.width  = _this.cfg_view.g.graph().width;
            
            var xCenterOffset = (_this.cfg_view.canvas.width() - _this.cfg_view.graph_properties.width)
                / 2 * _this.cfg_view.graph_properties.scale;
            var yCenterOffset = (_this.cfg_view.canvas.height() - _this.cfg_view.graph_properties.height)
                / 2 * _this.cfg_view.graph_properties.scale;
            _this.cfg_view.svgGroup.attr("transform", "translate(" +
                                (xCenterOffset + _this.cfg_view.graph_properties.offset_x) + ", " +
                                (yCenterOffset + _this.cfg_view.graph_properties.offset_y) + ")" +
                                "scale(" + _this.cfg_view.graph_properties.scale + ")");
        },
        function step_05() {
            _this.text.append(_this.get_template('step_05')());

            _this.text.append('<div style="display:flex; justify-content: center;"><pre style="flex: 0 0 auto;">'+_this.get_template('example','iloc')()+'</pre></div>');

            _this.cfg_view.reset();
        },
        function step_06() {
            _this.step_title.html("Reaching Definitions");
            
            _this.clear();
            
            _this.text.append(_this.get_template('step_06')());

            // Hide the CFG view.
            _this.cfg_canvas.hide();
        },
        function step_07() {
            _this.text.append(_this.get_template('step_07')());

            _this.cfg_canvas.show();
            
            var iloc_code = _this.get_template('step_07', 'iloc')();
            _this.simulator.sim_code(iloc_code);
            
            _this.cfg_view.show_all_points();
            _this.cfg_view.update();
        },
        function step_08() {
            _this.text.append(_this.get_template('step_08')());
        },
        function step_09() {
            _this.clear();
            _this.text.append(_this.get_template('step_09')());

            _this.simulator.step_forward();
        },
        function step_10() {
            _this.text.append(_this.get_template('step_10')());

            _this.simulator.step_forward();
        },
        function step_11() {
            _this.clear();
            _this.text.append(_this.get_template('step_11')());

            _this.next_button.prop('disabled', true);
            
            var iloc_code = _this.get_template('step_11', 'iloc')();
            _this.simulator.sim_code(iloc_code);

            _this.text.append(Handlebars.templates['teaching/question/canvas.hbs']());
            var question_view = new QuestionView({
                canvas: '#question-canvas',
                question: [
                    'The equation for \\(\\text{In}(n)\\) is:',
                    '\\[\\text{In}(n) = \\bigcup_{p \\in preds} \\text{Out}(p)\\]',
                    'What is the value of \\(\\text{In}(n_0)\\)?',
                ],
                answers: [
                    {text: '\\(\\{\\texttt{ra}_1\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{ra}\\}\\)', correct: false},
                    {text: '\\(\\{\\}\\)', correct: true},
                    {text: '\\(\\{\\texttt{rx}_1\\}\\)', correct: false}
                ],
                shuffle_answers: true,
                correct_callback: function() {
                    _this.simulator.step_forward();
                    _this.text.append(_this.get_template('step_11_ans')());
                    MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);
                    _this.next_button.prop('disabled', false);
                }
            });
            
            question_view.init();
        },
        function step_12() {
            _this.clear();
            _this.text.append(_this.get_template('step_12')());

            _this.next_button.prop('disabled', true);

            _this.text.append(Handlebars.templates['teaching/question/canvas.hbs']());
            var question_view = new QuestionView({
                canvas: '#question-canvas',
                question: [
                    'The equation for \\(\\text{Out}(n)\\) is:',
                    '\\[ \\text{Out}(n) = \\text{DefGen}(n) \\cup \\big{(}\\text{In}(n) \\setminus \\text{DefKill}(n)\\big{)} \\]',
                    'What is the value of \\(\\text{Out}(n_0)\\)?',
                ],
                answers: [
                    {text: '\\(\\{\\texttt{ra}_1\\}\\)', correct: true},
                    {text: '\\(\\{\\texttt{ra}\\}\\)', correct: false},
                    {text: '\\(\\{\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{rx}_1\\}\\)', correct: false}
                ],
                shuffle_answers: true,
                correct_callback: function() {
                    _this.simulator.step_forward();
                    _this.text.append(_this.get_template('step_12_ans')());
                    MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);
                    _this.next_button.prop('disabled', false);
                }
            });
            
            question_view.init();
        },
        function step_13() {
            _this.clear()

            // Reset the CFG code
            var iloc_code = _this.get_template('step_13', 'iloc')();
            _this.simulator.sim_code(iloc_code);

            _this.simulator.advance(2);
            
            _this.text.append(_this.get_template('step_13')());
        },
        function step_14() {
            _this.simulator.step_forward();
            
            _this.text.append(_this.get_template('step_14')());
        },
        function step_15() {
            _this.simulator.step_forward();
            
            _this.text.append(_this.get_template('step_15')());
        },
        function step_16() {
            _this.clear()
            // Reset the CFG code
            var iloc_code = _this.get_template('step_16', 'iloc')();
            _this.simulator.sim_code(iloc_code);            

            _this.cfg_view.show_touched_points();
            _this.simulator.advance(10);
            _this.cfg_view.reset_highlight();
            
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[2], DFA.OUT);
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[4], DFA.OUT);
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[5], DFA.IN);
            _this.cfg_view.remove_point(_this.simulator.cfg.nodes[2], DFA.IN);
            _this.cfg_view.draw();
                        
            _this.text.append(_this.get_template('step_16')());

            _this.next_button.prop('disabled', true);

            _this.text.append(Handlebars.templates['teaching/question/canvas.hbs']());
            var question_view = new QuestionView({
                canvas: '#question-canvas',
                question: [
                    'The equation for \\(\\text{In}(n)\\) is:',
                    '\\[\\text{In}(n) = \\bigcup_{p \\in preds} \\text{Out}(p)\\]',
                    'What is the value of \\(\\text{In}(n_5)\\)?',
                ],
                answers: [
                    {text: '\\(\\{\\texttt{ra}_1\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{ra}_2\\}\\)', correct: false},
                    {text: '\\(\\{\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{ra}_1, \\texttt{ra}_2\\}\\)', correct: true}
                ],
                shuffle_answers: true,
                correct_callback: function() {
                    _this.simulator.step_forward();
                    _this.text.append(_this.get_template('step_16_ans')());
                    MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);
                    _this.next_button.prop('disabled', false);
                }
            });
            
            question_view.init();
        },
        function step_17(){
            _this.clear()
            
            _this.text.append(_this.get_template('step_17')());
            
            // Reset the CFG code
            var iloc_code = _this.get_template('step_17', 'iloc')();
            _this.simulator.sim_code(iloc_code);

            _this.cfg_view.show_no_points();
            _this.simulator.advance(2);
            _this.cfg_view.reset_highlight();
            
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[0], DFA.OUT);
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[3], DFA.OUT);
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[1], DFA.IN);
            _this.cfg_view.remove_point(_this.simulator.cfg.nodes[0], DFA.IN);
            _this.cfg_view.draw();

            _this.next_button.prop('disabled', true);

            _this.text.append(Handlebars.templates['teaching/question/canvas.hbs']());
            var question_view = new QuestionView({
                canvas: '#question-canvas',
                question: [
                    'The equation for \\(\\text{In}(n)\\) is:',
                    '\\[\\text{In}(n) = \\bigcup_{p \\in preds} \\text{Out}(p)\\]',
                    'What is the value of \\(\\text{In}(n_1)\\)?',
                ],
                answers: [
                    {text: '\\(\\{\\texttt{ra}_1\\}\\)', correct: true},
                    {text: '\\(\\{\\texttt{rc}_1, \\texttt{ra}_2\\}\\)', correct: false},
                    {text: '\\(\\{\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{ra}\\}\\)', correct: false}
                ],
                shuffle_answers: true,
                correct_callback: function() {
                    _this.simulator.step_forward();
                    _this.text.append(_this.get_template('step_17_ans')());
                    MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);
                    _this.next_button.prop('disabled', false);
                }
            });
            
            question_view.init();
        },
        function step_18() {
            _this.clear()

            _this.text.append(_this.get_template('step_18')());

            _this.simulator.reset();
            _this.simulator.advance(7);
            
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[3], DFA.IN);
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[3], DFA.OUT);
            _this.cfg_view.reset_highlight();
            
            _this.cfg_view.draw();
        },
        function step_19() {
            _this.text.append(_this.get_template('step_19')());

            _this.simulator.step_forward();
        },
        function step_20() {
            _this.clear();
            _this.text.append(_this.get_template('step_20')());

            _this.simulator.advance(4);
            
            _this.cfg_view.remove_point(_this.simulator.cfg.nodes[3], DFA.IN);
            _this.cfg_view.remove_point(_this.simulator.cfg.nodes[0], DFA.IN);
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[0], DFA.OUT);
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[3], DFA.OUT);
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[1], DFA.IN);
            _this.cfg_view.draw();
            _this.cfg_view.reset_highlight();

            _this.next_button.prop('disabled', true);

            _this.text.append(Handlebars.templates['teaching/question/canvas.hbs']());
            var question_view = new QuestionView({
                canvas: '#question-canvas',
                question: [
                    'The equation for \\(\\text{In}(n)\\) is:',
                    '\\[\\text{In}(n) = \\bigcup_{p \\in preds} \\text{Out}(p)\\]',
                    'What is the value of \\(\\text{In}(n_1)\\)?',
                ],
                answers: [
                    {text: '\\(\\{\\texttt{ra}_1\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{rc}_1, \\texttt{ra}_2\\}\\)', correct: false},
                    {text: '\\(\\{\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{ra}_1, \\texttt{rc}_1, \\texttt{ra}_2\\}\\)', correct: true}
                ],
                shuffle_answers: true,
                correct_callback: function() {
                    _this.simulator.step_forward();
                    _this.text.append(_this.get_template('step_20_ans')());
                    MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);
                    _this.next_button.prop('disabled', false);
                }
            });
            
            question_view.init();
        },
        function step_21() {
            _this.clear();

            _this.text.append(_this.get_template('step_21')());

            _this.cfg_view.show_touched_points();
            
            _this.simulator.reset();
            _this.simulator.advance(13);
            
            _this.text.append(Handlebars.templates['simulator/sim_controls/canvas.hbs']());
            var controls_view = new SimControlsView({
                canvas: '#sim-controls-canvas',
                simulator: _this.simulator,
            });
            
            controls_view.init();
        },
        function step_22() {
            _this.step_title.html("Summary");
            
            _this.clear();

            _this.text.append(_this.get_template('step_22')());

            $('#btn-goto-next-lesson').on('click', function() {
                _this.main_view.show_lesson(
                    _this.next_lesson
                );
            });
            
            $('#btn-goto-menu').on('click', function() {
                _this.main_view.show_menu();
            });
        }
    ];

    this.init_children = function() {
        $('#page-title').html(this.title);
        
        this.cfg_canvas = $('#cfg-canvas');
        
        this.cfg_view = new CFGView({
            canvas: '#cfg-canvas',
            simulator: this.simulator
        });
        
        this.cfg_view.init();
    }
}

LessonIntroView.prototype = Object.create(TutorialView.prototype);
LessonIntroView.prototype.constructor = LessonIntroView
