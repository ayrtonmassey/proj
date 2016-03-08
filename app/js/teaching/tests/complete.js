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
        for (question_view of this.question_views) {
            question_view.canvas.hide();
        }
    }

    this.update_math = function() {
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);
    }

    this.questions = [
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
                'Pick the fruit.',
            ],
            answers: [
                { text: 'Boranges', correct: false, },
                { text: 'Horanges', correct: false, },
                { text: 'Oranges', correct: false, },
                { text: 'Lozenges', correct: true, },
            ],
            multiple_select: false,
            setup_func: function() {
            }
        },
        {
            text: [
                'Which direction is this? --->',
            ],
            answers: [
                { text: 'Up', correct: false, },
                { text: 'Right', correct: true, },
                { text: 'Left', correct: false, },
                { text: 'Down', correct: false, },
            ],
            multiple_select: false,
            setup_func: function() {
            }
        }
    ];

    this.init_children = function() {
    }
}

TestContentReviewView.prototype = Object.create(TestView.prototype);
TestContentReviewView.prototype.constructor = TestContentReviewView
