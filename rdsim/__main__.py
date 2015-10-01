from rdsim.graph import Node, AssignmentNode, Graph
from functools import reduce

def init():
    global graph

    # graph = Graph()

    # # Set up nodes.
    # graph1.add_node(AssignmentNode("0","a"))
    # graph1.add_node(AssignmentNode("1","b"))
    # graph1.add_node(AssignmentNode("2","c"))
    # graph1.add_node(AssignmentNode("3","a"))
    # graph1.add_node(AssignmentNode("4","d"))
    # graph1.add_node(Node("5"))
    
    # # Set up edges.
    # graph1.add_edge("0","1")
    # graph1.add_edge("1","2")
    # graph1.add_edge("2","3")
    # graph1.add_edge("3","4")
    # graph1.add_edge("4","5")

    graph = Graph()

    # Set up nodes.
    graph.add_node(AssignmentNode("0","a"))
    graph.add_node(Node("1"))
    graph.add_node(AssignmentNode("2","a"))
    graph.add_node(AssignmentNode("3","b"))
    graph.add_node(AssignmentNode("4","c"))
    graph.add_node(Node("5"))

    # Set up edges.
    graph.add_edge("0","1")
    graph.add_edge("1","2")
    graph.add_edge("1","3")
    graph.add_edge("2","4")
    graph.add_edge("3","4")
    graph.add_edge("4","5")
    graph.add_edge("5","3")    


def rdsim(graph):

    in_sets  = { node.name : set() for node in graph.nodes }
    out_sets = { node.name : set() for node in graph.nodes }
    rd_sets  = { node.name : set() for node in graph.nodes }

    values_changing = True

    i = 0
    while values_changing:
        values_changing = False
        
        for node in graph.nodes:
            in_set = reduce(set.union,[set()] + [ os for n, os in out_sets.items() if n in [ edge[0] for edge in graph.in_edges(node.name) ] ])

            if type(node) is AssignmentNode:
                out_set = in_set.difference(set([ (d,name) for (d,name) in in_set if d == node.lhs ])).union(set([(node.lhs,node.name)]))
            else:
                out_set = in_set

            if type(node) is AssignmentNode:
                rd_set = reduce(set.union,[set()] + [ rd.difference(set([ (d, name) for (d, name) in in_set if d == node.lhs ])) for n, rd in rd_sets.items() if n in [ edge[0] for edge in graph.in_edges(node.name) ] ])
                rd_set.add((node.lhs,node.name))
            else:
                rd_set = reduce(set.union,[set()] + [ rd for n, rd in rd_sets.items() if n in [ edge[0] for edge in graph.in_edges(node.name) ] ])
                
            if in_sets[node.name] != in_set:
                in_sets[node.name] = in_set
                values_changing = True
            if out_sets[node.name] != out_set:
                out_sets[node.name] = out_set
                values_changing = True
            if rd_sets[node.name] != rd_set:
                rd_sets[node.name] = rd_set
                values_changing = True


        print("Round {}".format(i))
        for node in graph.nodes:
            print(node.name)
            print("in:  {}".format(in_sets[node.name]))
            print("out: {}".format(out_sets[node.name]))
            print("rd:  {}".format(rd_sets[node.name]))
        print()
        
        i += 1

    return rd_sets, out_sets

    
def main():
    global graph
    
    init()

    rd_sets, out_sets = rdsim(graph)

    print("Final:")
    for node in graph.nodes:
        print("{} out: {}".format(node.name, out_sets[node.name]))
        print("{} rd:  {}".format(node.name, rd_sets[node.name]))
    print()
    

if __name__ == '__main__':
    main()
