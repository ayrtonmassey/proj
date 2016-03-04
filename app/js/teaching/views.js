function TutorialView(kwargs) {
    View.call(this, kwargs);
    
    var _this = this;
    
    this.title = kwargs.title;

    this.clear = function() {
        throw ReferenceError("clear is not defined in class {0}".format(_this.constructor.name));
    }

    this.update_math = function() {
        throw ReferenceError("update_math is not defined in class {0}".format(_this.constructor.name));
    }

    this.advance = function(steps) {
        var new_step = this.step + steps;
        while (this.step < new_step && this.step < this.steps.length - 1) {
            this.step++;
            this.next_button.prop('disabled', false);
            this.steps[this.step]();
        }
        if (this.step >= this.steps.length - 1) {
            this.next_button.prop('disabled', true);
        }
        if (this.step > 0) {
            this.prev_button.prop('disabled', false);
        }
    }
    
    this.next = function() {
        this.advance(1);
        this.update_math();
    }

    this.prev = function() {
        var new_step = this.step - 1;
        this.reset();
        this.advance(new_step);
        this.update_math();
    }

    this.reset = function() {
        this.step = -1;
        
        this.prev_button.prop('disabled', true);
        
        this.simulator = new RoundRobinSimulator({
            framework:  iloc_reaching_definitions,
            ordering:   DFA.REVERSE_POSTORDER,
            code:       "nop",
            play_speed: 100,
        });
        
        this.simulator.init();

        // Allow children to init contained components
        this.init_children();
        
        this.simulator.reset();

        this.next();
    }
    
    this.init = function() {
        this.canvas.html(this.template({title: this.title}));

        this.text = $('#text');
        
        this.next_button = $('#btn-next');
        
        this.next_button.on('click', function() {
            _this.next();
        });

        this.prev_button = $('#btn-prev');
        
        this.prev_button.on('click', function() {
            _this.prev();
        });

        this.reset();
    }
}

TutorialView.prototype = Object.create(View.prototype);
TutorialView.prototype.constructor = TutorialView

/*
function LessonTEMPLATEView(kwargs) {
    TutorialView.call(this, kwargs);

    var _this = this;

    this.main_view = kwargs.main_view;
    this.next_lesson = kwargs.next_lesson;

    this.template_root = 'teaching/lesson/TEMPLATE/';
    this.template = this.get_template('main');

    this.clear = function() {
        _this.text.html("");
    }

    this.update_math = function() {
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);
    }
        
    this.steps = [
        function step_00() {
            // Update the text
            _this.text.html(_this.get_template('step_00')());
        },
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

LessonTEMPLATEView.prototype = Object.create(TutorialView.prototype);
LessonTEMPLATEView.prototype.constructor = LessonTEMPLATEView
*/

