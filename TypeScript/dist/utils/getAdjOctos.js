"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdjOctos = void 0;
function getAdjOctos(r, c, graph) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const theList = new Map();
    const up = !!graph[r - 1] ? graph[r - 1][c] : void 0;
    const down = !!graph[r + 1] ? graph[r + 1][c] : void 0;
    const left = !!graph[r][c - 1] ? graph[r][c - 1] : void 0;
    const right = !!graph[r][c + 1] ? graph[r][c + 1] : void 0;
    const ruDiag = !!graph[r - 1] && !!graph[r - 1][c + 1] ? graph[r - 1][c + 1] : void 0;
    const luDiag = !!graph[r - 1] && !!graph[r - 1][c - 1] ? graph[r - 1][c - 1] : void 0;
    const rdDiag = !!graph[r + 1] && !!graph[r + 1][c + 1] ? graph[r + 1][c + 1] : void 0;
    const ldDiag = !!graph[r + 1] && !!graph[r + 1][c - 1] ? graph[r + 1][c - 1] : void 0;
    theList.set(graph[r][c], []);
    if (!!up)
        (_a = theList.get(graph[r][c])) === null || _a === void 0 ? void 0 : _a.push([r - 1, c]);
    if (!!down)
        (_b = theList.get(graph[r][c])) === null || _b === void 0 ? void 0 : _b.push([r + 1, c]);
    if (!!left)
        (_c = theList.get(graph[r][c])) === null || _c === void 0 ? void 0 : _c.push([r, c - 1]);
    if (!!right)
        (_d = theList.get(graph[r][c])) === null || _d === void 0 ? void 0 : _d.push([r, c + 1]);
    if (!!ruDiag)
        (_e = theList.get(graph[r][c])) === null || _e === void 0 ? void 0 : _e.push([r - 1, c + 1]);
    if (!!luDiag)
        (_f = theList.get(graph[r][c])) === null || _f === void 0 ? void 0 : _f.push([r - 1, c - 1]);
    if (!!rdDiag)
        (_g = theList.get(graph[r][c])) === null || _g === void 0 ? void 0 : _g.push([r + 1, c + 1]);
    if (!!ldDiag)
        (_h = theList.get(graph[r][c])) === null || _h === void 0 ? void 0 : _h.push([r + 1, c - 1]);
    return theList;
}
exports.getAdjOctos = getAdjOctos;
//# sourceMappingURL=getAdjOctos.js.map