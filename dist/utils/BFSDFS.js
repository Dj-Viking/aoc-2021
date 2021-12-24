const airports = "PHX BKK OKC JFK LAX MEX EZE HEL LOS LAP LIM".split(" ");
const routes = [
    ["PHX", "LAX"],
    ["PHX", "JFK"],
    ["JFK", "OKC"],
    ["JFK", "HEL"],
    ["JFK", "LOS"],
    ["MEX", "LAX"],
    ["MEX", "BKK"],
    ["MEX", "LIM"],
    ["MEX", "EZE"],
    ["LIM", "BKK"],
];
const adjList = new Map();
function addNode(airport) {
    adjList.set(airport, []);
}
function addEdge(origin, dest) {
    adjList.get(origin).push(dest);
    adjList.get(dest).push(origin);
}
for (let a = 0; a < airports.length; a++)
    addNode(airports[a]);
for (let r = 0; r < routes.length; r++)
    addEdge(...routes[r]);
console.log("START BFS EXAMPLE");
console.log("-----------------------");
console.log("airports with direct routes to each other");
console.log(adjList);
function BFS(start, final) {
    const visited = new Set();
    const queue = [start];
    while (queue.length > 0) {
        const airport = queue.shift();
        console.log("queue after shifting out new airport", queue, "airport", airport);
        const destinations = adjList.get(airport);
        console.log("destinations of", airport, "from the queue", destinations);
        for (const dest of destinations) {
            if (dest === final) {
                console.log("\nat airport", airport, `direct route to Bangkok!\n`);
            }
            if (!visited.has(dest)) {
                visited.add(dest);
                queue.push(dest);
                console.log("\ndest visited", dest, "total visited", visited, "\n");
                console.log(queue.length, "queue now after not visited yet", queue);
            }
        }
    }
}
BFS("PHX", "BKK");
console.log("-----------------------");
console.log("END BFS EXAMPLE");
console.log("-----------------------");
console.log("start DFS example");
console.log("-----------------------");
const basins = new Map();
function DFS(start, visited, final = "BKK") {
    console.log("start of DFS", start);
    visited.add(start);
    console.log("total visited", visited);
    let steps = 1;
    const destinations = adjList.get(start);
    for (const dest of destinations) {
        steps++;
        switch (true) {
            case dest === final: {
                console.log("values", ...visited.values());
                basins.set(steps, [...visited.values()]);
                console.log("basins when found bkk", basins);
                return console.log(`\nDFS found BKK in ${steps} steps\n`);
            }
            case !visited.has(dest): {
                console.log("steps now", steps);
                return DFS(dest, visited);
            }
        }
    }
}
let visited = new Set();
DFS("PHX", visited);
console.log("basins", basins);
console.log("---------------");
console.log("DFS EXAMPLE END");
//# sourceMappingURL=BFSDFS.js.map