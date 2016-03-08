function TestView(kwargs) {
    View.call(this, kwargs);
    
    var _this = this;

    this.id = kwargs.id;
    
    this.title = kwargs.title;

    this.template_root = 'teaching/tests/';
    this.template = this.get_template('main');    

    this.clear = function() {
        throw ReferenceError("clear is not defined in class {0}".format(_this.constructor.name));
    }

    this.update_math = function() {
        throw ReferenceError("update_math is not defined in class {0}".format(_this.constructor.name));
    }

    this.show_score = function() {
        var scores = this.get_scores();

        var kwargs = $.extend({questions: this.questions}, scores);
        
        if ($('#test-score').length <= 0) {
            this.prev_button.after(this.get_template('score')(kwargs));
        }
    }

    this.get_scores = function() {
        var score=0;
        var max_score=0;
        for (question_view of this.question_views) {
            score += question_view.score;
            max_score += question_view.max_score;
        }
        
        var score_percentage=0;
        if (max_score != 0) {
            score_percentage = Math.floor((score / max_score) * 100);
        }
        
        var grade;
        if (score_percentage >= 70) {
            grade = 'A';
        } else if (score_percentage >= 60) {
            grade = 'B';
        } else if (score_percentage >= 50) {
            grade = 'C';
        } else if (score_percentage >= 40) {
            grade = 'D';
        } else {
            grade = 'F';
        }

        return {
            score: score,
            grade: grade,
            max_score: max_score,
            score_percentage: score_percentage,
        }
    }
    
    this.show_question = function(question_id) {
        this.clear();

        if (this.submitted) {
            this.show_score();
        }

        this.questions[question_id].setup_func();

        this.question_views[question_id].canvas.show();
    }

    this.goto_question = function(new_question_id) {
        if (new_question_id < this.questions.length && new_question_id >= 0) {
            this.question_id = new_question_id;
            this.next_button.prop('disabled', false);
            this.show_question(new_question_id);

            if (this.question_id >= this.questions.length - 1) {
                this.next_button.prop('disabled', true);
            } else {
                this.next_button.prop('disabled', false);
            }
            
            if (this.question_id > 0) {
                this.prev_button.prop('disabled', false);
            } else {
                this.prev_button.prop('disabled', true);
            }

            this.update_math();
        }
    }
    
    this.next = function() {
        this.goto_question(this.question_id + 1);
    }

    this.prev = function() {
        this.goto_question(this.question_id - 1);
    }
    
    this.submit = function() {
        this.submitted = true;
        this.submit_button.hide();

        for(question_view of this.question_views) {
            question_view.submit();
        }

        var scores = this.get_scores();

        var current_score = Number(getCookie('test-{0}-score'.format(this.id, scores.score))) || 0;
        console.log("test-{0}-score={1}; test-{0}-max-score={2}; test-{0}-percentage={3};".format(this.id, scores.score, scores.max_score, scores.percentage));
        if (current_score < scores.score) {
            document.cookie = "test-{0}-score={1};".format(this.id, scores.score);
            document.cookie = "test-{0}-max-score={1};".format(this.id, scores.max_score);
            document.cookie = "test-{0}-percentage={1};".format(this.id, scores.score_percentage);
        }
        
        this.goto_question(this.question_id);
    }

    this.reset = function() {        
        this.prev_button.prop('disabled', true);
        this.question_views = [];

        for (var i=0; i < this.questions.length; i++) {
            var question_id = i;
            this.text.append(Handlebars.templates['teaching/question/canvas.hbs']({id: ''+question_id}));
            var question=this.questions[question_id];
            this.question_views.push(new QuestionView({
                canvas: '#question-canvas-{0}'.format(question_id),
                question: question.text,
                answers: question.answers,
                shuffle_answers: true,
                show_on_click: (question.multiple_select ? QFLAGS.MULTIPLE_SELECT : QFLAGS.SINGLE_SELECT),
            }));
            
            this.question_views[i].init();
            this.question_views[i].canvas.hide();
        }

        this.submitted = false;
        
        // Allow children to init contained components
        this.init_children();

        this.goto_question(0);
    }

    this.start_test = function() {
        this.canvas.html(this.template({title: this.title}));
        
        this.text = $('#text');
        $('#page-title').html(this.title);
        
        this.next_button = $('#btn-next');
        this.next_button.on('click', function() {
            _this.next();
        });

        this.prev_button = $('#btn-prev');
        this.prev_button.on('click', function() {
            _this.prev();
        });

        this.submit_button = $('#btn-submit');
        this.submit_button.on('click', function() {
            _this.submit();
        });

        this.reset();
    }
    
    this.init = function() {
        this.canvas.html(this.get_template('intro')());

        $('#btn-test-start').on('click', function() {
            _this.start_test();
        });
    }
}

TestView.prototype = Object.create(View.prototype);
TestView.prototype.constructor = TestView


