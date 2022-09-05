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
                const theInput = (0, utils_1.getInput)("../day13/input.txt");
                console.log("input", theInput);
                const dots = theInput
                    .map((str) => {
                    return !/fold/g.test(str) && str;
                })
                    .filter((item) => !!item);
                const folds = theInput
                    .map((str) => {
                    return /fold/g.test(str) && str;
                })
                    .filter((item) => !!item);
                console.log("dots", dots);
                console.log("folds", folds);
                const init_graph = Array.from(dots, (coord) => coord.split(","));
                const flat_graph = init_graph.flat(1).map((str) => Number(str));
                const MAX_GRAPH_SIZE = Math.max(...flat_graph);
                let debug_graph = [...new Array(MAX_GRAPH_SIZE + 1)].map(() => {
                    return new Array(MAX_GRAPH_SIZE + 1).fill(".");
                });
                for (let r = 0; r < init_graph.length; r++) {
                    const [x, y] = init_graph[r];
                    debug_graph[Number(y)][Number(x)] = "#";
                }
                function foldOnY(foldY, inputGraph, debugGraph) {
                    for (let r = 0; r < inputGraph.length; r++) {
                        const [xstr, ystr] = inputGraph[r];
                        const x = Number(xstr);
                        const y = Number(ystr);
                        if (y > foldY) {
                            debugGraph[y][x] = ".";
                            const newYCoord = foldY * 2 - y;
                            inputGraph[r] = [xstr, newYCoord.toString()];
                            debugGraph[newYCoord][x] = "#";
                        }
                    }
                    let new_debug = [];
                    for (let i = 0; i < debugGraph.length; i++) {
                        if (i < foldY) {
                            console.log("row here", debugGraph[i]);
                            new_debug.push(debugGraph[i]);
                        }
                        else
                            continue;
                    }
                    debug_graph = [...new_debug];
                    return new_debug;
                }
                function foldOnX(foldX, inputGraph, debugGraph) {
                    for (let r = 0; r < inputGraph.length; r++) {
                        const [xstr, ystr] = inputGraph[r];
                        const x = Number(xstr);
                        const y = Number(ystr);
                        if (x > foldX) {
                            debugGraph[y][x] = ".";
                            const newXCoord = foldX * 2 - x;
                            inputGraph[r] = [newXCoord.toString(), ystr];
                            debugGraph[y][newXCoord] = "#";
                        }
                    }
                    const new_debug = [...debugGraph];
                    for (let r = 0; r < new_debug.length; r++) {
                        new_debug[r] = new_debug[r].slice(0, foldX);
                    }
                    debug_graph = [...new_debug];
                    return new_debug;
                }
                let answerGraph = [];
                for (let i = 0; i < folds.length; i++) {
                    switch (true) {
                        case /y/g.test(folds[i]):
                            {
                                const yFold = Number(folds[i].split("=")[1]);
                                answerGraph = foldOnY(yFold, init_graph, debug_graph);
                            }
                            break;
                        case /x/g.test(folds[i]):
                            {
                                const xFold = Number(folds[i].split("=")[1]);
                                answerGraph = foldOnX(xFold, init_graph, debug_graph);
                            }
                            break;
                    }
                }
                (0, utils_1.dumpFlashGraph)(answerGraph);
                resolve();
            }
            catch (error) {
                reject(error);
            }
        });
    });
})();
//# sourceMappingURL=d13p2.js.map