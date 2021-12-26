"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            try {
                let theInput = (0, utils_1.getInput)("../day9/sample.txt").map((str) => {
                    return str.split("");
                });
                console.log("the input", theInput);
                function dumpGraph(graph) {
                    for (let i = 0; i < graph.length; i++) {
                        console.log(`${graph[i]}`
                            .replace(/,/g, " ")
                            .replace(/\s(?=\[)/g, "")
                            .replace(/(?<=\])\s/g, ""));
                    }
                }
                const basins = new Map();
                let basinLowPoint = { startR: 0, startC: 0 };
                let visited = [];
                visited = initVisited(visited);
                let currentBasin = 0;
                function initVisited(arr) {
                    arr = [...new Array(theInput.length * 2)].map(() => new Array(theInput.length * 2).fill(false));
                    return arr;
                }
                function basinDFS(startR, startC, visited, graph) {
                    console.log("what is r c", startR, startC);
                }
                function findBasins(graph) {
                    let theGraph = graph;
                    for (let r = 0; r < theGraph.length; r++) {
                        for (let c = 0; c < theGraph[r].length; c++) {
                            if (/\[/g.test(theGraph[r][c])) {
                                currentBasin++;
                                theGraph[r][c] = theGraph[r][c].replace(/\[|\]/g, "");
                                basinLowPoint.startR = r;
                                basinLowPoint.startC = c;
                                basins.set(currentBasin, []);
                                basins.set(currentBasin, [
                                    ...basins.get(currentBasin),
                                    parseInt(graph[r][c]),
                                ]);
                                basinDFS(r, c, visited, theGraph);
                                visited = initVisited(visited);
                            }
                        }
                    }
                    return;
                }
                function findLowPoints(graph) {
                    let theGraph = graph;
                    for (let r = 0; r < theGraph.length; r++) {
                        for (let c = 0; c < theGraph[r].length; c++) {
                            const edge = (0, utils_1.isEdge)(theGraph, r, c);
                            if (!!edge.isEdge && !!edge.type) {
                                if ((0, utils_1.isLowerThanAdj)(theGraph[r][c], theGraph, r, c, edge.type)) {
                                    theGraph[r][c] = "[" + theGraph[r][c] + "]";
                                }
                            }
                            else {
                                if ((0, utils_1.isLowerThanAdj)(theGraph[r][c], theGraph, r, c)) {
                                    theGraph[r][c] = "[" + theGraph[r][c] + "]";
                                }
                            }
                        }
                    }
                    return theGraph;
                }
                theInput = findLowPoints(theInput);
                dumpGraph(theInput);
                console.log("\n");
                findBasins(theInput);
                console.log("\n");
                resolve();
            }
            catch (error) {
                console.error(error);
                reject(error);
            }
        });
    });
})();
//# sourceMappingURL=d9p2.js.map