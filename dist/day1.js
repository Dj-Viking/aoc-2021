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
let increaseAmount = 0;
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let inputDir = [];
            fs_1.default.readdir("../day1", (error, files) => {
                if (error)
                    reject(error);
                inputDir = files;
                const inputVal = fs_1.default.readFileSync(`../day1/${inputDir[1]}`, { encoding: "utf-8" });
                const splitInput = inputVal.split("\n");
                let current = 0;
                let prev = void 0;
                for (let i = 1; i < splitInput.length; i++) {
                    prev = Number(splitInput[i - 1]);
                    current = Number(splitInput[i]);
                    if (current > prev)
                        increaseAmount++;
                }
                console.log(increaseAmount);
            });
            resolve();
        });
    });
})();
//# sourceMappingURL=day1.js.map