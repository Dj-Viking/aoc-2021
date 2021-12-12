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
                const splitInput = (0, utils_1.getInput)("../day5/input.txt");
                const coords = splitInput;
                console.log("coordinates inputs", coords.length);
                const newGraph = [...new Array(coords.length * 2)].map(() => new Array(coords.length * 2).fill(0));
                const graph = newGraph;
                console.log("graph length", graph.length);
                function drawVertLine(x, y1, y2) {
                    let y;
                    const ys = [y1, y2].sort((a, b) => a - b);
                    for (y = ys[0]; y <= ys[1]; y++) {
                        graph[y][x]++;
                    }
                }
                function drawHorizLine(y, x1, x2) {
                    let x;
                    const xs = [x1, x2].sort((a, b) => a - b);
                    for (x = xs[0]; x <= xs[1]; x++) {
                        graph[y][x]++;
                    }
                }
                for (let row = 0; row < coords.length; row++) {
                    let x1 = (0, utils_1.getX1)(coords, row);
                    let x2 = (0, utils_1.getX2)(coords, row);
                    let y1 = (0, utils_1.getY1)(coords, row);
                    let y2 = (0, utils_1.getY2)(coords, row);
                    if (x1 === x2) {
                        drawVertLine(x1, y1, y2);
                    }
                    if (y1 === y2) {
                        drawHorizLine(y1, x1, x2);
                    }
                }
                let answer = 0;
                for (let y = 0; y < graph.length; y++) {
                    for (let x = 0; x < graph.length; x++) {
                        if (graph[y][x] > 1) {
                            answer++;
                        }
                    }
                }
                console.log("answer", answer);
                resolve();
            }
            catch (error) {
                reject(error);
            }
        });
    });
})();
//# sourceMappingURL=d5p1.js.map