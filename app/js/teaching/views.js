function MenuView(kwargs) {    
    View.call(this, kwargs);

    var _this = this;

    this.view_canvas = $(kwargs.view_canvas);
    
    this.template = Handlebars.templates['menu.hbs']

    this.show_lesson_01 = function() {
        this.canvas.hide();
        this.view_canvas.html("");
        this.view_canvas.show();
        
        this.view = new IntroductionView({
            title: "Introduction",
            canvas: '#view-canvas',
        });
        
        this.view.init();
    }
    
    this.show_round_robin_simulator = function() {
        this.canvas.hide();
        this.view_canvas.html("");
        this.view_canvas.show();
        
        var iloc_code = "\
        L0: nop \n\
            loadI  2         => ra        \n\
            load   rb        => rx        \n\
            addI   ra   , 1  => ra        \n\
            loadI  0         => r0        \n\
            cmp_GE rx   , r0 => rcomp     \n\
            cbr    rcomp     -> L1   , L2 \n\
        L1: i2i    rx        => ra        \n\
            add    ra   , rb => rc        \n\
            jump   L3                     \n\
        L2: addI   rb   , 1  => rc        \n\
        L3: add    ra   , rc => rd        \n\
        ";
        
        var simulator = new RoundRobinSimulator({
            framework: iloc_liveness,
            ordering:  DFA.POSTORDER,
            // framework:  iloc_reaching_definitions,
            // ordering:   DFA.REVERSE_POSTORDER,
            code:       iloc_code,
            play_speed: 100,
        });
        
        this.view = new RoundRobinSimulatorView({
            canvas: '#view-canvas',
            simulator: simulator,
        });
        
        this.view.init();
    }
    
    this.init = function() {
        this.canvas.html(this.template());
        this.view_canvas.hide();

        $('#btn-round-robin-simulator').on('click', function() {
            _this.show_round_robin_simulator();
        });

        $('#btn-lesson-01').on('click', function() {
            _this.show_lesson_01();
        });
    }
}

MenuView.prototype = Object.create(View.prototype);
MenuView.prototype.constructor = MenuView


function TutorialView(kwargs) {
    View.call(this, kwargs);
    
    var _this = this;
    
    this.title = kwargs.title;
    
    this.next = function() {
        if (this.step < this.steps.length - 1) {
            this.step++;
            this.steps[this.step]();
            if (this.step >= this.steps.length - 1) {
                this.next_button.prop('disabled', true);
            }
            if (this.step > 0) {
                this.prev_button.prop('disabled', false);
            }
        }
    }

    this.prev = function() {
        console.log(this.step);
        this.new_step = this.step - 1;
        console.log(this.new_step);
        this.reset();
        while (this.step < this.new_step) {
            this.next();
        }
        if (this.step < this.steps.length) {
            this.next_button.prop('disabled', false);
        }
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


function IntroductionView(kwargs) {
    TutorialView.call(this, kwargs);

    var _this = this;
    
    this.template = Handlebars.templates['introduction.hbs']
    
    this.steps = [
        function step_00() {
            // Hide the CFG
            _this.cfg_canvas.hide();

            // Update the text
            _this.text.html(Handlebars.templates['lesson_01/step_00.hbs']());
        },
        function step_01() {
            // Update the text
            _this.text.append(Handlebars.templates['lesson_01/step_01.hbs']());
        },
        function step_02() {
            // Show the CFG
            _this.cfg_canvas.show();
            
            // Reset the CFG code
            var iloc_code = Handlebars.templates['lesson_01/step_02.iloc']();
            _this.simulator.sim_code(iloc_code);

            // Update the text
            _this.text.html("");
            _this.text.append(Handlebars.templates['lesson_01/step_02.hbs']());
        },
        function step_03() {
            // Animate the nodes
            var index = 0;
            var timeout = 500;
            setTimeout(function animate_04() {
                _this.cfg_view.reset_highlight();
                if(index < _this.simulator.cfg.nodes.length && _this.step == 3) {
                    $('#graph-node-{0}'.format(index))
                        .attr("class", "node meet highlight");
                    index += 1;
                    setTimeout(animate_04, timeout);
                }
            }, timeout);
            
            // Update the text
            _this.text.append(Handlebars.templates['lesson_01/step_03.hbs']());
        },
        function step_04() {
            // Animate the nodes
            var index = 1;
            var timeout = 500;
            setTimeout(function animate_05() {
                _this.cfg_view.reset_highlight();
                if(index < _this.simulator.cfg.nodes.length && _this.step == 4) {
                    _this.cfg_view.g.setEdge(
                        '{0}'.format(index-1),
                        '{0}'.format(index),
                        {
                            style: "stroke: #62abea; stroke-width: 1.5px;",
                            arrowheadStyle: "stroke: #62abea; fill: #62abea;",
                        }
                    );
                    index += 1;
                    setTimeout(animate_05, timeout);
                }
                _this.cfg_view.draw();
            }, timeout);
            
            // Update the text
            _this.text.append(Handlebars.templates['lesson_01/step_04.hbs']());
        },
        function step_05() {
            _this.cfg_view.show_points();
            _this.cfg_view.update();
            _this.text.append(Handlebars.templates['lesson_01/step_05.hbs']());
        },
        function step_06() {
            _this.cfg_view.hide_points();
            _this.cfg_view.update();
            _this.text.html("");
            _this.text.append(Handlebars.templates['lesson_01/step_06.hbs']());

            MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.canvas.id]);
        },
        function step_07() {
            _this.text.append(Handlebars.templates['lesson_01/step_07.hbs']());
            MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.canvas.id]);
        },
        // function step_08() {
        //     _this.text.append(Handlebars.templates['lesson_01/step_08.hbs']());
        // }
    ];
    
    this.init_children = function() {

        this.cfg_canvas = $('#cfg-canvas');
        
        this.cfg_view = new CFGView({
            canvas: '#cfg-canvas',
            simulator: this.simulator
        });
        
        this.cfg_view.init();
        
    }
    
}

IntroductionView.prototype = Object.create(TutorialView.prototype);
IntroductionView.prototype.constructor = IntroductionView
