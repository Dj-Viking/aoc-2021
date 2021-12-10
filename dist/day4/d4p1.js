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
            var _a, _b;
            try {
                const sample = (0, utils_1.getInput)("../day4/sample.txt");
                let drawnNums = [];
                let boardMap = {};
                let boardNum = 0;
                let hitBoundary = 0;
                let xs = 0;
                function getBoardNum(currIdx) {
                    if (currIdx >= 1 && currIdx <= 5) {
                        return 1;
                    }
                    else {
                        return 2;
                    }
                }
                drawnNums = (_a = sample
                    .shift()) === null || _a === void 0 ? void 0 : _a.split(",").map((str) => parseInt(str));
                console.log("samples after shifting drawn nums out", sample);
                for (let i = 0; i < sample.length; i++) {
                    if (sample[i] === "")
                        hitBoundary++;
                    if (sample[i] !== "") {
                        boardNum = 0;
                        boardNum = getBoardNum(i);
                        if (Object.keys(boardMap).length > 1 && hitBoundary > 2)
                            boardNum = hitBoundary;
                        boardMap = Object.assign(Object.assign({}, boardMap), { [`board-${boardNum}`]: {
                                rows: !!boardMap[`board-${boardNum}`] && !!boardMap[`board-${boardNum}`].rows
                                    ? [...boardMap[`board-${boardNum}`].rows, sample[i]]
                                    : [sample[i]],
                            } });
                    }
                }
                console.log("board map", boardMap);
                console.log("amount of boards now", Object.keys(boardMap).length);
                for (let b = 0; b < Object.keys(boardMap).length; b++) {
                    boardMap = Object.assign(Object.assign({}, boardMap), { [`board-${b + 1}`]: {
                            rows: (_b = boardMap[`board-${b + 1}`].rows
                                .join(" ")
                                .match(/\d{1,2}/g)) === null || _b === void 0 ? void 0 : _b.map((str) => parseInt(str)).map((_, i, arr) => i % 5 === 1 ? [arr[i - 1], arr[i], arr[i + 1], arr[i + 2], arr[i + 3]] : void 0).filter((item) => item !== void 0),
                        } });
                }
                console.log("new board map", boardMap);
                console.log("new board row 1", boardMap["board-1"].rows);
                console.log("new board row 2", boardMap["board-2"].rows);
                console.log("new board row 3", boardMap["board-3"].rows);
                console.log("drawn nums", drawnNums);
                function boardEx(boardMap, drawn) {
                    for (let s = 0; s < Object.keys(boardMap).length; s++) {
                        for (let r = 0; r < boardMap[`board-${s + 1}`].rows.length; r++) {
                            for (let n = 0; n < boardMap[`board-${s + 1}`].rows[r].length; n++) {
                                if (boardMap[`board-${s + 1}`].rows[r][n] === drawn) {
                                    boardMap[`board-${s + 1}`].rows[r][n] = "yo";
                                }
                            }
                        }
                    }
                }
                for (const draw of drawnNums) {
                    boardEx(boardMap, draw);
                }
                console.log("x board 1", boardMap["board-1"].rows);
                console.log("x board 2", boardMap["board-2"].rows);
                console.log("x board 3", boardMap["board-3"].rows);
                resolve();
            }
            catch (error) {
                reject(error);
            }
        });
    });
})();
//# sourceMappingURL=d4p1.js.map