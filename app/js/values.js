/*
 *  A set of Values.
 * 
 *  Contains functions for manipulating a set. Backed by a standard
 *  array. Checks are performed on add/delete to ensure set properties
 *  are maintained. Manipulating the array directly will cause
 *  problems - only use the functions provided in this interface.
 */
function ValueSet(iterable) {

    this.map = new Map([]);

    /* 
     *  Returns the values of this ValueSet, as an array.
     */
    this.values = function() {
        return this.map.values();
    }

    /* 
     *  Returns the size of this ValueSet.
     *  
     *  Simply returns the length of the backing map.
     */
    this.size = function() {
        return this.map.size;
    }

    /* 
     *  Add `item` to this ValueSet, if it is not present.
     */
    this.add = function(item) {
        this.map.set(item.key(), item);
    }


    /* 
     *  Add all items from `value_set` to this ValueSet, if they are not present.
     */
    this.add_all = function(value_set) {
        for (item of value_set.values()) {
            this.add(item);
        }
    }

    /* 
     *  Compute the union of this ValueSets with `v2`.
     */
    this.union = function(v2) {
        var v1 = new ValueSet(this.values());
        v1.add_all(v2);
        return v1;
    }

    /* 
     *  Compute the intersection of this ValueSet with `v2`.
     */
    this.intersect = function(v2) {
        var v1 = new ValueSet([]);
        for (v of this.values()) {
            if (v2.has(v)) {
                v1.add(v);
            }
        }
        return v1;
    }
    
    /* 
     *  Removes `item` from this ValueSet, if it is present.
     *
     *  Uses `compare_values` to check equality, so two distinct
     *  instances with the same attribute values will be considered
     *  equal.
     */
    this.delete = function(item) {
        this.map.delete(item.key());
    }

    /* 
     *  Check if this ValueSet contains `item`.
     *
     *  Uses `compare_values` to check equality, so two distinct
     *  instances with the same attribute values will be considered
     *  equal.
     */
    this.has = function(item) {
        return this.map.has(item.key());
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
 *  Compares two values using their key() functions. This allows us to
 *  check equality between two separate instances which represent the
 *  same value.
 */ 
function compare_values(v1, v2) {
    return v1.key() == v2.key();
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
    this.key=function(){
        throw new ReferenceError("function key not defined in {0}".format(this.constructor.name))
    }

    this.toHTML=function(){
        throw new ReferenceError("function toHTML not defined in {0}".format(this.constructor.name))
    }
        
}
