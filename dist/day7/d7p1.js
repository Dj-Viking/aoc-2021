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
console.time("main finished in");
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            try {
                const crabInput = (0, utils_1.getCrabInput)("../day7/input.txt");
                const theInput = crabInput;
                const INPUT_LENGTH = theInput.length;
                const UPPER_BOUND = 2000;
                const MIN = theInput[0];
                const MAX = theInput[INPUT_LENGTH - 1];
                let crabTable = {};
                function fuelCount(align) {
                    let res = 0;
                    for (let i = 0; i < UPPER_BOUND; i++) {
                        res += Math.abs(align - i) * crabTable[i];
                    }
                    return res;
                }
                crabTable = ((ct) => {
                    let table = ct;
                    for (let i = 0; i < UPPER_BOUND; i++) {
                        table = Object.assign(Object.assign({}, table), { [i]: theInput.filter((item) => item === i).length > 0
                                ? theInput.filter((item) => item === i).length
                                : 0 });
                    }
                    return table;
                })(crabTable);
                function Main() {
                    let result = Number.MAX_SAFE_INTEGER;
                    for (let i = MIN; i <= MAX; i++) {
                        if (crabTable[i] > 0) {
                            result = Math.min(result, fuelCount(i));
                        }
                    }
                    console.log("answer", result);
                }
                console.time("internal main");
                Main();
                console.timeEnd("internal main");
                resolve();
            }
            catch (error) {
                reject(error);
            }
        });
    });
})();
console.timeEnd("main finished in");
//# sourceMappingURL=d7p1.js.map