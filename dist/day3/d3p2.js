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
                function recurseOxy(list, step = 0) {
                    let count = 0;
                    for (let i = 0; i < list.length; i++) {
                        if (parseInt(list[i][step]) === 1)
                            count++;
                    }
                    let k = 1;
                    if (count < list.length / 2)
                        k = 0;
                    let subOxy = [];
                    for (let j = 0; j < list.length; j++) {
                        if (parseInt(list[j][step]) === k)
                            subOxy.push(list[j]);
                    }
                    if (subOxy.length > 1 && step < subOxy[0].length)
                        return recurseOxy(subOxy, step + 1);
                    else
                        return subOxy[0];
                }
                recurseOxy(splitInput);
                function recurseCo2(list, step = 0) {
                    let count = 0;
                    for (let i = 0; i < list.length; i++) {
                        if (parseInt(list[i][step]) === 1)
                            count++;
                    }
                    let k = 0;
                    if (count < list.length / 2)
                        k = 1;
                    let subOxy = [];
                    for (let j = 0; j < list.length; j++) {
                        if (parseInt(list[j][step]) === k)
                            subOxy.push(list[j]);
                    }
                    if (subOxy.length > 1 && step < subOxy[0].length)
                        return recurseCo2(subOxy, step + 1);
                    else
                        return subOxy[0];
                }
                recurseOxy(splitInput);
                console.log("oxy acc", recurseOxy(splitInput));
                console.log("co2 acc", recurseCo2(splitInput));
                console.log(parseInt(recurseOxy(splitInput), 2) *
                    parseInt(recurseCo2(splitInput), 2));
                resolve();
            }
            catch (error) {
                reject(error);
            }
        });
    });
})();
//# sourceMappingURL=d3p2.js.map