function Lesson00View(kwargs) {
    TutorialView.call(this, kwargs);

    var _this = this;

    this.main_view = kwargs.main_view;
    this.next_lesson = kwargs.next_lesson;
    
    this.template_root = 'teaching/lesson/00/';
    this.template = this.get_template('main');
    
    this.clear = function() {
        _this.text.html("");
    }

    this.update_math = function() {
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);
    }
    
    this.steps = [
        function step_00() {
            // Hide the CFG
            _this.cfg_canvas.hide();

            // Update the text
            _this.text.html(_this.get_template('step_00')());
        },
        function step_01() {
            // Update the text
            _this.text.append(_this.get_template('step_01')());
        },
        function step_02() {
            _this.clear();
            // Show the CFG
            _this.cfg_canvas.show();
            
            // Reset the CFG code
            var iloc_code = _this.get_template('step_02', 'iloc')();
            _this.simulator.sim_code(iloc_code);

            // Update the text
            _this.text.append(_this.get_template('step_02')());
        },
        function step_03() {
            // Animate the nodes
            var index = 0;
            var timeout = 500;
            setTimeout(function animate_04() {
                if(_this.step == 3) {
                    if(index < _this.simulator.cfg.nodes.length - 1) {
                        _this.cfg_view.reset_highlight();
                        $('#graph-node-{0}'.format(index))
                            .attr("class", "node meet highlight");
                        index += 1;
                        setTimeout(animate_04, timeout);
                    } else if (index < _this.simulator.cfg.nodes.length) {
                        for(index = 0; index < _this.simulator.cfg.nodes.length; index++) {
                            $('#graph-node-{0}'.format(index))
                                .attr("class", "node meet highlight");
                        }
                    }
                }
            }, timeout);
            
            // Update the text
            _this.text.append(_this.get_template('step_03')());
        },
        function step_04() {
            // Animate the nodes
            var index = 1;
            var timeout = 500;
            setTimeout(function animate_05() {
                if(_this.step == 4) {
                    if(index < _this.simulator.cfg.nodes.length - 1) {
                        _this.cfg_view.reset_highlight();
                        _this.cfg_view.g.setEdge(
                            '{0}'.format(index-1),
                            '{0}'.format(index),
                            {
                                style: "stroke: #62abea;",
                                arrowheadStyle: "stroke: #62abea; fill: #62abea;",
                            }
                        );
                        index += 1;
                        setTimeout(animate_05, timeout);
                    } else if (index < _this.simulator.cfg.nodes.length) {
                        for(index = 1; index < _this.simulator.cfg.nodes.length; index++) {
                            _this.cfg_view.g.setEdge(
                                '{0}'.format(index-1),
                                '{0}'.format(index),
                                {
                                    style: "stroke: #62abea; stroke-width: 1.5px;",
                                    arrowheadStyle: "stroke: #62abea; fill: #62abea;",
                                }
                            );
                        }
                    }
                }
                _this.cfg_view.draw();
            }, timeout);
            
            // Update the text
            _this.text.append(_this.get_template('step_04')());
        },
        function step_05() {
            _this.cfg_view.reset_highlight();

            _this.cfg_view.show_all_points();
            _this.cfg_view.update();
            
            _this.text.append(_this.get_template('step_05')());
        },
        function step_06() {
            _this.clear();

            _this.cfg_view.show_touched_points();
            _this.cfg_view.update();
            
            _this.text.append(_this.get_template('step_06')());

            _this.cfg_view.g = new dagreD3.graphlib.Graph({compound:true})
                .setGraph({})
                .setDefaultEdgeLabel(function() { return {}; });

            _this.cfg_view.svg.html("");
            // Add the graph element to the SVG
            _this.cfg_view.svgGroup = _this.cfg_view.svg.append("g");

            _this.cfg_view.g.setNode('0',
                            {
                                labelType: 'html',
                                label: '</span style="font-family: monospace;">x<sub>1</sub> = 1<span>',
                                rx: 15,
                                ry: 15,
                            });

            _this.cfg_view.g.setNode('1',
                                     {
                                         label: '...',
                                         rx: 15,
                                         ry: 15,
                                         style: 'stroke: rgba(0,0,0,0);'
                                     });
            
            _this.cfg_view.g.setNode('2',
                                     {
                                         labelType: 'html',
                                         label: '<span style="font-family: monospace;">y<sub>1</sub> = x + 2</span>',
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

            _this.cfg_view.g.setNode('4',
                                     {
                                         labelType: 'html',
                                         label: '<span style="font-family: monospace;">x<sub>2</sub> = 7</span>',
                                         rx: 15,
                                         ry: 15,
                                     });
            
            _this.cfg_view.g.setNode('5',
                                     {
                                         label: '...',
                                         rx: 15,
                                         ry: 15,
                                         style: 'stroke: rgba(0,0,0,0);'
                                     });

            _this.cfg_view.g.setNode('6',
                                     {
                                         labelType: 'html',
                                         label: '<span style="font-family: monospace;">z<sub>1</sub> = x * 2</span>',
                                         rx: 15,
                                         ry: 15,
                                     });

            _this.cfg_view.g.setEdge('0','1');
            _this.cfg_view.g.setEdge('1','2', {labelType: 'html', label: 'x<sub>1</sub> reaches here!', labelPos: 'l'});
            _this.cfg_view.g.setEdge('1','3');
            _this.cfg_view.g.setEdge('3','4', {labelType: 'html', label: 'x<sub>2</sub> re-defines x...'});
            _this.cfg_view.g.setEdge('4','5');
            _this.cfg_view.g.setEdge('5','6', {labelType: 'html', label: '... so x<sub>1</sub> does not reach here!'});

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
        function step_07() {
            _this.cfg_view.init();
            _this.cfg_view.reset();
            
            _this.text.append(_this.get_template('step_07')());
        },
        function step_08() {
            _this.clear();
            _this.text.append(_this.get_template('step_08')());
        },
        function step_09() {
            _this.clear();
            _this.text.append(_this.get_template('step_09')());
        },
        function step_10() {
            _this.text.append(_this.get_template('step_10')());

            _this.simulator.step_forward();
        },
        function step_11() {
            _this.text.append(_this.get_template('step_11')());

            _this.simulator.step_forward();
        },
        function step_12() {
            _this.clear();
            _this.text.append(_this.get_template('step_12')());

            _this.simulator.step_forward();
        },
        function step_13() {
            _this.text.append(_this.get_template('step_13')());

            _this.simulator.step_forward();
        },
        function step_14() {
            _this.clear();
            _this.text.append(_this.get_template('step_14')());

            _this.simulator.step_forward();
        },
        function step_15() {
            _this.text.append(_this.get_template('step_15')());

            _this.simulator.step_forward();
        },
        function step_16() {
            _this.text.append(_this.get_template('step_16')());
        },
        function step_17() {
            _this.clear();
            
            _this.simulator.step_forward();
            
            _this.next_button.prop('disabled', true);

            _this.text.html(Handlebars.templates['teaching/question/canvas.hbs']());
            var question_view = new QuestionView({
                canvas: '#question-canvas',
                question: [
                    'What will the \\(\\text{Out}\\) set for the node',
                    '\\[\\texttt{add   ra, rb} \\; \\texttt{=>} \\; \\texttt{ra}_2\\]',
                    'be?'
                ],
                answers: [
                    {text: '\\(\\{\\texttt{ra}_1, \\texttt{rb}_1\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{ra}_2, \\texttt{rb}_1\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{ra}_1, \\texttt{rb}_2\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{ra}_2, \\texttt{rb}_2\\}\\)', correct: true}
                ],
                correct_callback: function() {
                    _this.next_button.prop('disabled', false);
                    _this.next()
                }
            });
            
            question_view.init();
        },
        function step_18() {
            _this.text.append(_this.get_template('step_18')());
            
            _this.simulator.step_forward();
        },
        function step_19() {
            _this.clear();
            _this.text.append(_this.get_template('step_19')());

            _this.simulator.fast_forward();
        },
        function step_20() {
            _this.clear();
            _this.text.append(_this.get_template('step_20')());
            
            $('#btn-goto-next-lesson').on('click', function() {
                _this.main_view.show_lesson(
                    _this.next_lesson
                );
            });
            
            $('#btn-goto-simulator').on('click', function() {
                _this.main_view.show_round_robin_simulator(
                    _this.get_template('step_02', 'iloc')()
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

Lesson00View.prototype = Object.create(TutorialView.prototype);
Lesson00View.prototype.constructor = Lesson00View


function Lesson01View(kwargs) {
    TutorialView.call(this, kwargs);

    var _this = this;

    this.main_view = kwargs.main_view;
    this.next_lesson = kwargs.next_lesson;

        
    this.template_root = 'teaching/lesson/01/';
    this.template = this.get_template('main');

    this.clear = function() {
        _this.text.html("");
    }

    this.update_math = function() {
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);
    }
    
    this.steps = [
        function step_00() {
            // Hide the CFG
            _this.cfg_canvas.hide();
            
            // Update the text
            _this.text.html(_this.get_template('step_00')());
        },
        function step_01() {
            // Update the text
            _this.clear();

            // Show the CFG
            _this.cfg_canvas.show();
            
            // Reset the CFG code
            var iloc_code = _this.get_template('branch', 'iloc')();
            _this.simulator.sim_code(iloc_code);
            
            _this.text.html(_this.get_template('step_01')());
            
        },
        function step_02() {
            // Update the text
            _this.text.html(_this.get_template('step_02')());

            _this.cfg_view.update();
            
            _this.simulator.advance(8);
        },
        function step_03() {
            _this.simulator.step_forward();
            
            // Update the text
            _this.text.append(_this.get_template('step_03')());
        },
        function step_04() {
            _this.simulator.step_forward();
            
            // Update the text
            _this.text.append(_this.get_template('step_04')());
        },
        function step_05() {
            _this.clear();

            _this.simulator.step_forward();
            
            // Update the text
            _this.text.append(_this.get_template('step_05')());
        },
        function step_06() {
            _this.simulator.step_forward();
            
            // Update the text
            _this.text.append(_this.get_template('step_06')());
        },
        function step_07() {
            _this.clear();

            _this.cfg_view.show_no_points();

            _this.cfg_view.add_point(_this.simulator.cfg.nodes[5], DFA.OUT);
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[6], DFA.OUT);
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[7], DFA.IN);
            
            _this.simulator.advance(2);

            _this.cfg_view.reset_highlight();
            
            // Update the text
            _this.text.append(_this.get_template('step_07')());
        },
        function step_08() {
            _this.cfg_view.show_touched_points();
            
            _this.simulator.step_forward();
            
            // Update the text
            _this.text.append(_this.get_template('step_08')());
        },
        function step_09() {
            _this.simulator.fast_forward();
            
            // Update the text
            _this.text.append(_this.get_template('step_09')());
        },
        function step_10() {
            // Update the text
            _this.clear();

            // Reset the CFG code
            var iloc_code = _this.get_template('loop', 'iloc')();
            _this.simulator.sim_code(iloc_code);
            
            _this.text.html(_this.get_template('step_10')());
        },
        function step_11() {
            _this.simulator.advance(6);
            
            // Update the text
            _this.text.append(_this.get_template('step_11')());
        },
        function step_12() {
            _this.clear();

            _this.cfg_view.show_no_points();
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[2], DFA.OUT);
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[3], DFA.IN);
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[6], DFA.OUT);
            _this.cfg_view.update();
            _this.cfg_view.reset_highlight();
            
            // Update the text
            _this.text.append(_this.get_template('step_12')());

        },
        function step_13() {
            _this.cfg_view.show_touched_points();
            
            _this.simulator.step_forward();
            
            // Update the text
            _this.text.append(_this.get_template('step_13')());
        },
        function step_14() {
            // Update the text
            _this.clear();

            _this.simulator.advance(9);
            
            _this.text.append(_this.get_template('step_14')());
        },
        function step_15() {
            _this.cfg_view.show_no_points();
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[6], DFA.OUT);
            _this.cfg_view.update();
            _this.cfg_view.reset_highlight();

            _this.text.append(_this.get_template('step_15')());
        },
        function step_16() {
            _this.cfg_view.show_touched_points();
            _this.simulator.step_forward();

            _this.text.append(_this.get_template('step_16')());
        },
        function step_17() {
            _this.cfg_view.show_no_points();
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[2], DFA.OUT);
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[3], DFA.IN);
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[6], DFA.OUT);
            _this.simulator.advance(5);
            _this.cfg_view.reset_highlight();

            _this.text.append(_this.get_template('step_17')());
        },
        function step_18() {
            _this.cfg_view.show_touched_points();
            _this.simulator.step_forward();

            _this.text.append(_this.get_template('step_18')());
        },
        function step_19() {
            _this.clear();
            
            _this.simulator.step_forward();

            _this.text.append(_this.get_template('step_19')());

        },
        function step_20() {
            _this.simulator.step_forward();
        },
        function step_21() {
            _this.simulator.step_forward();
        },
        function step_22() {
            _this.simulator.step_forward();
        },
        function step_23() {
            _this.simulator.step_forward();
        },
        function step_24() {
            _this.simulator.step_forward();
        },
        function step_25() {
            _this.simulator.step_forward();
        },
        function step_26() {
            _this.simulator.step_forward();
        },
        function step_27() {
            _this.simulator.step_forward();

            _this.text.append(_this.get_template('step_27')());
        },
        function step_28() {
            _this.simulator.play();
        },
        function step_29() {
            _this.simulator.fast_forward();

            _this.text.append(_this.get_template('step_29')());
        },
        function step_30() {
            _this.clear();

            _this.text.append(_this.get_template('step_30')());
            
            $('#btn-goto-next-lesson').on('click', function() {
                _this.main_view.show_lesson(
                    _this.next_lesson
                );
            });
            
            $('#btn-goto-branch-simulator').on('click', function() {
                _this.main_view.show_round_robin_simulator(
                    _this.get_template('branch', 'iloc')()
                );
            });

            $('#btn-goto-loop-simulator').on('click', function() {
                _this.main_view.show_round_robin_simulator(
                    _this.get_template('loop', 'iloc')()
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
            simulator: this.simulator,
            draw_points: CFG_FLAGS.SHOW_TOUCHED_POINTS,
        });
        
        this.cfg_view.init();        
    }    
}

