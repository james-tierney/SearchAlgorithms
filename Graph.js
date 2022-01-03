class Graph {
    constructor(numOfNodes) {
        this.adjacencyList = new Map();
        this.numOfNodes = numOfNodes;
    }
    // function to add node our graph
    addNode(node) {
        this.adjacencyList.set(node, []);
    }

    // function to add edge between nodes to our graph
    addEdge(node, edge) {
        this.adjacencyList.get(node).push(edge);
        // need to add the edge other direction too
        this.adjacencyList.get(edge).push(node);
    }


    printOurGraph() {
        let keys = this.adjacencyList.keys();

        for(let i of keys) {
            let values = this.adjacencyList.get(i);
            let valuesToPrint = "";
            for(let j of values) {
                valuesToPrint += j + " ";
            }
            console.log(i + " -> " + valuesToPrint + "\n");
        }
    }
    getNeighbours(node) {
        return this.adjacencyList.get(node);
    }

    reversePath(path) {
        let newPath = "";
        for(let i = path.length-1; i >= 0; i--) {
            if((path[i] !== "-") || (path[i] !== ">")) {
                newPath += path[i];
            }
        }
        return newPath;
    }

    breadthFirstSearch(graph, origin, dest) {
        let frontTier = []; // this will be our FIFO Queue
        let visited = [];
        let route = "";
        let keys = [];
        let failure = "node " + dest + " could not be found! ";
        if(origin === dest) {
            console.log("origin was dest");
            return origin;
        }
        frontTier.push(origin);
        visited.push(origin);
        while(frontTier.length !== 0) {
            let curNode = frontTier.shift(); // removes element at the front of the queue
            for(let neighbour of this.getNeighbours(curNode)) {
                let s = neighbour;
                if(s === dest) {
                    keys = this.adjacencyList.get(dest);
                    let prev = dest;
                    while(prev !== origin) {
                        route += prev;
                        for (let key of keys) {
                            route = "";
                            route += " - " + prev + " - " + key;
                            if (key === origin) {
                                const originPath = dest + route;
                                const destPath = route + dest;
                                console.log("path took from destination back to origin is ( " + originPath + " )");
                                console.log("path took from origin to dest is ( " + this.reversePath(originPath) + " )");
                            }
                        }
                        prev = keys.shift();
                        keys = this.adjacencyList.get(prev);
                    }
                    console.log("destination " + s + " was reached");
                    console.log("visited nodes were -> " + visited);
                    return s;
                }
                else {
                    visited.push(s);
                    frontTier.push(neighbour);
                }
            }
        }
        return failure;
    }


    depthFirstSearch(graph, origin, dest) {
        let failure = "node " + dest + " could not be found";
        let visited = [];
        let route = "";
        let keys = [];
        let stack = [];

        if(origin === dest) {
            console.log("origin was destination");
            return origin;
        }
        stack.push(origin);
        visited.push(origin);
        while(stack.length !== 0) {
            let curNode = stack.pop();  // removes last element added to the stack
            console.log("popped from stack = " + curNode);
            for(let neighbour of this.getNeighbours(curNode)) {
                let s = neighbour;
                if(s === dest) {
                    keys = this.adjacencyList.get(dest);
                    let prev = dest;
                    while(prev !== dest) {
                        route += prev;
                        for(let key of keys) {
                            route = "";
                            route += " - " + prev + " - " + key;
                            if(key === origin) {
                                const originPath = dest + route;
                                console.log("Path took from destination to origin is ( " + originPath + " )");
                                console.log("Path took from origin to dest is ( " + this.reversePath(originPath) + " )");
                            }
                        }
                        prev = keys.pop();
                        keys = this.adjacencyList.get(prev);
                    }
                    console.log("Destination " + s + " was reached");
                    console.log("Visited Nodes were -> " + visited);
                    return s;
                }
                else {
                    visited.push(s);
                    stack.push(neighbour);
                }
            }
        }
        return failure;
    }
}


// Using the above implemented graph class

let graph = new Graph(6);
let nodes = [ 'A', 'B', 'C', 'D', 'E', 'F' ];

// adding vertices
for (let i = 0; i < nodes.length; i++) {
    graph.addNode(nodes[i]);
}

// adding edges
graph.addEdge('A', 'B');
graph.addEdge('A', 'D');
graph.addEdge('A', 'E');
graph.addEdge('B', 'C');
graph.addEdge('D', 'E');
graph.addEdge('E', 'F');
graph.addEdge('E', 'C');
graph.addEdge('C', 'F');

graph.printOurGraph();

graph.depthFirstSearch(graph, 'A', 'F');