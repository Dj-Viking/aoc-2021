"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dumpBooleanGraph = exports.dumpFlashGraph = exports.dumpBoard = void 0;
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
function dumpFlashGraph(graph) {
    console.log("dumping graph\n");
    let str = "";
    for (let r = 0; r < graph.length; r++) {
        for (let c = 0; c < graph[r].length; c++) {
            str += graph[r][c].toString() + " ";
        }
        console.log(str);
        str = "";
    }
}
exports.dumpFlashGraph = dumpFlashGraph;
function dumpBooleanGraph(board) {
    console.log("dumping boolean graph\n");
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