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
                console.log("theInput", theInput);
                let fishTable = {};
                let prevTable = {};
                let fishDays = [];
                fishDays = theInput.map((str) => parseInt(str));
                console.log("starting fish days'", fishDays);
                function dumpTable(table) {
                    for (let i = 0; i < Object.keys(table).length; i++) {
                        console.log(`${i}: `, table[i]);
                    }
                }
                function copyToPrev() {
                    return __awaiter(this, void 0, void 0, function* () {
                        return new Promise((resolve) => {
                            prevTable = fishTable;
                            resolve();
                        });
                    });
                }
                function zeroTable() {
                    for (let i = 0; i < 9; i++) {
                        fishTable = Object.assign(Object.assign({}, fishTable), { [i]: 0 });
                    }
                }
                function advanceTable() {
                    for (let d = 0; d < fishDays.length; d++) {
                        for (const key in fishTable) {
                            if (key === fishDays[d].toString()) {
                                fishTable[key]++;
                            }
                        }
                    }
                }
                function nextDay() {
                    return __awaiter(this, void 0, void 0, function* () {
                        console.log("fish days before changing", fishDays);
                        for (let f = 0; f < fishDays.length; f++) {
                            fishDays[f]--;
                        }
                        copyToPrev();
                        console.log("previous table");
                        dumpTable(prevTable);
                        zeroTable();
                        advanceTable();
                    });
                }
                zeroTable();
                advanceTable();
                console.log("init table");
                dumpTable(fishTable);
                nextDay();
                console.log("next day table");
                dumpTable(fishTable);
                nextDay();
                console.log("next day table");
                dumpTable(fishTable);
                resolve();
            }
            catch (error) {
                reject(error);
            }
        }));
    });
})();
//# sourceMappingURL=d6p1.js.map