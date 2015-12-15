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
        string += this.values().map(function(v) {
            return v.toString();
        }).join(", ");
        return string + " }";
    }

    /*
     *  Returns a String representation of this ValueSet.
     */
    this.toHTML = function() {
        var string = "{ ";
        string += this.values().map(function(v) {
            return v.toHTML();
        }).join(", ");
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
 *  Compares two values using the compare() function of the first
 *  Value. This allows us to check equality between two separate
 *  instances which represent the same value.
 */ 
function compare_values(v1, v2) {
    return v1.compare(v2);
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
 *  Mixin for a a Value.
 *
 *  All Values should inherit from this mixin using the following code:
 *
 *      ValueMixin.call(this, kwargs);
 *
 *  Note that this will not allow "instanceof ValueMixin" capability,
 *  since you are not directly extending ValueMixin.
 *
 */
function ValueMixin(kwargs) {
    this.compare=function(v2){
        throw new ReferenceError("function compare not defined in {0}".format(this.constructor.name))
    }

    this.toHTML=function(){
        throw new ReferenceError("function toHTML not defined in {0}".format(this.constructor.name))
    }
        
}
