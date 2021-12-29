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
                let theInput = (0, utils_1.getInput)("../day10/input.txt");
                const corruptChunks = [];
                const illegalCharsFound = [];
                const charScore = [];
                const tokenScore = {
                    ")": 3,
                    "]": 57,
                    "}": 1197,
                    ">": 25137,
                };
                function calcChars(chars) {
                    let result = 0;
                    for (let i = 0; i < chars.length; i++) {
                        let charVal = 0;
                        Object.keys(tokenScore).forEach((key) => {
                            if (chars[i] === key) {
                                charVal = tokenScore[key];
                            }
                        });
                        charScore.push(charVal);
                    }
                    result = charScore.reduce((curr, next) => curr + next, 0);
                    return result;
                }
                for (let i = 0; i < theInput.length; i++) {
                    const result = (0, utils_1.checkCorrupt)(theInput[i]);
                    if (result.corrupt) {
                        corruptChunks.push(theInput[i]);
                        illegalCharsFound.push(result.illegalChar);
                    }
                }
                const result = calcChars(illegalCharsFound);
                console.log("answer", result);
                resolve();
            }
            catch (error) {
                console.error(error);
                reject(error);
            }
        });
    });
})();
//# sourceMappingURL=d10p1.js.map