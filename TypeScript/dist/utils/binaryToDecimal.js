"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decimalToBinary = void 0;
function decimalToBinary(x) {
    let bin = 0;
    let rem, i = 1, step = 1;
    while (x != 0) {
        rem = x % 2;
        console.log(`Step ${step++}: ${x}/2, Remainder = ${rem}, Quotient = ${x / 2}`);
        x = x / 2;
        bin = bin + rem * i;
        i = i * 10;
    }
    return bin;
}
exports.decimalToBinary = decimalToBinary;
//# sourceMappingURL=binaryToDecimal.js.map