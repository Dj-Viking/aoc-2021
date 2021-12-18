"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            try {
                const input = (0, utils_1.getSegmentInput)("../day8/sample.txt");
                const wireContext = input.map((str) => str.split(/\s\|\s/g)[0]);
                const wires = input.map((str) => str.split(/\s\|\s/g)[1]);
                const DIGITS_COUNT = 10;
                const SEGS_SIZE = 7;
                const ALL_PERMS = (0, utils_1.getPermutations)("abcdefg");
                const wireContextContainer = wireContext.map((str) => {
                    return str.split(" ");
                });
                const wireContainer = wires.map((wire) => {
                    return wire.split(" ");
                });
                let SegmentMap = {};
                let MASK_TABLE = {
                    "0": 0b1110111,
                    "1": 0b0100100,
                    "2": 0b1011110,
                    "3": 0b1101101,
                    "4": 0b0101110,
                    "5": 0b1101011,
                    "6": 0b1111011,
                    "7": 0b0100101,
                    "8": 0b1111111,
                    "9": 0b1101111,
                };
                function isUniqueSeg(seg) {
                    switch (true) {
                        case seg.length === 2:
                        case seg.length === 4:
                        case seg.length === 3:
                        case seg.length === 7:
                            return true;
                        default:
                            return false;
                    }
                }
                dumpMaskTable(MASK_TABLE);
                function dumpMaskTable(mt) {
                    for (let i = 0; i < Object.keys(mt).length; i++) {
                        console.log(`${i}: ${(0, utils_1.decimalToBinary)(mt[i])}`, mt[i]);
                    }
                }
                function sevenSegToBinary(ctx) {
                    let result = 0;
                    for (let i = 0; i < ctx.length; i++) {
                        result |= 1 << (i & 7);
                    }
                    return result;
                }
                function createContext(seg, startingContext, mt) {
                    let contextStr = startingContext;
                    console.log("sevensegtobinary", sevenSegToBinary(seg));
                    return mt;
                }
                function changeMaskContext(wc, mt) {
                    let newmt = mt;
                    let seg = "";
                    let startingContext = "";
                    for (let i = 0; i < wc.length; i++) {
                        if (wc[i].length === 7)
                            startingContext = wc[i];
                        if (isUniqueSeg(wc[i])) {
                            seg = wc[i];
                        }
                    }
                    newmt = createContext(seg, startingContext, newmt);
                    return newmt;
                }
                function decode(segs, wire) {
                    let mask = 0;
                    for (let i = 0; i < wire.length; i++) {
                        for (let j = 0; j < SEGS_SIZE; j++) {
                            if (segs[j] === wire[i]) {
                                mask |= 1 << j;
                            }
                        }
                    }
                    for (let m = 0; m < DIGITS_COUNT; m++) {
                        if (MASK_TABLE[m] === mask) {
                            return m;
                        }
                    }
                    return -1;
                }
                SegmentMap = ((sm) => {
                    let init = sm;
                    for (let i = 0; i < DIGITS_COUNT; i++) {
                        init = Object.assign(Object.assign({}, init), { [i]: 0 });
                    }
                    return init;
                })(SegmentMap);
                console.log("init map", SegmentMap);
                function verifySegs(segs, wire) {
                    for (let i = 0; i < DIGITS_COUNT; i++) {
                        switch (true) {
                            case decode(segs, wire) < 0:
                                return false;
                        }
                    }
                    return true;
                }
                function main() {
                    for (let c = 0; c < wireContainer.length; c++) {
                        MASK_TABLE = changeMaskContext(wireContextContainer[c], MASK_TABLE);
                        for (let w = 0; w < wireContainer[c].length; w++) {
                            for (let i = 0; i < ALL_PERMS.length; i++) {
                                if (verifySegs(ALL_PERMS[i], wireContainer[c][w]))
                                    break;
                            }
                        }
                    }
                    return 0;
                }
                main();
                resolve();
            }
            catch (error) {
                reject(error);
            }
        });
    });
})();
//# sourceMappingURL=d8p2.js.map