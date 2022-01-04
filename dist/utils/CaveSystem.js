"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaveSystem = void 0;
const getInput_1 = require("./getInput");
class CaveSystem {
    constructor() {
        this.caves = [];
        this.paths = {};
        this.adjacent = {};
        this.edges = 0;
    }
    addCave(cave) {
        this.caves.push(cave);
        this.adjacent[cave] = [];
    }
    addRoute(cave, dest) {
        this.adjacent[cave].push(dest);
        this.adjacent[dest].push(cave);
        this.edges++;
    }
    isSmall(cave) {
        if (!/start/g.test(cave) || !/end/g.test(cave)) {
            return /^[a-z]+$/g.test(cave);
        }
        return false;
    }
    dfs(goal, start = this.caves[0], visited = {}) {
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
        !!start ? (start = start) : (start = "start");
        const adj = this.adjacent;
        if (goal === start)
            throw new Error("can't begin bfs search from start when our goal is start");
        const queue = [];
        queue.push(start);
        const visited = {};
        visited[start] = true;
        const routes = {};
        routes[start] = 0;
        const parents = {};
        parents[start] = null;
        while (queue.length > 0) {
            const cave = queue.shift();
            if (cave === goal) {
                this.buildPaths(goal, start);
                console.log("this.paths", this.paths);
                return;
            }
            for (let dest = 0; dest < adj[cave].length; dest++) {
                if (!visited[adj[cave][dest]]) {
                    visited[adj[cave][dest]] = true;
                    queue.push(adj[cave][dest]);
                    routes[adj[cave][dest]] = routes[cave] + 1;
                    parents[adj[cave][dest]] = cave;
                }
            }
        }
        return false;
    }
    buildPaths(goal, start) {
        const isVisited = {};
        for (let i = 0; i < this.caves.length; i++) {
            isVisited[this.caves[i]] = false;
            const pathList = [];
            pathList.push(start);
            this.createAllPaths(start, goal, isVisited, pathList);
        }
    }
    createAllPaths(start, goal, visited, localPathList, path = 0) {
        if (start === goal) {
            this.paths[path] = [];
            this.paths[path].push(...localPathList);
            return localPathList;
        }
        visited[start] = true;
        for (let i = 0; i < this.adjacent[start].length; i++) {
            if (!visited[this.adjacent[start][i]]) {
                path++;
                localPathList.push(this.adjacent[start][i]);
                this.createAllPaths(this.adjacent[start][i], goal, visited, localPathList, path);
                localPathList.splice(localPathList.indexOf(this.adjacent[start][i]), 1);
            }
        }
        visited[start] = false;
    }
}
exports.CaveSystem = CaveSystem;
let theInput = (0, getInput_1.getInput)("../day12/input.txt");
console.log("the input", theInput);
const cavesSet = new Set();
const cs = new CaveSystem();
const routes = theInput.map((str) => {
    return str.split("-");
});
for (let i = 0; i < routes.flat().length; i++)
    cavesSet.add(routes.flat()[i]);
const caves = Array.from(cavesSet);
for (let c = 0; c < caves.length; c++)
    cs.addCave(caves[c]);
for (let r = 0; r < routes.length; r++)
    cs.addRoute(...routes[r]);
console.log("cave system", cs);
console.log("DFS goal is end did we find it", cs.dfs("end"));
console.log("DFS goal is start did we find it", cs.dfs("start"));
console.log("BFS goal is end", cs.bfs("end", "start"));
console.log("cave system after bfs", cs.paths);
//# sourceMappingURL=CaveSystem.js.map