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
                let theInput = (0, utils_1.getInput)("../day11/input.txt");
                let graph = theInput.map((row) => {
                    return row.split("").map((str) => parseInt(str));
                });
                function flash(startR, startC, graph) {
                    if (graph[startR][startC] !== 10)
                        return 0;
                    let count = 1;
                    const adjOctos = (0, utils_1.getAdjOctos)(startR, startC, graph);
                    for (const [row, col] of adjOctos.get(graph[startR][startC])) {
                        if (graph[row][col] <= 9) {
                            graph[row][col]++;
                            count += flash(row, col, graph);
                        }
                    }
                    graph[startR][startC] = 11;
                    return count;
                }
                let flashes = 0;
                for (let step = 0; step < 100; step++) {
                    for (let r = 0; r < graph.length; r++) {
                        for (let c = 0; c < graph[r].length; c++) {
                            graph[r][c]++;
                        }
                    }
                    for (let r = 0; r < graph.length; r++) {
                        for (let c = 0; c < graph[r].length; c++) {
                            flashes += flash(r, c, graph);
                        }
                    }
                    for (let r = 0; r < graph.length; r++) {
                        for (let c = 0; c < graph[r].length; c++) {
                            graph[r][c] > 9 ? (graph[r][c] = 0) : void 0;
                        }
                    }
                }
                console.log("flashes", flashes);
                resolve();
            }
            catch (error) {
                console.error(error);
                reject(error);
            }
        });
    });
})();
//# sourceMappingURL=d11p1.js.map