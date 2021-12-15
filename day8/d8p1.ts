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
 * (can count these but solution doesn't care how many of these occur)
 * 0 is 6 letter combo
 * 6 is 6 letter combo
 * 9 is 6 letter combo
 * 2 is 5 letter combo
 * 3 is 5 letter combo
 * 5 is 5 letter combo
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
      const input = getSegmentInput("../day8/input.txt");
      const theInput = input.map((str) => str.split(/\s\|\s/g)[1]);
      const INPUT_LENGTH = theInput.length;

      // const sample = getSegmentInput("../day8/sample.txt");
      // //taking only the output values after the |
      // const theInput = sample.map((str) => str.split(/\s\|\s/g)[1]);
      // const INPUT_LENGTH = theInput.length;

      console.log("the input\n", theInput);
      let comboMap = {} as ComboMap;

      //init the map with zeros
      comboMap = ((cm: ComboMap): ComboMap => {
        let init = cm;
        for (let i = 0; i < 10; i++) {
          init = {
            ...init,
            [i]: 0,
          };
        }
        return init;
      })(comboMap);

      function countComboInRow(spi: Array<string>, cmRef: ComboMap, key: number): number {
        let num = 0;
        console.log("split input row in function", spi, "at key", key);
        //counting occurances of strings of length 6 that are possibly representing 0 6 or 9
        switch (true) {
          case key === 0 || key === 6 || key === 9:
            {
              if (cmRef[key] <= 0) {
                num = spi.filter((item) => item.length === 6).length;
              } else {
                num = cmRef[key] += spi.filter((item) => item.length === 6).length;
              }
            }
            break;
          case key === 2 || key === 3 || key === 5:
            {
              if (cmRef[key] <= 0) {
                num = spi.filter((item) => item.length === 5).length;
              } else {
                num = cmRef[key] += spi.filter((item) => item.length === 5).length;
              }
            }
            break;
          case key === 1:
            {
              if (cmRef[key] <= 0) {
                num = spi.filter((item) => item.length === 2).length;
              } else {
                num = cmRef[key] += spi.filter((item) => item.length === 2).length;
              }
            }
            break;
          case key === 4:
            {
              if (cmRef[key] <= 0) {
                num = spi.filter((item) => item.length === 4).length;
              } else {
                num = cmRef[key] += spi.filter((item) => item.length === 4).length;
              }
            }
            break;
          case key === 7:
            {
              if (cmRef[key] <= 0) {
                num = spi.filter((item) => item.length === 3).length;
              } else {
                num = cmRef[key] += spi.filter((item) => item.length === 3).length;
              }
            }
            break;
          case key === 8:
            {
              if (cmRef[key] <= 0) {
                num = spi.filter((item) => item.length === 7).length;
              } else {
                num = cmRef[key] += spi.filter((item) => item.length === 7).length;
              }
            }
            break;
          default:
            break;
        }
        return num;
      }
      //create map of all segment occurances
      comboMap = ((cm: ComboMap): ComboMap => {
        let newCm = cm;
        for (let i = 0; i < 10; i++) {
          for (let j = 0; j < INPUT_LENGTH; j++) {
            let splitInputRow = theInput[j].split(" ");
            newCm = {
              ...newCm,
              [i]: countComboInRow(splitInputRow, newCm, i),
            };
          }
        }
        return newCm;
      })(comboMap);

      console.log("new combomap", comboMap);

      //sum the occurances of 1 4 7 and 8
      let sum = 0;
      function sumOccurances(cm: ComboMap): number {
        Object.keys(cm).forEach((key) => {
          if (key === "1" || key === "4" || key === "7" || key === "8") {
            sum += cm[key];
          }
        });
        return sum;
      }
      console.log("answer", sumOccurances(comboMap));

      resolve();
    } catch (error) {
      reject(error);
    }
  });
})();
