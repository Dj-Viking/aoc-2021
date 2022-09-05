"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCrabInput = void 0;
const fs_1 = __importDefault(require("fs"));
function getCrabInput(path) {
    return fs_1.default
        .readFileSync(path, { encoding: "utf-8" })
        .split(",")
        .map((str) => parseInt(str))
        .sort((a, b) => a - b);
}
exports.getCrabInput = getCrabInput;
//# sourceMappingURL=getCrabInput.js.map