function TestContentReviewView(kwargs) {
    TestView.call(this, kwargs);

    var _this = this;

    this.main_view = kwargs.main_view;
    this.next_lesson = kwargs.next_lesson;
        
    this.clear = function() {
        this.hide_cfg();
        this.hide_lattice();
        for (question_view of this.question_views) {
            question_view.canvas.hide();
        }
    }

    this.hide_lattice = function() {
        this.lattice_container.hide();
        this.left_column.addClass('col-xs-offset-2');
    }

    this.show_lattice = function() {
        this.lattice_container.show();
        this.left_column.removeClass('col-xs-offset-2');
    }

    this.hide_cfg = function() {
        this.cfg_container.hide();
        this.left_column.addClass('col-xs-offset-2');
    }

    this.show_cfg = function() {
        this.cfg_container.show();
        this.left_column.removeClass('col-xs-offset-2');
    }

    this.update_math = function() {
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);
    }

    this.questions = [
        {
            text: [
                'The CFG on the right shows a <strong>reaching definitions</strong> analysis in progress. What is the <strong>value</strong> of \\(\\text{Out}(n_2)\\)?',
                '<em>The value of \\(\\small{\\text{In}(n_2)}\\) has been calculated for you.</em>',
            ],
            answers: [
                { text: '\\(\\{ {\\tt ra_1}, {\\tt rb_2} \\}\\)', correct: true, },
                { text: '\\(\\{ {\\tt ra_1} \\}\\)', correct: false, },
                { text: '\\(\\{ {\\tt ra_1}, {\\tt rb_1} \\}\\)', correct: false, },
                { text: '\\(\\{ {\\tt ra_2}, {\\tt rb_1} \\}\\)', correct: false, },
            ],
            multiple_select: false,
            setup_func: function() {
                _this.show_cfg();
                _this.simulator.sim_code(_this.get_template('review/rd_single_path','iloc')());
                _this.simulator.advance(5);
                _this.cfg_view.add_point(_this.simulator.cfg.nodes[2], DFA.IN);
                _this.cfg_view.add_point(_this.simulator.cfg.nodes[2], DFA.OUT);
                _this.cfg_view.reset_highlight();
                _this.cfg_view.draw();
            }
        },

        {
            text: [
                'The CFG on the right shows a <strong>reaching definitions</strong> analysis in progress. What is the <strong>value</strong> of \\(\\text{In}(n_5)\\)?',
                '<em>The values of \\(\\small{\\text{Out}(n_2)}\\) and \\(\\small{\\text{Out}(n_4)}\\) have been calculated for you.</em>',
            ],
            answers: [
                { text: '\\(\\{ \\}\\)', correct: false, },
                { text: '\\(\\{ {\\tt rx_1} \\}\\)', correct: false, },
                { text: '\\(\\{ {\\tt rx_2} \\}\\)', correct: false, },
                { text: '\\(\\{ {\\tt rx_2}, {\\tt rx_1} \\}\\)', correct: true, },
            ],
            multiple_select: false,
            setup_func: function() {
                _this.show_cfg();
                _this.simulator.sim_code(_this.get_template('review/rd_branch','iloc')());
                _this.simulator.advance(10);
                
                _this.cfg_view.add_point(_this.simulator.cfg.nodes[2], DFA.OUT);
                _this.cfg_view.add_point(_this.simulator.cfg.nodes[4], DFA.OUT);
                _this.cfg_view.add_point(_this.simulator.cfg.nodes[5], DFA.IN);
                
                _this.cfg_view.reset_highlight();
                _this.cfg_view.draw();
            }
        },

        {
            text: [
                'The CFG on the right shows a <strong>reaching definitions</strong> analysis in progress. What is the <strong>value</strong> of \\(\\text{In}(n_5)\\)?',
            ],
            answers: [
                { text: '\\(\\{ {\\tt ra_1}, {\\tt rb_1}, {\\tt ra_2} \\}\\)', correct: false, },
                { text: '\\(\\{ {\\tt rb_1}, {\\tt rc_1}, {\\tt ra_2} \\}\\)', correct: false, },
                { text: '\\(\\{ {\\tt ra_1}, {\\tt rb_1}, {\\tt rc_1}, {\\tt ra_2} \\}\\)', correct: true, },
                { text: '\\(\\{ {\\tt ra_2} \\}\\)', correct: false, },
            ],
            multiple_select: false,
            setup_func: function() {
                _this.show_cfg();
                _this.simulator.sim_code(_this.get_template('review/rd_loop','iloc')());
            }
        },
                
        {
            text: [
                'Which of the following is a <strong>backward</strong> data-flow analysis?',
            ],
            answers: [
                { text: 'Reaching Definitions', correct: false, },
                { text: 'Live Variable Analysis', correct: true, },
                { text: 'Available Expressions', correct: false, },
                { text: 'Dominating Nodes', correct: false, },
            ],
            multiple_select: false,
            setup_func: function() {
            }
        },

        {
            text: [
                'Which of the following represents a <strong>post-ordering</strong> (child-first) of the CFG on the right?',
            ],
            answers: [
                { text: '\\([ n_0, n_3, n_2, n_5, n_4, n_1]\\)', correct: false, },
                { text: '\\([ n_0, n_1, n_2, n_3, n_4, n_5]\\)', correct: false, },
                { text: '\\([ n_2, n_3, n_4, n_5, n_0, n_1]\\)', correct: false, },
                { text: '\\([ n_3, n_2, n_5, n_4, n_1, n_0]\\)', correct: true, },
            ],
            multiple_select: true,
            setup_func: function() {
                _this.show_cfg();
                _this.simulator.sim_code(_this.get_template('review/postorder','iloc')());
            }
        },

        {
            text: [
                'Which of the following conditions <strong>must</strong> be met for a data-flow to terminate? <em>You may select more than one.</em>',
            ],
            answers: [
                { text: '\\(F\\) contains the identity function', correct: true, },
                { text: '\\(F\\) is closed under composition', correct: true, },
                { text: '\\(F\\) is monotonic', correct: true, },
                { text: 'There exists a partial order on the set of values', correct: true, },
                { text: '\\(F\\) is distributive', correct: false, },
                { text: '\\(\\land\\) contains the identity function', correct: false, },
                { text: '\\(\\land\\) is either \\(\\cup\\) or \\(\\cap\\)', correct: false, },
                { text: '\\(\\land\\) combines values from a node\'s predecessors', correct: false, },
            ],
            multiple_select: true,
            setup_func: function() {
            }
        },

        {
            text: [
                    'Which of the following functions are <strong>monotonic</strong>? <em>You may select more than one answer.</em>',
                ],
            answers: [
                {text: '\\(f(x) = -x\\)', correct: true, },
                {text: '\\(f(x) = x^2\\)', correct: false, },
                {text: '\\(f(x) = x^3\\)', correct: true, },
                {text: '\\(f(x) = \\lvert x \\rvert \\)', correct: false, },
                {text: '\\(f(x) = sin(x)\\)', correct: false, },
                {text: '\\(f(x) = \\lfloor x \\rfloor \\)', correct: true, },
            ],
            multiple_select: true,
            setup_func: function() {
            }
        },
        
        {
            text: [
                'In a <strong>forward analysis</strong>, which of the following is true?',
            ],
            answers: [
                { text: '\\(\\text{In}_B = \\land_{\\text{predecessors P of B}} \\text{Out}_P\\)', correct: true, },
                { text: '\\(\\text{Out}_B = \\land_{\\text{predecessors P of B}} \\text{In}_P\\)', correct: false, },
                { text: '\\(\\text{In}_B = \\land_{\\text{successors S of B}} \\text{Out}_S\\)', correct: false, },
                { text: '\\(\\text{Out}_B = \\land_{\\text{successors S of B}} \\text{In}_S\\)', correct: false, },
            ],
            multiple_select: false,
            setup_func: function() {
            }
        },
        
        {
            text: [
                'Which of the following is the <strong>meet</strong> operator (denoted \\(\\land\\)) for <strong>reaching definitions</strong>?',
            ],
            answers: [
                { text: 'Union, \\(\\cup\\)', correct: true, },
                { text: 'Intersection, \\(\\cap\\)', correct: false, },
                { text: 'Logical OR, \\(\\land\\)', correct: false, },
                { text: 'Set Difference, \\(\\setminus\\)', correct: false, },
            ],
            multiple_select: false,
            setup_func: function() {
            }
        },

        {
            text: [
                'Which of the following is the <strong>transfer</strong> function for <strong>reaching definitions</strong>?',
            ],
            answers: [
                { text: '\\(F_{B} = \\text{DefGen}_B \\cup (x \\setminus \\text{DefKill}_B)\\)', correct: true, },
                { text: '\\(F_{B} = \\text{DefKill}_B \\cup (x \\cup \\text{DefGen}_B)\\)', correct: false, },
                { text: '\\(F_{B} = \\land_{\\text{predecessors P of B}} \\text{Out}_B\\)', correct: false, },
                { text: '\\(F_{B} = \\text{DefGen}_B \\setminus (x \\cup \\text{DefKill}_B)\\)', correct: false, },
            ],
            multiple_select: false,
            setup_func: function() {
            }
        },
    ];

    this.init_children = function() {
        this.left_column = $('#left-column');
        
        this.simulator = new RoundRobinSimulator({
            framework : iloc_reaching_definitions,
            ordering  : DFA.REVERSE_POSTORDER,
            code      : 'nop',
            play_speed: 1000,
        });

        this.simulator.init();

        
        this.left_column.after('<div id="lattice-container" class="col-xs-4"><div class="row"><div id="lattice-canvas"></div></div></div>');

        this.lattice_container = $('#lattice-container');
        
        this.lattice_view = new LatticeView({
            canvas: '#lattice-canvas',
            simulator: this.simulator,
        })

        this.lattice_view.init();

        this.show_lattice();

        
        this.left_column.after('<div id="cfg-canvas" class="col-xs-4"></div>');
        
        this.cfg_container = $('#cfg-canvas');
        
        this.cfg_view = new CFGView({
            canvas: '#cfg-canvas',
            simulator: this.simulator,
        });

        this.cfg_view.init();

        this.show_cfg();
    }
}

TestContentReviewView.prototype = Object.create(TestView.prototype);
TestContentReviewView.prototype.constructor = TestContentReviewView
