function DataCollectionView(kwargs) {
    TestView.call(this, kwargs);
    var _this = this;

    this.main_view = kwargs.main_view;
        
    this.clear = function() {
        for (var question_view of this.question_views) {
            question_view.canvas.hide();
        }
    }

    this.update_math = function() {
    }
    
    this.template_root = 'data_collection/';
    this.template = this.get_template('main');

    this.shuffle_answers = false;

    this.questions = [
        {
            text: [
                'How would you rate your knowledge of data-flow analysis?',
            ],
            answers: [
                { text: 'None at all', correct: true, ans_ident: 'exp-none' },
                { text: 'Basic', correct: true, ans_ident: 'exp-basic' },
                { text: 'Advanced', correct: true, ans_ident: 'exp-advanced' },
            ],
            multiple_select: false,
            setup_func: function() {
            },
            track_callback: function() {
                for (var answer of this.answers) {
                    if (answer.selected) {
                        tracking.send(
                            'user-stats',
                            'experience',
                            answer.ans_ident
                        );
                    }
                }
            },
        },

        {
            text: [
                'Please select all that apply (you may select none, if none apply).',
            ],
            answers: [
                { text: 'I am a student of the COPT course (UoE Informatics only).', correct: true, ans_ident: 'usr-copt-student' },
                { text: 'I am a student at a university.', correct: true, ans_ident: 'usr-uni-student' },
                { text: 'I have studied Computer Science at degree level.', correct: true, ans_ident: 'usr-cs-degree' },
                { text: 'I have studied a STEM subject at degree level.', correct: true, ans_ident: 'usr-stem-degree' },
            ],
            multiple_select: true,
            setup_func: function() {
            },
            track_callback: function() {
                for (var answer of this.answers) {
                    if(answer.selected) {
                        tracking.send(
                            'user-stats',
                            'background',
                            answer.ans_ident
                        );
                    }
                }
            },
        },
    ];

    this.test_view_goto_question = this.goto_question;
    this.goto_question = function(new_question_id) {
        this.test_view_goto_question(new_question_id);
        if (!this.questions[this.question_id].multiple_select) {
            this.next_button.prop('disabled',true);
        }
    }
    
    this.test_view_next = this.next;
    this.next = function() {
        this.test_view_next();
        // If it's the last question, make next goto menu
        if (this.question_id == this.questions.length - 1) {
            this.next_button.prop('disabled', false);
            this.next_button.off('click').on('click', function() {
                _this.question_views[_this.question_id].submit();
                _this.questions[_this.question_id].track_callback();
                document.cookie = "data_collected=true;";
                _this.main_view.show_menu();
            });
        }
    }

    this.init_children = function() {
        this.next_button.off('click').on('click', function() {
            _this.question_views[_this.question_id].submit();
            _this.questions[_this.question_id].track_callback();
            _this.next();
        });

        for (question of this.questions) {
            if (!question.multiple_select) {
                question.correct_callback = (function(ans) {
                    if (!ans.selected) {
                        _this.next_button.prop('disabled',true);
                    } else {
                        _this.next_button.prop('disabled',false);
                    }
                })
                question.incorrect_callback = (function(ans) {
                    if (!ans.selected) {
                        _this.next_button.prop('disabled',true);
                    } else {
                        _this.next_button.prop('disabled',false);
                    }
                })
            }
        }
    }
}

DataCollectionView.prototype = Object.create(TestView.prototype);
DataCollectionView.prototype.constructor = DataCollectionView


