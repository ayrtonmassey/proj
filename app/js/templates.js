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
templates['simulator/roundrobin.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row\">\n    <div id=\"left-column\" class=\"col-xs-3\">\n        <div class=\"row\">\n            <div id=\"code-canvas\" class=\"col-xs-12\">\n            </div>\n        </div>\n        <div class=\"row no-flex\">\n            <div id=\"sim-controls-canvas\" class=\"col-xs-12\">\n            </div>\n        </div>\n        <div class=\"row flex-max\">\n            <div id=\"lattice-canvas\" class=\"col-xs-12\">\n            </div>\n        </div>\n    </div>\n    <div id=\"right-column\" class=\"col-xs-9\">\n        <div class=\"row\">\n            <div id=\"framework-canvas\" class=\"col-xs-12\">\n            </div>\n        </div>\n\n        <div class=\"row flex-max\">\n            <div class=\"col-xs-12\" style=\"display: flex; flex-direction: column; max-width: 100%;\">\n                <ul class=\"nav nav-tabs\">\n                    <li class=\"nav-item\"><a class=\"nav-link active\" data-toggle=\"tab\" href=\"#cfg-canvas\">CFG</a></li>\n                    <li class=\"nav-item\"><a class=\"nav-link\" data-toggle=\"tab\" href=\"#results-canvas\">Results Table</a></li>\n                </ul>\n\n                <div class=\"tab-content flex-max\">\n                    <div id=\"cfg-canvas\" class=\"tab-pane fade in active flex\">\n                    </div>\n                    <div id=\"results-canvas\" class=\"tab-pane fade\">\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n";
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
    return "        <p>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</p>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            <button class=\"btn btn-primary btn-answer "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.correct : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + "\">\n                "
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.text : depth0), depth0))
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
    + "    </div>\n</div>\n";
},"useData":true});
templates['teaching/question/canvas.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"question-canvas\" class=\"question row\">\n</div>";
},"useData":true});
templates['teaching/progs/guessing.iloc'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "    load   rx     => rx\n    loadI  50     => rg\nL0: div    rg, 2  => rt\n    cbr_EQ rg, rx -> L5, L1\nL1: cbr_LT rg, rx -> L2, L3\nL2: add    rg, rt => rg\n    jump   L4\nL3: sub    rg, rt => rg\nL4: jump   L0\nL5: store  rx     => rx";
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
    return "<p>\\begin{align}\n    \\text{In}(n_3) &= \\bigcup_{p \\in preds} \\text{Out}(p) \\\\\n    &= \\text{Out}(n_2) \\cup \\text{Out}(n_6) \\\\\n    &= \\{\\texttt{rc}_1, \\texttt{rb}_1, \\texttt{ra}_1\\} \\cup \\emptyset \\\\\n    &= \\{\\texttt{rc}_1, \\texttt{rb}_1, \\texttt{ra}_1\\}\n    \\end{align}</p>\n\n<p>We always use <strong>current information</strong> when computing sets. In this case, we take \\(\\text{Out}(n_6)\\) to be the empty set.</p>\n";
},"useData":true});
templates['teaching/lesson/01/step_15.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>However, <strong>we're not done yet</strong>. When we computed each set, their values <strong>changed</strong>.</p>\n";
},"useData":true});
templates['teaching/lesson/intro/step_22.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h1>Summary</h1>\n\n<ul>\n    <li>Data-flow analysis lets us <strong>gather information</strong> at points in a <strong>control-flow graph.</strong></li>\n    <li>We use <strong>data-flow equations</strong> to determine this information.</li>\n    <li>Information is defined in terms of <strong>in</strong> and <strong>out</strong> points for each node in the CFG.</li>\n    <li>This information is used during the <strong>optimisation</strong> stage in a compiler.</li>\n</ul>\n\n<p>Continue to the next lesson or return to the menu using the buttons below.</p>\n\n<p><a id=\"btn-goto-next-lesson\" class=\"btn btn-primary btn-block\">Next Lesson</a></p>\n<p><a id=\"btn-goto-menu\" class=\"btn btn-secondary btn-block\">Back to Menu</a></p>\n";
},"useData":true});
templates['teaching/lesson/intro/step_16_ans.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Correct! Both \\(n_2\\) and \\(n_4\\) are <strong>predecessors</strong> of \\(n_5\\), so the values <strong>flowing out</strong> of them <strong>flow into</strong> \\(n_5\\):</p>\n<p>\n    \\begin{align}\n    \\text{In}(n_5) &= \\bigcup_{p \\in n_2, n_4} \\text{Out}(p) \\\\\n    &= \\text{Out}(n_2) \\cup \\text{Out}(n_4) \\\\\n    &= \\{ {\\tt ra_1} \\} \\cup \\{ {\\tt ra_2} \\} \\\\\n    &= \\{ {\\tt ra_1}, {\\tt ra_2} \\} \\\\\n    \\end{align}\n</p>\n\n";
},"useData":true});
templates['teaching/lesson/intro/main.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row\">\n    <div class=\"col-xs-6 lesson-step\">\n        <div class=\"row\">\n            <div id=\"text\" class=\"col-xs-12\">\n            </div>\n        </div>\n        <nav class=\"row\">\n            <button id=\"btn-prev\" class=\"btn btn-primary\">Prev</button>\n            <button id=\"btn-next\" class=\"pull-right btn btn-primary\">Next</button>\n        </nav>\n    </div>\n    <div id=\"cfg-canvas\" class=\"col-xs-6\">\n    </div>\n</div>\n";
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
    return "<p>Let's try working out the sets for this graph. Remember the equation for \\(\\text{In}(n)\\):</p>\n\n<p>\\[\\text{In}(n) = \\bigcup_{p \\in preds} \\text{Out}(p)\\]</p>\n\n<p>This means, \"take the union of \\(\\text{Out}(p)\\) for all predecessors \\(p\\) of \\(n\\)\". There are no predecessors for \\(n_0\\):</p>\n\n<p>\n    \\begin{align}\n    \\text{In}(n_0) &= \\bigcup_{p \\in \\emptyset} \\text{Out}(p) \\\\\n                   &= \\emptyset \\\\\n    \\end{align}\n</p>\n\n<p>So the answer is the <strong>empty set</strong> (written \\(\\emptyset\\) or \\(\\{\\}\\)).</p>\n";
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

  return "<p>Now let's work out \\(\\text{Out}(n_0)\\):</p>\n\n<p>\n    \\begin{align}\n    \\text{Out}(n_0) &= \\text{DefGen}(n_0) \\cup \\big{(}\\text{In}(n_0) \\setminus \\text{DefKill}(n_0)\\big{)} \\\\\n    \\text{Out}(n_0) &= \\{ {\\tt rx_0} \\} \\cup \\big{(}\\emptyset \\setminus \\{ {\\tt rx_i} : \\forall i \\neq 1 \\}\\big{)} \\\\\n    \\text{Out}(n_0) &= \\{ {\\tt rx_0} \\} \\cup \\emptyset \\\\\n    \\text{Out}(n_0) &= \\{ {\\tt rx_0} \\}\n    \\end{align}\n</p>\n\n<p>The assignment to \\({\\tt rx}\\) "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"definition_generated",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " the definition \\({\\tt rx_1}\\). No values are flowing in and the node doesn't kill any definitions, so we're left with \\( \\{ {\\tt rx_1} \\} \\)!</p>.\n";
},"useData":true});
templates['teaching/lesson/intro/step_00.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h1>Introduction</h1>\n\n<p>Welcome to the Data-Flow Analysis Tutor! In this tutorial, you'll learn:</p>\n\n<ul>\n    <li>What data-flow analysis is and why it is useful.</li>\n    <li>How to perform a simple data-flow analysis.</li>\n</ul>\n\n<p>To begin, please click the <em>Next</em> button.</p>\n";
},"useData":true});
templates['teaching/lesson/intro/step_07.iloc'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "loadI 7 => rx";
},"useData":true});
templates['teaching/lesson/intro/step_17_ans.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Correct! Both \\(n_2\\) and \\(n_3\\) are <strong>predecessors</strong> of \\(n_1\\), because there is a <strong>back-edge</strong> from \\(n_3\\) to \\(n_1\\). Right now \\(n_3\\) is \\(\\emptyset\\), so:</p>\n\n<p>\n    \\begin{align}\n    \\text{In}(n_1) &= \\bigcup_{p \\in n_2, n_3} \\text{Out}(p) \\\\\n    &= \\text{Out}(n_2) \\cup \\text{Out}(n_3) \\\\\n    &= \\{ {\\tt ra_1} \\} \\cup \\emptyset \\\\\n    &= \\{ {\\tt ra_1} \\} \\\\\n    \\end{align}\n</p>\n\n";
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

  return "<h1>What is Data-Flow Analysis?</h1>\n\n<p>"
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

  return "<h1>Control-Flow Graphs</h1>\n\n<p>To perform data-flow analysis, we need to create a "
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

  return "<h1>Reaching Definitions</h1>\n\n<p>One form of "
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

  return "<p>Now let's work out \\(\\text{Out}(n_1)\\):</p>\n\n<p>\n    \\begin{align}\n    \\text{Out}(n_1) &= \\text{DefGen}(n_1) \\cup \\big{(}\\text{In}(n_1) \\setminus \\text{DefKill}(n_1)\\big{)} \\\\\n    \\text{Out}(n_1) &= \\{ {\\tt rx_2} \\} \\cup \\big{(} \\{ {\\tt rx_1} \\} \\setminus \\{ {\\tt rx_i} : \\forall i \\neq 1 \\}\\big{)} \\\\\n    \\text{Out}(n_1) &= \\{ {\\tt rx_2} \\} \\cup \\emptyset \\\\\n    \\text{Out}(n_1) &= \\{ {\\tt rx_2} \\}\n    \\end{align}\n</p>\n\n<p>The assignment to \\({\\tt rx}\\) "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"definition_generated",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " the definition \\({\\tt rx_2}\\). This definition overwrites (and "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"definition_killed",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ") \\({\\tt rx_1}\\) so we're left with \\( \\{ {\\tt rx_2} \\} \\)!</p>\n";
},"useData":true});
templates['test/cfg.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row\">\n    <div id=\"left-column\" class=\"col-xs-3\">\n        <div class=\"row\">\n            <div id=\"sim-controls-canvas\" class=\"col-xs-12\">\n            </div>\n        </div>\n    </div>\n    <div id=\"right-column\" class=\"col-xs-9\">\n        <div class=\"row flex flex-max\">\n            <div id=\"cfg-canvas\" class=\"col-xs-12\">\n            </div>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
templates['test/lattice.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row\">\n    <div id=\"left-column\" class=\"col-xs-3\">\n        <div class=\"row\">\n            <div id=\"sim-controls-canvas\" class=\"col-xs-12\">\n            </div>\n        </div>\n    </div>\n    <div id=\"right-column\" class=\"col-xs-9\">\n        <div class=\"row flex\">\n            <div id=\"lattice-canvas\" class=\"col-xs-12\">\n            </div>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
templates['test/cfg.iloc'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "L0: nop\n    loadI  1         => ra\n    cmp_GE ra   , rb => rc\n    cbr    rc        -> L1   , L2\nL1: i2i    ra        => rc\n    jump   L3\nL2: i2i    rb   , 1  => rc\nL3: nop";
},"useData":true});
templates['test/lattice.iloc'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "L0: nop\n    loadI  1         => ra\n    cmp_GE ra   , rb => rc\n    cbr    rc        -> L1   , L2\nL1: i2i    ra        => rc\n    jump   L3\nL2: i2i    rb   , 1  => rc\nL3: nop";
},"useData":true});
templates['menu/main.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <div class=\"row\">\n            <div id=\"menu\" class=\"col-xs-6\">\n                <div class=\"row\">\n                    <div class=\"col-xs-12\">\n                        <h2>Simulations</h2>\n                        <p>\n                        <button class=\"btn btn-secondary btn-block\" id=\"btn-round-robin-simulator\">\n                            Round Robin Iterator\n                        </button>\n                        </p>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col-xs-12\">\n                        <h2>Testing</h2>\n                        <p>\n                            <button class=\"btn btn-secondary btn-block\" id=\"btn-lattice-testbed\">\n                                Lattices\n                            </button>\n                        </p>\n                        <p>\n                            <button class=\"btn btn-secondary btn-block\" id=\"btn-cfg-testbed\">\n                                CFG\n                            </button>\n                        </p>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-xs-6 well\">\n                <div id=\"description-canvas\">\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n";
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