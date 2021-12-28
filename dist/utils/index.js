"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkChunk = exports.Stack = exports.dumpLowPointGraph = exports.dumpBooleanGraph = exports.isEdge = exports.isLowerThanAdj = exports.decimalToBinary = exports.getPermutations = exports.getSegmentInput = exports.getCrabInput = exports.getLanternInput = exports.dumpBoard = exports.recurseOxy = exports.recurseCo2 = exports.getInput = exports.getY2 = exports.getY1 = exports.getX2 = exports.getX1 = void 0;
const getInput_1 = require("./getInput");
Object.defineProperty(exports, "getInput", { enumerable: true, get: function () { return getInput_1.getInput; } });
const recurseCo2_1 = require("./recurseCo2");
Object.defineProperty(exports, "recurseCo2", { enumerable: true, get: function () { return recurseCo2_1.recurseCo2; } });
const recurseOxy_1 = require("./recurseOxy");
Object.defineProperty(exports, "recurseOxy", { enumerable: true, get: function () { return recurseOxy_1.recurseOxy; } });
const dumpBoard_1 = require("./dumpBoard");
Object.defineProperty(exports, "dumpBoard", { enumerable: true, get: function () { return dumpBoard_1.dumpBoard; } });
Object.defineProperty(exports, "dumpBooleanGraph", { enumerable: true, get: function () { return dumpBoard_1.dumpBooleanGraph; } });
const getLanternInput_1 = require("./getLanternInput");
Object.defineProperty(exports, "getLanternInput", { enumerable: true, get: function () { return getLanternInput_1.getLanternInput; } });
const getCrabInput_1 = require("./getCrabInput");
Object.defineProperty(exports, "getCrabInput", { enumerable: true, get: function () { return getCrabInput_1.getCrabInput; } });
const getSegmentInput_1 = require("./getSegmentInput");
Object.defineProperty(exports, "getSegmentInput", { enumerable: true, get: function () { return getSegmentInput_1.getSegmentInput; } });
const getPermutations_1 = require("./getPermutations");
Object.defineProperty(exports, "getPermutations", { enumerable: true, get: function () { return getPermutations_1.getPermutations; } });
const decimalToBinary_1 = require("./decimalToBinary");
Object.defineProperty(exports, "decimalToBinary", { enumerable: true, get: function () { return decimalToBinary_1.decimalToBinary; } });
const isLowerThanAdj_1 = require("./isLowerThanAdj");
Object.defineProperty(exports, "isLowerThanAdj", { enumerable: true, get: function () { return isLowerThanAdj_1.isLowerThanAdj; } });
const isEdge_1 = require("./isEdge");
Object.defineProperty(exports, "isEdge", { enumerable: true, get: function () { return isEdge_1.isEdge; } });
const dumpLowPointGraph_1 = require("./dumpLowPointGraph");
Object.defineProperty(exports, "dumpLowPointGraph", { enumerable: true, get: function () { return dumpLowPointGraph_1.dumpLowPointGraph; } });
const stack_1 = require("./stack");
Object.defineProperty(exports, "Stack", { enumerable: true, get: function () { return stack_1.Stack; } });
Object.defineProperty(exports, "checkChunk", { enumerable: true, get: function () { return stack_1.checkChunk; } });
function getX1(coords, iter) {
    return parseInt(coords[iter].split(/\s->\s/g)[0].split(",")[0]);
}
exports.getX1 = getX1;
function getX2(coords, iter) {
    return parseInt(coords[iter].split(/\s->\s/g)[1].split(",")[0]);
}
exports.getX2 = getX2;
function getY1(coords, iter) {
    return parseInt(coords[iter].split(/\s->\s/g)[0].split(",")[1]);
}
exports.getY1 = getY1;
function getY2(coords, iter) {
    return parseInt(coords[iter].split(/\s->\s/g)[1].split(",")[1]);
}
exports.getY2 = getY2;
//# sourceMappingURL=index.js.map