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
                let newRows = [];
                let matchedNums = [];
                let newRowsMatrix = [];
                let boardMap = {};
                let boardNum = 0;
                let hitBoundary = 0;
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
                newRows = sample.filter((str) => str.length > 0);
                matchedNums = (_b = newRows
                    .join(" ")
                    .match(/\d{1,2}/g)) === null || _b === void 0 ? void 0 : _b.map((str) => parseInt(str));
                for (let j = 0; j < matchedNums.length; j++) {
                    if (j % 5 === 1) {
                        newRowsMatrix.push([
                            matchedNums[j - 1],
                            matchedNums[j],
                            matchedNums[j + 1],
                            matchedNums[j + 2],
                            matchedNums[j + 3],
                        ]);
                    }
                }
                console.log("new rows", newRows);
                console.log("matched nums", matchedNums);
                console.log("newrows matrix", newRowsMatrix);
                for (let i = 0; i < sample.length; i++) {
                    if (sample[i] === "")
                        hitBoundary++;
                    if (sample[i] !== "") {
                        boardNum = 0;
                        boardNum = getBoardNum(i);
                        if (Object.keys(boardMap).length > 1 && hitBoundary > 2)
                            boardNum = hitBoundary;
                        boardMap = Object.assign(Object.assign({}, boardMap), { [`board-${boardNum}`]: {
                                rows: !!boardMap[`board-${boardNum}`] &&
                                    !!boardMap[`board-${boardNum}`].rows
                                    ? [
                                        ...boardMap[`board-${boardNum}`].rows,
                                        sample[i],
                                    ]
                                    : [sample[i]],
                            } });
                    }
                }
                console.log("board map", boardMap);
                console.log("amount of boards now", Object.keys(boardMap).length);
                Object.keys(boardMap).forEach((board, idx) => {
                    var _a;
                    if (board === `board-${idx + 1}`) {
                        boardMap = Object.assign(Object.assign({}, boardMap), { [board]: {
                                rows: (_a = boardMap[board].rows
                                    .join(" ")
                                    .match(/\d{1,2}/g)) === null || _a === void 0 ? void 0 : _a.map((str) => parseInt(str)),
                            } });
                    }
                });
                console.log("new board map", boardMap);
                for (let b = 0; b < Object.keys(boardMap).length; b++) {
                    boardMap = Object.assign(Object.assign({}, boardMap), { [`board-${b + 1}`]: {
                            rows: boardMap[`board-${b + 1}`].rows
                                .map((_, idx, arr) => {
                                if (idx % 5 === 1) {
                                    return [
                                        arr[idx - 1],
                                        arr[idx],
                                        arr[idx + 1],
                                        arr[idx + 2],
                                        arr[idx + 3],
                                    ];
                                }
                                else
                                    return void 0;
                            })
                                .filter((item) => item !== void 0),
                        } });
                }
                console.log("new board row 1", boardMap["board-1"].rows);
                console.log("new board row 2", boardMap["board-2"].rows);
                console.log("new board row 3", boardMap["board-3"].rows);
                resolve();
            }
            catch (error) {
                reject(error);
            }
        });
    });
})();
//# sourceMappingURL=d4p1.js.map