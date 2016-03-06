function LessonGenericFrameworkView(kwargs) {
    TutorialView.call(this, kwargs);

    var _this = this;

    this.main_view = kwargs.main_view;
    this.next_lesson = kwargs.next_lesson;

    this.template_root = 'teaching/lesson/generic/';
    this.template = this.get_template('main');
        
    this.clear = function() {
        _this.text.html("");
    }

    this.update_math = function() {
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);
    }

    this.steps = [
        function step_00() {
            _this.clear();
            _this.step_title.html("Introduction");
            // Update the text
            _this.text.append(_this.get_template('step_00')());
        },
        function step_01() {
            _this.step_title.html("Generic Frameworks for Data-Flow Analysis");
            _this.clear();
            _this.text.append(_this.get_template('step_01')());            
        },
        function step_02() {
            _this.text.append(_this.get_template('step_02')());
        },
        function step_03() {
            _this.text.append(_this.get_template('step_03')());
        },
        function step_04() {
            _this.clear();
            _this.text.append(_this.get_template('step_04')());
        },
        function step_05() {
            _this.text.append(_this.get_template('step_05')());
            $('#framework-domain').prop('style', 'background-color: #72abfa; color: #fff; font-weight: bold;')
        },
        function step_06() {
            $('.lesson-generic-description').remove();
            _this.text.append(_this.get_template('step_06')());
            $('#framework-domain').prop('style','');
            $('#framework-direction').prop('style', 'background-color: #72abfa; color: #fff; font-weight: bold')
        },
        function step_07() {
            $('.lesson-generic-description').remove();
            _this.text.append(_this.get_template('step_07')());
            $('#framework-direction').prop('style','');
            $('#framework-transfer').prop('style', 'background-color: #72abfa; color: #fff; font-weight: bold')
        },
        function step_08() {
            $('.lesson-generic-description').remove();
            _this.text.append(_this.get_template('step_08')());
            $('#framework-transfer').prop('style','');
            $('#framework-meet').prop('style', 'background-color: #72abfa; color: #fff; font-weight: bold')
        },
        function step_09() {
            $('.lesson-generic-description').remove();
            _this.text.append(_this.get_template('step_09')());
            $('#framework-meet').prop('style','');
            $('#framework-boundary').prop('style', 'background-color: #72abfa; color: #fff; font-weight: bold')
        },
        function step_10() {
            $('.lesson-generic-description').remove();
            _this.text.append(_this.get_template('step_10')());
            $('#framework-boundary').prop('style','');
            $('#framework-initial').prop('style', 'background-color: #72abfa; color: #fff; font-weight: bold')
        },
        function step_11() {
            $('.lesson-generic-description').remove();
            $('#framework-initial').prop('style','');
            _this.text.append(_this.get_template('step_11')());
        },
        function step_12() {
            _this.text.append(_this.get_template('step_12')());
        },
        function step_13() {
            _this.step_title.html("Forward Analysis Algorithm");
            _this.clear();
            _this.text.append(_this.get_template('step_13-18')({
                hs2: true,
                hs3: true,
                hs4: true,
                hs5: true,
                hs6: true,
            }));
        },
        function step_14() {
            _this.clear();
            _this.text.append(_this.get_template('step_13-18')({
                hs2: false,
                hs3: true,
                hs4: true,
                hs5: true,
                hs6: true,
            }));
        },
        function step_15() {
            _this.clear();
            _this.text.append(_this.get_template('step_13-18')({
                hs2: false,
                hs3: false,
                hs4: true,
                hs5: true,
                hs6: true,
            }));
        },
        function step_16() {
            _this.clear();
            _this.text.append(_this.get_template('step_13-18')({
                hs2: false,
                hs3: false,
                hs4: false,
                hs5: true,
                hs6: true,
            }));
        },
        function step_17() {
            _this.clear();
            _this.text.append(_this.get_template('step_13-18')({
                hs2: false,
                hs3: false,
                hs4: false,
                hs5: false,
                hs6: true,
            }));
        },
        function step_18() {
            _this.clear();
            _this.text.append(_this.get_template('step_13-18')({
                hs2: false,
                hs3: false,
                hs4: false,
                hs5: false,
                hs6: false,
            }));
        },
        function step_19() {
            _this.text.append(_this.get_template('step_19')());
        },
        function step_20() {
            _this.step_title.html("Backward Analysis Algorithm");
            _this.clear();
            _this.text.append(_this.get_template('step_20')());
        },
        function step_21() {
            _this.step_title.html("Conditions for Termination");
            _this.clear();
            _this.text.append(_this.get_template('step_21')());
        },
        function step_22() {
            _this.text.append(_this.get_template('step_22')());
        },
        function step_23() {
            _this.text.append(_this.get_template('step_23')());
        },
        function step_24() {
            _this.clear();
            _this.step_title.html("The Identity Function");
            _this.text.append(_this.get_template('step_24')());
        },
        function step_25() {
            $('#left-column')
                .removeClass('col-xs-offset-2')
                .after('<div id="cfg-canvas" class="col-xs-4"></div>');

            _this.cfg_view = new CFGView({
                canvas: "#cfg-canvas",
                simulator: _this.simulator,
            });

            _this.cfg_view.init();

            var iloc_code = _this.get_template('step_25','iloc')();
            _this.simulator.sim_code(iloc_code);

            _this.cfg_view.hide_points();
            _this.simulator.fast_forward();
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[1], DFA.IN);
            _this.cfg_view.add_point(_this.simulator.cfg.nodes[1], DFA.OUT);

            _this.cfg_view.reset_highlight();
            _this.cfg_view.draw();

            _this.text.append(_this.get_template('step_25')());
        },
        function step_26() {
            _this.clear();

            _this.step_title.html("Set Closure");
            
            $('#left-column')
                .addClass('col-xs-offset-2');

            $('#cfg-canvas').remove();

            _this.cfg_view = undefined;

            _this.text.append(_this.get_template('step_26')());
        },
        function step_27() {
            _this.text.append(_this.get_template('step_27')());
        },
        function step_28() {
            _this.text.append(_this.get_template('step_28')());
        },
        function step_29() {
            _this.text.append(_this.get_template('step_29')());
        },
        function step_30() {
            _this.text.append(_this.get_template('step_30')());
        },
        function step_31() {
            _this.clear();

            _this.step_title.html("Monotonic Functions");
            
            _this.text.append(_this.get_template('step_31')());
        },
        function step_32() {
            _this.text.append(Handlebars.templates['teaching/question/canvas.hbs']());
            _this.next_button.prop('disabled', true);
            var question_view = new QuestionView({
                canvas: '#question-canvas',
                question: [
                    'Which of the following functions are monotonic?',
                ],
                answers: [
                    {text: '\\(f(x) = -x\\)', correct: true,
                     pick_text: 'Correct! As \\(x\\) increases, \\(-x\\) decreases.'},
                    {text: '\\(f(x) = x^2\\)', correct: false,
                     pick_text: 'Incorrect! \\(x^2\\) <strong>decreases</strong> when \\(x < 0\\), but <strong>increases</strong> when \\(x > 0\\).'},
                    {text: '\\(f(x) = x^3\\)', correct: true,
                     pick_text: 'Correct! As \\(x\\) increases, so does \\(x^3\\).'},
                    {text: '\\(f(x) = \\lvert x \\rvert \\)', correct: false,
                     pick_text: 'Incorrect! \\(\\lvert x \\rvert\\) <strong>decreases</strong> when \\(x < 0\\), but <strong>increases</strong> when \\(x > 0\\).'},
                    {text: '\\(f(x) = sin(x)\\)', correct: false,
                     pick_text: 'Incorrect! The value of \\(sin(x)\\) oscillates between \\(-1\\) and \\(1\\).'},
                    {text: '\\(f(x) = \\lfloor x \\rfloor \\)', correct: true,
                     pick_text: 'Correct! The floor function, \\( \\lfloor x \\rfloor \\), is equal to \\(x\\) rounded down to the nearest whole number. As x increases \\(f(x)\\) increases or stays the same.'},
                ],
                correct_callback: function() {
                    if (question_view.all_correct_answered()) {
                        console.log("penis");
                        question_view.highlight_answers();
                        question_view.set_answers_disabled(true);
                        _this.next_button.prop('disabled', false);
                    }
                },
                show_on_click: QFLAGS.SHOW_CORRECT_ONE | QFLAGS.SHOW_INCORRECT_ONE,
                disable_on_click: QFLAGS.DISABLE_CORRECT_ONE | QFLAGS.DISABLE_INCORRECT_ONE,
            });

            console.log(QFLAGS.SHOW_CORRECT_ONE | QFLAGS.SHOW_INCORRECT_ONE);
            
            question_view.init();
        },
        function step_33() {
            _this.clear();

            _this.text.append(_this.get_template('step_33')());
        },
        function step_34() {
            $('#left-column')
                .removeClass('col-xs-offset-2')
                .after('<div id="lattice-canvas" class="col-xs-4"></div>');

            _this.lattice_view = new LatticeView({
                canvas: "#lattice-canvas",
                simulator: _this.simulator,
                display_toggle: false,
            });

            _this.lattice_view.init();
            _this.lattice_view.reset();
            
            _this.text.append(_this.get_template('step_34')());
        },
        function step_35() {
            _this.text.append(_this.get_template('step_35')());
        },
        function step_36() {
            _this.clear();
            _this.text.append(_this.get_template('step_36')());
            _this.step_title.html("The Meet Semi-lattice");
        },
        function step_37() {
            var nclass = $('#lattice-node-1').attr('class');
            $('#lattice-node-1').attr('class', '{0} {1} {2} {3}'.format(nclass, 'meet', 'highlight', 'read'));
            
            var nclass = $('#lattice-node-3').attr('class');
            $('#lattice-node-3').attr('class', '{0} {1} {2} {3}'.format(nclass, 'meet', 'highlight', 'read'));
            
            var nclass = $('#lattice-node-5').attr('class');
            $('#lattice-node-5').attr('class', '{0} {1} {2} {3}'.format(nclass, 'meet', 'highlight', 'modified'));

            _this.text.append(_this.get_template('step_37')());
        },
        function step_38() {
            _this.lattice_view.reset_highlight();
            _this.text.append(_this.get_template('step_38')());
        },
        function step_39() {
            _this.text.append(_this.get_template('step_39')());
        },
        function step_40() {
            _this.clear();

            _this.step_title.html("Monotonic Functions");
            
            $('#left-column')
                .addClass('col-xs-offset-2');

            $('#lattice-canvas').remove();

            _this.lattice_view = undefined;
            
            _this.text.append(_this.get_template('step_40')());
        },
        function step_41() {
            _this.text.append(_this.get_template('step_41')());
        },
        function step_42() {
            _this.text.append(_this.get_template('step_42')());
        },
        function step_43() {
            _this.clear();
            _this.step_title.html("Summary");
            _this.text.append(_this.get_template('step_43')());
            
            $('#btn-goto-simulator').on('click', function() {
                _this.main_view.show_round_robin_simulator(
                    _this.get_template('step_25', 'iloc')()
                );
            });
            
            $('#btn-goto-menu').on('click', function() {
                _this.main_view.show_menu();
            });
        }
    ];

    this.init_children = function() {
    }
}

LessonIntroView.prototype = Object.create(TutorialView.prototype);
LessonIntroView.prototype.constructor = LessonIntroView
