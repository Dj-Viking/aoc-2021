"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaveSystemTwo = void 0;
class CaveSystemTwo {
    constructor() {
        this.caves = [];
        this.paths = [];
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
    isSmall(cave) {
        if (!/start/g.test(cave) || !/end/g.test(cave)) {
            return /^[a-z]+$/g.test(cave);
        }
        return false;
    }
    findPaths(adj, start, end, paths = [], currentPath = {}) {
        currentPath[start] = currentPath[start] + 1 || 1;
        if (this.isSmall(start) && currentPath[start] === 2) {
            currentPath["small-visited-twice"] = true;
        }
        if (start === end) {
            paths.push(currentPath);
            return;
        }
        for (const cave of adj[start]) {
            if (this.isSmall(cave) && cave in currentPath) {
                if (["start", "end"].includes(cave) ||
                    currentPath["small-visited-twice"])
                    continue;
            }
            this.findPaths(adj, cave, end, paths, Object.assign({}, currentPath));
        }
        this.paths = paths;
    }
}
exports.CaveSystemTwo = CaveSystemTwo;
//# sourceMappingURL=CaveSystemTwo.js.map