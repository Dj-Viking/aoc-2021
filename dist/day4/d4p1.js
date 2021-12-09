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
            var _a;
            try {
                const sample = (0, utils_1.getInput)("../day4/sample.txt");
                let drawnNums = [];
                let boardMap = {};
                let boardNum = 0;
                let hitBoundary = 0;
                function getBoardNum(currIdx, currentBoardAmount) {
                    console.log("current board amount", currentBoardAmount);
                    if (currIdx >= 1 && currIdx <= 5) {
                        return 1;
                    }
                    else {
                        return 2;
                    }
                }
                drawnNums = (_a = sample
                    .shift()) === null || _a === void 0 ? void 0 : _a.split(",").map((str) => parseInt(str));
                for (let i = 0; i < sample.length; i++) {
                    console.log("sample here", sample[i], "curr idx", i, "curr idx mod 6", i % 6);
                    if (sample[i] === "") {
                        hitBoundary++;
                        console.log("hit boundary", hitBoundary);
                    }
                    if (sample[i] !== "") {
                        boardNum = 0;
                        boardNum = getBoardNum(i);
                        let boardAmount = Object.keys(boardMap).length;
                        if (boardAmount > 1 && hitBoundary > 2) {
                            boardNum = hitBoundary;
                        }
                        boardMap = Object.assign(Object.assign({}, boardMap), { [`board-${boardNum}`]: {
                                rows: !!boardMap[`board-${boardNum}`] &&
                                    !!boardMap[`board-${boardNum}`].rows
                                    ? [...boardMap[`board-${boardNum}`].rows, sample[i]]
                                    : [sample[i]],
                            } });
                    }
                }
                console.log(sample);
                console.log("board map", boardMap);
                resolve();
            }
            catch (error) {
                reject(error);
            }
        });
    });
})();
//# sourceMappingURL=d4p1.js.map