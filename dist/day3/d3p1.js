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
const getInput_1 = require("../utils/getInput");
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            try {
                const splitInput = (0, getInput_1.getInput)("../day3/input.txt");
                let bitAcc = [];
                let gammaAcc = [];
                let epsAcc = [];
                let gammaRate = 0;
                let epsRate = 0;
                let zeroAmount = 0;
                let oneAmount = 0;
                for (let k = 0; k < 12; k++) {
                    zeroAmount = 0;
                    oneAmount = 0;
                    bitAcc = splitInput.map((_, idx, arr) => {
                        return arr[idx][k].split("").shift();
                    });
                    console.log("bit acc should be new on each iteration", bitAcc);
                    for (const bit of bitAcc) {
                        if (bit === "0")
                            zeroAmount++;
                        else
                            oneAmount++;
                    }
                    console.log("iteration number", k + 1);
                    console.log("zero amount", zeroAmount);
                    console.log("one amount", oneAmount);
                    if (zeroAmount > oneAmount) {
                        gammaAcc.push("0");
                        epsAcc.push("1");
                    }
                    else {
                        gammaAcc.push("1");
                        epsAcc.push("0");
                    }
                }
                gammaRate = parseInt(gammaAcc.join(''), 2);
                epsRate = parseInt(epsAcc.join(''), 2);
                console.log("bit accumulator", bitAcc);
                console.log("gamma accumulator", gammaAcc);
                console.log("eps accumulator", epsAcc);
                console.log("gamma rate", gammaRate);
                console.log("eps rate", epsRate);
                console.log(gammaRate * epsRate);
                resolve();
            }
            catch (error) {
                reject(error);
            }
        });
    });
})();
//# sourceMappingURL=d3p1.js.map