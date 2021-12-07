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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            try {
                const inputVal = fs_1.default.readFileSync(`../day2/input.txt`, { encoding: "utf-8" });
                const splitInput = inputVal.split("\n");
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
                                    vPos += (forward * aim);
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