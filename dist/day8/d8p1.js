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
                const input = (0, utils_1.getSegmentInput)("../day8/input.txt");
                const theInput = input.map((str) => str.split(/\s\|\s/g)[1]);
                const INPUT_LENGTH = theInput.length;
                let comboMap = {};
                comboMap = ((cm) => {
                    let init = cm;
                    for (let i = 0; i < 10; i++) {
                        init = Object.assign(Object.assign({}, init), { [i]: 0 });
                    }
                    return init;
                })(comboMap);
                function countComboInRow(spi, cmRef, key) {
                    let num = 0;
                    switch (true) {
                        case key === 0 || key === 6 || key === 9:
                            {
                                if (cmRef[key] <= 0) {
                                    num = spi.filter((item) => item.length === 6).length;
                                }
                                else {
                                    num = cmRef[key] += spi.filter((item) => item.length === 6).length;
                                }
                            }
                            break;
                        case key === 2 || key === 3 || key === 5:
                            {
                                if (cmRef[key] <= 0) {
                                    num = spi.filter((item) => item.length === 5).length;
                                }
                                else {
                                    num = cmRef[key] += spi.filter((item) => item.length === 5).length;
                                }
                            }
                            break;
                        case key === 1:
                            {
                                if (cmRef[key] <= 0) {
                                    num = spi.filter((item) => item.length === 2).length;
                                }
                                else {
                                    num = cmRef[key] += spi.filter((item) => item.length === 2).length;
                                }
                            }
                            break;
                        case key === 4:
                            {
                                if (cmRef[key] <= 0) {
                                    num = spi.filter((item) => item.length === 4).length;
                                }
                                else {
                                    num = cmRef[key] += spi.filter((item) => item.length === 4).length;
                                }
                            }
                            break;
                        case key === 7:
                            {
                                if (cmRef[key] <= 0) {
                                    num = spi.filter((item) => item.length === 3).length;
                                }
                                else {
                                    num = cmRef[key] += spi.filter((item) => item.length === 3).length;
                                }
                            }
                            break;
                        case key === 8:
                            {
                                if (cmRef[key] <= 0) {
                                    num = spi.filter((item) => item.length === 7).length;
                                }
                                else {
                                    num = cmRef[key] += spi.filter((item) => item.length === 7).length;
                                }
                            }
                            break;
                        default:
                            break;
                    }
                    return num;
                }
                comboMap = ((cm) => {
                    let newCm = cm;
                    for (let i = 0; i < 10; i++) {
                        for (let j = 0; j < INPUT_LENGTH; j++) {
                            let splitInputRow = theInput[j].split(" ");
                            newCm = Object.assign(Object.assign({}, newCm), { [i]: countComboInRow(splitInputRow, newCm, i) });
                        }
                    }
                    return newCm;
                })(comboMap);
                console.log("new combomap", comboMap);
                function sumOccurances(cm) {
                    let sum = 0;
                    Object.keys(cm).forEach((key) => {
                        if (key === "1" || key === "4" || key === "7" || key === "8") {
                            sum += cm[key];
                        }
                    });
                    return sum;
                }
                console.log("answer", sumOccurances(comboMap));
                resolve();
            }
            catch (error) {
                reject(error);
            }
        });
    });
})();
//# sourceMappingURL=d8p1.js.map