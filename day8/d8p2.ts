/**
 * wires are scrambled. letters dont mean jack diddly. just the amount of letters in combination
 * with each others
 * for example "dab" (3 letter combo) only one display uses 3 segments and thats 7
 *
 * find the instances where only 1, 4, 7, and 8 appear. since they all use unique combinations
 *
 * 1 =>        2 letter combo 
 * 4 =>        4 letter combo 
 * 7 =>        3 letter combo 
 * 8 =>        7 letter combo 
 * 
 * 2, 3, 5 => 5 letter combo
 * 0, 6, 9 => 6 letter combo
 *
 * (can count these but day 1 solution doesn't care how many of these occur)
 *
 * ( day 2 we need to match up the char combos for the segment display number)
 * 
 *  dddd
   e    a
   e    a
    ffff
   g    b
   g    b
    cccc
 * 
 *
 *    8      3     9      4
 * fdgacbe cefdb cefbgd gcbe: 8394 += the number the next row creates (9871)
 *    9      7     8      1
 * fcgedb   cgb  dgebacf  gc
 * 
 * turns out part 2 is more complicated because there has to be a context in which some segments
 * are supposed to match up according to the orientation of the other inputs on the left side of the | on the input 
 * otherwise the segment orientation will not represent a number
 * 
 */

/**
 * represent a configuration
 */

/**
 *
 * will contain the parsed segments that will
 * result from the context of the row which could
 * change where the segments are actually representing
 * the correct digits. Since the wires are "twisted"
 *
 * the answer is the sum of all the values stored in each
 * key of the object
 * @example
 * {
 *    "0": 8394,
 *    "1": 9781,
 *    "2": 1197,
 *    "3": 9361,
 *    "4": 4873,
 *    "5": 8418,
 *    "6": 4548,
 *    "7": 1625,
 *    "8": 8717,
 *    "9": 4315
 * }
 */
/**
 * I64 digit_masks[DIGIT_CNT] = {
 *      6543210
 *      cbgfaed
 *  0 0b1110111
 *  1 0b0010010
 *  2 0b1011101
 *  3 0b1101101
 *  4 0b0101110
 *  5 0b1101110
 *  6 0b1011110
 *  7 0b0100011
 *  8 0b1111111
 *  9 0b1101111
 * }
 */
/**
 * enumeration of digits 0-9 to 7 segment binary mask.
 * 
 * The location of the letters can change per row according to
 * 
 * which unique digits are logically contained within the mask.
 * 
       *
        *   dddd     0
          e    a  1   2
          e    a  1   2  
           ffff     3
          g    b  4   5
          g    b  4   5
           cccc     6
 * @example
 * {     //6543210
 *       //cbgfead
 *  "0": 0b1110111
 *  "1": 0b0100010
 *  "2": 0b1011101
 * }
 * */
type MaskTable = Record<string, number>;
type SegmentMap = Record<string | number, number>;
import { getPermutations, getSegmentInput, decimalToBinary } from "../utils";
(async function (): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      // const input = getSegmentInput("../day8/input.txt");
      // const wires = input.map((str) => str.split(/\s\|\s/g)[1]);

      const input = getSegmentInput("../day8/sample.txt");
      const wireContext = input.map((str) => str.split(/\s\|\s/g)[0]);
      const wires = input.map((str) => str.split(/\s\|\s/g)[1]);

      const DIGITS_COUNT = 10;
      const SEGS_SIZE = 7;
      const ALL_PERMS = getPermutations("abcdefg");
      const wireContextContainer = wireContext.map((str) => {
        return str.split(" ");
      }) as string[][];
      const wireContainer = wires.map((wire) => {
        return wire.split(" ");
      }) as string[][];

      // console.log("wire context\n", wireContextContainer);
      // console.log("row wires\n", wireContainer);
      let SegmentMap = {} as SegmentMap;

      //subject to change according to the wire context segments
      let MASK_TABLE = {
        //     6543210
        //     cbgfaed
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
      } as MaskTable;

      function isUniqueSeg(seg: string): boolean {
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

      //debug mask table binary values
      function dumpMaskTable(mt: MaskTable): void {
        for (let i = 0; i < Object.keys(mt).length; i++) {
          console.log(`${i}: ${decimalToBinary(mt[i])}`, mt[i]);
        }
      }

      function sevenSegToBinary(ctx: string): number {
        let result = 0;
        for (let i = 0; i < ctx.length; i++) {
          result |= 1 << (i & 7);
        }
        return result;
      }

      function createContext(seg: string, startingContext: string, mt: MaskTable): MaskTable {
        let contextStr = startingContext;
        //rebuild context string according to what the unique segment will
        // generate as the correct number
        console.log("sevensegtobinary", sevenSegToBinary(seg));
        // mt = {
        //   "0": sevenSegToBinary(contextStr),
        // };
        return mt;
      }

      function changeMaskContext(wc: string[], mt: MaskTable): MaskTable {
        let newmt = mt;
        let seg = "";
        let startingContext = "";
        for (let i = 0; i < wc.length; i++) {
          // console.log("what is wc here", i, wc[i], isUniqueSeg(wc[i]));
          if (wc[i].length === 7) startingContext = wc[i];
          if (isUniqueSeg(wc[i])) {
            seg = wc[i];
            // break seg;
          }
        }
        // console.log("did i break when found unique seg");
        newmt = createContext(seg, startingContext, newmt);
        return newmt;
      }
      //need to tweak the decode to only match the 2,3,5 and 0,6,9 according to strings that contain the unique strings inside them
      /**
       *
       * @param segs all permutations of all possible segments configurations
       * @param wire wire string on right side of |
       * @returns
       */
      function decode(segs: string, wire: string): number {
        let mask = 0;
        for (let i = 0; i < wire.length; i++) {
          for (let j = 0; j < SEGS_SIZE; j++) {
            if (segs[j] === wire[i]) {
              mask |= 1 << j;
            }
          }
        }

        //append the matched number to segmentmap key and return the number to let

        for (let m = 0; m < DIGITS_COUNT; m++) {
          if (MASK_TABLE[m] === mask) {
            // console.log("what is m here", m, "segs", segs, "wire", wire);
            return m;
          }
        }

        return -1;
      }

      //init the map with empty strings to build a 4 digit number when decoding
      SegmentMap = ((sm: SegmentMap): SegmentMap => {
        let init = sm;
        for (let i = 0; i < DIGITS_COUNT; i++) {
          init = {
            ...init,
            [i]: 0,
          };
        }
        return init;
      })(SegmentMap);

      console.log("init map", SegmentMap);

      function verifySegs(segs: string, wire: string): boolean {
        // console.log("what are we comparing", "segs", segs, "wire", wire);
        for (let i = 0; i < DIGITS_COUNT; i++) {
          switch (true) {
            case decode(segs, wire) < 0:
              return false;
          }
        }
        return true;
      }

      function main(): number {
        //if found a match through all permutations break loop
        // and start checking the next wire for a match
        for (let c = 0; c < wireContainer.length; c++) {
          // console.log("change context here");
          MASK_TABLE = changeMaskContext(wireContextContainer[c], MASK_TABLE);
          // console.log("mask table now", MASK_TABLE);
          for (let w = 0; w < wireContainer[c].length; w++) {
            for (let i = 0; i < ALL_PERMS.length; i++) {
              if (verifySegs(ALL_PERMS[i], wireContainer[c][w])) break;
            }
          }
        }

        return 0;
      }
      main();

      resolve();
    } catch (error) {
      reject(error);
    }
  });
})();
