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
                const splitInput = (0, utils_1.getInput)("../day2/input.txt");
                let aim = 0;
                let hPos = 0;
                let forward = 0;
                let vPos = 0;
                let word = "";
                let num = 0;
                for (let i = 0; i < splitInput.length; i++) {
                    word = splitInput[i].split(" ")[0];
                    num = Number(splitInput[i].split(" ")[1]);
                    forward = 0;
                    switch (true) {
                        case /forward/g.test(word):
                            {
                                forward = num;
                                hPos += num;
                                if (aim === 0)
                                    continue;
                                if (aim > 0) {
                                    vPos += forward * aim;
                                }
                            }
                            break;
                        case /up/g.test(word):
                            aim -= num;
                            break;
                        case /down/g.test(word):
                            aim += num;
                            break;
                        default:
                            break;
                    }
                }
                console.log(hPos * vPos);
                resolve();
            }
            catch (error) {
                reject(error);
            }
        });
    });
})();
//# sourceMappingURL=d2p2.js.map