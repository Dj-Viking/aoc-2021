"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function main() {
    const inputPath = "../day8/input.txt";
    const data = fs_1.default
        .readFileSync(inputPath)
        .toString()
        .split("\n")
        .map((line) => line.split(" | ").map((parts) => parts.split(/\s+/)));
    let result = 0;
    const digitSegments = [
        "0,1,2,4,5,6",
        "2,5",
        "0,2,3,4,6",
        "0,2,3,5,6",
        "1,2,3,5",
        "0,1,3,5,6",
        "0,1,3,4,5,6",
        "0,2,5",
        "0,1,2,3,4,5,6",
        "0,1,2,3,5,6",
    ];
    const knownBySegmentsCount = { 2: 1, 4: 4, 3: 7, 7: 8 };
    const knownSegmentsByAppearance = { 6: 1, 4: 4, 9: 5 };
    for (const [patterns, values] of data) {
        const knownPatterns = [];
        const segmentAppearance = {};
        for (const pattern of patterns) {
            if (pattern.length in knownBySegmentsCount) {
                const digit = knownBySegmentsCount[pattern.length];
                knownPatterns[digit] = pattern.split("");
            }
            for (const symbol of pattern) {
                segmentAppearance[symbol] = segmentAppearance[symbol] + 1 || 1;
            }
        }
        const segments = [];
        for (const [symbol, count] of Object.entries(segmentAppearance)) {
            if (count in knownSegmentsByAppearance) {
                const segmentIndex = knownSegmentsByAppearance[count];
                segments[segmentIndex] = symbol;
            }
        }
        segments[0] = knownPatterns[7].filter((s) => !knownPatterns[1].includes(s))[0];
        segments[2] = knownPatterns[1].filter((s) => !segments.includes(s))[0];
        segments[3] = knownPatterns[4].filter((s) => !segments.includes(s))[0];
        segments[6] = knownPatterns[8].filter((s) => !segments.includes(s))[0];
        let numericValue = "";
        for (const value of values) {
            const valueSegments = value
                .split("")
                .map((s) => segments.indexOf(s))
                .sort()
                .join();
            const digit = digitSegments.indexOf(valueSegments);
            numericValue += digit;
        }
        result += parseInt(numericValue, 10);
    }
    console.log(result);
}
main();
//# sourceMappingURL=d8p2.js.map