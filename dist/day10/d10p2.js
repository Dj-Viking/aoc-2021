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
                const incompleteChunks = theInput.filter((item) => {
                    return !(0, utils_1.checkCorrupt)(item).corrupt;
                });
                let stack = new utils_1.Stack();
                const matching = {
                    "(": ")",
                    "[": "]",
                    "{": "}",
                    "<": ">",
                };
                const tokenScore = {
                    ")": 1,
                    "]": 2,
                    "}": 3,
                    ">": 4,
                };
                let remainingCharSet = new Map();
                function getMedian(arr) {
                    let result = 0;
                    let a = [];
                    arr = arr.sort((a, b) => a - b);
                    if (arr.length % 2 === 0) {
                        a = new Array(2);
                        a[0] = arr[arr.length / 2 - 1];
                        a[1] = arr[arr.length / 2];
                        result = Math.floor((a[0] + a[1]) / 2);
                    }
                    else {
                        a = new Array(1);
                        a[0] = arr[arr.length / 2 - 0.5];
                        result = a[0];
                    }
                    return result;
                }
                function calcCharset(charset) {
                    let charSums = [];
                    for (let s = 0; s < charset.length; s++) {
                        let setVal = 0;
                        for (let c = 0; c < charset[s].length; c++) {
                            setVal *= 5;
                            setVal += tokenScore[charset[s][c]];
                        }
                        charSums.push(setVal);
                    }
                    charSums = charSums.sort((a, b) => a - b);
                    const median = getMedian(charSums);
                    return median;
                }
                function switchMatchingChar(rCharset) {
                    let theMap = rCharset;
                    let switched = [];
                    const MAP_SIZE = theMap.size;
                    const vIterator = theMap.values();
                    for (let i = 0; i < MAP_SIZE; i++) {
                        switched.push(vIterator.next().value);
                    }
                    switched = switched.map((str) => {
                        let switchedStr = "";
                        for (let c = 0; c < str.length; c++) {
                            switchedStr += str[c].replace(str[c], matching[str[c]]);
                        }
                        switchedStr = switchedStr.split("").reverse().join("");
                        return switchedStr;
                    });
                    return switched;
                }
                function createCompletionCharset(incColl) {
                    let charset = 0;
                    for (let s = 0; s < incColl.length; s++) {
                        charset = s;
                        stack = new utils_1.Stack();
                        for (let c = 0; c < incColl[s].length; c++) {
                            if (incColl[s][c] === "(" ||
                                incColl[s][c] === "{" ||
                                incColl[s][c] === "[" ||
                                incColl[s][c] === "<") {
                                stack.push(incColl[s][c]);
                            }
                            if (incColl[s][c] === ")" ||
                                incColl[s][c] === "}" ||
                                incColl[s][c] === "]" ||
                                incColl[s][c] === ">") {
                                if (matching[stack.peek()] === incColl[s][c]) {
                                    stack.pop();
                                }
                            }
                        }
                        remainingCharSet.set(charset, stack.storage.join(""));
                    }
                    return remainingCharSet;
                }
                remainingCharSet = createCompletionCharset(incompleteChunks);
                const switched = switchMatchingChar(remainingCharSet);
                const answer = calcCharset(switched);
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
//# sourceMappingURL=d10p2.js.map