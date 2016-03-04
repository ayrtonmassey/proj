function View(kwargs) {
    this.canvas = $(kwargs.canvas);
    this.parent = kwargs.parent;
    
    var _this = this

    this.get_template = function(template_name, extension) {
        var extension = extension || 'hbs';
        return Handlebars.templates['{0}{1}.{2}'.format(this.template_root, template_name, extension)];
    }
    
    this.init = function() {
        throw new ReferenceError("function {0}.init() has not been implemented.".format(_this.constructor.name));
    }

    this.template = function() {
        throw new ReferenceError("field {0}.template has not been defined.".format(_this.constructor.name));
    }
}

/*
function TemplateView(kwargs) {    
    View.call(this, kwargs);

    this.template = Handlebars.templates['template.hbs']

    this.init = function() {
        
    }
}

TemplateView.prototype = Object.create(View.prototype);
TemplateView.prototype.constructor = TemplateView
*/

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
                next_lesson: undefined,
            }
        }
    }
    
    this.show_lesson = function(lesson_id, step) {
        this.view_canvas.html("");
        this.view_canvas.show();

        if (lesson_id in this.lessons) {
            var lesson = this.lessons[lesson_id];
            this.view = new lesson.constructor(
                $.extend(lesson.kwargs,
                         {
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
    
    this.show_round_robin_simulator = function(code) {
        this.view_canvas.html("");
        this.view_canvas.show();

        var iloc_code;
        if (code) {
            try {
                ILOC.parser.parse(code);
                iloc_code = code;
            } catch(ex) {
                alert('Could not simulate given code: {0}'.format(ex.message));
            }
        } else if (getParameterByName('code') != null) {
            try {
                ILOC.parser.parse(getParameterByName('code'));
                iloc_code = getParameterByName('code');
            } catch(ex) {
                alert('Could not simulate code given in URL: {0}'.format(ex.message));
            }
        }

        if (!iloc_code) {
            iloc_code = Handlebars.templates['teaching/lesson/01/loop.iloc']();
        }
        
        var simulator = new RoundRobinSimulator({
            // framework: iloc_liveness,
            // ordering:  DFA.POSTORDER,
            framework:  iloc_reaching_definitions,
            ordering:   DFA.REVERSE_POSTORDER,
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
        });

        this.view.init();
    }

    this.init = function() {
        var show_lesson = getParameterByName('lesson');
        var show_lesson_step = getParameterByName('step');
        var show_simulator = getParameterByName('simulator');
        var show_testbed = getParameterByName('testbed');

        if(show_simulator=='' || show_simulator==true) {
            this.show_round_robin_simulator();
        } else if (show_lesson) {
            if (typeof show_lesson == 'string' && (show_lesson in this.lessons)) {
                var step = undefined;
                if (show_lesson_step) {
                    step = Number(show_lesson_step);
                    if (!(typeof step == 'number' && Math.floor(step)==step)) {
                        step=undefined;
                    }
                }
                this.show_lesson(show_lesson, step);
            }
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

    this.template_root = 'menu/'
    
    this.template               = this.get_template('main');
    this.lesson_menu_template   = this.get_template('lesson_menu');
    this.lesson_button_template = this.get_template('btn-lesson');
    
    this.main_view = kwargs.main_view;
    
    this.lessons = kwargs.lessons;
    
    this.init = function() {
        $('#page-title').html("Main Menu");
        
        this.canvas.html(this.template());
        this.menu = $('#menu');
        
        /* Simulation */
        $('#btn-round-robin-simulator').on('click', function() {
            _this.main_view.show_round_robin_simulator();
        });

        /* Lessons */
        
        // If lessons are available, create the menu
        if (this.lessons) {
            this.menu.append(this.lesson_menu_template());
            this.lesson_menu = $('#lesson-menu');
            for(id in this.lessons) {
                var button_id = 'btn-lesson-{0}'.format(id);
                // Create the button
                this.lesson_menu.append(
                    this.lesson_button_template({id: button_id, text: this.lessons[id].kwargs.title, lesson: id})
                );
                // Set up on click action
                $('#{0}'.format(button_id)).on('click', function() {
                    _this.main_view.show_lesson($(this).attr('lesson'));
                });
            }
        }

        /* Testing */
        $('#btn-lattice-testbed').on('click', function() {
            _this.main_view.show_lattice_testbed();
        });

        $('#btn-cfg-testbed').on('click', function() {
            _this.main_view.show_cfg_testbed();
        });
    }
}

MenuView.prototype = Object.create(View.prototype);
MenuView.prototype.constructor = MenuView