function MainView(kwargs) {
    View.call(this, kwargs);

    var _this = this;
    
    this.view_canvas = $(kwargs.view_canvas);
    this.view_canvas_selector = kwargs.view_canvas;

    this.lessons = {
        // {
        //     constructor: Lesson00View,
        //     kwargs: {
        //         title: "Introduction",
        //         next_lesson: 1,
        //     }
        // },
        // {
        //     constructor: Lesson01View,
        //     kwargs: {
        //         title: "Branches & Loops",
        //         next_lesson: -1,
        //     }
        // },
        intro: {
            constructor: LessonIntroView,
            kwargs: {
                title: "Introduction",
                next_lesson: 'roundrobin',
            }
        },
        roundrobin: {
            constructor: LessonRoundRobinView,
            kwargs: {
                title: "Round Robin Algorithm",
                next_lesson: 'generic_framework',
            }
        },
        generic_framework: {
            constructor: LessonGenericFrameworkView,
            kwargs: {
                title: "Generic Framework",
                next_lesson: undefined,
            }
        }
    }

    this.tests = {
        complete: {
            constructor: TestContentReviewView,
            kwargs: {
                title: "Content Review",
            }
        },
    }

    this.show_lesson = function(lesson_id, step) {
        this.view_canvas.html("");
        this.view_canvas.show();

        if (lesson_id in this.lessons) {
            var lesson = this.lessons[lesson_id];
            this.view = new lesson.constructor(
                $.extend(lesson.kwargs,
                         {
                             id: lesson_id,
                             main_view: this,
                             canvas: this.view_canvas_selector
                         }
                        )
            );
        
            this.view.init();

            if (step!=undefined) {
                this.view.advance(step);
            }
        } else {
            throw TypeError("Lesson with index {0} does not exist.".format(lesson_id));
        }
    }

    this.show_test = function(test_id, q) {
        this.view_canvas.html("");
        this.view_canvas.show();

        if (test_id in this.tests) {
            var test = this.tests[test_id];
            this.view = new test.constructor(
                $.extend(test.kwargs,
                         {
                             id: test_id,
                             main_view: this,
                             canvas: this.view_canvas_selector
                         }
                        )
            );
        
            this.view.init();

            if (q!=undefined) {
                this.view.goto_question(q);
            }
        } else {
            throw TypeError("Test with index {0} does not exist.".format(test_id));
        }
    }

    this.show_round_robin_simulator = function(code, framework, ordering) {
        this.view_canvas.html("");
        this.view_canvas.show();

        // Get code
        var iloc_code = code || getParameterByName('code') || Handlebars.templates['simulator/init.iloc']();
        
        try {
            ILOC.parser.parse(iloc_code);
        } catch(ex) {
            alert('Could not simulate given code: {0}'.format(ex.message));
        }

        // Get framework
        var framework = framework || DFA[getParameterByName('framework')] || DFA.REACHING_DEFINITIONS;

        // Get ordering
        var ordering = ordering || ( getParameterByName('ordering') in DFA ? getParameterByName('ordering') : DFA.POSTORDER );
        
        var simulator = new RoundRobinSimulator({
            framework:  framework,
            ordering:   ordering,
            code:       iloc_code,
            play_speed: 1000,
        });
        
        this.view = new RoundRobinSimulatorView({
            main_view: this,
            canvas: this.view_canvas_selector,
            simulator: simulator,
        });
        
        this.view.init();
    }

    this.show_testbed = function(testbed_name) {
        switch(testbed_name) {
        case 'lattice':
            this.show_lattice_testbed();
            break;
        case 'cfg':
            this.show_cfg_testbed();
            break;
        default:
            throw ReferenceError("Unrecognised testbed {0}".format(testbed_name));
        }
    }
    
    this.show_lattice_testbed = function() {
        this.view_canvas.html("");
        this.view_canvas.show();
        
        var iloc_code = Handlebars.templates['test/lattice.iloc']();
        
        var simulator = new RoundRobinSimulator({
            // framework: iloc_liveness,
            // ordering:  DFA.POSTORDER,
            framework:  iloc_reaching_definitions,
            ordering:   DFA.REVERSE_POSTORDER,
            code:       iloc_code,
            play_speed: 1000,
        });
        
        this.view = new LatticeTestbedView({
            main_view: this,
            canvas: this.view_canvas_selector,
            simulator: simulator,
        });
        
        this.view.init();
    }

    this.show_cfg_testbed = function() {
        this.view_canvas.html("");
        this.view_canvas.show();
        
        var iloc_code = Handlebars.templates['test/cfg.iloc']();
        
        var simulator = new RoundRobinSimulator({
            // framework: iloc_liveness,
            // ordering:  DFA.POSTORDER,
            framework:  iloc_reaching_definitions,
            ordering:   DFA.REVERSE_POSTORDER,
            code:       iloc_code,
            play_speed: 1000,
        });
        
        this.view = new CFGTestbedView({
            main_view: this,
            canvas: this.view_canvas_selector,
            simulator: simulator,
        });
        
        this.view.init();
    }

    this.show_menu = function() {
        this.view = new MenuView({
            main_view: this,
            canvas: this.view_canvas_selector,
            lessons: this.lessons,
            tests: this.tests,
            show_testbeds: false,
        });

        this.view.init();
    }

    this.show_data_collection = function() {
        this.view = new DataCollectionView({
            main_view: this,
            canvas: this.view_canvas_selector,
        });

        this.view.init();        
    }

    this.init = function() {
        var show_lesson = getParameterByName('lesson');
        var show_lesson_step = getParameterByName('step');
        
        var show_test = getParameterByName('test');
        var show_test_question = getParameterByName('q');
        
        var show_simulator = getParameterByName('simulator');
        var show_testbed = getParameterByName('testbed');
        
        if(!getCookie('data_collected')) {
            this.show_data_collection();
        } else if(show_simulator=='' || show_simulator==true) {
            this.show_round_robin_simulator();
        } else if (show_lesson && (show_lesson in this.lessons)) {
            var step = undefined;
            if (show_lesson_step) {
                step = Number(show_lesson_step);
                if (!(typeof step == 'number' && Math.floor(step)==step)) {
                    step=undefined;
                }
            }
            this.show_lesson(show_lesson, step);
        } else if (show_test && (show_test in this.tests)) {
            var question = undefined;
            if (show_test_question) {
                question = Number(show_test_question);
                if (!(typeof question == 'number' && Math.floor(question)==question)) {
                    question=undefined;
                }
            }
            this.show_test(show_test, question);
        } else if (show_testbed) {
            this.show_testbed(show_testbed);
        } else {
            this.show_menu();
        }

        $('#nav-goto-menu').on('click', function() {
            _this.show_menu();
        });

        $('#nav-goto-simulator').on('click', function() {
            _this.show_round_robin_simulator();
        });
    }    
}

