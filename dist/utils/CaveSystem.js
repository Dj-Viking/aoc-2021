"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaveSystem = void 0;
const getInput_1 = require("./getInput");
class CaveSystem {
    constructor() {
        this.caves = [];
        this.finalPaths = [];
        this.paths = {};
        this.adjacent = {};
    }
    addCave(cave) {
        this.caves.push(cave);
        this.adjacent[cave] = [];
    }
    addRoute(cave, dest) {
        this.adjacent[cave].push(dest);
        this.adjacent[dest].push(cave);
    }
    removeDupePaths() {
        const allPaths = Object.keys(this.paths).map((path) => {
            return this.paths[path];
        });
        let slicer = 0;
        let firstPath = [];
        paths: for (let i = 0; i < allPaths.length; i++) {
            if (i === 0) {
                firstPath = allPaths[i];
                continue;
            }
            if (i !== 0) {
                if (allPaths[i].join("") === firstPath.join("")) {
                    slicer = i;
                    break paths;
                }
            }
        }
        this.finalPaths = allPaths.slice(0, slicer);
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
        let loopCount = 0;
        paths: for (let i = 0; i < this.caves.length; i++) {
            loopCount++;
            console.log("getting paths.. standby...", loopCount);
            if (loopCount === 2)
                break paths;
            isVisited[this.caves[i]] = false;
            const pathList = [];
            pathList.push(start);
            this.createAllPaths(start, goal, isVisited, pathList);
        }
    }
    createAllPaths(start, goal, visited, localPathList) {
        if (start === goal) {
            this.paths = Object.assign(Object.assign({}, this.paths), { [Buffer.from(((Math.random() + 1) * 10000).toString(), "utf-8").toString()]: [
                    ...localPathList,
                ] });
            return localPathList;
        }
        if (this.isSmall(start))
            visited[start] = true;
        for (let i = 0; i < this.adjacent[start].length; i++) {
            if (!visited[this.adjacent[start][i]]) {
                localPathList.push(this.adjacent[start][i]);
                this.createAllPaths(this.adjacent[start][i], goal, visited, localPathList);
                localPathList.splice(localPathList.indexOf(this.adjacent[start][i]), 1);
            }
        }
        visited[start] = false;
    }
}
exports.CaveSystem = CaveSystem;
let theInput = (0, getInput_1.getInput)("../day12/input.txt");
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
//# sourceMappingURL=CaveSystem.js.map