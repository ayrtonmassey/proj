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
            // Update the text
            _this.text.html(_this.get_template('step_00')());
            
            // Hide the CFG
            _this.cfg_canvas.hide();
        },
        function step_01() {
            _this.clear();
            _this.text.html(_this.get_template('step_01')());            
        },
        function step_02() {
            _this.text.html(_this.get_template('step_02')());
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
