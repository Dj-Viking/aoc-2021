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
                const splitInput = (0, utils_1.getInput)("../day4/input.txt");
                const theInput = splitInput;
                let drawnNums = [];
                let boardMap = {};
                const winningBoards = new Set();
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
                function getEntireColumn(matrix, col) {
                    const column = [];
                    for (let i = 0; i < matrix.length; i++) {
                        column.push(matrix[i][col]);
                    }
                    return column;
                }
                function getColNum(matrix, drawn) {
                    let column = 0;
                    row: for (let r = 0; r < matrix.length; r++) {
                        for (let n = 0; n < matrix[r].length; n++) {
                            if (matrix[r][n] === drawn) {
                                column = n;
                                break row;
                            }
                        }
                    }
                    return column;
                }
                drawnNums = (_a = theInput
                    .shift()) === null || _a === void 0 ? void 0 : _a.split(",").map((str) => parseInt(str));
                for (let i = 0; i < theInput.length; i++) {
                    if (theInput[i] === "")
                        hitBoundary++;
                    if (theInput[i] !== "") {
                        boardNum = 0;
                        boardNum = getBoardNum(i);
                        if (Object.keys(boardMap).length > 1 && hitBoundary > 2)
                            boardNum = hitBoundary;
                        boardMap = Object.assign(Object.assign({}, boardMap), { [`board-${boardNum}`]: {
                                rows: !!boardMap[`board-${boardNum}`] && !!boardMap[`board-${boardNum}`].rows
                                    ? [...boardMap[`board-${boardNum}`].rows, theInput[i]]
                                    : [theInput[i]],
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
                console.log("drawn nums", drawnNums);
                function boardEx() {
                    for (const drawn of drawnNums) {
                        console.log("drawn", drawn);
                        for (let b = 0; b < Object.keys(boardMap).length; b++) {
                            for (let r = 0; r < boardMap[`board-${b + 1}`].rows.length; r++) {
                                for (let n = 0; n < boardMap[`board-${b + 1}`].rows[r].length; n++) {
                                    if (boardMap[`board-${b + 1}`].rows[r][n] === drawn) {
                                        let col = getColNum(boardMap[`board-${b + 1}`].rows, drawn);
                                        console.log("column that the drawn number is in", col);
                                        boardMap[`board-${b + 1}`].rows[r][n] = "x";
                                        const rowExs = boardMap[`board-${b + 1}`].rows[r].filter((slot) => slot === "x");
                                        const columnExs = getEntireColumn(boardMap[`board-${b + 1}`].rows, col).filter((slot) => slot === "x");
                                        console.log("got column", columnExs);
                                        console.log("rows exes", rowExs.length, rowExs, "row", r + 1, "board", b + 1);
                                        console.log("what is board here before checking exes", "board", b + 1, boardMap[`board-${b + 1}`].rows);
                                        if (rowExs.length === 5 || columnExs.length === 5)
                                            winningBoards.add(b + 1);
                                        if (winningBoards.size === Object.keys(boardMap).length) {
                                            return {
                                                lastDraw: drawn,
                                                whosLast: parseInt(`board-${b + 1}`.split("-")[1]),
                                            };
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                function getScore(boardMap, lastDraw, whosLast) {
                    const board = `board-${whosLast}`;
                    console.log("calculate score");
                    console.log("what was the last number drawn", lastDraw);
                    console.log("what is the board that was last", boardMap[board].rows);
                    let nums = [];
                    for (let r = 0; r < boardMap[board].rows.length; r++) {
                        for (let n = 0; n < boardMap[board].rows[r].length; n++) {
                            if (typeof boardMap[board].rows[r][n] === "number")
                                nums.push(boardMap[board].rows[r][n]);
                        }
                    }
                    const sum = nums.reduce((curr, next) => curr + next, 0);
                    console.log("nums of last board", nums);
                    console.log("sum", sum);
                    console.log("answer", sum * lastDraw);
                }
                const { lastDraw, whosLast } = boardEx();
                getScore(boardMap, lastDraw, whosLast);
                resolve();
            }
            catch (error) {
                reject(error);
            }
        });
    });
})();
//# sourceMappingURL=d4p2.js.map