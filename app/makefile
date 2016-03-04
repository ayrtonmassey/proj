all: templates grammar parser

.PHONY: grammar parser templates

templates:
	find templates -type f ! -name '*~' -exec sh -c 'handlebars $$@ -r templates -f js/templates.js' sh {} +

grammar:
	handlebars js/simulator/iloc/grammar.pegjs -f js/simulator/iloc/grammar.js

parser:
	pegjs -e iloc_parser js/simulator/iloc/grammar.pegjs js/simulator/iloc/iloc_parser.js

tidy:
	find js/ css/ templates/ -name "*~" | xargs rm -f
