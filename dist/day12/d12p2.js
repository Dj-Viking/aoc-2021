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
                let theInput = (0, utils_1.getInput)("../day12/input.txt");
                const cavesSet = new Set();
                const cs = new utils_1.CaveSystemTwo();
                const routes = theInput.map((str) => {
                    return str.split("-");
                });
                for (let i = 0; i < routes.flat().length; i++)
                    cavesSet.add(routes.flat()[i]);
                const caves = Array.from(cavesSet);
                for (let c = 0; c < caves.length; c++) {
                    cs.addCave(caves[c]);
                }
                for (let r = 0; r < routes.length; r++) {
                    cs.addRoute(...routes[r]);
                }
                cs.findPaths(cs.adjacent, "start", "end");
                console.log("answer", cs.paths.length);
                resolve();
            }
            catch (error) {
                console.error(error);
                reject(error);
            }
        });
    });
})();
//# sourceMappingURL=d12p2.js.map