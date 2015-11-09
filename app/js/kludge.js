/*
 *  kludge.js
 *
 *  A collection of JavaScript snippets from StackOverflow, making
 *  coding in JavaScript less of a pain in the arse since 09/11/2015.
 */

// Mimic python's format() function
// http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) { 
            return typeof args[number] != 'undefined'
                 ? args[number]
                 : match
            ;
        });
    };
}
