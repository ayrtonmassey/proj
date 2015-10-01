class Graph(object):
    """A graph which contains nodes connected by edges."""

    nodes = []
    edges = []

    def add_node(self, node):
        if len([n for n in self.nodes if n.name == node.name]) == 0:
            self.nodes.append(node)
            node.graph = self

    def add_edge(self, n1, n2):
        if (n1,n2) not in self.edges:
            self.edges.append((n1,n2))

    def get_node(self, name):
        for node in self.nodes:
            if node.name=="name":
                return node

    def in_edges(self, name):
        return [ edge for edge in self.edges if edge[1] == name ]                

            
class Node():
    """A node which forms part of a graph."""
    
    name = None
    graph = None
    
    def __init__(self, name):
        self.name = name

        
class AssignmentNode(Node):

    lhs = None

    def __init__(self, name, lhs):
        super().__init__(name)
        self.lhs = lhs
