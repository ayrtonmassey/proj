(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['simulator/sim_controls/main.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<span id=\"sim-controls\" class=\"btn-group\">\n    <button id=\"fast-backward\" class=\"btn btn-default\">\n        <span class=\"fa fa-fast-backward\"></span>\n    </button>\n    <button id=\"step-forward\" class=\"btn btn-default\">\n        <span class=\"fa fa-step-forward\"></span>\n    </button>\n    <button id=\"play\" class=\"btn btn-default\">\n        <span class=\"fa fa-play\"></span>\n    </button>\n    <button id=\"pause\" class=\"btn btn-default\">\n        <span class=\"fa fa-pause\"></span>\n    </button>\n    <button id=\"fast-forward\" class=\"btn btn-default\">\n        <span class=\"fa fa-fast-forward\"></span>\n    </button>\n</span>\n";
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
templates['simulator/roundrobin.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row\">\n    <div id=\"left-column\" class=\"col-xs-3\">\n        <div class=\"row\">\n            <div id=\"code-canvas\" class=\"col-xs-12\">\n            </div>\n        </div>\n        <div class=\"row no-flex\">\n            <div id=\"sim-controls-canvas\" class=\"col-xs-12\">\n            </div>\n        </div>\n        <div class=\"row flex-max\">\n            <div id=\"lattice-canvas\" class=\"col-xs-12\">\n            </div>\n        </div>\n    </div>\n    <div id=\"right-column\" class=\"col-xs-9\">\n        <div class=\"row\">\n            <div id=\"framework-canvas\" class=\"col-xs-12\">\n            </div>\n        </div>\n\n        <div class=\"row flex-max\">\n            <div class=\"col-xs-12\" style=\"display: flex; flex-direction: column;\">\n                <ul class=\"nav nav-tabs\">\n                    <li class=\"nav-item\"><a class=\"nav-link active\" data-toggle=\"tab\" href=\"#cfg-canvas\">CFG</a></li>\n                    <li class=\"nav-item\"><a class=\"nav-link\" data-toggle=\"tab\" href=\"#results-canvas\">Results Table</a></li>\n                </ul>\n\n                <div class=\"tab-content flex-max\">\n                    <div id=\"cfg-canvas\" class=\"tab-pane fade in active flex\">\n                    </div>\n                    <div id=\"results-canvas\" class=\"tab-pane fade\">\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
templates['simulator/cfg/main.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<svg id=\"cfg-svg\">\n</svg>\n";
},"useData":true});
templates['simulator/cfg/btn-show-points.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<button id=\"btn-show-points\" class=\"btn btn-success btn-sm\">Show Points</button>\n";
},"useData":true});
templates['simulator/cfg/node.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div>\n    <table class='iloc'>\n        <tbody>\n            <tr>"
    + ((stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"content","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</tr>\n        </tbody>\n    </table>\n</div>\n";
},"useData":true});
templates['simulator/framework/main.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <h1 id=\"framework-title\"></h1>\n    </div>\n</div>\n<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <div class=\"row\">\n            <div class=\"col-xs-6\"><h2>Meet Function</h2></div>\n            <div class=\"col-xs-6\"><h2>Transfer Function</h2></div>\n        </div>\n    </div>\n</div>\n<div class=\"row\">\n    <div id=\"framework-meet\" class=\"meet col-xs-6\"></div>\n    <div id=\"framework-transfer\" class=\"transfer col-xs-6\"></div>\n</div>\n<div class=\"row\">\n    <div id=\"framework-order\" class=\"col-xs-12\"></div>\n</div>\n";
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
    return "    <p>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</p>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "        <button class=\"btn btn-primary btn-answer "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.correct : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + "\">\n            "
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.text : depth0), depth0))
    + "\n        </button>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "correct";
},"6":function(container,depth0,helpers,partials,data) {
    return "incorrect";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.question : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<div class=\"col-xs-12 answer-grid\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.answers : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});
templates['teaching/question/canvas.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"question-canvas\" class=\"question row\">\n</div>";
},"useData":true});
templates['teaching/lesson/00/main.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row\">\n    <div class=\"col-xs-6 lesson-step\">\n        <div class=\"row\">\n            <div id=\"text\" class=\"col-xs-12\">\n            </div>\n        </div>\n        <nav class=\"row\">\n            <button id=\"btn-prev\" class=\"btn btn-primary\">Prev</button>\n            <button id=\"btn-next\" class=\"pull-right btn btn-primary\">Next</button>\n        </nav>\n    </div>\n    <div id=\"cfg-canvas\" class=\"col-xs-6\">\n    </div>\n</div>\n";
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
    return "<p>Then we need to calculate the \\(\\text{Out}\\) set:</p>\n<p>\n\\begin{align}\n\\text{Out}(n) &= \\text{DefGen}(n) \\cup \\big{(}\\text{In}(n) \\setminus \\text{DefKill}(n)\\big{)} \\\\\n              &= \\{ \\texttt{ra}_1\\} \\cup (\\emptyset \\setminus \\{ \\texttt{ra}_i \\: : \\:  \\forall i \\neq 1 \\}) \\\\\n              &= \\{ \\texttt{ra}_1\\} \\cup \\emptyset \\\\\n              &= \\{ \\texttt{ra}_1\\}\n\\end{align}\n</p>";
},"useData":true});
templates['teaching/lesson/00/step_14.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Now we need to consider the \\(\\text{In}\\) set for the third node:</p>\n\n<p>\\begin{align}\n\\text{In}(n) &= \\bigcup_{p \\in preds} \\text{Out}(p) \\\\\n             &= \\bigcup_{p \\in \\{n_1\\}} \\text{Out}(p) \\\\\n             &= \\{\\texttt{rb}_1, \\texttt{ra}_1\\}\n \\end{align}</p>\n";
},"useData":true});
templates['teaching/lesson/00/step_03.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Each <strong style=\"color: #6cc86c\">node</strong> represents an instruction.</p>\n";
},"useData":true});
templates['teaching/lesson/00/step_10.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Reaching definitions is a forward data-flow, so we need to calculate the \\(\\text{In}\\) set for the first node:</p>\n\n<p>\\begin{align}\n\\text{In}(n) &= \\bigcup_{p \\in preds} \\text{Out}(p) \\\\\n             &= \\bigcup_{p \\in \\emptyset} \\text{Out}(p) \\\\\n             &= \\emptyset\n \\end{align}</p>\n";
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
    return "<p>Let's fast forward to the end of the analysis. We can see that the store to \\(\\texttt{rd}\\) generates the definition \\(\\texttt{rd}_1\\), leaving us with \\(\\{\\texttt{rd}_1, \\texttt{ra}_2, \\texttt{rb}_2\\}\\)</p>\n\n<p>Normally we'd iterate over the graph again to make sure nothing changes. In this example it's not necessary, so we'll save that for a later lesson.</p>\n\n<p><a id=\"btn-goto-next-lesson\" class=\"btn btn-primary btn-block\">Next Lesson</a></p>\n<p><a id=\"btn-goto-simulator\" class=\"btn btn-secondary btn-block\">Open CFG in Simulator</a></p>\n<p><a id=\"btn-goto-menu\" class=\"btn btn-secondary btn-block\">Back to Menu</a></p>\n";
},"useData":true});
templates['teaching/lesson/00/step_07.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "data-flow equations";
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
    return "killed";
},"3":function(container,depth0,helpers,partials,data) {
    return "generates";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>That's correct! The definition of \\(\\texttt{ra}_1\\) is "
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
    return "Reaching definitions";
},"3":function(container,depth0,helpers,partials,data) {
    return "definition";
},"5":function(container,depth0,helpers,partials,data) {
    return "reaches";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>"
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"reaching_definition",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " analysis lets us determine which values are available at each point in the CFG. A "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"variable_definition",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " occurs when a value is stored in a variable. That definition "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"reaching_definition",{"name":"definition","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " every node along any path in which that definition is not overwritten by another assignment.</p>\n\n</p>We can use data-flow analysis to compute the reaching definitions at each point in our CFG.</p>\n";
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
templates['teaching/lesson/01/main.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row\">\n    <div class=\"col-xs-6 lesson-step\">\n        <div class=\"row\">\n            <div id=\"text\" class=\"col-xs-12\">\n            </div>\n        </div>\n        <nav class=\"row\">\n            <button id=\"btn-prev\" class=\"btn btn-primary\">Prev</button>\n            <button id=\"btn-next\" class=\"pull-right btn btn-primary\">Next</button>\n        </nav>\n    </div>\n    <div id=\"cfg-canvas\" class=\"col-xs-6\">\n    </div>\n</div>\n";
},"useData":true});
templates['teaching/lesson/01/step_02.iloc'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "loadI 1      => ra\naddI  ra, 2  => rb\naddI  ra, 3  => rb\nadd   ra, rb => ra\nloadI 7      => rd";
},"useData":true});
templates['teaching/lesson/01/step_00.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
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
templates['test/lattice.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row\">\n    <div id=\"left-column\" class=\"col-xs-3\">\n        <div class=\"row\">\n            <div id=\"sim-controls-canvas\" class=\"col-xs-12\">\n            </div>\n        </div>\n    </div>\n    <div id=\"right-column\" class=\"col-xs-9\">\n        <div class=\"row flex\">\n            <div id=\"lattice-canvas\" class=\"col-xs-12\">\n            </div>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
templates['test/lattice.iloc'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "L0: nop\n    loadI  1         => ra\n    cmp_GE ra   , rb => rc\n    cbr    rc        -> L1   , L2\nL1: i2i    ra        => rc\n    jump   L3\nL2: i2i    rb   , 1  => rc\nL3: nop";
},"useData":true});
templates['menu/main.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <div class=\"row\">\n            <div id=\"menu\" class=\"col-xs-6\">\n                <div class=\"row\">\n                    <div class=\"col-xs-12\">\n                        <h2>Simulations</h2>\n                        <p>\n                        <button class=\"btn btn-secondary btn-block\" id=\"btn-round-robin-simulator\">\n                            Round Robin Iterator\n                        </button>\n                        </p>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col-xs-12\">\n                        <h2>Testing</h2>\n                        <p>\n                        <button class=\"btn btn-secondary btn-block\" id=\"btn-lattice-testbed\">\n                            Lattices\n                        </button>\n                        </p>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-xs-6 well\">\n                <div id=\"description-canvas\">\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
templates['menu/btn-lesson.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<p>\n    <button id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"btn btn-secondary btn-block\" lesson=\""
    + alias4(((helper = (helper = helpers.lesson || (depth0 != null ? depth0.lesson : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lesson","hash":{},"data":data}) : helper)))
    + "\">\n        "
    + alias4(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + "\n    </button>\n</p>\n";
},"useData":true});
templates['menu/lesson_menu.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row\">\n    <div id=\"lesson-menu\" class=\"col-xs-12\">\n        <h2>Lessons</h2>\n        <!-- lesson buttons -->\n    </div>\n</div>\n";
},"useData":true});
})();