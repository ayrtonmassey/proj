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
            // Update the text
            _this.text.append(_this.get_template('step_00')());
        },
        function step_01() {
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
            _this.clear();
            _this.text.append(_this.get_template('step_13')());
        },
        function step_14() {
            _this.clear();
            _this.text.append(_this.get_template('step_14')());
        },
        function step_15() {
            _this.clear();
            _this.text.append(_this.get_template('step_15')());
        },
        function step_16() {
            _this.clear();
            _this.text.append(_this.get_template('step_16')());
        },
        function step_17() {
            _this.clear();
            _this.text.append(_this.get_template('step_17')());
        },
        function step_18() {
            _this.clear();
            _this.text.append(_this.get_template('step_18')());
        },
        function step_19() {
            _this.text.append(_this.get_template('step_19')());
        },
        function step_20() {
            _this.clear();
            _this.text.append(_this.get_template('step_20')());
        },
    ];

    this.init_children = function() {
        $('#page-title').html(this.title);
    }
}

LessonIntroView.prototype = Object.create(TutorialView.prototype);
LessonIntroView.prototype.constructor = LessonIntroView
