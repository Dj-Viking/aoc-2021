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
                const sample = (0, utils_1.getInput)("../day5/sample.txt");
                const theInput = sample;
                console.log("the input", theInput);
                const graph = new Array(theInput.length).fill("0"
                    .repeat(10)
                    .split("")
                    .map((str) => parseInt(str)));
                function dumpBoard() {
                    console.log("dumping board");
                    let x, y;
                    let str = "";
                    for (y = 0; y < graph.length; y++) {
                        for (x = 0; x < graph.length; x++) {
                            str += graph[y][x].toString() + " ";
                        }
                        console.log(str);
                        str = "";
                    }
                }
                console.log("coordinates");
                for (let row = 0; row < theInput.length; row++) {
                    let x1 = (0, utils_1.getX1)(theInput, row);
                    let x2 = (0, utils_1.getX2)(theInput, row);
                    let y1 = (0, utils_1.getY1)(theInput, row);
                    let y2 = (0, utils_1.getY2)(theInput, row);
                    console.log("x1 =", x1, "x2 =", x2, "y1 =", y1, "y2 =", y2);
                    if (x1 === x2) {
                        graph[y1][x1]++;
                        graph[y2][x1]++;
                    }
                }
                dumpBoard();
                resolve();
            }
            catch (error) {
                reject(error);
            }
        });
    });
})();
//# sourceMappingURL=d5p1.js.map