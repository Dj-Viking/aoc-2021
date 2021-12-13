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
                const lanternInput = (0, utils_1.getLanternInput)("../day6/input.txt")
                    .map((str) => parseInt(str))
                    .sort((a, b) => a - b);
                const theInput = lanternInput;
                let fishTable = {};
                const TABLE_SIZE = 9;
                const DAYS = 256;
                function initTable(ft) {
                    let table = ft;
                    for (let i = 0; i < TABLE_SIZE; i++) {
                        table = Object.assign(Object.assign({}, table), { [i]: theInput.filter((item) => item === i).length > 0
                                ? theInput.filter((item) => item === i).length
                                : 0 });
                    }
                    return table;
                }
                function nextDay() {
                    console.time("shift fish days");
                    let birthFactor = fishTable[0];
                    fishTable[0] = 0;
                    for (let k = 1; k < TABLE_SIZE; k++) {
                        fishTable[k - 1] += fishTable[k];
                        fishTable[k] = 0;
                    }
                    fishTable[8] = birthFactor;
                    fishTable[6] += birthFactor;
                    console.timeEnd("shift fish days");
                }
                fishTable = initTable(fishTable);
                console.log("init table", fishTable);
                for (let day = 0; day < DAYS; day++) {
                    console.log("calculating fishes....please stand by...day: ", day + 1);
                    nextDay();
                    console.log("fish map", fishTable, "day", day + 1);
                }
                console.log("answer", sumFishes(fishTable));
                function sumFishes(table) {
                    return Object.keys(table)
                        .map((key) => {
                        return table[key];
                    })
                        .reduce((total, curr) => total + curr, 0);
                }
                resolve();
            }
            catch (error) {
                reject(error);
            }
        }));
    });
})();
//# sourceMappingURL=d6p2.js.map