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
                const sample = (0, utils_1.getSegmentInput)("../day8/sample.txt");
                const theInput = sample.map((str) => str.split(/\s\|\s/g)[1]);
                console.log("the input\n", theInput);
                let comboMap = {};
                comboMap = ((cm) => {
                    let init = cm;
                    for (let i = 0; i < theInput.length; i++) {
                        init = Object.assign(Object.assign({}, init), { [i]: 0 });
                    }
                    return init;
                })(comboMap);
                function createSegmentNum(spi) {
                    let segsstr = "";
                    for (let n = 0; n < spi.length; n++) {
                        segsstr += spi[n] + " ";
                    }
                    return segsstr.trim();
                }
                function parseSegments(segsstr) {
                    let segstr = "";
                    let sSplit = segsstr.split(" ");
                    sSplit = sSplit.map((str) => {
                        return str.split("").sort().join("");
                    });
                    console.log("what is ssplit here", sSplit.map((str) => {
                        return str.split("").sort().join("");
                    }));
                    for (let s = 0; s < sSplit.length; s++) {
                        if (sSplit[s].length === 6) {
                            if (/^abcdeg$/g.test(sSplit[s])) {
                                segstr += "0";
                                continue;
                            }
                            if (/^abcefg$|^acdefg$/g.test(sSplit[s])) {
                                segstr += "6";
                                continue;
                            }
                            if (/^abcdef$|^abcdfg$|^bcdefg$/g.test(sSplit[s])) {
                                segstr += "9";
                                continue;
                            }
                        }
                        if (sSplit[s].length === 5) {
                            if (/^abegf$|^abcdg$/g.test(sSplit[s])) {
                                console.log("shoudl not be here on first iteration", sSplit[s]);
                                segstr += "2";
                                continue;
                            }
                            if (/^abcfg$|^abcde$|^abefg$/g.test(sSplit[s])) {
                                segstr += "3";
                                continue;
                            }
                            if (/^bcdef$|^abceg$|^bcefg$|^bcdef$/g.test(sSplit[s])) {
                                segstr += "5";
                                continue;
                            }
                        }
                        if (sSplit[s].length === 2) {
                            segstr += "1";
                        }
                        if (sSplit[s].length === 4) {
                            segstr += "4";
                        }
                        if (sSplit[s].length === 3) {
                            segstr += "7";
                        }
                        if (sSplit[s].length === 7) {
                            segstr += "8";
                        }
                    }
                    console.log("segstr", segstr);
                    return parseInt(segstr);
                }
                comboMap = ((cm) => {
                    let newCm = cm;
                    for (let i = 0; i < theInput.length; i++) {
                        for (let j = 0; j < theInput.length; j++) {
                            let splitInputRow = theInput[i].split(" ");
                            newCm = Object.assign(Object.assign({}, newCm), { [i]: parseSegments(createSegmentNum(splitInputRow)) });
                        }
                    }
                    return newCm;
                })(comboMap);
                console.log("new combomap", comboMap);
                function sumDecoded(cm) {
                    let sum = 0;
                    Object.keys(cm).forEach((key) => {
                        sum += cm[key];
                    });
                    return sum;
                }
                console.log("answer", sumDecoded(comboMap));
                resolve();
            }
            catch (error) {
                reject(error);
            }
        });
    });
})();
//# sourceMappingURL=d8p2.js.map