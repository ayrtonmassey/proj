/*
 *  A set of Values.
 * 
 *  Contains functions for manipulating a set. Backed by a standard
 *  array. Checks are performed on add/delete to ensure set properties
 *  are maintained. Manipulating the array directly will cause
 *  problems - only use the functions provided in this interface.
 */
function ValueSet(iterable) {

    this.array = [];

    /* 
     *  Returns the values of this ValueSet, as an array.
     */
    this.values = function() {
        return this.array;
    }

    /* 
     *  Returns the size of this ValueSet.
     *  
     *  Simply returns the length of the backing array.
     */
    this.size = function() {
        return this.array.length;
    }

    /* 
     *  Add `item` to this ValueSet, if it is not present.
     */
    this.add = function(item) {
        if (!this.has(item)) {
            this.array.push(item);
        }
    }

    /* 
     *  Removes `item` from this ValueSet, if it is present.
     *
     *  Uses `compare_values` to check equality, so two distinct
     *  instances with the same attribute values will be considered
     *  equal.
     */
    this.delete = function(item) {
        for(var i = 0; i < this.array.length; i++) {
            if(compare_values(this.array[i],item)) {
                this.array.splice(i,1);
                return;
            }
        }
    }

    /* 
     *  Check if this ValueSet contains `item`.
     *
     *  Uses `compare_values` to check equality, so two distinct
     *  instances with the same attribute values will be considered
     *  equal.
     */
    this.has = function(item) {
        for(v of this.values()) {
            if(compare_values(v,item)) {
                return true;
            }
        }
        return false;
    }

    /*
     *  Returns a String representation of this ValueSet.
     */
    this.toString = function() {
        var string = "{ ";
        for(v of this.values()) {
            switch(v.constructor.name) {
                case "Definition":
                    string += (v.name + "<sub>" + v.index + "</sub>");
                    break;
                case "Use":
                    string += (v.name);
                    break;
                default:
                    throw new ReferenceError("Expected a value, got " + v.constructor.name);
                    break;
            }
            string += ", ";
        }
        return string + " }";
    }

    /* Initialize from iterable */
    for(v of iterable) {
        this.add(v);
    }

}

/*
 *  Compare two values.
 *
 *  Compares the output of the comparison_string function of each
 *  Value. This allows us to check equality between two separate
 *  instances which represent the same value.
 */ 
function compare_values(v1, v2) {
    return v1.comparison_string() == v2.comparison_string();
}

/*
 *  Compare two value sets.
 * 
 *  @returns true if the value sets contain the same values, false
 *  otherwise.
 */
function compare_value_sets(v1,v2) {
    if(v1.size() == v2.size()) { // shortcut - if two sets are
                                 // different sizes they cannot be ==
        for(v of v1.values()) {
            if(!v2.has(v)) {     // check if v2 has all the values of v1
                return false;    // sets, so no need to check reverse (A.v in v2, v in v1)
            }
        }
        return true;
    }
    return false;
}

/*
 *  A Value.
 *
 *  All other Values should inherit from this base class.
 */
function Value(kwargs) {
    this.comparison_string=function(){
        throw new ReferenceError("Value comparison function for {0} undefined.".format(this.constructor.name))
    }
}


// Variable Definition
function Definition(kwargs) {
    Value.call(this, kwargs);
    this.name = kwargs.name;
    
    this.comparison_string=function(){
        return "{0}:{1}".format(this.constructor.name, this.name)
    }
}

Definition.prototype = Object.create(Node.prototype);
Definition.prototype.constructor = Definition


// Arithmetic Expression e.g. (x + 2)
function Expression(kwargs) {
    Value.call(this, kwargs);
    this.expression = kwargs.expression;

    this.comparison_string=function(){
        return "{0}:{1}".format(this.constructor.name, this.expression)
    }
}

Expression.prototype = Object.create(Node.prototype);
Expression.prototype.constructor = Expression


// Variable Use
function Use(kwargs) {
    Value.call(this, kwargs);
    this.name = kwargs.name;

    this.comparison_string=function(){
        return "{0}:{1}".format(this.constructor.name, this.name)
    }
}

Use.prototype = Object.create(Node.prototype);
Use.prototype.constructor = Use

var v1 = new ValueSet([
    new Use({name: "a"}),
    new Use({name: "b"}),
]);

var v2 = new ValueSet([
    new Use({name: "a"}),
    new Use({name: "c"}),
]);

var v3 = new ValueSet([
    new Use({name: "a"}),
    new Use({name: "b"}),
]);

var v4 = new ValueSet([
    new Use({name: "a"}),
]);

console.log(compare_value_sets(v1,v1));
console.log(compare_value_sets(v1,v2));
console.log(compare_value_sets(v2,v1));

console.log('\n');
console.log(compare_value_sets(v1,v3));
console.log(compare_value_sets(v3,v1));

console.log('\n');
console.log(compare_value_sets(v1,v4));
console.log(compare_value_sets(v4,v1));
