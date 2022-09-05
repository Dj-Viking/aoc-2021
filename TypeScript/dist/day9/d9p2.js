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
                let theInput = (0, utils_1.getInput)("../day9/input.txt").map((str) => {
                    return str.split("");
                });
                const basins = new Map();
                let adjList = new Map();
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
                    let theAdjList = adjList;
                    const queue = [[startR, startC]];
                    while (queue.length > 0) {
                        const [r, c] = queue.shift();
                        theAdjList = getAdjToPoint(r, c, graph);
                        visitedBool[r][c] = true;
                        for (const [row, col] of theAdjList.get(graph[r][c])) {
                            if (parseInt(graph[row][col]) === 9) {
                                continue;
                            }
                            if (visitedBool[row][col] === false) {
                                visitedBool[row][col] = true;
                                basins.set(currentBasin, [
                                    ...basins.get(currentBasin),
                                    parseInt(graph[row][col]),
                                ]);
                                queue.push([row, col]);
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
                function calcBasins(basins) {
                    let result = 0;
                    let basinCollection = [];
                    const valIterator = basins.values();
                    for (let i = 0; i < basins.size; i++) {
                        basinCollection.push(valIterator.next().value);
                    }
                    let sizes = [];
                    for (let j = 0; j < basinCollection.length; j++) {
                        sizes.push(basinCollection[j].length);
                    }
                    sizes = sizes.sort((a, b) => a - b);
                    result = sizes
                        .sort((a, b) => a - b)
                        .slice(sizes.length - 3, sizes.length)
                        .reduce((curr, next) => (curr *= next));
                    return result;
                }
                theInput = findLowPoints(theInput);
                findBasins(theInput);
                const answer = calcBasins(basins);
                console.log("answer", answer);
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