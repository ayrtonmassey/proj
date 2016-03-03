Handlebars.registerHelper('toHTML', function(item) {
    return new Handlebars.SafeString(item.toHTML());
});

Handlebars.registerHelper('definition', function(term, options) {
    return new Handlebars.SafeString('<abbr title="{0}"><strong>{1}</strong></abbr>'.format(DICTIONARY[term], options.fn()));
});
