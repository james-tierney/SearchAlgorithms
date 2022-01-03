class Node {
    constructor(id) {
        this.id = id;
    }
}

// Using the above implemented graph class
let g = new Graph(6);
let nodes = [ 'A', 'B', 'C', 'D', 'E', 'F' ];

// adding vertices
for (let i = 0; i < nodes.length; i++) {
    g.addNode(nodes[i]);
}

// adding edges
g.addEdge('A', 'B');
g.addEdge('A', 'D');
g.addEdge('A', 'E');
g.addEdge('B', 'C');
g.addEdge('D', 'E');
g.addEdge('E', 'F');
g.addEdge('E', 'C');
g.addEdge('C', 'F');

g.printOurGraph();

g.breadthFirstSearch(g, 'A', 'F');
g.depthFirstSearch(g, 'A', 'F');