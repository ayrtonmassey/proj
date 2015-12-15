Handlebars.registerHelper('toHTML', function(item) {
    return new Handlebars.SafeString(item.toHTML());
});
