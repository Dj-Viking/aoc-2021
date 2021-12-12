"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLanternInput = exports.dumpBoard = exports.recurseOxy = exports.recurseCo2 = exports.getInput = exports.getY2 = exports.getY1 = exports.getX2 = exports.getX1 = void 0;
const getInput_1 = require("./getInput");
Object.defineProperty(exports, "getInput", { enumerable: true, get: function () { return getInput_1.getInput; } });
const recurseCo2_1 = require("./recurseCo2");
Object.defineProperty(exports, "recurseCo2", { enumerable: true, get: function () { return recurseCo2_1.recurseCo2; } });
const recurseOxy_1 = require("./recurseOxy");
Object.defineProperty(exports, "recurseOxy", { enumerable: true, get: function () { return recurseOxy_1.recurseOxy; } });
const dumpBoard_1 = require("./dumpBoard");
Object.defineProperty(exports, "dumpBoard", { enumerable: true, get: function () { return dumpBoard_1.dumpBoard; } });
const getLanternInput_1 = require("./getLanternInput");
Object.defineProperty(exports, "getLanternInput", { enumerable: true, get: function () { return getLanternInput_1.getLanternInput; } });
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