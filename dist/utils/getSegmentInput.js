"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSegmentInput = void 0;
const fs_1 = __importDefault(require("fs"));
function getSegmentInput(path) {
    return fs_1.default.readFileSync(path, { encoding: "utf-8" }).split("\n");
}
exports.getSegmentInput = getSegmentInput;
//# sourceMappingURL=getSegmentInput.js.map