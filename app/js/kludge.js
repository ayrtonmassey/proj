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

// Pad a string
if (!String.prototype.pad) {
    String.prototype.pad = function(token,len,left,truncate) {
        num_tokens = len - this.length;
        if(num_tokens > 0) {
            return (left ? "" : this) + token.repeat((num_tokens / token.length) + 1).substring(0,num_tokens) + (left ? this : "");
        } else {
            if (truncate) {
                if(left) {
                    return this.substring(this.length - len, this.length);
                } else {
                    return this.substring(0, this.length - len);
                }
            } else {
                return this;
            }
        }
    };
}
