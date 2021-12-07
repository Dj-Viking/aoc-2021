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
const getInput_1 = require("utils/getInput");
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            try {
                const splitInput = (0, getInput_1.getInput)("../day1/input.txt");
                let increased = 0;
                let currentSum = 0;
                let prevSum = 0;
                let currentWindow = [];
                let prevWindow = [];
                for (let i = 0; i < splitInput.length; i++) {
                    currentWindow = [];
                    currentSum = 0;
                    prevWindow = [];
                    prevSum = 0;
                    currentWindow.push(Number(!!splitInput[i + 3] ? splitInput[i + 3] : 0), Number(!!splitInput[i + 2] ? splitInput[i + 2] : 0), Number(!!splitInput[i + 1] ? splitInput[i + 1] : 0));
                    currentSum = currentWindow.reduce((total, nextNum) => total + nextNum, 0);
                    prevWindow.push(Number(!!splitInput[i + 2] ? splitInput[i + 2] : 0), Number(!!splitInput[i + 1] ? splitInput[i + 1] : 0), Number(!!splitInput[i] ? splitInput[i] : 0));
                    prevSum = prevWindow.reduce((total, nextNum) => total + nextNum, 0);
                    if ((currentSum - prevSum) > 0)
                        increased++;
                }
                console.log(increased);
                resolve();
            }
            catch (error) {
                reject(error);
            }
        });
    });
})();
//# sourceMappingURL=d1p2.js.map