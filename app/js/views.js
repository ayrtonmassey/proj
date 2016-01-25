function View(kwargs) {
    this.canvas = $(kwargs.canvas);
    this.parent = kwargs.parent;
    
    var _this = this
        
    this.init = function() {
        throw new ReferenceError("function {0}.init() has not been implemented.".format(_this.constructor.name));
    }

    this.template = function() {
        throw new ReferenceError("field {0}.template has not been defined.".format(_this.constructor.name));
    }
}

function TemplateView(kwargs) {    
    View.call(this, kwargs);

    this.template = Handlebars.templates['template.hbs']

    this.init = function() {
        
    }
}

TemplateView.prototype = Object.create(View.prototype);
TemplateView.prototype.constructor = TemplateView

