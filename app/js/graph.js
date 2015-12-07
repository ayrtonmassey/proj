/*
 *  A Graph of Nodes.
 *
 *  A graph of Nodes backed by an adjacency matrix. Contains functions
 *  for adding nodes and edges, and obtaining traversal orders
 *  (e.g. postorder).
 */
function Graph (kwargs) {
    
    this.nodes     = [];
    this.adjacency = [];
    
    /*
     * Add a Node to the Graph.
     */
    this.add_node = function(node) {
        var new_row = [0];
        for(var i = 0; i < this.nodes.length; i++) { // For each node A in adj-matrix
                                                     this.adjacency[i].push(0);               // Add the (lack of) edge A->B
            new_row.push(0);                    // Add the (lack of) edge B->A
        }
        node.index = this.nodes.length     // Set the index of the node in the adj-matrix
        node.graph = this
        this.nodes.push(node);        // Add node B
        this.adjacency.push(new_row); // Add edges for B to adj-matrix
    }

    /*
     * Add an edge from n1 -> n2.
     *
     * Sets the value in the adjacency matrix at (n1, n2) to 1.
     */
    this.add_edge = function(n1,n2) {
        this.adjacency[n1.index][n2.index] = 1
    }

    /*
     * Traverses the Graph in postorder.
     *
     * Traverses the Graph, starting at the node with the index
     * `index`, and returns the order in which nodes were
     * visited. Calls itself recursively for each child.
     */ 
    this.traverse_postorder = function(index, order, visited) {
        visited.push(index);
        var edges = this.adjacency[index];
        for (var i = 0; i < edges.length; i++) {
            if(visited.indexOf(i) == -1 && edges[i] == 1) {
                var result = this.traverse_postorder(i,order,visited);
                order.concat(result[0]);
                visited.concat(result[1]);
            }
        }
        order.push(index);
        return [order,visited];
    }

    /*
     * Traverses the Graph in preorder.
     *
     * Traverses the Graph, starting at the node with the index
     * `index`, and returns the order in which nodes were
     * visited. Calls itself recursively for each child.
     */ 
    this.traverse_preorder = function(index, order, visited) {
        visited.push(index);
        order.push(index);
        var edges = this.adjacency[index];
        for (var i = 0; i < edges.length; i++) {
            if(visited.indexOf(i) == -1 && edges[i] == 1) {
                var result = this.traverse_preorder(i,order,visited);
                order.concat(result[0]);
                visited.concat(result[1]);
            }
        }
        return [order,visited];
    }
    
    /*
     * Returns a postordering of the Graph.
     *
     * Returns the order in which nodes should be visited if they were
     * to be visited in postorder.
     */ 
    this.postorder = function() {
        return this.traverse_postorder(0,[],[])[0];
    }

    /*
     * Returns a preordering of the Graph.
     *
     * Returns the order in which nodes should be visited if they were
     * to be visited in postorder.
     */ 
    this.preorder = function() {
        return this.traverse_preorder(0,[],[])[0];
    }
    
};


/*
 *  A Node.
 *
 *  All other Nodes should inherit from this base class.
 */
function Node (kwargs) {    
    this.instruction = kwargs.instruction;

    this.toString=function(){
        throw new ReferenceError("function toString not defined in {0}".format(this.constructor.name))
    }

    this.toHTML=function(){
        throw new ReferenceError("function toHTML not defined in {0}".format(this.constructor.name))
    }
};


/*
 *  An Assignment.
 *
 *  Represents an assignment node in the CFG, i.e. an instruction such
 *  as:
 *
 *     x := x + 1
 */
function Assignment (kwargs) {
    Node.call(this, kwargs);
    this.definition = kwargs.definition
    this.expression = kwargs.expression
    this.uses       = kwargs.uses
};

Assignment.prototype = Object.create(Node.prototype);
Assignment.prototype.constructor = Assignment

/*
 *  A Branch.
 *
 *  Represents an branch node in the CFG, i.e. an instruction such as:
 *
 *     if (x > 0)
 */
function Branch (kwargs) {
    Node.call(this, kwargs);
    this.expression = kwargs.expression
    this.uses       = kwargs.uses
};

Branch.prototype = Object.create(Node.prototype);
Branch.prototype.constructor = Branch
