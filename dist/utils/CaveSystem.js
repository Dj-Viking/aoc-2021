"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaveSystem = void 0;
class CaveSystem {
    constructor() {
        this.vertices = [];
        this.adjacent = {};
        this.edges = 0;
    }
    addVertex(vert) {
        this.vertices.push(vert);
        this.adjacent[vert] = [];
    }
    addEdge(vert, dest) {
        this.adjacent[vert].push(dest);
        this.adjacent[dest].push(vert);
        this.edges++;
    }
    dfs(goal, start = this.vertices[0], visited = {}) {
        const adj = this.adjacent;
        visited[start] = true;
        for (let i = 0; i < adj[start].length; i++) {
            let next = adj[start][i];
            if (!visited[next]) {
                this.dfs(goal, next, visited);
            }
        }
        return visited[goal] || false;
    }
    bfs(goal, start) {
        !!start ? (start = start) : (start = this.vertices[0]);
        const adj = this.adjacent;
        if (goal === start)
            throw new Error("can't begin bfs search from start when our goal is start");
        const queue = [];
        queue.push(start);
        const visited = {};
        visited[start] = true;
        const edges = {};
        edges[start] = 0;
        const predecessors = {};
        predecessors[start] = null;
        const buildPath = (goal, start, predecessors) => {
            const stack = [];
            stack.push(goal);
            let u = predecessors[goal];
            while (u !== start) {
                stack.push(u);
                u = predecessors[u];
            }
            stack.push(start);
            let path = stack.reverse().join("-");
            return path;
        };
        while (queue.length) {
            const vert = queue.shift();
            if (vert === goal) {
                return {
                    distance: edges[goal],
                    path: buildPath(goal, start, predecessors),
                };
            }
            for (let i = 0; i < adj[vert].length; i++) {
                if (!visited[adj[vert][i]]) {
                    visited[adj[vert][i]] = true;
                    queue.push(adj[vert][i]);
                    edges[adj[vert][i]] = edges[vert] + 1;
                    predecessors[adj[vert][i]] = vert;
                }
            }
        }
        return false;
    }
}
exports.CaveSystem = CaveSystem;
const graph = new CaveSystem();
graph.addVertex("start");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");
graph.addVertex("end");
graph.addEdge("start", "B");
graph.addEdge("start", "C");
graph.addEdge("start", "D");
graph.addEdge("B", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "D");
graph.addEdge("C", "E");
graph.addEdge("D", "F");
graph.addEdge("F", "end");
console.log("DFS goal is end", graph.dfs("end"));
console.log("DFS goal is start", graph.dfs("start"));
console.log("BFS goal is end", graph.bfs("end"));
console.log("BFS goal is start", graph.bfs("start"));
//# sourceMappingURL=CaveSystem.js.map