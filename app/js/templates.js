(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['simulator/sim_controls/main.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<span id=\"sim-controls\" class=\"btn-group\">\n    <button id=\"fast-backward\" class=\"btn btn-default\">\n        <span class=\"fa fa-fast-backward\"></span>\n    </button>\n    <button id=\"step-forward\" class=\"btn btn-default\">\n        <span class=\"fa fa-step-forward\"></span>\n    </button>\n    <button id=\"play\" class=\"btn btn-default\">\n        <span class=\"fa fa-play\"></span>\n    </button>\n    <button id=\"pause\" class=\"btn btn-default\">\n        <span class=\"fa fa-pause\"></span>\n    </button>\n    <button id=\"fast-forward\" class=\"btn btn-default\">\n        <span class=\"fa fa-fast-forward\"></span>\n    </button>\n</span>\n";
},"useData":true});
templates['simulator/sim_controls/canvas.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row no-flex\">\n    <div id=\"sim-controls-canvas\" class=\"col-xs-12\">\n    </div>\n</div>\n";
},"useData":true});
templates['simulator/results/main.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "            <tr class=\"result-row node-"
    + alias2(alias1((depth0 != null ? depth0.index : depth0), depth0))
    + "\"><th>"
    + alias2(alias1((depth0 != null ? depth0.index : depth0), depth0))
    + "</th></tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<table id=\"results-table\" class=\"table table-bordered\">\n    <thead id=\"results-table-head\">\n        <tr>\n            <th></th>\n            <th id=\"local-header\">Local Information</th>\n            <th id=\"global-header\" colspan=\"99999\">Global Information</th>\n        </tr>\n        <tr id=\"round-row\">\n            <th rowspan=\"2\">Instruction</th>\n            <th id=\"round-header\">Round</th>\n        </tr>\n        <tr id=\"set-row\">\n            <th>Set</th>\n        </tr>\n    </thead>\n    <tbody>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.nodes : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </tbody>\n</table>\n";
},"useData":true});
templates['simulator/results/canvas.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"results-canvas\" class=\"row\">\n</div>\n";
},"useData":true});
templates['simulator/roundrobin.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row\">\n    <div id=\"left-column\" class=\"col-xs-3\">\n        <div class=\"row\">\n            <div id=\"code-canvas\" class=\"col-xs-12\">\n            </div>\n        </div>\n        <div class=\"row no-flex\">\n            <div id=\"sim-controls-canvas\" class=\"col-xs-12\">\n            </div>\n        </div>\n        <div class=\"row flex-max\">\n            <div id=\"lattice-canvas\" class=\"col-xs-12\">\n            </div>\n        </div>\n    </div>\n    <div id=\"right-column\" class=\"col-xs-9\">\n        <div class=\"row\">\n            <div id=\"framework-canvas\" class=\"col-xs-12\">\n            </div>\n        </div>\n\n        <div class=\"row flex-max\">\n            <div class=\"col-xs-12\" style=\"display: flex; flex-direction: column; max-width: 100%;\">\n                <ul class=\"nav nav-tabs\">\n                    <li class=\"nav-item\"><a class=\"nav-link active\" data-toggle=\"tab\" href=\"#cfg-canvas\">CFG</a></li>\n                    <li class=\"nav-item\"><a class=\"nav-link\" data-toggle=\"tab\" href=\"#results-canvas\">Results Table</a></li>\n                </ul>\n\n                <div class=\"tab-content flex-max\">\n                    <div id=\"cfg-canvas\" class=\"tab-pane fade in active flex\">\n                    </div>\n                    <div id=\"results-canvas\" class=\"tab-pane fade\">\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
templates['simulator/init.iloc'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "    load   rx     => ra\n    load   ry     => rb\n    loadI  0      => rc\nL1: add    ra, rc => rc\n    addI   rb, -1 => rb\n    cmp_LE rb, r0 => rd\n    cbr    rd     -> L2, L1\nL2: store  rc     => rz\n";
},"useData":true});
templates['simulator/cfg/point.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"node-html-label\">\n    <span class=\"node-index\">\n        "
    + alias4(((helper = (helper = helpers.set || (depth0 != null ? depth0.set : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"set","hash":{},"data":data}) : helper)))
    + "(n<sub>"
    + alias4(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "</sub>)\n    </span>\n    <span class=\"iloc\">"
    + ((stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</span>\n</div>\n";
},"useData":true});
templates['simulator/cfg/main.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<svg id=\"cfg-svg\">\n</svg>\n";
},"useData":true});
templates['simulator/cfg/btn-show-points.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"show-points-controls\" class=\"input-group\">\n    <div class=\"input-group-addon input-group-addon-sm\">Show Points</div>\n    <span class=\"input-group-btn\">\n        <button id=\"btn-show-points\" class=\"btn btn-success btn-sm\">All</button>\n    </span>\n</div>\n";
},"useData":true});
templates['simulator/cfg/node.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function";

  return "<div class=\"node-html-label\">\n    <span class=\"node-index\">\n        n<sub>"
    + container.escapeExpression(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "</sub>\n    </span>\n    <table class='iloc'>\n        <tbody>\n            <tr>"
    + ((stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</tr>\n        </tbody>\n    </table>\n</div>\n";
},"useData":true});
templates['simulator/framework/main.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                                    <option value="
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + ">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</option>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <div class=\"text-center\">\n            <h1 id=\"framework-title\"></h1>\n            <button type=\"button\" class=\"btn btn-primary btn-sm\" data-toggle=\"modal\" data-target=\"#framework-settings-modal\">\n                <i class=\"fa fa-cog\"></i> Change\n            </button>\n        </div>\n    </div>\n</div>\n<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <div class=\"row\">\n            <div class=\"col-xs-6\"><h2>Meet Function</h2></div>\n            <div class=\"col-xs-6\"><h2>Transfer Function</h2></div>\n        </div>\n    </div>\n</div>\n<div class=\"row\">\n    <div id=\"framework-meet\" class=\"meet col-xs-6\"></div>\n    <div id=\"framework-transfer\" class=\"transfer col-xs-6\"></div>\n</div>\n<div class=\"row\">\n    <div id=\"framework-order\" class=\"col-xs-12\"></div>\n</div>\n\n<!-- Modal -->\n<div class=\"modal fade\" id=\"framework-settings-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n                <h4 class=\"modal-title\" id=\"myModalLabel\">Modal title</h4>\n            </div>\n            <div class=\"modal-body\">\n                <div id=\"alert-framework-change\" class=\"alert alert-danger\"></div>\n                <form>\n                    <div class=\"form-group row\">\n                        <label class=\"col-sm-3 form-control-label\" for=\"input-framework-dfa\">Data-Flow</label>\n                        <div class=\"col-sm-9\">\n                            <select type=\"text\" class=\"form-control\" id=\"input-framework-dfa\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.dataflows : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                            </select>\n                        </div>\n                    </div>\n                    <div class=\"form-group row\">\n                        <label class=\"col-sm-3 form-control-label\" for=\"input-framework-order\">Evaluation Order</label>\n                        <div class=\"col-sm-9\">\n                            <select type=\"text\" class=\"form-control\" id=\"input-framework-order\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.orderings : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                            </select>\n                        </div>\n                    </div>\n                </form>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n                <button type=\"button\" class=\"btn btn-primary\" id=\"btn-framework-change\">Save changes</button>\n            </div>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
templates['simulator/code/main.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"code-display\" class=\"row\">\n</div>\n<div id=\"code-editor\" class=\"row\">\n</div>\n<div id=\"code-alert\" class=\"row alert alert-dismissable no-flex\">\n    <span id=\"code-alert-content\"></span>\n    <a id=\"btn-hide-alert\" class=\"close\">&times;</a>\n</div>\n<div id=\"code-controls\" class=\"row no-flex\">\n</div>\n";
},"useData":true});
templates['simulator/code/display.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.escapeExpression;

  return "            <tr id=\"instruction-"
    + alias1(container.lambda((depth0 != null ? depth0.index : depth0), depth0))
    + "\" class=\"instruction\">"
    + alias1((helpers.toHTML || (depth0 && depth0.toHTML) || helpers.helperMissing).call(depth0 != null ? depth0 : {},depth0,{"name":"toHTML","hash":{},"data":data}))
    + "</tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<table class=\"table iloc borderless\">\n    <tbody>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.nodes : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </tbody>\n</table>\n";
},"useData":true});
templates['simulator/code/controls.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"code-controls-edit\">\n    <button id=\"btn-sim\" class=\"btn btn-primary btn-sm\">Simulate</button>\n    <button id=\"btn-cancel-edit\" class=\"btn btn-danger btn-sm\">Cancel</button>\n</div>\n<div id=\"code-controls-sim\">\n    <button id=\"btn-edit\" class=\"btn btn-primary btn-sm\">Edit</button>\n</div>\n";
},"useData":true});
templates['simulator/code/editor.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<textarea>"
    + container.escapeExpression(((helper = (helper = helpers.code || (depth0 != null ? depth0.code : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"code","hash":{},"data":data}) : helper)))
    + "</textarea>\n";
},"useData":true});
templates['simulator/lattice/main.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<svg id=\"lattice-svg\">\n</svg>\n";
},"useData":true});
templates['simulator/lattice/btn-lattice-collapse.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<button id=\"btn-lattice-collapse\" class=\"btn btn-success btn-sm\"><i class=\"fa fa-plus\"></i></button>\n";
},"useData":true});
templates['simulator/lattice/node.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div>\n    <table class='iloc'>\n        <tbody>\n            <tr>"
    + ((stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"content","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</tr>\n        </tbody>\n    </table>\n</div>\n";
},"useData":true});
templates['teaching/question/main.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "        <p>"
    + ((stack1 = container.lambda(depth0, depth0)) != null ? stack1 : "")
    + "</p>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "            <button class=\"btn btn-info btn-answer "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.correct : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + "\" answer_id=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\">\n                "
    + alias2(alias1((depth0 != null ? depth0.text : depth0), depth0))
    + "\n            </button>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "correct";
},"6":function(container,depth0,helpers,partials,data) {
    return "incorrect";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "<div class=\"col-xs-12\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.question : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    <div class=\"answer-grid\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.answers : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n    <p class=\"pick-text\"></p>\n</div>\n";
},"useData":true});
templates['teaching/question/canvas.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "-"
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"id","hash":{},"data":data}) : helper)));
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"question-canvas"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.id : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" class=\"question row\">\n</div>\n";
},"useData":true});
templates['teaching/question/answer_correct_flag.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "    <i class=\"fa fa-check-circle position-right\"></i>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "    <i class=\"fa fa-times-circle position-right\"></i>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.correct : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});
templates['teaching/progs/guessing.iloc'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "    load   rx     => rx\n    loadI  50     => rg\nL0: div    rg, 2  => rt\n    cbr_EQ rg, rx -> L5, L1\nL1: cbr_LT rg, rx -> L2, L3\nL2: add    rg, rt => rg\n    jump   L4\nL3: sub    rg, rt => rg\nL4: jump   L0\nL5: store  rx     => rx";
},"useData":true});
templates['teaching/lesson/generic/step_43.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "data-flows";
},"3":function(container,depth0,helpers,partials,data) {
    return "domain";
},"5":function(container,depth0,helpers,partials,data) {
    return "direction";
},"7":function(container,depth0,helpers,partials,data) {
    return "transfer functions";
},"9":function(container,depth0,helpers,partials,data) {
    return "boundary";
},"11":function(container,depth0,helpers,partials,data) {
    return "identity function";
},"13":function(container,depth0,helpers,partials,data) {
    return "closed";
},"15":function(container,depth0,helpers,partials,data) {
    return "composition";
},"17":function(container,depth0,helpers,partials,data) {
    return "monotonic";
},"19":function(container,depth0,helpers,partials,data) {
    return "meet semi-lattice";
},"21":function(container,depth0,helpers,partials,data) {
    return "partially ordered";
},"23":function(container,depth0,helpers,partials,data) {
    return "hasse diagram";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>That's it for this lesson! To sum up:</p>\n\n<ul>\n    <li>A <strong>generic framework</strong> lets us define "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"dataflow_analysis",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " for all kinds of properties.</li>\n    <li>Our generic frameworks need to contain 5 things:\n        <ul>\n            <li>A "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"domain",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " of values.</li>\n            <li>A "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"direction",{"name":"definition","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ".</li>\n            <li>A set of "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"dataflow_equation",{"name":"definition","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " \\(F\\) and a meet operator \\(\\land\\).</li>\n            <li>An initial value at the "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"boundary",{"name":"definition","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ".</li>\n            <li>A set of <strong>initial values</strong> for each point.</li>\n        </ul>\n    </li>\n    <li>Our functions need to satisfy the following conditions:\n        <ul>\n            <li>\\(F\\) contains the "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"identity_function",{"name":"definition","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ".</li>\n            <li>\\(F\\) must be "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"closure",{"name":"definition","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " under "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"composition",{"name":"definition","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ".</li>\n            <li>\\(F\\) must be "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"monotonic",{"name":"definition","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ".</li>\n            <li>The values and meet operator must form a "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"meet_semilattice",{"name":"definition","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ".</li>\n        </ul>\n    </li>\n    <li>The "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"meet_semilattice",{"name":"definition","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " is a "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"partial_order",{"name":"definition","hash":{},"fn":container.program(21, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " set.</li>\n    <li>We can represent the "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"meet_semilattice",{"name":"definition","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " using a "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"hasse_diagram",{"name":"definition","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ".</li>\n</ul>\n\n<p>You can <strong>view the lattice</strong> example in the simulator or <strong>return to the menu</strong> using the buttons below.</p>\n\n<p><a id=\"btn-goto-simulator\" class=\"btn btn-primary btn-block\">Open CFG in Simulator</a></p>\n<p><a id=\"btn-goto-menu\" class=\"btn btn-secondary btn-block\">Back to Menu</a></p>\n";
},"useData":true});
templates['teaching/lesson/generic/step_22.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "identity function";
},"3":function(container,depth0,helpers,partials,data) {
    return "closed";
},"5":function(container,depth0,helpers,partials,data) {
    return "composition";
},"7":function(container,depth0,helpers,partials,data) {
    return "monotonic";
},"9":function(container,depth0,helpers,partials,data) {
    return "meet semi-lattice";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>We want to <strong>avoid</strong> this, so our data-flows must meet the following criteria:</p>\n\n<ul>\n    <li>\\(F\\) contains the "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"identity_function",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ".</li>\n    <li>\\(F\\) must be "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"closure",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " under "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"composition",{"name":"definition","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ".</li>\n    <li>\\(F\\) must be "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"monotonic",{"name":"definition","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ".</li>\n    <li>The values and meet operator must form a "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"meet_semilattice",{"name":"definition","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ".</li>\n</ul>\n    \n";
},"useData":true});
templates['teaching/lesson/generic/step_38.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "semi-lattice";
},"3":function(container,depth0,helpers,partials,data) {
    return "lattice";
},"5":function(container,depth0,helpers,partials,data) {
    return "hasse diagram";
},"7":function(container,depth0,helpers,partials,data) {
    return "reaching definitions";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p> Every "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"semilattice",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " has a bottom (or \\(\\bot\\)) element. A "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"lattice",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " also has a top (or \\(\\top\\)) element. For every element \\(x\\):</p>\n\n<ul>\n    <li>\\(x \\land \\top = x\\) and \\( x \\le \\top \\).</li>\n    <li>\\(x \\land \\bot = \\bot\\) and \\( x \\ge \\bot \\).</li>\n</ul>\n\n<p>In our "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"hasse_diagram",{"name":"definition","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " for "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"reaching_definition",{"name":"definition","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ", \\(\\top\\) is the <strong>empty set</strong> (\\(\\{\\}\\) or \\(\\varnothing\\)) and \\(\\bot\\) is the set of <strong>all definitions</strong>.</p>\n";
},"useData":true});
templates['teaching/lesson/generic/step_31.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "monotonic";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>Our third condition is that:</p>\n\n<ul style=\"text-align: center; list-style-position:inside;\">\n    <li>\\(F\\) must be "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"monotonic",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ".</li>\n</ul>\n\n<p>If a function \\(f(x)\\) is "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"monotonic",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ", then as \\(x\\) increases, \\(f(x)\\) either <strong>only increases</strong> or <strong>only decreases</strong>. That is, for all \\( x \\leq y \\) we have \\( f(x) \\leq f(y) \\).</p>\n";
},"useData":true});
templates['teaching/lesson/generic/main.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row\">\n    <div id=\"left-column\" class=\"col-xs-offset-2 col-xs-8 lesson-step\">\n        <nav class=\"row\">\n            <button id=\"btn-prev\" class=\"btn btn-primary\">Prev</button>\n            <h1 class=\"nav-title\">$MISSING_TITLE</h1>\n            <button id=\"btn-next\" class=\"pull-right btn btn-primary\">Next</button>\n        </nav>\n        <div class=\"row flex-max\">\n            <div id=\"text\" class=\"col-xs-12\">\n            </div>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
templates['teaching/lesson/generic/step_34.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "partially ordered set";
},"3":function(container,depth0,helpers,partials,data) {
    return "hasse diagram";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>We can represent our "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"partial_order",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " using a "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"hasse_diagram",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ". The nodes of the diagram represent elements of our set. The edges are pointed downward, and represent the \\(\\ge\\) relationship - that is, a downward edge exists from \\(x\\) to \\(y\\) if \\(x \\ge y\\). Looking at the graph on the right, although \\( \\small{\\{ {\\tt ra_1}, {\\tt rc_1}, {\\tt ra_2} \\} \\le \\{ {\\tt ra}_1 \\}} \\) we omit the edge because it is represented by the path through \\( \\small{\\{ {\\tt ra_1}, {\\tt rc_1} \\}} \\).</p>\n";
},"useData":true});
templates['teaching/lesson/generic/step_20.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "backward analysis";
},"3":function(container,depth0,helpers,partials,data) {
    return "successors";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>For a "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"backward_analysis",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " the algorithm is almost the same:</p>\n\n<p>\n    \\begin{align}\n    & \\text{Out} ( \\small{\\text{EXIT}} ) = v_{\\text{EXIT}}; \\\\\n    &    {\\bf for} \\, ( \\text{each block} \\: B \\: \\text{in the CFG} ) \\; \\text{In}_{B} = \\top;    \\\\\n    &    {\\bf while} \\, ( \\text{changes to any} \\: \\text{In} \\: \\text{occur} ) \\: \\{    \\\\\n    &    \\quad \\quad {\\bf for} \\, (\\text{each block} \\: B \\: \\text{in the CFG} ) \\: \\{    \\\\\n    &    \\quad \\quad \\quad \\quad \\text{Out}_{B} = \\land_{\\text{successors} \\, S \\, \\text{of} \\,  B} \\, \\text{In}_{S};    \\\\\n    &    \\quad \\quad \\quad \\quad \\text{In}_{B} \\phantom{O} = F_{B}(Out_{B});    \\\\\n    &    \\quad \\quad \\}    \\\\\n    &    \\}   \n    \\end{align}\n</p>\n\n<p>We initialise the boundary \\(\\text{Out}(\\small{\\text{EXIT}})\\). References to \\(\\text{In}\\) have been replaced with \\(\\text{Out}\\) and vice-versa, and instead of taking the meet (or \\(\\land\\)) over a node's predecessors, we calculate it from that node's "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"successor",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ".</p>\n";
},"useData":true});
templates['teaching/lesson/generic/step_12.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "round robin";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>One way is to use the "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"round_robin",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " approach from before. We've seen it in action, but let's look at how we'd actually implement it.</p>\n";
},"useData":true});
templates['teaching/lesson/generic/step_13-18.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "forward analysis";
},"3":function(container,depth0,helpers,partials,data) {
    return " \\phantom{ ";
},"5":function(container,depth0,helpers,partials,data) {
    return " } ";
},"7":function(container,depth0,helpers,partials,data) {
    return "boundary";
},"9":function(container,depth0,helpers,partials,data) {
    return "";
},"11":function(container,depth0,helpers,partials,data) {
    return "<li>Next, we assign the <strong>initial values</strong> to each point.</li>";
},"13":function(container,depth0,helpers,partials,data) {
    return "<li>Then, while any <strong>changes</strong> occur...</li>";
},"15":function(container,depth0,helpers,partials,data) {
    return "<li>We <strong>iterate</strong> over each node <strong>in order</strong>...</li>";
},"17":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<li>Calculating the value of the "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"meet_function",{"name":"definition","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " for that node - in this case, \\(\\text{In}_{B}\\)...</li>";
},"18":function(container,depth0,helpers,partials,data) {
    return "meet function";
},"20":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<li>And finally, the value of the "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"transfer_function",{"name":"definition","hash":{},"fn":container.program(21, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " - in this case, \\(\\text{Out}_{B}\\).</li>";
},"21":function(container,depth0,helpers,partials,data) {
    return "transfer function";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>For a "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"forward_analysis",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " we use the following algorithm:</p>\n\n<p>\n    \\begin{align}\n    & \\text{In} ( \\small{\\text{ENTRY}} ) = v_{\\text{ENTRY}}; \\\\\n    & "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hs2 : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " {\\bf for} \\, ( \\text{each block} \\: B \\: \\text{in the CFG} ) \\; \\text{Out}_{B} = \\top; "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hs2 : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " \\\\\n    & "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hs3 : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " {\\bf while} \\, ( \\text{changes to any} \\: \\text{Out} \\: \\text{occur} ) \\: \\{ "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hs3 : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " \\\\\n    & "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hs4 : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " \\quad \\quad {\\bf for} \\, (\\text{each block} \\: B \\: \\text{in the CFG} ) \\: \\{ "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hs4 : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " \\\\\n    & "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hs5 : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " \\quad \\quad \\quad \\quad \\text{In}_{B} \\phantom{O} = \\land_{\\text{predecessors} \\, P \\, \\text{of} \\,  B} \\, \\text{Out}_{P}; "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hs5 : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " \\\\\n    & "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hs6 : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " \\quad \\quad \\quad \\quad \\text{Out}_{B} = F_{B}(In_{B}); "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hs6 : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " \\\\\n    & "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hs6 : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " \\quad \\quad \\} "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hs6 : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " \\\\\n    & "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hs6 : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " \\} "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hs6 : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n    \\end{align}\n</p>\n\n<ol>\n<li>First, we assign the "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"boundary",{"name":"definition","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " value.</li>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hs2 : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hs3 : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(13, data, 0),"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hs4 : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(15, data, 0),"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hs5 : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(17, data, 0),"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hs6 : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(20, data, 0),"data":data})) != null ? stack1 : "")
    + "\n</ol>\n";
},"useData":true});
templates['teaching/lesson/generic/step_27.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "compose";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>To "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"composition",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " (denoted \\(\\circ\\)) two functions means to apply one to the output of another, i.e. \\( (f \\circ g) (x) = f(g(x)) \\)</p>\n";
},"useData":true});
templates['teaching/lesson/generic/step_09.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "reaching definitions";
},"3":function(container,depth0,helpers,partials,data) {
    return "boundary";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p class=\"lesson-generic-description\">For "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"reaching_definitions",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ", the "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"boundary",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " is the <strong>empty set</strong>.</p>\n";
},"useData":true});
templates['teaching/lesson/generic/step_08.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "reaching definitions";
},"3":function(container,depth0,helpers,partials,data) {
    return "union";
},"5":function(container,depth0,helpers,partials,data) {
    return "intersection";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p class=\"lesson-generic-description\">We call the <strong>combination</strong> of value sets the <strong>meet</strong> (or \\(\\land\\)) of those sets. In "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"reaching_definitions",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " we calculate the meet as the "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"union",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " (or \\(\\cup\\)) of sets. In some data-flow frameworks the meet can be a different set operation, such as the "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"intersection",{"name":"definition","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " (or \\(\\cap\\)).</p>\n";
},"useData":true});
templates['teaching/lesson/generic/step_24.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "identity function";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>Our first condition is that:</p>\n\n<ul style=\"text-align: center; list-style-position:inside;\">\n    <li>\\(F\\) contains the "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"identity_function",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ".\n</ul>\n\n<p>The identity function is a function whose output is the <strong>same</strong> as its input: \\[ f(x) = x \\]</p>\n";
},"useData":true});
templates['teaching/lesson/generic/step_28.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "reaching definitions";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>For "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"reaching_definition",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ", let's take any two functions from \\(F\\) and call them \\(F_A\\) and \\(F_B\\). We know that:</p>\n\n<p>\n    \\begin{align}\n    F_A(x) &= \\text{DefGen}_A \\cup (x \\setminus \\text{DefKill}_A) \\\\\n    F_B(x) &= \\text{DefGen}_B \\cup (x \\setminus \\text{DefKill}_B)\n    \\end{align}\n</p>\n";
},"useData":true});
templates['teaching/lesson/generic/step_40.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "monotonic functions";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>Now, back to "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"monotonic",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " (don't worry, we're nearly there!)</p>\n";
},"useData":true});
templates['teaching/lesson/generic/step_11.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "reaching definitions";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>So, we know how our "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"reaching_definition",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " analysis can be mapped to our <strong>generic framework</strong>. But how do we use it?</p>\n";
},"useData":true});
templates['teaching/lesson/generic/step_03.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "domain";
},"3":function(container,depth0,helpers,partials,data) {
    return "variables";
},"5":function(container,depth0,helpers,partials,data) {
    return "definitions";
},"7":function(container,depth0,helpers,partials,data) {
    return "expressions";
},"9":function(container,depth0,helpers,partials,data) {
    return "direction";
},"11":function(container,depth0,helpers,partials,data) {
    return "forward";
},"13":function(container,depth0,helpers,partials,data) {
    return "backward";
},"15":function(container,depth0,helpers,partials,data) {
    return "data-flow equations";
},"17":function(container,depth0,helpers,partials,data) {
    return "transfer functions";
},"19":function(container,depth0,helpers,partials,data) {
    return "meet function";
},"21":function(container,depth0,helpers,partials,data) {
    return "boundary";
},"23":function(container,depth0,helpers,partials,data) {
    return "top";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>Our <strong>generic framework</strong> has five components:</p>\n\n<ul>\n    <li>A "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"domain",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " of values, such as "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"variable",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ", "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"variable_definition",{"name":"definition","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ", or "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"expression",{"name":"definition","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ".</li>\n    <li>A "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"direction",{"name":"definition","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " in which data flows, either "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"forward_analysis",{"name":"definition","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " or "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"backward_analysis",{"name":"definition","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ".</li>\n    <li>A set of "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"dataflow_equation",{"name":"definition","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ":\n        <ul>\n            <li>A set of "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"transfer_function",{"name":"definition","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " \\(F\\) in which define how data is propagated <strong>through</strong> a node.</li>\n            <li>A "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"meet_function",{"name":"definition","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " which defines how data is is propagated <strong>between</strong> nodes.</li>\n        </ul>\n    </li>\n    <li>A "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"boundary",{"name":"definition","hash":{},"fn":container.program(21, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " which defines the values at the <strong>starting point</strong> of the analysis.</li>\n    <li>A set of <strong>initial values</strong> for each point, referred to as \\(\\top\\) (or "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"top",{"name":"definition","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ")</li>\n</ul>\n";
},"useData":true});
templates['teaching/lesson/generic/step_25.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "reaching definitions";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>For our "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"reaching_definition",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " framework, this is the function for any block which doesn't define any variables. Looking at the CFG on the right, we can see that \\(\\text{In}(n_1) = \\text{Out}(n_1)\\), i.e.: \\[ F_{n_1}(x) = x \\]</p>\n";
},"useData":true});
templates['teaching/lesson/generic/step_10.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "top";
},"3":function(container,depth0,helpers,partials,data) {
    return "boundary";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p class=\"lesson-generic-description\">In fact, all values are initialised to the <strong>empty set</strong> - the "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"top",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " element. It is possible for the "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"boundary",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " to <strong>differ</strong> from the initial values, but here they are the same.</p>\n";
},"useData":true});
templates['teaching/lesson/generic/step_00.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "terminate";
},"3":function(container,depth0,helpers,partials,data) {
    return "meet semi-lattice";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>Welcome to the Data-Flow Analysis Tutor! In this tutorial, you'll learn:</p>\n\n<ul>\n    <li>How to define data-flows within a <strong>generic framework</strong>.</li>\n    <li>The conditions under which our analyses will "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"terminate",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ".</li>\n    <li>The purpose of a "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"meet_semilattice",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ".</li>\n</ul>\n\n<p>To begin, please click the <em>Next</em> button.</p>\n";
},"useData":true});
templates['teaching/lesson/generic/step_35.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Now, you might intutively think this diagram is wrong - surely sets with more elements are <strong>bigger</strong> than ones with fewer? However, for reaching definitions, this is <strong>incorrect</strong>! If you look at the definition of \\(\\le\\), if \\(x \\land y = x\\) then \\(x\\) is smaller than \\(y\\). Our meet operator here is \\(\\cup\\), so if \\(x \\cup y = x\\), then \\(x\\) is actually <strong>smaller</strong>!</p>\n";
},"useData":true});
templates['teaching/lesson/generic/step_36.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "partially ordered";
},"3":function(container,depth0,helpers,partials,data) {
    return "meet semi-lattice";
},"5":function(container,depth0,helpers,partials,data) {
    return "meet";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>A "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"partial_order",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " set of this kind is called a "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"semilattice",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ". That is, for any pair of sets of values, there exists a third set which is the highest-ordered <strong>lower bound</strong> of the "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"meet_function",{"name":"definition","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " of said sets.</p>\n";
},"useData":true});
templates['teaching/lesson/generic/step_29.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Now, let's compose the two functions to obtain \\(F_A \\circ F_B\\):</p>\n\n<p>\n    \\begin{align}\n    (F_A \\circ F_B)(x) &= \\text{DefGen}_A \\cup ((\\text{DefGen}_B \\cup (x \\setminus \\text{DefKill}_B)) \\setminus \\text{DefKill}_A) \\\\\n    &= (\\text{DefGen}_A \\cup (\\text{DefGen}_B \\setminus \\text{DefKill}_A)) \\cup (x \\setminus (\\text{DefKill}_B \\cup \\text{DefKill}_A)) \\\\\n    \\end{align}\n</p>\n";
},"useData":true});
templates['teaching/lesson/generic/step_26.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "closed";
},"3":function(container,depth0,helpers,partials,data) {
    return "composition";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>Our second condition is that:</p>\n\n<ul style=\"text-align: center; list-style-position:inside;\">\n    <li>\\(F\\) must be "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"closure",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " under "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"composition",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ".</li>\n</ul>\n\n<p>If a set is "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"closure",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " under an operation, it means that applying that operation to a member of the set produces <strong>another member</strong> of that set.</p>\n\n<p>For example, the set of integers is closed under <strong>addition</strong>: adding any two integers produces <strong>another integer</strong>.</p>\n";
},"useData":true});
templates['teaching/lesson/generic/step_42.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "reaching definitions";
},"3":function(container,depth0,helpers,partials,data) {
    return "monotonicity";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>For "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"reaching_definition",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ", we can verify that \\(F_{B}(x \\land y) \\le F_{B}(x) \\land F_{B}(y)\\) by checking that:</p>\n\n<p>\\begin{align}\n    \\text{DefGen}_{B} \\cup ((x \\cup y) \\setminus \\text{DefKill}_{B}) &\\le (\\text{DefGen}_{B} \\cup (x \\setminus \\text{DefKill}_{B})) \\cup (\\text{DefGen}_{B} \\cup (y \\setminus \\text{DefKill}_{B})) & \\\\\n    &\\le \\text{DefGen}_{B} \\cup \\text{DefGen}_{B} \\cup (x \\setminus \\text{DefKill}_{B}) \\cup (y \\setminus \\text{DefKill}_{B}) & \\\\\n    &\\le \\text{DefGen}_{B} \\cup ((x \\cup y) \\setminus \\text{DefKill}_{B})) & \\text{Q.E.D} \\\\\n    \\end{align}</p>\n\n<p>Thus we have satisfied the "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"monotonic",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " condition.</p>\n";
},"useData":true});
templates['teaching/lesson/generic/step_37.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "meet";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>For example, looking at the diagram, the "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"meet_function",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " of \\(\\{ {\\tt ra}_1 \\}\\) and \\(\\{ {\\tt rc}_1 \\}\\) is \\(\\{ {\\tt ra}_1, {\\tt rc}_1 \\}\\) - the highest-up node in the diagram which <strong>links</strong> both sets. There must only be <strong>one</strong> greatest lower bound for a partially ordered set to be a semi-lattice.</p>\n";
},"useData":true});
templates['teaching/lesson/generic/step_23.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Let's look at each of these conditions and see what they mean!</p>\n";
},"useData":true});
templates['teaching/lesson/generic/step_33.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "reaching definitions";
},"3":function(container,depth0,helpers,partials,data) {
    return "partial order";
},"5":function(container,depth0,helpers,partials,data) {
    return "meet function";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>So how do we apply this to "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"reaching_definition",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "? We need to define a "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"partial_order",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " on our values in terms of our "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"meet_function",{"name":"definition","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ", \\(\\land\\): \\[ x \\le y \\iff x \\land y = x \\] That is, for <strong>some</strong> pairs of elements \\(x\\) and \\(y\\), the element \\(x\\) comes before \\(y\\) if \\(x \\land y\\) is the same as \\(x\\). Note that <strong>not all</strong> elements need to be related in this way - we'll come to this in a minute.</p>\n";
},"useData":true});
templates['teaching/lesson/generic/step_19.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>That's it! When broken down the algorithm is fairly easy to understand.</p>\n";
},"useData":true});
templates['teaching/lesson/generic/step_25.iloc'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "    addI   ra, 1  => ra\n    cbr_GE ra, r0 -> L0, L1\nL0: sub    r0, ra => ra\nL1: i2i    ra     => rc";
},"useData":true});
templates['teaching/lesson/generic/step_07.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "transfer function";
},"3":function(container,depth0,helpers,partials,data) {
    return "local information";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p class=\"lesson-generic-description\">Previously, we have seen the "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"transfer_function",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " defined as \\(\\small{\\text{Out}(n)}\\) in terms of \\(\\small{\\text{In}(n)}\\) and "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"local_information",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ". In generic frameworks we define a <strong>set</strong> of transfer functions \\(\\small{F}\\), one for <strong>each</strong> block, \\(\\small{B}\\), of code. Each block is the same as a <strong>node</strong> in the CFG. For example, \\[ \\small{\\text{Out}(n_0) = \\text{DefGen}(n_0) \\cup (\\text{In}(n_0) \\setminus \\text{DefKill}(n_0))}\\] becomes \\[\\small{F_{n_0}(x) = \\text{DefGen}_{n_0} \\cup (x \\setminus \\text{DefKill}_{n_0})}\\] in our generic reaching definitions framework. \\(x\\), in this case, would be \\(\\small{\\text{In}(n_0)}\\). We will see why this is important later.</p>\n";
},"useData":true});
templates['teaching/lesson/generic/step_21.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "fixed-point computation";
},"3":function(container,depth0,helpers,partials,data) {
    return "iterate";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>These algorithms are what is known as a "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"fixed_point",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ". We "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"iterative",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " the process until repeating it gives us the <strong>same answer</strong> as the last time.</p>\n\n<p>We need to be careful, though - if we design our data-flow badly, we may <strong>never</strong> find a fixed-point, and our algorithm may <strong>never stop</strong> running!</p>\n";
},"useData":true});
templates['teaching/lesson/generic/step_01.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "data-flow analysis";
},"3":function(container,depth0,helpers,partials,data) {
    return "reaching definitions";
},"5":function(container,depth0,helpers,partials,data) {
    return "control-flow graph";
},"7":function(container,depth0,helpers,partials,data) {
    return "round robin";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>We've seen how we can use "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"dataflow_analysis",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " to compute the set of "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"reaching_definitions",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " at points in a "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"control_flow_graph",{"name":"definition","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " using the "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"round_robin",{"name":"definition","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " algorithm, but what if we want to define <strong>other data-flows</strong> to work out different properties of the CFG?</p>\n";
},"useData":true});
templates['teaching/lesson/generic/step_02.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "reaching definitions";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>It turns out that the process we used for "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"reaching_definition",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " can be repeated for other kinds of data-flow analysis. We can define what is known as a <strong>generic framework</strong>, which allows us to apply the <strong>same process</strong> to <strong>all</strong> our data-flows!</p>\n";
},"useData":true});
templates['teaching/lesson/generic/step_30.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>If we define \\( \\small{\\text{DefGen}_C = \\text{DefGen}_A \\cup (\\text{DefGen}_B \\setminus \\text{DefKill}_A)}\\) and \\( \\small{\\text{DefKill}_C = (\\text{DefKill}_B \\cup \\text{DefKill}_A)} \\), we can substitute them and we're left with:</p>\n\n<p>\n    \\begin{align}\n    F_C(x) &= \\text{DefGen}_C \\cup (x \\setminus \\text{DefKill}_C) \\\\\n    \\end{align}\n</p>\n\n<p>Which is also a member of \\(F\\)!\n";
},"useData":true});
templates['teaching/lesson/generic/step_06.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "Reaching definitions";
},"3":function(container,depth0,helpers,partials,data) {
    return "predecessors";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p class=\"lesson-generic-description\">"
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"reaching_definitions",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " propagates values <strong>forwards</strong> from the entry point of the CFG, that is, from a node's "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"predecessor",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " to that node.</p>\n";
},"useData":true});
templates['teaching/lesson/generic/step_39.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "meet semi-lattice";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>This actually satisfies our final condition:</p>\n\n<ul style=\"text-align: center; list-style-position:inside;\">\n    <li>The values and meet operator must form a "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"meet_semilattice",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ".</li>\n</ul>\n";
},"useData":true});
templates['teaching/lesson/generic/step_04.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "reaching definitions";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>We can define "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"reaching_definitions",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " using our <strong>generic framework</strong>:</p>\n\n<table class=\"table table-bordered table-striped\">\n    <thead>\n        <tr>\n            <th>Property</th>\n            <th>Value</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr id=\"framework-domain\">\n            <td>Domain</td>\n            <td>Definitions</td>\n        </tr>\n        <tr id=\"framework-direction\">\n            <td>Direction</td>\n            <td>Forward</td>\n        </tr>\n        <tr id=\"framework-transfer\">\n            <td>Transfer Function</td>\n            <td>\\(\\small{F_{B}(x) = \\text{DefGen}_{B} \\cup (x \\setminus \\text{DefKill}_{B})} \\)</td>\n        </tr>\n        <tr id=\"framework-meet\">\n            <td>Meet Function</td>\n            <td>\\(\\land = \\cup\\)</td>\n        </tr>\n        <tr id=\"framework-boundary\">\n            <td>Boundary</td>\n            <td>\\(\\small{\\text{In}(\\small{\\text{ENTRY}}) = \\varnothing}\\)</td>\n        </tr>\n        <tr id=\"framework-initial\">\n            <td>Initial Value</td>\n            <td>\\(\\top =  \\small{\\varnothing}\\)</td>\n        </tr>\n    </tbody>\n</table>\n";
},"useData":true});
templates['teaching/lesson/generic/step_05.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "reaching definitions";
},"3":function(container,depth0,helpers,partials,data) {
    return "variable definitions";
},"5":function(container,depth0,helpers,partials,data) {
    return "data-flow equations";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p class=\"lesson-generic-description\">The domain of "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"reaching_definitions",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " is "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"variable_definition",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " since our "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"dataflow_equation",{"name":"definition","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " operate on these values.</p>\n";
},"useData":true});
templates['teaching/lesson/generic/step_41.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Remember that a function is monotonic if for any \\(x \\le y, \\, f(x) \\le f(y)\\). Using our meet operator, we can define monotonicity in <strong>another way</strong>: \\[ f(x \\land y) \\le f(x) \\land f(y) \\]</p>\n";
},"useData":true});
templates['teaching/lesson/00/main.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row\">\n    <div class=\"col-xs-6 lesson-step\">\n        <div class=\"row\">\n            <div id=\"text\" class=\"col-xs-12\">\n            </div>\n        </div>\n        <nav class=\"row\">\n            <button id=\"btn-prev\" class=\"btn btn-primary\">Prev</button>\n            <button id=\"btn-next\" class=\"pull-right btn btn-primary\">Next</button>\n        </nav>\n    </div>\n    <div id=\"cfg-canvas\" class=\"col-xs-6\">\n    </div>\n</div>\n";
},"useData":true});
templates['teaching/lesson/00/step_20.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h1>Summary</h1>\n\n<ul>\n    <li>Data-flow analysis lets us <strong>gather information</strong> at points in a <strong>control-flow graph.</strong></li>\n    <li>We use <strong>data-flow equations</strong> to determine this information.</li>\n    <li>Information is defined in terms of <strong>in</strong> and <strong>out</strong> points for each node in the CFG.</li>\n    <li>This information is used during the <strong>optimisation</strong> stage in a compiler.</li>\n</ul>\n\n<p>You can view the CFG in the simulator, continue to the next lesson or return to the menu using the buttons below.</p>\n\n<p><a id=\"btn-goto-next-lesson\" class=\"btn btn-primary btn-block\">Next Lesson</a></p>\n<p><a id=\"btn-goto-simulator\" class=\"btn btn-secondary btn-block\">Open CFG in Simulator</a></p>\n<p><a id=\"btn-goto-menu\" class=\"btn btn-secondary btn-block\">Back to Menu</a></p>\n";
},"useData":true});
templates['teaching/lesson/00/step_12.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Now we need to consider the \\(\\text{In}\\) set for the second node:</p>\n\n<p>\\begin{align}\n\\text{In}(n) &= \\bigcup_{p \\in preds} \\text{Out}(p) \\\\\n             &= \\bigcup_{p \\in \\{n_0\\}} \\text{Out}(p) \\\\\n             &= \\{\\texttt{ra}_1\\}\n \\end{align}</p>\n";
},"useData":true});
templates['teaching/lesson/00/step_16.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "killed";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>We can see that the definition of \\(\\texttt{rb}_2\\) "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"definition_killed",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " the definition of \\(\\texttt{rb}_1\\).</p>";
},"useData":true});
templates['teaching/lesson/00/step_02.iloc'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "loadI 1      => ra\naddI  ra, 2  => rb\naddI  ra, 3  => rb\nadd   ra, rb => ra\nloadI 7      => rd";
},"useData":true});
templates['teaching/lesson/00/step_09.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "reaching definitions";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>Let's try calculating the "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"reaching_definition",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " for this CFG.</p>";
},"useData":true});
templates['teaching/lesson/00/step_08.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "<strong>killed</strong>";
},"3":function(container,depth0,helpers,partials,data) {
    return "<strong>generated</strong>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>\\(\\text{In}(n)\\) is the set of definitions which reach the <strong>given</strong> node.</p>\n\n<p>\\(\\text{Out}(n)\\) is the set of variables that reach <strong>subsequent</strong> nodes.</p>\n\n<p>\\(\\text{DefKill}(n)\\) is the set of variables which are re-defined in ("
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"definition_killed",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " by) a node. These definitions <strong>will not</strong> be in \\(\\text{Out}(n)\\).</p>\n\n<p>\\(\\text{DefGen}(n)\\) is the set of variables which are defined in ("
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"definition_generated",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " by) a node. These definitions <strong>will be</strong> in \\(\\text{Out}(n)\\).</p>\n";
},"useData":true});
templates['teaching/lesson/00/step_11.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Then we need to calculate the \\(\\text{Out}\\) set:</p>\n<p>\n\\begin{align}\n\\text{Out}(n) &= \\text{DefGen}(n) \\cup \\big{(}\\text{In}(n) \\setminus \\text{DefKill}(n)\\big{)} \\\\\n              &= \\{ \\texttt{ra}_1\\} \\cup (\\varnothing \\setminus \\{ \\texttt{ra}_i \\: : \\:  \\forall i \\neq 1 \\}) \\\\\n              &= \\{ \\texttt{ra}_1\\} \\cup \\varnothing \\\\\n              &= \\{ \\texttt{ra}_1\\}\n\\end{align}\n</p>";
},"useData":true});
templates['teaching/lesson/00/step_14.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Now we need to consider the \\(\\text{In}\\) set for the third node:</p>\n\n<p>\\begin{align}\n\\text{In}(n) &= \\bigcup_{p \\in preds} \\text{Out}(p) \\\\\n             &= \\bigcup_{p \\in \\{n_1\\}} \\text{Out}(p) \\\\\n             &= \\{\\texttt{rb}_1, \\texttt{ra}_1\\}\n \\end{align}</p>\n";
},"useData":true});
templates['teaching/lesson/00/step_03.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Each <strong style=\"color: #6cc86c\">node</strong> represents an instruction.</p>\n";
},"useData":true});
templates['teaching/lesson/00/step_10.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Reaching definitions is a forward data-flow, so we need to calculate the \\(\\text{In}\\) set for the first node:</p>\n\n<p>\\begin{align}\n\\text{In}(n) &= \\bigcup_{p \\in preds} \\text{Out}(p) \\\\\n             &= \\bigcup_{p \\in \\varnothing} \\text{Out}(p) \\\\\n             &= \\varnothing\n \\end{align}</p>\n";
},"useData":true});
templates['teaching/lesson/00/step_00.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "<strong>Data-flow analysis</strong>";
},"3":function(container,depth0,helpers,partials,data) {
    return "<strong>control-flow graph</strong>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>"
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"dataflow_analysis",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " is a technique for gathering information at various points in a "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"control_flow_graph",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ". Compilers perform data-flow analysis to help them make decisions when optimizing programs.</p>\n";
},"useData":true});
templates['teaching/lesson/00/step_19.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Let's fast forward to the end of the analysis. We can see that the store to \\(\\texttt{rd}\\) generates the definition \\(\\texttt{rd}_1\\), leaving us with \\(\\{\\texttt{rd}_1, \\texttt{ra}_2, \\texttt{rb}_2\\}\\)</p>\n\n<p>In data-flow analysis we <strong>iterate</strong> this process until the values at each point <strong>stop changing</strong>. Since this example only has a single path, it's not necessary - we'll save that for the next lesson.</p>\n";
},"useData":true});
templates['teaching/lesson/00/step_07.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "<strong>data-flow equations</strong>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>We use a set of "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"dataflow_equation",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " to determine the values at each point in the graph.</p>\n\n<p>The following data-flow equations compute reaching definitions at each point in the control-flow graph:</p>\n\n<p id=\"meet_eqn\">\\[\\text{In}(n) = \\bigcup_{p \\in preds} \\text{Out}(p)\\]</p>\n\n<p id=\"transfer_eqn\">\\[\\text{Out}(n) = \\text{DefGen}(n) \\cup \\big{(}\\text{In}(n) \\setminus \\text{DefKill}(n)\\big{)}\\]</p>\n";
},"useData":true});
templates['teaching/lesson/00/step_01.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>A control-flow graph is a graph representing the <strong>possible execution paths</strong> of a computer program.</p>\n<p>Let's see what a control-flow graph looks like.</p>\n";
},"useData":true});
templates['teaching/lesson/00/step_18.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "<strong>killed</strong>";
},"3":function(container,depth0,helpers,partials,data) {
    return "<strong>generates</strong>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>That's correct! The definition \\(\\texttt{ra}_1\\) is "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"variable_killed",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " by the store to \\(\\texttt{ra}\\), which "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"variable_generated",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " \\(\\texttt{ra}_2\\).</p>\n";
},"useData":true});
templates['teaching/lesson/00/step_02.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "control-flow graph";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>On the right is the "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"control_flow_graph",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " for a simple program.</p>\n";
},"useData":true});
templates['teaching/lesson/00/step_06.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "<strong>Reaching definitions</strong>";
},"3":function(container,depth0,helpers,partials,data) {
    return "<strong>definition</strong>";
},"5":function(container,depth0,helpers,partials,data) {
    return "<strong>reaches</strong>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>"
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"reaching_definition",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " analysis lets us determine which values are available at each point in the CFG. A "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"variable_definition",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " occurs when a value is stored in a variable. That definition "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"reaching_definition",{"name":"definition","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " every node along any path in which that definition is <strong>not overwritten</strong> by another assignment.</p>\n\n</p>We can use data-flow analysis to compute the reaching definitions at each point in our CFG.</p>\n";
},"useData":true});
templates['teaching/lesson/00/step_04.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Each <strong style=\"color: #62abea\">edge</strong> represents the flow of control from one instruction to the next.</p>\n";
},"useData":true});
templates['teaching/lesson/00/step_05.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>We collect information about the data <strong>flowing in</strong> and <strong>out</strong> of each node. We refer to these as  <strong style=\"color: #9a162c\">points</strong> in the control-flow graph.</p>\n";
},"useData":true});
templates['teaching/lesson/00/step_13.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Then we need to calculate the \\(\\text{Out}\\) set:</p>\n<p>\n\\begin{align}\n\\text{Out}(n) &= \\text{DefGen}(n) \\cup \\big{(}\\text{In}(n) \\setminus \\text{DefKill}(n)\\big{)} \\\\\n              &= \\{\\texttt{rb}_1\\} \\cup (\\{\\texttt{ra}_1\\} \\setminus \\{ \\texttt{rb}_i \\: : \\:  \\forall i \\neq 1 \\}) \\\\\n              &= \\{\\texttt{rb}_1\\} \\cup \\{\\texttt{ra}_1\\} \\\\\n              &= \\{\\texttt{rb}_1, \\texttt{ra}_1\\}\n\\end{align}\n</p>";
},"useData":true});
templates['teaching/lesson/00/step_15.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Then we need to calculate the \\(\\text{Out}\\) set:</p>\n<p>\n\\begin{align}\n\\text{Out}(n) &= \\text{DefGen}(n) \\cup \\big{(}\\text{In}(n) \\setminus \\text{DefKill}(n)\\big{)} \\\\\n              &= \\{\\texttt{rb}_2\\} \\cup (\\{ \\texttt{rb}_1, \\texttt{ra}_1\\} \\setminus \\{ \\texttt{rb}_i \\: : \\:  \\forall i \\neq 2 \\}) \\\\\n              &= \\{\\texttt{rb}_2\\} \\cup \\{\\texttt{ra}_1\\} \\\\\n              &= \\{\\texttt{rb}_2, \\texttt{ra}_1\\}\n\\end{align}\n</p>";
},"useData":true});
templates['teaching/lesson/01/step_06'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Then we need to calculate the \\(\\text{Out}\\) set:</p>\n<p>\n\\begin{align}\n\\text{Out}(n_4) &= \\text{DefGen}(n_4) \\cup \\big{(}\\text{In}(n_4) \\setminus \\text{DefKill}(n_4)\\big{)} \\\\\n              &= \\{\\texttt{rc}_2\\} \\cup (\\{\\texttt{rc}_1, \\texttt{rb}_1, \\texttt{ra}_1\\} \\setminus \\{ \\texttt{rb}_i \\: : \\:  \\forall i \\neq 1 \\}) \\\\\n              &= \\{\\texttt{rc}_2\\} \\cup \\{\\texttt{rb}_1, \\texttt{ra}_1\\} \\\\\n              &= \\{\\texttt{rc}_2, \\texttt{rb}_1, \\texttt{ra}_1\\}\n\\end{align}\n</p>\n";
},"useData":true});
templates['teaching/lesson/01/main.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row\">\n    <div class=\"col-xs-6 lesson-step\">\n        <div class=\"row\">\n            <div id=\"text\" class=\"col-xs-12\">\n            </div>\n        </div>\n        <nav class=\"row\">\n            <button id=\"btn-prev\" class=\"btn btn-primary\">Prev</button>\n            <button id=\"btn-next\" class=\"pull-right btn btn-primary\">Next</button>\n        </nav>\n    </div>\n    <div id=\"cfg-canvas\" class=\"col-xs-6\">\n    </div>\n</div>\n";
},"useData":true});
templates['teaching/lesson/01/step_12.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>We continue to evaluate nodes along the current path. Notice that \\(\\text{In}(n_3)\\) has <strong>two</strong> paths leading to it, so we need to take the union of <strong>both</strong> sets in the meet function:</p>\n";
},"useData":true});
templates['teaching/lesson/01/step_16.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>So far we've stopped after one iteration. This is technically incorrect - we need to repeat the analysis until our values <strong>stop changing</strong>. Let's go back to \\(n_1\\) and repeat the process using the information we gathered from the last iteration.</p>\n";
},"useData":true});
templates['teaching/lesson/01/step_27.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>However, we're <strong>still not done</strong>. Some of the value sets changed, so we need to iterate again.</p>\n";
},"useData":true});
templates['teaching/lesson/01/step_17.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Nothing changes until we reach \\(n_3\\). However, the last time we evaluated \\(\\text{In}(n_3)\\) we took the value of \\(\\text{Out}(n_6)\\) to be the empty set. That value has changed, so \\(\\text{In}(n_3)\\) will <strong>also</strong> change.</p>\n";
},"useData":true});
templates['teaching/lesson/01/step_02.iloc'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "loadI 1      => ra\naddI  ra, 2  => rb\naddI  ra, 3  => rb\nadd   ra, rb => ra\nloadI 7      => rd";
},"useData":true});
templates['teaching/lesson/01/step_09.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>The rest of the analysis proceeds as expected.</p>\n";
},"useData":true});
templates['teaching/lesson/01/step_08.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>We calculate it using the same formula as before, but now we have <strong>more than one set</strong> to consider:</p>\n\n<p>\\begin{align}\n    \\text{In}(n_7) &= \\bigcup_{p \\in preds} \\text{Out}(p) \\\\\n    &= \\text{Out}(n_5) \\cup \\text{Out}(n_6) \\\\\n    &= \\{\\texttt{rc}_2, \\texttt{rb}_1, \\texttt{ra}_1\\} \\cup \\{\\texttt{rc}_3, \\texttt{rb}_1, \\texttt{ra}_1\\} \\\\\n    &= \\{\\texttt{rc}_2, \\texttt{rb}_1, \\texttt{ra}_1, \\texttt{rc}_3\\}\n    \\end{align}</p>\n\n<p>We can see that the set contains both \\(\\texttt{rc}_2\\) <strong>and</strong> \\(\\texttt{rc}_3\\). Since the meet function for reaching definitions only <strong>combines</strong> value sets, we don't remove anything.</p>\n";
},"useData":true});
templates['teaching/lesson/01/loop.iloc'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "    load   rx     => ra\n    load   ry     => rb\n    loadI  0      => rc\nL1: add    ra, rc => rc\n    addI   rb, -1 => rb\n    cmp_LE rb, r0 => rd\n    cbr    rd     -> L2, L1\nL2: store  rc     => rz\n";
},"useData":true});
templates['teaching/lesson/01/step_11.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Until we reach the start of the loop, the analysis is fairly straightforward.</p>\n";
},"useData":true});
templates['teaching/lesson/01/step_14.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>We continue our analysis until we reach the exit node, \\(n_7\\).</p>\n";
},"useData":true});
templates['teaching/lesson/01/branch.iloc'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "     load   rx     => ra\n     load   ry     => rb\n     cmp_GE ra, rb => rc\n     cbr    rc     -> L1, L2\nL1:  i2i    ra     => rc\n     jump   L3\nL2:  i2i    rb     => rc\nL3:  store  rc     => rz\n";
},"useData":true});
templates['teaching/lesson/01/step_03.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Next, we evaluate each branch <strong>independently</strong>.</p>\n\n<p>Let's calculate the \\(\\text{In}\\) set for the <strong>right-hand</strong> branch:</p>\n\n<p>\\begin{align}\n\\text{In}(n_6) &= \\bigcup_{p \\in preds} \\text{Out}(p) \\\\\n             &= \\text{Out}(n_3) \\\\\n             &= \\{\\texttt{rc}_1, \\texttt{rb}_1, \\texttt{ra}_1\\}\n    \\end{align}</p>\n\n";
},"useData":true});
templates['teaching/lesson/01/step_10.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Let's look at an example program with a loop. This program finds the product \\(\\text{Memory}(\\texttt{rx}) \\times \\text{Memory}(\\texttt{ry})\\).</p>\n";
},"useData":true});
templates['teaching/lesson/01/step_00.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "<strong>data-flow analysis</strong>";
},"3":function(container,depth0,helpers,partials,data) {
    return "<strong>control-flow graph</strong>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>As we saw in the first lesson, we can use "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"dataflow_analysis",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " to gather information at various points in a "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"control_flow_graph",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ".</p>\n\n<p>We've seen what happens when we analyse CFGs with a <strong>single path</strong>, but what happens when we have <strong>branches</strong> or <strong>loops</strong>?</p>\n";
},"useData":true});
templates['teaching/lesson/01/step_29.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>This time none of our value sets changed, so we can end our analysis.</p>\n";
},"useData":true});
templates['teaching/lesson/01/step_19.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>This information is propagated through the CFG until we reach \\(n_7\\) once more.</p>\n";
},"useData":true});
templates['teaching/lesson/01/step_07.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>The \\(\\texttt{jump}\\) node doesn't kill or generate any definitions, so we'll skip it.</p>\n\n<p>We're now ready to evaluate the <strong>meeting point</strong> of the two branches, \\(\\text{In}(n_7)\\).</p>\n";
},"useData":true});
templates['teaching/lesson/01/step_01.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "reaching definitions";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>On the right we have a CFG with a branching path. This program computes the maximum of \\(\\text{Memory}(\\texttt{rx})\\) and \\(\\text{Memory}(\\texttt{ry})\\).</p>\n\n<p>Let's step through a "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"reaching_definition",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " analysis and see what happens.</p>\n";
},"useData":true});
templates['teaching/lesson/01/step_18.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>\\begin{align}\n    \\text{In}(n_3) &= \\bigcup_{p \\in preds} \\text{Out}(p) \\\\\n    &= \\text{Out}(n_2) \\cup \\text{Out}(n_6) \\\\\n    &= \\{\\texttt{rc}_1, \\texttt{rb}_1, \\texttt{ra}_1\\} \\cup \\{\\texttt{rd}_1, \\texttt{rb}_2, \\texttt{rc}_2, \\texttt{ra}_1\\} \\\\\n    &= \\{\\texttt{rc}_1, \\texttt{rb}_1, \\texttt{ra}_1, \\texttt{rd}_1, \\texttt{rb}_2, \\texttt{rc}_2\\}\n    \\end{align}</p>\n\n<p>Even though the definitions \\(\\texttt{rc}_1\\), \\(\\texttt{rb}_1\\) and \\(\\texttt{rd}_1\\) are generated <strong>after</strong> \\(n_3\\), they reach \\(\\text{In}(n_3)\\) because of the back-edge \\(n_6 \\rightarrow n_3\\).</p>\n\n";
},"useData":true});
templates['teaching/lesson/01/step_02.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>The analysis proceeds as normal until we reach the branching point.</p>\n";
},"useData":true});
templates['teaching/lesson/01/step_30.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h1>Summary</h1>\n\n<ul>\n    <li>When we reach a branch, we evaluate each branch in turn.</li>\n    <li>We need to repeat the analysis until none of our value sets change.</li>\n</ul>\n\n<p>You can view either of the two CFGs in the simulator, continue to the next lesson or return to the menu using the buttons below.</p>\n\n<p><a id=\"btn-goto-next-lesson\" class=\"btn btn-primary btn-block\">Next Lesson</a></p>\n<p><a id=\"btn-goto-branch-simulator\" class=\"btn btn-secondary btn-block\">Open Branching CFG in Simulator</a></p>\n<p><a id=\"btn-goto-loop-simulator\" class=\"btn btn-secondary btn-block\">Open Looping CFG in Simulator</a></p>\n<p><a id=\"btn-goto-menu\" class=\"btn btn-secondary btn-block\">Back to Menu</a></p>\n";
},"useData":true});
templates['teaching/lesson/01/step_06.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Then we need to calculate the \\(\\text{Out}\\) set:</p>\n\n<p>\n\\begin{align}\n\\text{Out}(n_4) &= \\text{DefGen}(n_4) \\cup \\big{(}\\text{In}(n_4) \\setminus \\text{DefKill}(n_4)\\big{)} \\\\\n              &= \\{\\texttt{rc}_2\\} \\cup (\\{\\texttt{rc}_1, \\texttt{rb}_1, \\texttt{ra}_1\\} \\setminus \\{ \\texttt{rb}_i \\: : \\:  \\forall i \\neq 2 \\}) \\\\\n              &= \\{\\texttt{rc}_2\\} \\cup \\{\\texttt{rb}_1, \\texttt{ra}_1\\} \\\\\n              &= \\{\\texttt{rc}_2, \\texttt{rb}_1, \\texttt{ra}_1\\}\n\\end{align}\n</p>\n\n<p>Note that the definition of \\(\\texttt{rc}_2\\) is <strong>distinct</strong> from \\(\\texttt{rc}_3\\), since it represents a <strong>different assignment</strong> to that of the right-hand branch.</p>\n";
},"useData":true});
templates['teaching/lesson/01/step_04.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Then we need to calculate the \\(\\text{Out}\\) set:</p>\n\n<p>\n\\begin{align}\n\\text{Out}(n_6) &= \\text{DefGen}(n_6) \\cup \\big{(}\\text{In}(n_6) \\setminus \\text{DefKill}(n_6)\\big{)} \\\\\n              &= \\{\\texttt{rc}_3\\} \\cup (\\{\\texttt{rc}_1, \\texttt{rb}_1, \\texttt{ra}_1\\} \\setminus \\{ \\texttt{rc}_i \\: : \\:  \\forall i \\neq 3 \\}) \\\\\n              &= \\{\\texttt{rc}_3\\} \\cup \\{\\texttt{rb}_1, \\texttt{ra}_1\\} \\\\\n              &= \\{\\texttt{rc}_3, \\texttt{rb}_1, \\texttt{ra}_1\\}\n\\end{align}\n</p>\n";
},"useData":true});
templates['teaching/lesson/01/step_05.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Now we need to calculate the \\(\\text{In}\\) set for the <strong>left-hand</strong> branch:</p>\n\n<p>\\begin{align}\n\\text{In}(n_4) &= \\bigcup_{p \\in preds} \\text{Out}(p) \\\\\n             &= \\text{Out}(n_3) \\\\\n             &= \\{\\texttt{rc}_1, \\texttt{rb}_1, \\texttt{ra}_1\\}\n    \\end{align}</p>\n\n";
},"useData":true});
templates['teaching/lesson/01/step_13.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>\\begin{align}\n    \\text{In}(n_3) &= \\bigcup_{p \\in preds} \\text{Out}(p) \\\\\n    &= \\text{Out}(n_2) \\cup \\text{Out}(n_6) \\\\\n    &= \\{\\texttt{rc}_1, \\texttt{rb}_1, \\texttt{ra}_1\\} \\cup \\varnothing \\\\\n    &= \\{\\texttt{rc}_1, \\texttt{rb}_1, \\texttt{ra}_1\\}\n    \\end{align}</p>\n\n<p>We always use <strong>current information</strong> when computing sets. In this case, we take \\(\\text{Out}(n_6)\\) to be the empty set.</p>\n";
},"useData":true});
templates['teaching/lesson/01/step_15.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>However, <strong>we're not done yet</strong>. When we computed each set, their values <strong>changed</strong>.</p>\n";
},"useData":true});
templates['teaching/lesson/intro/step_22.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<ul>\n    <li>Data-flow analysis lets us <strong>gather information</strong> at points in a <strong>control-flow graph.</strong></li>\n    <li>We use <strong>data-flow equations</strong> to determine this information.</li>\n    <li>Information is defined in terms of <strong>in</strong> and <strong>out</strong> points for each node in the CFG.</li>\n    <li>This information is used during the <strong>optimisation</strong> stage in a compiler.</li>\n</ul>\n\n<p>Continue to the next lesson or return to the menu using the buttons below.</p>\n\n<p><a id=\"btn-goto-next-lesson\" class=\"btn btn-primary btn-block\">Next Lesson</a></p>\n<p><a id=\"btn-goto-menu\" class=\"btn btn-secondary btn-block\">Back to Menu</a></p>\n";
},"useData":true});
templates['teaching/lesson/intro/step_16_ans.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Correct! Both \\(n_2\\) and \\(n_4\\) are <strong>predecessors</strong> of \\(n_5\\), so the values <strong>flowing out</strong> of them <strong>flow into</strong> \\(n_5\\):</p>\n<p>\n    \\begin{align}\n    \\text{In}(n_5) &= \\bigcup_{p \\in n_2, n_4} \\text{Out}(p) \\\\\n    &= \\text{Out}(n_2) \\cup \\text{Out}(n_4) \\\\\n    &= \\{ {\\tt ra_1} \\} \\cup \\{ {\\tt ra_2} \\} \\\\\n    &= \\{ {\\tt ra_1}, {\\tt ra_2} \\} \\\\\n    \\end{align}\n</p>\n\n";
},"useData":true});
templates['teaching/lesson/intro/main.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row\">\n    <div class=\"col-xs-6 lesson-step\">\n        <nav class=\"row\">\n            <button id=\"btn-prev\" class=\"btn btn-primary\">Prev</button>\n            <h1 class=\"nav-title\">$MISSING_TITLE</h1>\n            <button id=\"btn-next\" class=\"pull-right btn btn-primary\">Next</button>\n        </nav>\n        <div class=\"row\">\n            <div id=\"text\" class=\"col-xs-12\">\n            </div>\n        </div>\n    </div>\n    <div id=\"cfg-canvas\" class=\"col-xs-6\">\n    </div>\n</div>\n";
},"useData":true});
templates['teaching/lesson/intro/step_11.iloc'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "addI rx, 1 => ra";
},"useData":true});
templates['teaching/lesson/intro/step_20.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>We evaluate \\(n_4\\), then <strong>start back at</strong> \\(n_0\\). Now we're ready to work out \\(\\text{In}(n_1)\\) again, this time using information we obtained from the last round.</p>\n";
},"useData":true});
templates['teaching/lesson/intro/step_12.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Now try this question!</p>\n";
},"useData":true});
templates['teaching/lesson/intro/step_11_ans.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Correct! No values are flowing in to \\(n_0\\), so the \\(\\text{In}\\) set is the empty set.</p>\n";
},"useData":true});
templates['teaching/lesson/intro/step_16.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>This time, we have two branches <strong>meeting</strong> at a node \\(n_5\\). Nodes \\(n_0\\dots{}n_4\\) have been worked out for us.</p>\n";
},"useData":true});
templates['teaching/lesson/intro/step_16.iloc'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "    cbr_EQ ra, rb -> L0, L1\nL0: loadI  2      => ra\n    jump   L2\nL1: loadI  3      => ra\n    jump   L2\nL2: i2i    ra     => rb\n";
},"useData":true});
templates['teaching/lesson/intro/step_17.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>This time, the CFG has a loop (or <strong>back-edge</strong>). We've already worked out the sets for \\(n_0\\), so let's look at \\(\\text{In}(n_1)\\).</p>\n";
},"useData":true});
templates['teaching/lesson/intro/step_20_ans.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Correct! We use the new value of \\(\\text{Out}(n_3)\\) when calculating \\(\\text{In}(n_1)\\):</p>\n<p>\n    \\begin{align}\n    \\text{In}(n_1) &= \\bigcup_{p \\in n_2, n_3} \\text{Out}(p) \\\\\n    &= \\text{Out}(n_2) \\cup \\text{Out}(n_3) \\\\\n    &= \\{ {\\tt ra_1} \\} \\cup \\{ {\\tt rc_1, ra_2} \\} \\\\\n    &= \\{ {\\tt ra_1}, {\\tt ra_2}, {\\tt rc_1} \\} \\\\\n    \\end{align}\n</p>\n\n";
},"useData":true});
templates['teaching/lesson/intro/step_09.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Let's try working out the sets for this graph. Remember the equation for \\(\\text{In}(n)\\):</p>\n\n<p>\\[\\text{In}(n) = \\bigcup_{p \\in preds} \\text{Out}(p)\\]</p>\n\n<p>This means, \"take the union of \\(\\text{Out}(p)\\) for all predecessors \\(p\\) of \\(n\\)\". There are no predecessors for \\(n_0\\):</p>\n\n<p>\n    \\begin{align}\n    \\text{In}(n_0) &= \\bigcup_{p \\in \\varnothing} \\text{Out}(p) \\\\\n                   &= \\varnothing \\\\\n    \\end{align}\n</p>\n\n<p>So the answer is the <strong>empty set</strong> (written \\(\\varnothing\\) or \\(\\{\\}\\)).</p>\n";
},"useData":true});
templates['teaching/lesson/intro/step_08.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "data-flow equations";
},"3":function(container,depth0,helpers,partials,data) {
    return "reaching definitions";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>We use a set of equations called "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"dataflow_equation",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " to calculate the values at each point.</p>\n\n<p>Here are the equations for "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"reaching_definition",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ":</p>\n\n<p>\n    \\begin{align}\n    \\text{In}(n)  &= \\bigcup_{p \\in preds} \\text{Out}(p) \\\\\n    \\text{Out}(n) &= \\text{DefGen}(n) \\cup \\big{(}\\text{In}(n) \\setminus \\text{DefKill}(n)\\big{)}\n    \\end{align}\n</p>\n";
},"useData":true});
templates['teaching/lesson/intro/step_17.iloc'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "    loadI  0      => ra\nL0: addI   ra, 1  => ra\n    subI   rc, 1  => rc\n    cbr_GE ra, rb -> L1, L0\nL1: addI   rb, rc => rb";
},"useData":true});
templates['teaching/lesson/intro/step_11.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Now it's your turn. Look at the graph on the right, then answer the question below!</p>\n\n";
},"useData":true});
templates['teaching/lesson/intro/step_14.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>We can use the same equations to work out \\(\\text{In}(n_1)\\):</p>\n\n<p>\n    \\begin{align}\n    \\text{In}(n_1) &= \\bigcup_{p \\in \\{n_1\\}} \\text{Out}(p) \\\\\n                   &= \\text{Out}(n_1) \\\\\n                   &= \\{ {\\tt rx_1} \\} \\\\\n    \\end{align}\n</p>\n\n<p>Since \\(n_0\\) is a predecessor of \\(n_1\\), the values from \\(\\text{Out}(n_0)\\) <strong>flow into</strong> \\(n_1\\), so we are left with \\(\\{ {\\tt rx_1} \\}\\).</p>\n";
},"useData":true});
templates['teaching/lesson/intro/step_03.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Normal instructions such as <code>add</code>, <code>load</code>, and <code>store</code> usually only have <strong>one outgoing edge</strong>, leading to the next instruction in the code.</p>\n";
},"useData":true});
templates['teaching/lesson/intro/step_10.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "generates";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>Now let's work out \\(\\text{Out}(n_0)\\):</p>\n\n<p>\n    \\begin{align}\n    \\text{Out}(n_0) &= \\text{DefGen}(n_0) \\cup \\big{(}\\text{In}(n_0) \\setminus \\text{DefKill}(n_0)\\big{)} \\\\\n    &= \\{ {\\tt rx_1} \\} \\cup \\big{(}\\varnothing \\setminus \\{ {\\tt rx_i} : \\forall i \\neq 1 \\}\\big{)} \\\\\n    &= \\{ {\\tt rx_1} \\} \\cup \\varnothing \\\\\n    &= \\{ {\\tt rx_1} \\}\n    \\end{align}\n</p>\n\n<p>The assignment to \\({\\tt rx}\\) "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"definition_generated",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " the definition \\({\\tt rx_1}\\). No values are flowing in and the node doesn't kill any definitions, so we're left with \\( \\{ {\\tt rx_1} \\} \\)!</p>.\n";
},"useData":true});
templates['teaching/lesson/intro/step_00.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Welcome to the Data-Flow Analysis Tutor! In this tutorial, you'll learn:</p>\n\n<ul>\n    <li>What data-flow analysis is and why it is useful.</li>\n    <li>The basic concepts of data-flow analysis.</li>\n</ul>\n\n<p>To begin, please click the <em>Next</em> button.</p>\n";
},"useData":true});
templates['teaching/lesson/intro/step_07.iloc'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "loadI 7 => rx";
},"useData":true});
templates['teaching/lesson/intro/step_17_ans.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Correct! Both \\(n_2\\) and \\(n_3\\) are <strong>predecessors</strong> of \\(n_1\\), because there is a <strong>back-edge</strong> from \\(n_3\\) to \\(n_1\\). Right now \\(n_3\\) is \\(\\varnothing\\), so:</p>\n\n<p>\n    \\begin{align}\n    \\text{In}(n_1) &= \\bigcup_{p \\in n_2, n_3} \\text{Out}(p) \\\\\n    &= \\text{Out}(n_2) \\cup \\text{Out}(n_3) \\\\\n    &= \\{ {\\tt ra_1} \\} \\cup \\varnothing \\\\\n    &= \\{ {\\tt ra_1} \\} \\\\\n    \\end{align}\n</p>\n\n";
},"useData":true});
templates['teaching/lesson/intro/step_12_ans.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "generates";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>Correct! The assignment to \\({\\tt ra}\\) "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"definition_generated",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " the definition \\({\\tt ra_1}\\). No values are flowing in and the node doesn't kill any definitions, so we're left with \\( \\{ {\\tt ra_1} \\} \\)!</p>\n";
},"useData":true});
templates['teaching/lesson/intro/step_19.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "iterative";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>After calculating \\(\\text{Out}(n_3)\\), its values have changed. This means that our eariler calculation of \\(\\text{In}(n_1)\\) is now <strong>incorrect</strong>!</p>\n\n<p>Data-flow analysis is an "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"iterative",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " process. We calculate value sets for each point <strong>in order</strong>, and <strong>repeat</strong> this analysis until our values <strong>stop changing</strong>. Since the value of \\(\\text{Out}(n_3)\\) has <strong>changed</strong>, we'll have to go back and fix \\(\\text{In}(n_1)\\).</p>\n";
},"useData":true});
templates['teaching/lesson/intro/step_07.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>When we talk about <strong style=\"color: #9a162c\">points</strong> in a CFG, we mean the points where control flows in and out of nodes in the graph, referred to as <strong>in</strong> and <strong>out</strong>.</p>\n";
},"useData":true});
templates['teaching/lesson/intro/step_21.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "kills";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>However, we're still not done. Even though \\({\\tt ra_2}\\) "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"definition_killed",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " the definition \\({\\tt ra_1}\\), we need to <strong>continue evaluating</strong> nodes until we're certain everything has <strong>stopped changing</strong>. Use the buttons below to control the simulation. When you're done, click next to finish this lesson.</p>\n";
},"useData":true});
templates['teaching/lesson/intro/step_01.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "Data-flow analysis";
},"3":function(container,depth0,helpers,partials,data) {
    return "control-flow graph";
},"5":function(container,depth0,helpers,partials,data) {
    return "Compilers";
},"7":function(container,depth0,helpers,partials,data) {
    return "optimizing";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>"
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"dataflow_analysis",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " is a technique for gathering information at various points in a "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"control_flow_graph",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ". "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"compiler",{"name":"definition","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " perform data-flow analysis to help them make decisions when "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"optimizing_compiler",{"name":"definition","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " programs.</p>\n";
},"useData":true});
templates['teaching/lesson/intro/step_18.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>We continue our analysis until it's time to calculate \\(\\text{Out}(n_3)\\). Remember that we hadn't calculated it yet when we worked out \\(\\text{In}(n_1)\\).</p>\n";
},"useData":true});
templates['teaching/lesson/intro/step_13.iloc'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "    loadI 7     => rx\n    addI  rx, 1 => rx";
},"useData":true});
templates['teaching/lesson/intro/step_02.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "control-flow graph";
},"3":function(container,depth0,helpers,partials,data) {
    return "CFG";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>To perform data-flow analysis, we need to create a "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"control_flow_graph",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " or "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"cfg",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ". A control-flow graph represents the possible execution paths in a program. Edges connect instructions which are executed in sequence.<p>\n";
},"useData":true});
templates['teaching/lesson/intro/step_06.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "data-flow analysis";
},"3":function(container,depth0,helpers,partials,data) {
    return "reaching definitions";
},"5":function(container,depth0,helpers,partials,data) {
    return "generated";
},"7":function(container,depth0,helpers,partials,data) {
    return "killed";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>One form of "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"data_flow_analysis",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " is "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"reaching_definition",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ". A definition is said to <strong>reach</strong> a point in our control-flow graph if there exists a path from where it was defined (or "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"definition_generated",{"name":"definition","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ") to that point along which it is not overwritten (or "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"definition_killed",{"name":"definition","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ").</p>\n";
},"useData":true});
templates['teaching/lesson/intro/step_04.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "Branching";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>"
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"branch",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " instructions such as <code>cbr</code>, <code>cmp_GE</code>, and <code>jump</code> have <strong>multiple outgoing edges</strong>, one for each instruction we might jump to.</p>\n";
},"useData":true});
templates['teaching/lesson/intro/example.iloc'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "    loadI  2      => ra\n    loadI  3      => rb\nL0: cbr_LE ra, rb -> L1, L2\nL1: addI   ra, 1  => ra\n    jump   L3\nL2: addI   rb, 1  => rb\nL3: jump   L0\n";
},"useData":true});
templates['teaching/lesson/intro/step_05.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "control-flow graph";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>On the right is the "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"control_flow_graph",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " for a simple program (shown below).</p>\n";
},"useData":true});
templates['teaching/lesson/intro/step_13.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Let's make things more complicated. This time, we have a CFG with two nodes. The sets for \\(n_0\\) have been worked out for us.</p>\n";
},"useData":true});
templates['teaching/lesson/intro/step_15.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "generates";
},"3":function(container,depth0,helpers,partials,data) {
    return "kills";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>Now let's work out \\(\\text{Out}(n_1)\\):</p>\n\n<p>\n    \\begin{align}\n    \\text{Out}(n_1) &= \\text{DefGen}(n_1) \\cup \\big{(}\\text{In}(n_1) \\setminus \\text{DefKill}(n_1)\\big{)} \\\\\n    &= \\{ {\\tt rx_2} \\} \\cup \\big{(} \\{ {\\tt rx_1} \\} \\setminus \\{ {\\tt rx_i} : \\forall i \\neq 1 \\}\\big{)} \\\\\n    &= \\{ {\\tt rx_2} \\} \\cup \\varnothing \\\\\n    &= \\{ {\\tt rx_2} \\}\n    \\end{align}\n</p>\n\n<p>The assignment to \\({\\tt rx}\\) "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"definition_generated",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " the definition \\({\\tt rx_2}\\). This definition overwrites (and "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"definition_killed",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ") \\({\\tt rx_1}\\) so we're left with \\( \\{ {\\tt rx_2} \\} \\)!</p>\n";
},"useData":true});
templates['teaching/lesson/roundrobin/step_31.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "reaching definitions";
},"3":function(container,depth0,helpers,partials,data) {
    return "reverse postorder";
},"5":function(container,depth0,helpers,partials,data) {
    return "predecessors";
},"7":function(container,depth0,helpers,partials,data) {
    return "postorder";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>Which ordering we use can affect the efficiency of our algorithm hugely. For analyses like "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"reaching_definitions",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " we use "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"reverse_postorder",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " because the values of \\(\\text{In}(n)\\) depend on that node's "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"predecessor",{"name":"definition","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " (or <strong>parents</strong>).</p>\n\n<p>Let's repeat our analysis using "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"postorder",{"name":"definition","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " traversal.</p>\n";
},"useData":true});
templates['teaching/lesson/roundrobin/main.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row\">\n    <div class=\"col-xs-6 lesson-step\" style=\"max-width: 50%\">\n        <nav class=\"row\">\n            <button id=\"btn-prev\" class=\"btn btn-primary\">Prev</button>\n            <h1 class=\"nav-title\">$MISSING_TITLE</h1>\n            <button id=\"btn-next\" class=\"pull-right btn btn-primary\">Next</button>\n        </nav>\n        <div class=\"row flex-max\">\n            <div id=\"text\" class=\"col-xs-12\">\n            </div>\n        </div>\n        <div class=\"row margin-bottom\">\n            <div id=\"results-canvas\" class=\"col-xs-12\">\n            </div>\n        </div>\n    </div>\n    <div id=\"cfg-canvas\" class=\"col-xs-6\">\n    </div>\n</div>\n";
},"useData":true});
templates['teaching/lesson/roundrobin/step_34.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "reaching definitions";
},"3":function(container,depth0,helpers,partials,data) {
    return "forward analysis";
},"5":function(container,depth0,helpers,partials,data) {
    return "backward analyses";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>This is because "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"reaching_definitions",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " is a "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"forward_analysis",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ". Later on we'll look at "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"backward_analysis",{"name":"definition","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " and see which ordering is best for those.</p>\n";
},"useData":true});
templates['teaching/lesson/roundrobin/step_16.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>As we stepped through the analysis, you may have noticed that our value sets have <strong>changed</strong>. This means we need to perform <strong>another round</strong>. This time, <strong>you're</strong> going to work out the answers! Refer to the table if you get stuck. Click the <em>Next</em> button when you're ready to continue.</p>\n";
},"useData":true});
templates['teaching/lesson/roundrobin/step_20_ans.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "kills";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>Correct! Even though \\(\\text{In}(n_1)\\) has changed, the definition of \\({\\tt ra_2}\\) still "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"definition_killed",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " \\({\\tt ra_1}\\). The definition \\({\\tt rc_1}\\) survives \\(n_1\\).</p>\n";
},"useData":true});
templates['teaching/lesson/roundrobin/step_28.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "reverse post-order";
},"3":function(container,depth0,helpers,partials,data) {
    return "post-order";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>That's all we need to do for the round-robin analysis: examine each node, in order, until everything stops changing. This process <strong>usually</strong> only takes a couple of rounds, but that depends on the <strong>structure</strong> of the CFG and the <strong>order</strong> in which we evaluate nodes.</p>\n\n<p>In this lesson we evaluated nodes in "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"reverse_postorder",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ". However, for some analyses it's better to use "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"postorder",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ".<p>\n";
},"useData":true});
templates['teaching/lesson/roundrobin/step_03.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Let's see this in practice. We'll use the table below to track the value sets at each node. On the right is our CFG.<p>\n";
},"useData":true});
templates['teaching/lesson/roundrobin/step_22_ans.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Correct! \\({\\tt rc_1}\\) doesn't kill itself, so the values flow through \\(n_2\\).</p>\n";
},"useData":true});
templates['teaching/lesson/roundrobin/step_00.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "round-robin";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>Welcome to the Data-Flow Analysis Tutor! In this tutorial, you'll learn:</p>\n\n<ul>\n    <li>How to perform a simple data-flow analysis using the "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"round_robin",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " approach.</li>\n    <li>How the order of evaluated nodes affects the efficiency of analysis.</li>\n</ul>\n\n<p>To begin, please click the <em>Next</em> button.</p>\n";
},"useData":true});
templates['teaching/lesson/roundrobin/step_27_ans.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Correct! Although we humans can <strong>intuitively</strong> tell that our values will not change, a <strong>compiler</strong> needs to perform <strong>another round</strong> to make sure nothing changes.</p>\n";
},"useData":true});
templates['teaching/lesson/roundrobin/step_17_ans.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "reaching definitions";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>Correct! In "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"reaching_definition",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ", no values flow into the entry node of the CFG, so we keep our initial value.</p>\n";
},"useData":true});
templates['teaching/lesson/roundrobin/step_35.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "round-robin";
},"3":function(container,depth0,helpers,partials,data) {
    return "iterate";
},"5":function(container,depth0,helpers,partials,data) {
    return "control-flow graph";
},"7":function(container,depth0,helpers,partials,data) {
    return "order";
},"9":function(container,depth0,helpers,partials,data) {
    return "efficiency";
},"11":function(container,depth0,helpers,partials,data) {
    return "post-order";
},"13":function(container,depth0,helpers,partials,data) {
    return "successors";
},"15":function(container,depth0,helpers,partials,data) {
    return "reverse post-order";
},"17":function(container,depth0,helpers,partials,data) {
    return "predecessors";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<ul>\n    <li>In "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"round_robin",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " analysis we "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"iterative",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " over a "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"control_flow_graph",{"name":"definition","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ", evaluating nodes in a specific "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"ordering",{"name":"definition","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " until the values at each node <strong>stop changing</strong>.</li>\n    <li>The "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"ordering",{"name":"definition","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " in which we evaluate nodes can affect the "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"efficiency",{"name":"definition","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " of our analysis.</li>\n    <li>In "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"postorder",{"name":"definition","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " we evaluate a node's "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"successor",{"name":"definition","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " (<strong>children</strong>) first.</li>\n    <li>In "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"reverse_postorder",{"name":"definition","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " we evaluate a node's "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"predecessor",{"name":"definition","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " (<strong>parents</strong>) first.</li>\n</ul>\n\n<p>Continue to the next lesson, view the example in the simulator or return to the menu using the buttons below.</p>\n\n<p><a id=\"btn-goto-next-lesson\" class=\"btn btn-primary btn-block\">Next Lesson</a></p>\n<p><a id=\"btn-goto-simulator\" class=\"btn btn-secondary btn-block\">Open CFG in Simulator</a></p>\n<p><a id=\"btn-goto-menu\" class=\"btn btn-secondary btn-block\">Back to Menu</a></p>\n";
},"useData":true});
templates['teaching/lesson/roundrobin/step_24_ans.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Correct! \\(\\text{DefKill}(n_3)\\) is empty, so the definitions flow through \\(n_3\\).</p>\n";
},"useData":true});
templates['teaching/lesson/roundrobin/step_29.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "Post-order";
},"3":function(container,depth0,helpers,partials,data) {
    return "ordering";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>"
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"postorder",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " is an "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"ordering",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " of nodes in a graph or tree. Starting at the entry node, we visit <strong>each child</strong>, then each child's child, and so on. When we reach a node with <strong>no children</strong> we <strong>add</strong> it to the list, then add its <strong>parent</strong> to the list, and its parent and so on until we have an ordering in which we visit each node's <strong>children first</strong>. The <strong>post-ordering</strong> of our CFG is \\([{\\tt n_4}, {\\tt n_3}, {\\tt n_2}, {\\tt n_1}, {\\tt n_0} ]\\).</p>\n";
},"useData":true});
templates['teaching/lesson/roundrobin/step_19_ans.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Correct! Since the value of \\(\\text{Out}(n_3)\\) <strong>changed</strong> after we calculated \\(\\text{In}(n_1)\\), our value of \\(\\text{In}(n_1)\\) <strong>changes<strong>!</p>\n";
},"useData":true});
templates['teaching/lesson/roundrobin/step_32.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Use the controls below to control the simulation and click <em>Next</em> when you're ready to continue.</p>\n";
},"useData":true});
templates['teaching/lesson/roundrobin/step_23_ans.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Correct! Like \\(n_2\\), \\(n_3\\) only has one predecessor, so the values carry through.</p>\n";
},"useData":true});
templates['teaching/lesson/roundrobin/step_33.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "postorder";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>You may have noticed that using a "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"postorder",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " traversal made our analysis take <strong>5</strong> iterations instead of 3. Since we're evaluating each <strong>child first</strong>, we need to <strong>wait</strong> until we've analysed that node's <strong>parent</strong> before that information becomes available, which takes a <strong>whole round</strong>!</p>\n";
},"useData":true});
templates['teaching/lesson/roundrobin/step_26_ans.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "generates";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>Correct! \\(n_4\\) "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"definition_generated",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " \\({\\tt rb_1}\\), so we add it to \\(\\text{In}(n_4)\\) to produce \\(\\text{Out}(n_4)\\).</p>\n";
},"useData":true});
templates['teaching/lesson/roundrobin/step_03.iloc'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "    loadI  0      => ra\nL0: addI   ra, 1  => ra\n    subI   rc, 1  => rc\n    cbr_GE ra, rb -> L1, L0\nL1: addI   rb, rc => rb";
},"useData":true});
templates['teaching/lesson/roundrobin/step_25_ans.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Correct! Again, \\(n_4\\) only has one predecessor, so the values flow through.</p>\n";
},"useData":true});
templates['teaching/lesson/roundrobin/step_01.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "data-flow equations";
},"3":function(container,depth0,helpers,partials,data) {
    return "control-flow graph";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>So far we've seen how "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"dataflow_equations",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " help us calculate value sets at points in the "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"control_flow_graph",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ". But how do we apply this in practice?</p>\n";
},"useData":true});
templates['teaching/lesson/roundrobin/step_02.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "round robin approach";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>One way of calculating value sets is to take the "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"round_robin",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ". You may remember from last time that we need to <strong>iterate</strong> our analysis until our values <strong>stop changing</strong>. Using the round-robin analysis algorithm, we evaluate nodes in a <strong>specific order</strong>, repeating this order in <strong>rounds</strong> until the values stop changing between rounds.</p>\n";
},"useData":true});
templates['teaching/lesson/roundrobin/step_21_ans.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Correct! There is only one predecessor of \\(n_2\\), \\(n_1\\), so \\(\\text{Out}(n_1)\\) carries over to \\(\\text{In}(n_2)\\).</p>\n";
},"useData":true});
templates['teaching/lesson/roundrobin/step_30.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "Reverse post-order";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>"
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"reverse_postorder",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " is post-order in reverse. This can be seen as a <strong>parent-first</strong> approach. The <strong>reverse post-ordering</strong> of our CFG is \\([{\\tt n_0}, {\\tt n_1}, {\\tt n_2}, {\\tt n_3}, {\\tt n_4} ]\\).</p>\n";
},"useData":true});
templates['teaching/lesson/roundrobin/step_18_ans.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Correct! None of the values flowing \\(\\text{In}\\) have changed, so our \\(\\text{Out}\\) set doesn't change from the last round.</p>\n";
},"useData":true});
templates['teaching/lesson/roundrobin/step_06.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>As before, we calculate the \\(\\text{In}\\) set for a node and subsequently calculate its \\(\\text{Out}\\) set. Click the <em>Next</em> button to step through the first round of the analysis.</p>\n";
},"useData":true});
templates['teaching/lesson/roundrobin/step_04.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "local information";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>We can see in the table that the values of \\(\\text{DefGen}\\) and \\(\\text{DefKill}\\) have been worked out already. Since this information only depends upon the <strong>node itself</strong>, we can work it out ahead of time. This is referred to as "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"local_information",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ".</p>\n";
},"useData":true});
templates['teaching/lesson/roundrobin/step_05.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "reaching definitions";
},"3":function(container,depth0,helpers,partials,data) {
    return "available expressions";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>When we begin our "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"reaching_definition",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " analysis, our value sets are initialised to the <strong>empty set</strong> (\\(\\{\\}\\) or \\(\\varnothing\\)). However, this depends upon the analysis;  "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"available_expression",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " initialises every node except \\(n_0\\) to the set of <strong>all possible values</strong>!</p>\n";
},"useData":true});
templates['teaching/tests/main.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row\">\n    <div id=\"left-column\" class=\"col-xs-offset-2 col-xs-8 lesson-step\">\n        <nav class=\"row\">\n            <button id=\"btn-prev\" class=\"btn btn-primary\">Prev</button>\n            <button id=\"btn-submit\" class=\"pull-right btn btn-success\">Submit</button>\n            <button id=\"btn-next\" class=\"pull-right btn btn-primary\">Next</button>\n        </nav>\n        <div class=\"row flex-max\">\n            <div id=\"text\" class=\"col-xs-12\">\n            </div>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
templates['teaching/tests/intro.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row\">\n    <div class=\"col-xs-offset-2 col-xs-8\">\n        <h1>Test Rules</h1>\n\n        <p>Welcome! It's time to test your knowledge.</p>\n\n        <p>For each question, <strong>select an answer</strong> by clicking it. Use the <em>Next</em> and <em>Prev</em> buttons to <strong>navigate</strong> between questions.</p>\n\n        <p>You can <strong>change</strong> your selection at any time. You may <strong>revisit</strong> questions and change your answer if you wish.</p>\n\n        <p>In <strong>some</strong> questions you are allowed to select multiple answers. You will <strong>lose 1 point</strong> for every <strong>incorrect</strong> answer, but your score cannot become negative - that is, incorrect answers will not count against correct answers for <em>other</em> questions.</p>\n\n        <p>Click the <em>Start</em> button to continue. When you are satisfied with your answers, click the <em>Submit</em> button to finish the test.</p>\n\n        <div class=\"text-center\">\n            <button id=\"btn-test-start\" class=\"btn btn-primary\">Start</button>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
templates['teaching/tests/review/rd_branch.iloc'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "    cbr_EQ rx, ry -> L0, L1\nL0: loadI  2      => rx\n    jump   L2\nL1: loadI  3      => rx\n    jump   L2\nL2: i2i    rx     => rz";
},"useData":true});
templates['teaching/tests/review/rd_loop.iloc'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "    loadI  2      => ra\n    cbr_GE rx, 0  -> L0, L1\nL0: addI   rx, 1  => ra\n    jump   L2\nL1: loadI  0      => rb\nL2: multI  ra, 2  => rc\n    cbr_LT ry, rx -> L1, L3\nL3: nop";
},"useData":true});
templates['teaching/tests/review/rd_single_path.iloc'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "addI ra, 1  => ra\naddI rb, 2  => rb\nsub  ra, rb => rb\nsubI rd, 10 => rd";
},"useData":true});
templates['teaching/tests/review/postorder.iloc'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "L0: cbr_GE ra, rb -> L1, L2\nL1: cbr_GE ra, rc -> L2, L3\nL2: addI   ra,  1 => ra\n    jump   L0\nL3: addI   rb,  1 => rb\n    subI   rc,  1 => rc";
},"useData":true});
templates['teaching/tests/score.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<h1 id=\"test-score\" class=\"nav-title\">\n    Score:\n    <span class=\""
    + alias4(((helper = (helper = helpers.grade || (depth0 != null ? depth0.grade : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"grade","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.score || (depth0 != null ? depth0.score : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"score","hash":{},"data":data}) : helper)))
    + "</span>/"
    + alias4(((helper = (helper = helpers.max_score || (depth0 != null ? depth0.max_score : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"max_score","hash":{},"data":data}) : helper)))
    + "\n    <span class=\"percentage\">("
    + alias4(((helper = (helper = helpers.score_percentage || (depth0 != null ? depth0.score_percentage : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"score_percentage","hash":{},"data":data}) : helper)))
    + "%)</span>\n</h1>\n";
},"useData":true});
templates['test/cfg.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row\">\n    <div id=\"left-column\" class=\"col-xs-3\">\n        <div class=\"row\">\n            <div id=\"sim-controls-canvas\" class=\"col-xs-12\">\n            </div>\n        </div>\n    </div>\n    <div id=\"right-column\" class=\"col-xs-9\">\n        <div class=\"row flex flex-max\">\n            <div id=\"cfg-canvas\" class=\"col-xs-12\">\n            </div>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
templates['test/lattice.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row\">\n    <div id=\"left-column\" class=\"col-xs-3\">\n        <div class=\"row\">\n            <div id=\"sim-controls-canvas\" class=\"col-xs-12\">\n            </div>\n        </div>\n    </div>\n    <div id=\"right-column\" class=\"col-xs-9\">\n        <div class=\"row flex-max\">\n            <div id=\"lattice-canvas\" class=\"col-xs-12\">\n            </div>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
templates['test/cfg.iloc'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "L0: nop\n    loadI  1         => ra\n    cmp_GE ra   , rb => rc\n    cbr    rc        -> L1   , L2\nL1: i2i    ra        => rc\n    jump   L3\nL2: i2i    rb   , 1  => rc\nL3: nop";
},"useData":true});
templates['test/lattice.iloc'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "L0: nop\n    loadI  1         => ra\n    cmp_GE ra   , rb => rc\n    cbr    rc        -> L1   , L2\nL1: i2i    ra        => rc\n    jump   L3\nL2: i2i    rb   , 1  => rc\nL3: nop";
},"useData":true});
templates['menu/main.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <div class=\"row\">\n            <div id=\"menu\" class=\"col-xs-offset-3 col-xs-6\">\n                <div class=\"row\">\n                    <div class=\"col-xs-12\">\n                        <h2>Simulations</h2>\n                        <p>\n                        <button class=\"btn btn-menu btn-secondary btn-block\" id=\"btn-round-robin-simulator\">\n                            Round Robin Iterator\n                        </button>\n                        </p>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col-xs-12\">\n                        <h2>Testing</h2>\n                        <p>\n                            <button class=\"btn btn-menu btn-secondary btn-block\" id=\"btn-lattice-testbed\">\n                                Lattices\n                            </button>\n                        </p>\n                        <p>\n                            <button class=\"btn btn-menu btn-secondary btn-block\" id=\"btn-cfg-testbed\">\n                                CFG\n                            </button>\n                        </p>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
templates['menu/btn-lesson.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "<i class=\"fa fa-check-circle position-right text-success complete-check\"></i>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<p>\n    <button id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"btn btn-menu btn-secondary btn-block\" lesson=\""
    + alias4(((helper = (helper = helpers.lesson || (depth0 != null ? depth0.lesson : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lesson","hash":{},"data":data}) : helper)))
    + "\">\n        "
    + alias4(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + " "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.complete : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n    </button>\n</p>\n";
},"useData":true});
templates['menu/lesson_menu.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row\">\n    <div id=\"lesson-menu\" class=\"col-xs-12\">\n        <h2>Lessons</h2>\n        <!-- lesson buttons -->\n    </div>\n</div>\n";
},"useData":true});
templates['menu/test_menu.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row\">\n    <div id=\"test-menu\" class=\"col-xs-12\">\n        <h2>Tests</h2>\n        <!-- lesson buttons -->\n    </div>\n</div>\n";
},"useData":true});
templates['menu/btn-test.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <span class=\""
    + alias4(((helper = (helper = helpers.grade || (depth0 != null ? depth0.grade : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"grade","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.score || (depth0 != null ? depth0.score : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"score","hash":{},"data":data}) : helper)))
    + "</span>/"
    + alias4(((helper = (helper = helpers.max_score || (depth0 != null ? depth0.max_score : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"max_score","hash":{},"data":data}) : helper)))
    + "\n            <span class=\"percentage\">("
    + alias4(((helper = (helper = helpers.score_percentage || (depth0 != null ? depth0.score_percentage : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"score_percentage","hash":{},"data":data}) : helper)))
    + "%)</span>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<p>\n    <button id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"btn btn-secondary btn-menu btn-block\" test=\""
    + alias4(((helper = (helper = helpers.test || (depth0 != null ? depth0.test : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"test","hash":{},"data":data}) : helper)))
    + "\">\n        "
    + alias4(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + "\n        <span class=\"position-right\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.score : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </span>\n    </button>\n</p>\n";
},"useData":true});
})();