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
                const foldY = Number(folds[0].split("=")[1]);
                const foldX = Number(folds[1].split("=")[1]);
                const init_graph = Array.from(dots, (coord) => coord.split(","));
                const flat_graph = init_graph.flat(1).map((str) => Number(str));
                const MAX_GRAPH_SIZE = Math.max(...flat_graph);
                const debug_graph = [...new Array(MAX_GRAPH_SIZE + 1)].map(() => {
                    return new Array(MAX_GRAPH_SIZE + 1).fill(".");
                });
                for (let r = 0; r < init_graph.length; r++) {
                    const [x, y] = init_graph[r];
                    debug_graph[Number(y)][Number(x)] = "#";
                }
                function foldOnY(foldNum) {
                    for (let r = 0; r < init_graph.length; r++) {
                        const [xstr, ystr] = init_graph[r];
                        const x = Number(xstr);
                        const y = Number(ystr);
                        if (y > foldNum) {
                            debug_graph[y][x] = ".";
                            const newYCoord = foldNum * 2 - y;
                            init_graph[r] = [xstr, newYCoord.toString()];
                            debug_graph[newYCoord][x] = "#";
                        }
                    }
                }
                function dotsVisibleAfterFirstFold(graph) {
                    let result = 0;
                    for (let r = 0; r < graph.length; r++) {
                        for (let c = 0; c < graph[r].length; c++) {
                            if (graph[r][c] === "#")
                                result++;
                        }
                    }
                    return result;
                }
                foldOnY(foldY);
                const answer = dotsVisibleAfterFirstFold(debug_graph);
                console.log("answer", answer);
                console.log("\nafter y fold");
                function foldOnX(foldNum) {
                    for (let r = 0; r < init_graph.length; r++) {
                        const [xstr, ystr] = init_graph[r];
                        const x = Number(xstr);
                        const y = Number(ystr);
                        if (x > foldNum && y < foldY) {
                            debug_graph[y][x] = ".";
                            const newXCoord = foldNum * 2 - x;
                            debug_graph[y][newXCoord] = "#";
                        }
                    }
                }
                foldOnX(foldX);
                console.log("\n after x fold");
                const new_debug = debug_graph.slice(0, 7);
                console.log("\n sliced debug");
                for (let r = 0; r < new_debug.length; r++) {
                    new_debug[r] = new_debug[r].slice(0, 5);
                }
                resolve();
            }
            catch (error) {
                reject(error);
            }
        });
    });
})();
//# sourceMappingURL=d13p1.js.map