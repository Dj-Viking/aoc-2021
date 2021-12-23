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
                function isMarked(item) {
                    return /\[\d\]/.test(item);
                }
                function adjAreNotNineOrMarked(graph, row, col) {
                    const up = !!graph[row - 1] ? graph[row - 1][col] : void 0;
                    const down = !!graph[row + 1] ? graph[row + 1][col] : void 0;
                    const left = !!graph[row][col - 1] ? graph[row][col - 1] : void 0;
                    const right = !!graph[row][col + 1] ? graph[row][col + 1] : void 0;
                    console.log("item", graph[row][col], "row", row, "col", col, "up", up, "down", down, "left", left, "right", right);
                    if (row === 0 && col === 0 && !!down && !!right && !isMarked(down) && !isMarked(right)) {
                        if (parseInt(down) !== 9)
                            return true;
                        if (parseInt(right) !== 9)
                            return true;
                    }
                    if (row === 0 &&
                        !!down &&
                        !!left &&
                        !!right &&
                        (col > 0 || col === graph[row].length - 2) &&
                        !isMarked(left) &&
                        !isMarked(down) &&
                        !isMarked(right)) {
                        if (parseInt(left) !== 9)
                            return true;
                        if (parseInt(down) !== 9)
                            return true;
                        if (parseInt(right) !== 9)
                            return true;
                    }
                    if (row === 0 &&
                        col === graph[row].length - 1 &&
                        !!down &&
                        !!left &&
                        !isMarked(down) &&
                        !isMarked(left)) {
                        if (parseInt(down) !== 9)
                            return true;
                        if (parseInt(left) !== 9)
                            return true;
                    }
                    if (row > 0 &&
                        col === 0 &&
                        !!up &&
                        !!down &&
                        !!right &&
                        !isMarked(up) &&
                        !isMarked(right) &&
                        !isMarked(down)) {
                        if (parseInt(up) !== 9)
                            return true;
                        if (parseInt(right) !== 9)
                            return true;
                        if (parseInt(down) !== 9)
                            return true;
                    }
                    if (row > 0 &&
                        col === graph[row].length - 1 &&
                        !!up &&
                        !!down &&
                        !!left &&
                        !isMarked(up) &&
                        !isMarked(left) &&
                        !isMarked(down)) {
                        if (parseInt(up) !== 9)
                            return true;
                        if (parseInt(left) !== 9)
                            return true;
                        if (parseInt(down) !== 9)
                            return true;
                    }
                    if (row === graph.length - 1 &&
                        col === 0 &&
                        !!up &&
                        !!right &&
                        !isMarked(up) &&
                        !isMarked(right)) {
                        if (parseInt(up) !== 9)
                            return true;
                        if (parseInt(right) !== 9)
                            return true;
                    }
                    if (row === graph.length - 1 &&
                        col > 0 &&
                        !!up &&
                        !!left &&
                        !!right &&
                        !isMarked(left) &&
                        !isMarked(up) &&
                        !isMarked(right)) {
                        if (parseInt(left) !== 9)
                            return true;
                        if (parseInt(up) !== 9)
                            return true;
                        if (parseInt(right) !== 9)
                            return true;
                    }
                    if (row === graph.length - 1 &&
                        col === graph[row].length - 1 &&
                        !!up &&
                        !!left &&
                        !isMarked(up) &&
                        !isMarked(left)) {
                        if (parseInt(up) !== 9)
                            return true;
                        if (parseInt(left) !== 9)
                            return true;
                    }
                    return false;
                }
                function findBasins(graph) {
                    let theGraph = graph;
                    for (let row = 0; row < theGraph.length; row++) {
                        for (let col = 0; col < theGraph[row].length; col++) {
                            if (/\[/g.test(theGraph[row][col]) && adjAreNotNineOrMarked(theGraph, row, col)) {
                                console.log("did we get here");
                                if (!!theGraph[row - 1] &&
                                    parseInt(theGraph[row - 1][col]) !== 9) {
                                    theGraph[row - 1][col] = "[" + theGraph[row - 1][col] + "]";
                                }
                                if (!!theGraph[row][col - 1] &&
                                    parseInt(theGraph[row][col - 1]) !== 9) {
                                    theGraph[row][col - 1] = "[" + theGraph[row][col - 1] + "]";
                                }
                                if (!!theGraph[row + 1] &&
                                    parseInt(theGraph[row + 1][col]) !== 9) {
                                    theGraph[row + 1][col] = "[" + theGraph[row + 1][col] + "]";
                                }
                                if (!!theGraph[row][col + 1] &&
                                    parseInt(theGraph[row][col + 1]) !== 9) {
                                    theGraph[row][col + 1] = "[" + theGraph[row][col + 1] + "]";
                                }
                                return findBasins(theGraph);
                            }
                        }
                    }
                    return theGraph;
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
                theInput = findBasins(theInput);
                console.log("\n");
                dumpGraph(theInput);
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