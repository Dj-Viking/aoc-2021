"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dumpBooleanGraph = exports.dumpBoard = void 0;
function dumpBoard(board) {
    console.log("dumping board");
    let x, y;
    let str = "";
    for (y = 0; y < board.length; y++) {
        for (x = 0; x < board.length; x++) {
            str += board[y][x] === 0 ? "." + " " : board[y][x].toString() + " ";
        }
        console.log(str);
        str = "";
    }
}
exports.dumpBoard = dumpBoard;
function dumpBooleanGraph(board) {
    console.log("dumping board");
    let x, y;
    let str = "";
    for (y = 0; y < board.length; y++) {
        for (x = 0; x < board.length; x++) {
            str += board[y][x] === false ? "." + " " : "*" + " ";
        }
        console.log(str);
        str = "";
    }
}
exports.dumpBooleanGraph = dumpBooleanGraph;
//# sourceMappingURL=dumpBoard.js.map