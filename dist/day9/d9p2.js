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
                let adjList = new Map();
                let basinLowPoint = { startR: 0, startC: 0 };
                let visitedBool = [];
                visitedBool = initVisited(visitedBool);
                let currentBasin = 0;
                function initVisited(arr) {
                    arr = [...new Array(theInput.length * 2)].map(() => new Array(theInput.length * 2).fill(false));
                    return arr;
                }
                function getAdjToPoint(r, c, graph) {
                    var _a, _b, _c, _d;
                    let theList = new Map();
                    const up = !!graph[r - 1] ? graph[r - 1][c] : void 0;
                    const down = !!graph[r + 1] ? graph[r + 1][c] : void 0;
                    const left = !!graph[r][c - 1] ? graph[r][c - 1] : void 0;
                    const right = !!graph[r][c + 1] ? graph[r][c + 1] : void 0;
                    theList.set(graph[r][c], []);
                    if (!!up) {
                        (_a = theList.get(graph[r][c])) === null || _a === void 0 ? void 0 : _a.push([r - 1, c]);
                    }
                    if (!!down) {
                        (_b = theList.get(graph[r][c])) === null || _b === void 0 ? void 0 : _b.push([r + 1, c]);
                    }
                    if (!!left) {
                        (_c = theList.get(graph[r][c])) === null || _c === void 0 ? void 0 : _c.push([r, c - 1]);
                    }
                    if (!!right) {
                        (_d = theList.get(graph[r][c])) === null || _d === void 0 ? void 0 : _d.push([r, c + 1]);
                    }
                    return theList;
                }
                function basinBFS(startR, startC, adjList, visitedBool, graph) {
                    console.log("what is r c", startR, startC);
                    (0, utils_1.dumpBooleanGraph)(visitedBool);
                    let theAdjList = adjList;
                    const queue = [[startR, startC]];
                    console.log("what is queue here", queue);
                    while (queue.length > 0) {
                        const [r, c] = queue.shift();
                        theAdjList = getAdjToPoint(r, c, graph);
                        console.log("adjecency list of current coord we are on looping queue", theAdjList);
                        console.log("basins now", basins);
                        visitedBool[r][c] = true;
                        (0, utils_1.dumpBooleanGraph)(visitedBool);
                        for (const [row, col] of theAdjList.get(graph[r][c])) {
                            console.log("current adj coord", row, col, "for value", graph[row][col]);
                            console.log("adjecency list of current coord we are on in the for of loop", theAdjList);
                            if (parseInt(graph[row][col]) === 9) {
                                continue;
                            }
                            if (visitedBool[row][col] === false) {
                                visitedBool[row][col] = true;
                                (0, utils_1.dumpBooleanGraph)(visitedBool);
                                basins.set(currentBasin, [
                                    ...basins.get(currentBasin),
                                    parseInt(graph[row][col]),
                                ]);
                                console.log("basins now", basins);
                                queue.push([row, col]);
                                console.log("what is queue now", queue);
                            }
                        }
                    }
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
                                adjList = new Map();
                                basinBFS(r, c, adjList, visitedBool, theGraph);
                                visitedBool = initVisited(visitedBool);
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