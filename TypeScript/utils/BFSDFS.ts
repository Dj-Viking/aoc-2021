const airports = "PHX BKK OKC JFK LAX MEX EZE HEL LOS LAP LIM".split(" ") as string[];
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
] as Array<[string, string]>;

const adjList = new Map<string, Array<string>>();

//starting point
function addNode(airport: string): void {
  adjList.set(airport, [] as string[]);
}

function addEdge(origin: string, dest: string) {
  adjList.get(origin)?.push(dest);
  adjList.get(dest)?.push(origin);
}

for (let a = 0; a < airports.length; a++) addNode(airports[a]);

for (let r = 0; r < routes.length; r++) addEdge(...routes[r]);

console.log("START BFS EXAMPLE");
console.log("-----------------------");
console.log("airports with direct routes to each other");
console.log(adjList);

function BFS(start: string, final: string) {
  const visited = new Set<string>();
  const queue = [start];
  while (queue.length > 0) {
    const airport = queue.shift() as string;
    console.log("queue after shifting out new airport", queue, "airport", airport);
    const destinations = adjList.get(airport) as string[];
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

const basins = new Map<number, Array<string>>();

function DFS(start: string, visited: Set<string>, final = "BKK"): void {
  console.log("start of DFS", start);
  visited.add(start);
  console.log("total visited", visited);
  let steps = 1;
  const destinations = adjList.get(start) as string[];
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

        //somehow calling return here on the function
        // will allow the function to stop after finding the destination in 3 steps?
        //but also have to write return inside the case in which we found the destination in 3 steps.
        // recursion is weird...how does the function know to stop if i don't write return?
        return DFS(dest, visited);
      }
    }
  }
}
let visited = new Set<string>();
DFS("PHX", visited);
console.log("basins", basins);

console.log("---------------");
console.log("DFS EXAMPLE END");

let set1 = new Set<number>();
let set2 = new Set<number>();
const mapOfSets = new Map<number, Set<number>>();
let mapKey = 0;

for (let i = 0; i < 10; i++) {
  mapOfSets.set(mapKey, set1.add(i));
  for (let j = 0; j < 10; j++) {
    mapOfSets.set(mapKey + 1, set2.add(j));
  }
}
for (let i = 0; i < 10; i++) {
  mapOfSets.set(mapKey, set1.add(i));
  for (let j = 0; j < 10; j++) {
    mapOfSets.set(mapKey + 1, set2.add(j));
  }
}
console.log("map of sets", mapOfSets);
