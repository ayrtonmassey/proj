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
        for (question of this.questions) {
            if (question.correct) score++;
        }

        var score_percentage = Math.floor((score / this.questions.length) * 100);
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
            max_score: this.questions.length,
            score_percentage: score_percentage,
        }
    }
    
    this.show_question = function(question_id) {
        _this.clear();

        if (this.submitted) {
            _this.show_score();
        }
        
        _this.text.append(Handlebars.templates['teaching/question/canvas.hbs']());
        
        this.question_id = question_id;
        var question=this.questions[this.question_id];

        console.log(question.text);
        
        var question_view = new QuestionView({
            canvas: '#question-canvas',
            question: question.text,
            answers: question.answers,
            shuffle_answers: false,
            correct_callback: function(answer) {
                question.answered=true;
                question.correct=true;
                question.picked_answer=answer;
            },
            incorrect_callback: function(answer) {
                question.answered=true;
                question.correct=false;
                question.picked_answer=answer;
            },
            show_on_click: QFLAGS.SHOW_CORRECT_ALL | QFLAGS.SHOW_INCORRECT_ONE,
            disable_on_click: QFLAGS.DISABLE_CORRECT_ALL | QFLAGS.DISABLE_INCORRECT_ALL,
        });
        
        question_view.init();

        var picked_answer = question.picked_answer;
        if (picked_answer != undefined) {
            question_view.highlight_answer(picked_answer.id);
            question_view.set_answers_disabled(true);
        }

        if (this.submitted) {
            question_view.highlight_answers();
            question_view.set_answers_disabled(true);
        }
    }

    this.goto_question = function(new_question_id) {
        if (new_question_id < this.questions.length && new_question_id >= 0) {
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

        for (var i=0; i < this.questions.length; i++) {
            this.questions[i] = $.extend(
                this.questions[i],
                {
                    answers: shuffle(this.questions[i].answers),
                    id: i,
                    answered: false,
                    correct: false,
                }
            );
        }

        this.submitted = false;
        
        // Allow children to init contained components
        this.init_children();
        
        this.goto_question(0);
    }
    
    this.init = function() {
        this.canvas.html(this.template({title: this.title}));

        this.text = $('#text');
        $('#page-title').html(this.title);
        this.step_title = $("#test-nav-title");
        
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
}

TestView.prototype = Object.create(View.prototype);
TestView.prototype.constructor = TestView


function TestContentReviewView(kwargs) {
    TestView.call(this, kwargs);

    var _this = this;

    this.main_view = kwargs.main_view;
    this.next_lesson = kwargs.next_lesson;
        
    this.clear = function() {
        _this.text.html("");
    }

    this.update_math = function() {
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);
    }

    this.questions = [
        {
            text: [
                'Pick the answer that says Limes.',
            ],
            answers: [
                { text: 'Limes', correct: true, },
                { text: 'Pears', correct: false, },
                { text: 'Oranges', correct: false, },
                { text: 'Apples', correct: false, },
            ],
            setup_func: function() {
            }
        },
        {
            text: [
                'Pick the answer that says Apples or Pears.',
            ],
            answers: [
                { text: 'Limes', correct: false, },
                { text: 'Pears', correct: true, },
                { text: 'Oranges', correct: false, },
                { text: 'Apples', correct: true, },
            ],
            setup_func: function() {
            }
        },
        {
            text: [
                'Pick the answer that says Oranges.',
            ],
            answers: [
                { text: 'Limes', correct: false, },
                { text: 'Pears', correct: false, },
                { text: 'Oranges', correct: true, },
                { text: 'Apples', correct: false, },
            ],
            setup_func: function() {
            }
        }
    ];

    this.init_children = function() {
    }
}

TestContentReviewView.prototype = Object.create(TestView.prototype);
TestContentReviewView.prototype.constructor = TestContentReviewView
