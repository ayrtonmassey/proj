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

// Shuffle an array using the Knuth Shuffle
// http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Examine queryparams
// http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


// Find combinations of values in an array
// https://dzone.com/articles/calculate-all-combinations
var combine = function(a) {
    var fn = function(n, src, got, all) {
        if (n == 0) {
            if (got.length > 0) {
                all[all.length] = got;
            }
            return;
        }
        for (var j = 0; j < src.length; j++) {
            fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
        }
        return;
    }
    var all = [];
    for (var i=0; i < a.length; i++) {
        fn(i, a, [], all);
    }
    all.push(a);
    return all;
}
