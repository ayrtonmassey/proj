function LessonRoundRobinView(kwargs) {
    TutorialView.call(this, kwargs);

    var _this = this;

    this.main_view = kwargs.main_view;
    this.next_lesson = kwargs.next_lesson;

    this.template_root = 'teaching/lesson/roundrobin/';
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
            _this.results_canvas.hide();
            _this.cfg_canvas.hide();
        },
        function step_01() {
            _this.step_title.html("The Round Robin Algorithm");
            _this.clear();
            _this.text.html(_this.get_template('step_01')());            
        },
        function step_02() {
            _this.clear();
            _this.text.html(_this.get_template('step_02')());
        },
        function step_03() {
            _this.text.append(_this.get_template('step_03')());

            _this.text.append(Handlebars.templates['simulator/results/canvas.hbs']());

            _this.results_canvas.show();
            _this.cfg_canvas.show();

            var iloc_code=_this.get_template('step_03','iloc')();
            _this.simulator.sim_code(iloc_code);
        },
        function step_04() {
            _this.clear();
            
            _this.text.append(_this.get_template('step_04')());

            $('.set-defgen').each(function() {
                $(this).addClass('meet').addClass('highlight');
            });
            $('.set-defkill').each(function() {
                $(this).addClass('meet').addClass('highlight');
            });
        },
        function step_05() {
            _this.cfg_view.show_touched_points();
            
            _this.simulator.step_forward();
            
            _this.text.append(_this.get_template('step_05')());
        },
        function step_06() {
            _this.clear();
            
            _this.text.append(_this.get_template('step_06')());
        },
        function step_07() {
            _this.simulator.step_forward();
        },
        function step_08() {
            _this.simulator.step_forward();
        },
        function step_09() {
            _this.simulator.step_forward();
        },
        function step_10() {
            _this.simulator.step_forward();
        },
        function step_11() {
            _this.simulator.step_forward();
        },
        function step_12() {
            _this.simulator.step_forward();
        },
        function step_13() {
            _this.simulator.step_forward();
        },
        function step_14() {
            _this.simulator.step_forward();
        },
        function step_15() {
            _this.simulator.step_forward();
        },
        function step_16() {
            _this.simulator.step_forward();
        },
        function step_17() {
            _this.simulator.step_forward();
        },
        function step_18() {
            _this.text.append(_this.get_template('step_18')());            
        },
        function step_19() {
            _this.clear();
            _this.cfg_view.show_no_points();
            _this.cfg_view.update();

            _this.simulator.reset();
            _this.simulator.advance(12);
            _this.cfg_view.reset_highlight();
            
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[0], DFA.IN);
            
            _this.cfg_view.draw();

            _this.text.append(Handlebars.templates['teaching/question/canvas.hbs']());
            _this.next_button.prop('disabled', true);
            var question_view = new QuestionView({
                canvas: '#question-canvas',
                question: [
                    '\\[\\text{In}(n) = \\bigcup_{p \\in preds} \\text{Out}(p)\\]',
                    'What is the value of \\(\\text{In}(n_0)\\)?',
                ],
                answers: [
                    {text: '\\(\\{\\texttt{ra}_1\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{ra}\\}\\)', correct: false},
                    {text: '\\(\\{\\}\\)', correct: true},
                    {text: '\\(\\{\\texttt{0}\\}\\)', correct: false}
                ],
                shuffle_answers: true,                
                correct_callback: function() {
                    _this.simulator.step_forward();
                    _this.text.append(_this.get_template('step_19_ans')());
                    MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);
                    _this.next_button.prop('disabled', false);
                }
            });
            
            question_view.init();
        },
        function step_20() {
            _this.clear();
            _this.cfg_view.show_no_points();
            _this.cfg_view.update();

            _this.simulator.reset();
            _this.simulator.advance(13);
            _this.cfg_view.reset_highlight();
            
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[0], DFA.IN);
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[0], DFA.OUT);
            
            _this.cfg_view.draw();

            _this.text.append(Handlebars.templates['teaching/question/canvas.hbs']());
            _this.next_button.prop('disabled', true);
            var question_view = new QuestionView({
                canvas: '#question-canvas',
                question: [
                    '\\[ \\text{Out}(n) = \\text{DefGen}(n) \\cup \\big{(}\\text{In}(n) \\setminus \\text{DefKill}(n)\\big{)} \\]',
                    'What is the value of \\(\\text{Out}(n_0)\\)?',
                ],
                answers: [
                    {text: '\\(\\{\\texttt{ra}_1\\}\\)', correct: true},
                    {text: '\\(\\{\\texttt{ra}\\}\\)', correct: false},
                    {text: '\\(\\{\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{0}\\}\\)', correct: false}
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
            _this.cfg_view.show_no_points();
            _this.cfg_view.update();

            _this.simulator.reset();
            _this.simulator.advance(14);
            _this.cfg_view.reset_highlight();
            
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[0], DFA.OUT);
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[3], DFA.OUT);
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[1], DFA.IN);
            
            _this.cfg_view.draw();

            _this.text.append(Handlebars.templates['teaching/question/canvas.hbs']());
            _this.next_button.prop('disabled', true);
            var question_view = new QuestionView({
                canvas: '#question-canvas',
                question: [
                    '\\[\\text{In}(n) = \\bigcup_{p \\in preds} \\text{Out}(p)\\]',
                    'What is the value of \\(\\text{In}(n_1)\\)?',
                ],
                answers: [
                    {text: '\\(\\{\\texttt{ra}_1\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{ra}_1, \\texttt{rc}_1, \\texttt{ra}_2\\}\\)', correct: true},
                    {text: '\\(\\{\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{rc}_1, \\texttt{ra}_2\\}\\)', correct: false}
                ],
                shuffle_answers: true,
                correct_callback: function() {
                    _this.simulator.step_forward();
                    _this.text.append(_this.get_template('step_21_ans')());
                    MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);
                    _this.next_button.prop('disabled', false);
                }
            });
            
            question_view.init();
        },
        function step_22() {
            _this.clear();
            _this.cfg_view.show_no_points();
            _this.cfg_view.update();

            _this.simulator.reset();
            _this.simulator.advance(15);
            _this.cfg_view.reset_highlight();
            
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[1], DFA.IN);
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[1], DFA.OUT);
            
            _this.cfg_view.draw();

            _this.text.append(Handlebars.templates['teaching/question/canvas.hbs']());
            _this.next_button.prop('disabled', true);
            var question_view = new QuestionView({
                canvas: '#question-canvas',
                question: [
                    '\\[ \\text{Out}(n) = \\text{DefGen}(n) \\cup \\big{(}\\text{In}(n) \\setminus \\text{DefKill}(n)\\big{)} \\]',
                    'What is the value of \\(\\text{Out}(n_1)\\)?',
                ],
                answers: [
                    {text: '\\(\\{\\texttt{ra}_1, \\texttt{rc}_1\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{ra}_1, \\texttt{rc}_1, \\texttt{ra}_2\\}\\)', correct: false},
                    {text: '\\(\\{\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{ra}_2, \\texttt{rc}_1\\}\\)', correct: true}
                ],
                shuffle_answers: true,
                correct_callback: function() {
                    _this.simulator.step_forward();
                    _this.text.append(_this.get_template('step_22_ans')());
                    MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);
                    _this.next_button.prop('disabled', false);
                }
            });
            
            question_view.init();
        },
        function step_23() {
            _this.clear();
            _this.cfg_view.show_no_points();
            _this.cfg_view.update();

            _this.simulator.reset();
            _this.simulator.advance(16);
            _this.cfg_view.reset_highlight();

            _this.cfg_view.add_point(_this.simulator.cfg.nodes[1], DFA.OUT);
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[2], DFA.IN);
            
            _this.cfg_view.draw();

            _this.text.append(Handlebars.templates['teaching/question/canvas.hbs']());
            _this.next_button.prop('disabled', true);
            var question_view = new QuestionView({
                canvas: '#question-canvas',
                question: [
                    '\\[\\text{In}(n) = \\bigcup_{p \\in preds} \\text{Out}(p)\\]',
                    'What is the value of \\(\\text{In}(n_2)\\)?',
                ],
                answers: [
                    {text: '\\(\\{\\texttt{ra}_2\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{rc}_1\\}\\)', correct: false},
                    {text: '\\(\\{\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{ra}_2, \\texttt{rc}_1\\}\\)', correct: true}
                ],
                shuffle_answers: true,
                correct_callback: function() {
                    _this.simulator.step_forward();
                    _this.text.append(_this.get_template('step_23_ans')());
                    MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);
                    _this.next_button.prop('disabled', false);
                }
            });
            
            question_view.init();
        },
        function step_24() {
            _this.clear();
            _this.cfg_view.show_no_points();
            _this.cfg_view.update();

            _this.simulator.reset();
            _this.simulator.advance(17);
            _this.cfg_view.reset_highlight();
            
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[2], DFA.IN);
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[2], DFA.OUT);
            
            _this.cfg_view.draw();

            _this.text.append(Handlebars.templates['teaching/question/canvas.hbs']());
            _this.next_button.prop('disabled', true);
            var question_view = new QuestionView({
                canvas: '#question-canvas',
                question: [
                    '\\[ \\text{Out}(n) = \\text{DefGen}(n) \\cup \\big{(}\\text{In}(n) \\setminus \\text{DefKill}(n)\\big{)} \\]',
                    'What is the value of \\(\\text{Out}(n_2)\\)?',
                ],
                answers: [
                    {text: '\\(\\{\\texttt{ra}_2\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{rc}_2\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{rc}_1\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{rc}_1, \\texttt{ra}_2\\}\\)', correct: true}
                ],
                shuffle_answers: true,
                correct_callback: function() {
                    _this.simulator.step_forward();
                    _this.text.append(_this.get_template('step_24_ans')());
                    MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);
                    _this.next_button.prop('disabled', false);
                }
            });
            
            question_view.init();
        },
        function step_25() {
            _this.clear();
            _this.cfg_view.show_no_points();
            _this.cfg_view.update();

            _this.simulator.reset();
            _this.simulator.advance(18);
            _this.cfg_view.reset_highlight();

            _this.cfg_view.add_point(_this.simulator.cfg.nodes[2], DFA.OUT);
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[3], DFA.IN);
            
            _this.cfg_view.draw();

            _this.text.append(Handlebars.templates['teaching/question/canvas.hbs']());
            _this.next_button.prop('disabled', true);
            var question_view = new QuestionView({
                canvas: '#question-canvas',
                question: [
                    '\\[\\text{In}(n) = \\bigcup_{p \\in preds} \\text{Out}(p)\\]',
                    'What is the value of \\(\\text{In}(n_3)\\)?',
                ],
                answers: [
                    {text: '\\(\\{\\texttt{ra}_3, \\texttt{rc}_1\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{rb}_1, \\texttt{ra}_2, \\texttt{rc}_1\\}\\)', correct: false},
                    {text: '\\(\\{\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{ra}_2, \\texttt{rc}_1\\}\\)', correct: true}
                ],
                shuffle_answers: true,
                correct_callback: function() {
                    _this.simulator.step_forward();
                    _this.text.append(_this.get_template('step_25_ans')());
                    MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);
                    _this.next_button.prop('disabled', false);
                }
            });
            
            question_view.init();
        },
        function step_26() {
            _this.clear();
            _this.cfg_view.show_no_points();
            _this.cfg_view.update();

            _this.simulator.reset();
            _this.simulator.advance(19);
            _this.cfg_view.reset_highlight();
            
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[3], DFA.IN);
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[3], DFA.OUT);
            
            _this.cfg_view.draw();

            _this.text.append(Handlebars.templates['teaching/question/canvas.hbs']());
            _this.next_button.prop('disabled', true);
            var question_view = new QuestionView({
                canvas: '#question-canvas',
                question: [
                    '\\[ \\text{Out}(n) = \\text{DefGen}(n) \\cup \\big{(}\\text{In}(n) \\setminus \\text{DefKill}(n)\\big{)} \\]',
                    'What is the value of \\(\\text{Out}(n_3)\\)?',
                ],
                answers: [
                    {text: '\\(\\{\\texttt{ra}_3, \\texttt{rb}_1, \\texttt{rc}_1\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{rb}_1, \\texttt{ra}_2, \\texttt{rc}_1\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{ra}_3, \\texttt{rc}_1\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{ra}_2, \\texttt{rc}_1\\}\\)', correct: true}
                ],
                shuffle_answers: true,
                correct_callback: function() {
                    _this.simulator.step_forward();
                    _this.text.append(_this.get_template('step_26_ans')());
                    MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);
                    _this.next_button.prop('disabled', false);
                }
            });
            
            question_view.init();
        },
        function step_27() {
            _this.clear();
            _this.cfg_view.show_no_points();
            _this.cfg_view.update();

            _this.simulator.reset();
            _this.simulator.advance(20);
            _this.cfg_view.reset_highlight();

            _this.cfg_view.add_point(_this.simulator.cfg.nodes[3], DFA.OUT);
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[4], DFA.IN);
            
            _this.cfg_view.draw();

            _this.text.append(Handlebars.templates['teaching/question/canvas.hbs']());
            _this.next_button.prop('disabled', true);
            var question_view = new QuestionView({
                canvas: '#question-canvas',
                question: [
                    '\\[\\text{In}(n) = \\bigcup_{p \\in preds} \\text{Out}(p)\\]',
                    'What is the value of \\(\\text{In}(n_4)\\)?',
                ],
                answers: [
                    {text: '\\(\\{\\texttt{ra}_3, \\texttt{rc}_1\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{rb}_1, \\texttt{ra}_2, \\texttt{rc}_1\\}\\)', correct: false},
                    {text: '\\(\\{\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{ra}_2, \\texttt{rc}_1\\}\\)', correct: true}
                ],
                shuffle_answers: true,
                correct_callback: function() {
                    _this.simulator.step_forward();
                    _this.text.append(_this.get_template('step_27_ans')());
                    MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);
                    _this.next_button.prop('disabled', false);
                }
            });
            
            question_view.init();
        },
        function step_28() {
            _this.clear();
            _this.cfg_view.show_no_points();
            _this.cfg_view.update();

            _this.simulator.reset();
            _this.simulator.advance(21);
            _this.cfg_view.reset_highlight();
            
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[4], DFA.IN);
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[4], DFA.OUT);
            
            _this.cfg_view.draw();

            _this.text.append(Handlebars.templates['teaching/question/canvas.hbs']());
            _this.next_button.prop('disabled', true);
            var question_view = new QuestionView({
                canvas: '#question-canvas',
                question: [
                    '\\[ \\text{Out}(n) = \\text{DefGen}(n) \\cup \\big{(}\\text{In}(n) \\setminus \\text{DefKill}(n)\\big{)} \\]',
                    'What is the value of \\(\\text{Out}(n_4)\\)?',
                ],
                answers: [
                    {text: '\\(\\{\\texttt{ra}_3, \\texttt{rb}_1, \\texttt{rc}_1\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{rb}_1, \\texttt{ra}_2, \\texttt{rc}_1\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{ra}_3, \\texttt{rc}_1\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{ra}_2, \\texttt{rc}_1\\}\\)', correct: true}
                ],
                shuffle_answers: true,
                correct_callback: function() {
                    _this.simulator.step_forward();
                    _this.text.append(_this.get_template('step_28_ans')());
                    MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);
                    _this.next_button.prop('disabled', false);
                }
            });
            
            question_view.init();
        },
        function step_29() {
            _this.clear();
            _this.cfg_view.show_no_points();
            _this.cfg_view.update();

            _this.simulator.reset();
            _this.simulator.advance(22);
            _this.cfg_view.reset_highlight();

            _this.cfg_view.add_point(_this.simulator.cfg.nodes[4], DFA.OUT);
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[5], DFA.IN);
            
            _this.cfg_view.draw();

            _this.text.append(Handlebars.templates['teaching/question/canvas.hbs']());
            _this.next_button.prop('disabled', true);
            var question_view = new QuestionView({
                canvas: '#question-canvas',
                question: [
                    '\\[\\text{In}(n) = \\bigcup_{p \\in preds} \\text{Out}(p)\\]',
                    'What is the value of \\(\\text{In}(n_5)\\)?',
                ],
                answers: [
                    {text: '\\(\\{\\texttt{rb}_1, \\texttt{rc}_1\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{rb}_1, \\texttt{ra}_2, \\texttt{rc}_1\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{rb}_1, \\texttt{ra}_2\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{ra}_2, \\texttt{rc}_1\\}\\)', correct: true}
                ],
                shuffle_answers: true,
                correct_callback: function() {
                    _this.simulator.step_forward();
                    _this.text.append(_this.get_template('step_29_ans')());
                    MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);
                    _this.next_button.prop('disabled', false);
                }
            });
            
            question_view.init();
        },
        function step_30() {
            _this.clear();
            _this.cfg_view.show_no_points();
            _this.cfg_view.update();

            _this.simulator.reset();
            _this.simulator.advance(23);
            _this.cfg_view.reset_highlight();
            
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[5], DFA.IN);
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[5], DFA.OUT);
            
            _this.cfg_view.draw();

            _this.text.append(Handlebars.templates['teaching/question/canvas.hbs']());
            _this.next_button.prop('disabled', true);
            var question_view = new QuestionView({
                canvas: '#question-canvas',
                question: [
                    '\\[ \\text{Out}(n) = \\text{DefGen}(n) \\cup \\big{(}\\text{In}(n) \\setminus \\text{DefKill}(n)\\big{)} \\]',
                    'What is the value of \\(\\text{Out}(n_5)\\)?',
                ],
                answers: [
                    {text: '\\(\\{\\texttt{rb}_1, \\texttt{rc}_1\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{rb}_1, \\texttt{ra}_2, \\texttt{rc}_1\\}\\)', correct: true},
                    {text: '\\(\\{\\texttt{rb}_1, \\texttt{ra}_2\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{ra}_2, \\texttt{rc}_1\\}\\)', correct: false}
                ],
                shuffle_answers: true,
                correct_callback: function() {
                    _this.simulator.step_forward();
                    _this.text.append(_this.get_template('step_30_ans')());
                    MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);
                    _this.next_button.prop('disabled', false);
                }
            });
            
            question_view.init();
        },
        function step_31() {
            _this.clear();
            _this.cfg_view.show_no_points();
            _this.cfg_view.update();

            _this.simulator.reset();
            _this.simulator.advance(24);

            _this.text.append(Handlebars.templates['teaching/question/canvas.hbs']());
            _this.next_button.prop('disabled', true);
            var question_view = new QuestionView({
                canvas: '#question-canvas',
                question: [
                    'We\'ve finished another round, and it looks like we\'ve got the right values now.',
                    'Do we need to perform another round?',
                ],
                answers: [
                    {text: 'Yes', correct: true},
                    {text: 'No', correct: false}
                ],
                shuffle_answers: true,
                correct_callback: function() {
                    _this.simulator.play();
                    _this.text.append(_this.get_template('step_31_ans')());
                    MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);
                    _this.next_button.prop('disabled', false);
                }
            });
            
            question_view.init();
        },
        function step_32() {
            _this.clear();
            _this.simulator.fast_forward();
            _this.text.append(_this.get_template('step_32')());
        },
        function step_33() {
            _this.results_canvas.hide();
            
            _this.text.append(_this.get_template('step_33')());
        },
        function step_34() {
            _this.text.append(_this.get_template('step_34')());
        },
        function step_35() {
            _this.clear();
            _this.text.append(_this.get_template('step_35')());
        },
        function step_36() {
            _this.cfg_view.show_touched_points();
            _this.results_canvas.show();

            _this.text.append(_this.get_template('step_36')());
            
            _this.text.append(Handlebars.templates['simulator/sim_controls/canvas.hbs']());
            var controls_view = new SimControlsView({
                canvas: '#sim-controls-canvas',
                simulator: _this.simulator,
            });
            
            controls_view.init();

            _this.simulator.ordering=DFA.POSTORDER;
            _this.simulator.init();
            _this.simulator.reset();
        },
        function step_37() {
            _this.clear();
            
            _this.text.append(_this.get_template('step_37')());

            _this.results_canvas.hide();
        },
        function step_38() {            
            _this.text.append(_this.get_template('step_38')());
        },
        function step_39() {
            _this.step_title.html("Summary");
            
            _this.clear();
            
            _this.text.append(_this.get_template('step_39')());

            $('#btn-goto-next-lesson').on('click', function() {
                _this.main_view.show_lesson(
                    _this.next_lesson
                );
            });
            
            $('#btn-goto-simulator').on('click', function() {
                _this.main_view.show_round_robin_simulator(
                    _this.get_template('step_03', 'iloc')()
                );
            });
            
            $('#btn-goto-menu').on('click', function() {
                _this.main_view.show_menu();
            });
        }
    ];

    this.init_children = function() {
        $('#page-title').html(this.title);
        
        this.results_canvas = $('#results-canvas');
        this.cfg_canvas = $('#cfg-canvas');

        this.results_view = new RoundRobinResultsView({
            canvas: '#results-canvas',
            simulator: this.simulator,
        });
        
        this.cfg_view = new CFGView({
            canvas: '#cfg-canvas',
            simulator: this.simulator
        });

        this.results_view.init();
        this.cfg_view.init();
    }
}

LessonIntroView.prototype = Object.create(TutorialView.prototype);
LessonIntroView.prototype.constructor = LessonIntroView