Lesson01View.prototype = Object.create(TutorialView.prototype);
Lesson01View.prototype.constructor = Lesson01View

var QFLAGS = {
    DISABLE_INCORRECT_NONE: 0,
    DISABLE_INCORRECT_ONE : 1,
    DISABLE_INCORRECT_ALL : 2,
    DISABLE_CORRECT_NONE  : 4,
    DISABLE_CORRECT_ONE   : 8,
    DISABLE_CORRECT_ALL   : 16,

    SHOW_INCORRECT_ONE : 0,
    SHOW_INCORRECT_ALL : 1,
    SHOW_CORRECT_ONE   : 0,
    SHOW_CORRECT_ALL   : 2,
}

function QuestionView(kwargs) {
    View.call(this, kwargs);

    var _this = this;

    this.correct_callback = kwargs.correct_callback || (function() {});
    this.incorrect_callback = kwargs.incorrect_callback || (function() {});
    
    this.show_on_click = kwargs.show_on_click || (QFLAGS.SHOW_CORRECT_ALL | QFLAGS.SHOW_INCORRECT_ONE);
    this.disable_on_click = kwargs.disable_on_click || (QFLAGS.DISABLE_CORRECT_ALL | QFLAGS.DISABLE_INCORRECT_ONE);

    this.template_root = 'teaching/question/';
    this.template = this.get_template('main');

    this.highlight_answers = function() {
        $("button.btn-answer").each(function(){
            if ($(this).hasClass('correct')) {
                $(this).addClass('btn-success');
            } else {
                $(this).addClass('btn-danger');
            }
            $(this).removeClass('btn-primary');
        });
    }
    
    this.incorrect_answer = function(elem) {
        if(this.show_on_click & QFLAGS.SHOW_INCORRECT_ALL) {
            this.highlight_answers();
        } else {
            elem.addClass('btn-danger').removeClass('btn-primary');
        }

        if(this.disable_on_click & QFLAGS.DISABLE_INCORRECT_ALL) {
            this.set_answers_disabled(true);
        } else if(this.disable_on_click & QFLAGS.DISABLE_INCORRECT_ONE) {
            elem.prop('disabled', true);
        }
        
        this.incorrect_callback();
    }

    this.correct_answer = function(elem) {
        if(this.show_on_click & QFLAGS.SHOW_CORRECT_ALL) {
            this.highlight_answers();
        } else {
            elem.addClass('btn-success').removeClass('btn-primary');
        }
        
        if(this.disable_on_click & QFLAGS.DISABLE_CORRECT_ALL) {
            this.set_answers_disabled(true);
        } else if(this.disable_on_click & QFLAGS.DISABLE_CORRECT_ONE) {
            elem.prop('disabled', true);
        }
        
        this.correct_callback();
    }

    this.reset_highlight = function() {
        $("button.btn-answer").each(function() {
            $(this).removeClass('btn-success')
                .removeClass('btn-danger')
                .addClass('btn-primary');
        });
    }

    this.set_answers_disabled = function(flag) {
        $("button.btn-answer").each(function() {
            $(this).prop('disabled', flag);
        });
    }
    
    this.reset = function() {
        this.reset_highlight();
        this.set_answers_disabled(false);
    }
    
    this.init = function() {
        this.canvas.html(this.template({
            question: kwargs.question,
            answers: shuffle(kwargs.answers)
        }));

        $("button.btn-answer").each(function(){
            if ($(this).hasClass('correct')) {
                $(this).on('click', function() {
                    _this.correct_answer($(this));
                });
            } else {
                $(this).on('click', function() {
                    _this.incorrect_answer($(this));
                });
            }
        });

        MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.canvas.id]);
    }
}
