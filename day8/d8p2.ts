import { getSegmentInput } from "../utils";
/**
 * wires are scrambled. letters dont mean jack diddly. just the amount of letters in combination
 * with each others
 * for example "dab" (3 letter combo) only one display uses 3 segments and thats 7
 *
 * find the instances where only 1, 4, 7, and 8 appear. since they all use unique combinations
 *
 * 1 is 2 letter combo 
 * 4 is 4 letter combo 
 * 7 is 3 letter combo 
 * 8 is 7 letter combo 
 *
 * (can count these but day 1 solution doesn't care how many of these occur)
 *
 * ( day 2 we need to match up the char combos for the segment display number)
 * 
 * 1 is 2 letter combo "ab"
 * 4 is 4 letter combo "eafb"
 * 7 is 3 letter combo "abd"
 * 8 is 7 letter combo "abcdefg"
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
 * 0 is 6 letter combo "cagedb" | "cadegb" //has no "f"
 * 6 is 6 letter combo "cdfgeb" | "cgfdeb" //has no "a" 
 * 9 is 6 letter combo "cefabd" | "fecabd" //has no "g"
 * 
 * 2 is 5 letter combo "gcdfa" | "gafcd"   //2 has a  "g"   in the 5 letter combo
 * 3 is 5 letter combo "fbcad" | "fcadb"   //3 has an "a"   in the 5 letter combo 
 * 5 is 5 letter combo "cdfbe" | "cdfeb"   //5 as an  "e"   in the 5 letter combo
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
 * how many combinations of segment combos exist
 * combo is denoted by how many characters are together without a space that represent that segment display
 * @example
 * {
 *    "1": 1
 *    "4": 5
 *    "7": 2
 *    "8": 3
 * }
 */
type ComboMap = Record<string | number, number>;

(async function (): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      // const input = getSegmentInput("../day8/input.txt");
      // const theInput = input.map((str) => str.split(/\s\|\s/g)[1]);

      const sample = getSegmentInput("../day8/sample.txt");
      const theInput = sample.map((str) => str.split(/\s\|\s/g)[1]);

      console.log("the input\n", theInput);
      let comboMap = {} as ComboMap;

      //init the map with zeros
      comboMap = ((cm: ComboMap): ComboMap => {
        let init = cm;
        for (let i = 0; i < theInput.length; i++) {
          init = {
            ...init,
            [i]: 0,
          };
        }
        return init;
      })(comboMap);

      function createSegmentNum(spi: Array<string>): string {
        let segsstr = "";
        for (let n = 0; n < spi.length; n++) {
          segsstr += spi[n] + " ";
        }

        return segsstr.trim();
      }

      function parseSegments(segsstr: string): number {
        let segstr = "";
        let sSplit = segsstr.split(" ");
        sSplit = sSplit.map((str) => {
          return str.split("").sort().join("");
        });
        console.log(
          "what is ssplit here",
          sSplit.map((str) => {
            return str.split("").sort().join("");
          })
        );
        for (let s = 0; s < sSplit.length; s++) {
          if (sSplit[s].length === 6) {
            if (/^abcdeg$/g.test(sSplit[s])) {
              segstr += "0";
              continue;
            }
            if (/^abcefg$|^acdefg$/g.test(sSplit[s])) {
              segstr += "6";
              continue;
            }
            if (/^abcdef$|^abcdfg$|^bcdefg$/g.test(sSplit[s])) {
              segstr += "9";
              continue;
            }
          }
          if (sSplit[s].length === 5) {
            // console.log("what string is here", sSplit[s]);
            if (/^abegf$|^abcdg$/g.test(sSplit[s])) {
              console.log("shoudl not be here on first iteration", sSplit[s]);
              // console.log("what is matched ssplit here", sSplit[s]);
              segstr += "2";
              continue;
            }
            if (/^abcfg$|^abcde$|^abefg$/g.test(sSplit[s])) {
              segstr += "3";
              continue;
            }
            if (/^bcdef$|^abceg$|^bcefg$|^bcdef$/g.test(sSplit[s])) {
              segstr += "5";
              continue;
            }
          }
          if (sSplit[s].length === 2) {
            segstr += "1";
          }
          if (sSplit[s].length === 4) {
            segstr += "4";
          }
          if (sSplit[s].length === 3) {
            segstr += "7";
          }
          if (sSplit[s].length === 7) {
            segstr += "8";
          }
        }
        console.log("segstr", segstr);
        return parseInt(segstr);
      }

      //create map of all segment occurances
      comboMap = ((cm: ComboMap): ComboMap => {
        let newCm = cm;
        for (let i = 0; i < theInput.length; i++) {
          for (let j = 0; j < theInput.length; j++) {
            let splitInputRow = theInput[i].split(" ");
            newCm = {
              ...newCm,
              [i]: parseSegments(createSegmentNum(splitInputRow)),
            };
          }
        }
        return newCm;
      })(comboMap);

      console.log("new combomap", comboMap);

      //sum the digits decoded from the encoded input segments
      function sumDecoded(cm: ComboMap): number {
        let sum = 0;
        Object.keys(cm).forEach((key) => {
          sum += cm[key];
        });
        return sum;
      }
      console.log("answer", sumDecoded(comboMap));

      resolve();
    } catch (error) {
      reject(error);
    }
  });
})();
