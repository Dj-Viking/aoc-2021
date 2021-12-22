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
const getInput_1 = require("../utils/getInput");
const utils_1 = require("../utils");
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            try {
                let theInput = (0, getInput_1.getInput)("../day9/input.txt").map((str) => {
                    return str.split("");
                });
                function isEdge(graph, row, col) {
                    switch (true) {
                        case (col === 0 || col === graph[row].length - 1) &&
                            (row === 0 || row === graph.length - 1):
                            return { isEdge: true, type: "corner" };
                        case (col === 0 || col === graph[row].length - 1) &&
                            (row > 0 || row === graph.length - 2):
                            return { isEdge: true, type: "side" };
                        case (row === 0 || row === graph.length - 1) && (col > 0 || col < graph[row].length - 1):
                            return { isEdge: true, type: "top-bottom" };
                    }
                    return { isEdge: false, type: void 0 };
                }
                function sumRiskLevel(nums) {
                    let result = 0;
                    result = nums.map((num) => num + 1).reduce((curr, next) => curr + next, 0);
                    return result;
                }
                function extractLowPoints(graph) {
                    const nums = [];
                    for (let r = 0; r < graph.length; r++) {
                        for (let c = 0; c < graph[r].length; c++) {
                            if (/\[/g.test(graph[r][c])) {
                                let str = graph[r][c].replace(/\[|\]/g, "");
                                nums.push(parseInt(str));
                            }
                        }
                    }
                    return nums;
                }
                function findLowPoints(graph) {
                    let theGraph = graph;
                    for (let r = 0; r < theGraph.length; r++) {
                        for (let c = 0; c < theGraph[r].length; c++) {
                            const edge = isEdge(theGraph, r, c);
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
                const nums = extractLowPoints(theInput);
                const answer = sumRiskLevel(nums);
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
//# sourceMappingURL=d9p1.js.map