MainView.prototype = Object.create(View.prototype);
MainView.prototype.constructor = MainView


function MenuView(kwargs) {    
    View.call(this, kwargs);

    var _this = this;

    this.main_view = kwargs.main_view;
    
    this.template_root = 'menu/'    
    this.template = this.get_template('main');
    
    /* Lessons */
    this.lesson_menu_template   = this.get_template('lesson_menu');
    this.lesson_button_template = this.get_template('btn-lesson');
    this.lessons = kwargs.lessons;

    this.show_testbeds = kwargs.show_testbeds;

    this.show_lesson_menu = function() {
        this.menu.append(this.lesson_menu_template());
        this.lesson_menu = $('#lesson-menu');
        for(id in this.lessons) {
            var button_id = 'btn-lesson-{0}'.format(id);
            // Create the button
            this.lesson_menu.append(
                this.lesson_button_template({
                    id: button_id,
                    text: this.lessons[id].kwargs.title,
                    lesson: id,
                    complete: Boolean(getCookie('lesson-{0}-complete'.format(id))),
                })
            );
            // Set up on click action
            $('#{0}'.format(button_id)).on('click', function() {
                _this.main_view.show_lesson($(this).attr('lesson'));
            });
        }
    }

    this.show_simulator_menu = function() {

        this.menu.append(this.get_template('simulator_menu')());
    
        /* Simulation */
        $('#btn-round-robin-simulator').on('click', function() {
            _this.main_view.show_round_robin_simulator();
        });

    }
    
    this.show_testbed_menu = function() {

        this.menu.append(this.get_template('testbed_menu')());
        
        /* Testing */
        $('#btn-lattice-testbed').on('click', function() {
            _this.main_view.show_lattice_testbed();
        });
        
        $('#btn-cfg-testbed').on('click', function() {
            _this.main_view.show_cfg_testbed();
        });
        
    }
    
    /* Tests */
    this.test_menu_template   = this.get_template('test_menu');
    this.test_button_template = this.get_template('btn-test');
    this.tests = kwargs.tests;
    
    this.show_test_menu = function() {
        this.menu.append(this.test_menu_template());
        this.test_menu = $('#test-menu');
        for(id in this.tests) {
            var button_id = 'btn-test-{0}'.format(id);
            // Create the button
            this.test_menu.append(
                this.test_button_template({
                    id: button_id,
                    text: this.tests[id].kwargs.title,
                    test: id,
                    score: getCookie('test-{0}-score'.format(id)),
                    max_score: getCookie('test-{0}-max-score'.format(id)),
                    score_percentage: getCookie('test-{0}-percentage'.format(id)),
                    grade: 'A',
                })
            );
            // Set up on click action
            $('#{0}'.format(button_id)).on('click', function() {
                _this.main_view.show_test($(this).attr('test'));
            });
        }
    }

    this.init = function() {
        $('#page-title').html("Main Menu");
        
        this.canvas.html(this.template());
        this.menu = $('#menu');
        
        this.show_simulator_menu();

        // If lessons are available, create the menu
        if (this.lessons) { this.show_lesson_menu(); }
        
        // If tests are available, create the menu
        if (this.tests) { this.show_test_menu(); }

        if (this.show_testbeds) { this.show_testbed_menu(); }
    }
}

MenuView.prototype = Object.create(View.prototype);
MenuView.prototype.constructor = MenuView

