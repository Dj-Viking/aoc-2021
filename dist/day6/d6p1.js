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
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const lanternInput = (0, utils_1.getLanternInput)("../day6/sample.txt");
                const theInput = lanternInput;
                let fishTable = {};
                const fishTableKeysLength = 9;
                let prevTable = {};
                let fishDays = [];
                fishDays = theInput.map((str) => parseInt(str));
                function copyToPrev() {
                    prevTable = fishTable;
                }
                function zeroTable() {
                    for (let i = 0; i < 9; i++) {
                        fishTable = Object.assign(Object.assign({}, fishTable), { [i]: 0 });
                    }
                }
                function advanceTable() {
                    let d = 0;
                    do {
                        for (let k = 0; k < fishTableKeysLength; k++) {
                            if (k === fishDays[d]) {
                                fishTable[k.toString()]++;
                            }
                        }
                        d++;
                    } while (d < fishDays.length);
                }
                function nextDay() {
                    for (let f = 0; f < fishDays.length; f++) {
                        fishDays[f]--;
                    }
                    copyToPrev();
                    zeroTable();
                    advanceTable();
                    if (prevTable["0"] > 0) {
                        for (let f = 0; f < prevTable["0"]; f++) {
                            fishTable["8"]++;
                            fishTable["6"]++;
                            fishDays.push(8, 6);
                        }
                    }
                }
                zeroTable();
                advanceTable();
                for (let day = 0; day < 80; day++) {
                    console.log("calculating fishes....please stand by...day: ", day + 1);
                    nextDay();
                }
                console.log("answer", sumFishes(fishTable));
                function sumFishes(table) {
                    return Object.keys(table)
                        .map((key) => {
                        return table[key];
                    })
                        .reduce((prev, curr) => prev + curr, 0);
                }
                resolve();
            }
            catch (error) {
                reject(error);
            }
        }));
    });
})();
//# sourceMappingURL=d6p1.js.map