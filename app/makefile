all: templates grammar

templates:
	handlebars templates/*.hbs -f js/templates.js

grammar:
	handlebars js/simulator/iloc/grammar.pegjs -f js/simulator/iloc/grammar.js

tidy:
	find -name "*~" | xargs rm -f
