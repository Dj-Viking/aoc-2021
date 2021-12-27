"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLowerThanAdj = void 0;
function isLowerThanAdj(item, graph, row, col, edgeType) {
    if (!!edgeType) {
        switch (edgeType) {
            case "corner": {
                if (!!graph[row + 1] && !!graph[row][col - 1] && !!graph[row + 1][col]) {
                    if (parseInt(item) < parseInt(graph[row][col - 1]) &&
                        parseInt(item) < parseInt(graph[row + 1][col])) {
                        return true;
                    }
                    return false;
                }
                if (!!graph[row][col + 1] && !!graph[row + 1] && !!graph[row + 1][col]) {
                    if (parseInt(item) < parseInt(graph[row][col + 1]) &&
                        parseInt(item) < parseInt(graph[row + 1][col])) {
                        return true;
                    }
                    return false;
                }
                if (!!graph[row][col + 1] && !!graph[row - 1][col]) {
                    if (parseInt(item) < parseInt(graph[row][col + 1]) &&
                        parseInt(item) < parseInt(graph[row - 1][col])) {
                        return true;
                    }
                    return false;
                }
                if (!!graph[row][col - 1] && !!graph[row - 1][col]) {
                    if (parseInt(item) < parseInt(graph[row][col - 1]) &&
                        parseInt(item) < parseInt(graph[row - 1][col])) {
                        return true;
                    }
                    return false;
                }
                break;
            }
            case "side": {
                if (!!graph[row - 1][col] && !!graph[row][col - 1] && !!graph[row + 1][col]) {
                    if (parseInt(item) < parseInt(graph[row - 1][col]) &&
                        parseInt(item) < parseInt(graph[row][col - 1]) &&
                        parseInt(item) < parseInt(graph[row + 1][col])) {
                        return true;
                    }
                    return false;
                }
                if (!!graph[row - 1][col] && !!graph[row][col + 1] && !!graph[row + 1][col]) {
                    if (parseInt(item) < parseInt(graph[row - 1][col]) &&
                        parseInt(item) < parseInt(graph[row][col + 1]) &&
                        parseInt(item) < parseInt(graph[row + 1][col])) {
                        return true;
                    }
                    return false;
                }
                break;
            }
            case "top-bottom": {
                if (!!graph[row + 1] &&
                    !!graph[row][col - 1] &&
                    !!graph[row][col + 1] &&
                    !!graph[row + 1][col]) {
                    if (parseInt(item) < parseInt(graph[row][col - 1]) &&
                        parseInt(item) < parseInt(graph[row][col + 1]) &&
                        parseInt(item) < parseInt(graph[row + 1][col])) {
                        return true;
                    }
                    return false;
                }
                if (!!graph[row - 1] &&
                    !!graph[row][col - 1] &&
                    !!graph[row - 1][col] &&
                    !!graph[row][col + 1]) {
                    if (parseInt(item) < parseInt(graph[row][col - 1]) &&
                        parseInt(item) < parseInt(graph[row - 1][col]) &&
                        parseInt(item) < parseInt(graph[row][col + 1])) {
                        return true;
                    }
                    return false;
                }
            }
        }
    }
    else {
        if (parseInt(item) < parseInt(graph[row - 1][col]) &&
            parseInt(item) < parseInt(graph[row + 1][col]) &&
            parseInt(item) < parseInt(graph[row][col - 1]) &&
            parseInt(item) < parseInt(graph[row][col + 1]))
            return true;
        return false;
    }
    return false;
}
exports.isLowerThanAdj = isLowerThanAdj;
//# sourceMappingURL=isLowerThanAdj.js.map