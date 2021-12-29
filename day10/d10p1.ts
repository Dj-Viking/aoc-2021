import { getInput, checkCorrupt } from "../utils";
(async function (): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      let theInput = getInput("../day10/input.txt");
      // let theInput = getInput("../day10/sample.txt");
      // console.log("input", theInput);
      const corruptChunks: Array<string> = [];
      const illegalCharsFound: Array<string> = [];
      const charScore: Array<number> = [];

      const tokenScore = {
        ")": 3,
        "]": 57,
        "}": 1197,
        ">": 25137,
      } as Record<string, number>;

      function calcChars(chars: Array<string>): number {
        let result = 0;
        for (let i = 0; i < chars.length; i++) {
          let charVal = 0;
          Object.keys(tokenScore).forEach((key) => {
            if (chars[i] === key) {
              charVal = tokenScore[key];
            }
          });
          charScore.push(charVal);
          // console.log("char score", charScore);
        }
        result = charScore.reduce((curr, next) => curr + next, 0);
        return result;
      }

      //get corrupt chunks from input
      for (let i = 0; i < theInput.length; i++) {
        const result = checkCorrupt(theInput[i]);
        if (result.corrupt) {
          corruptChunks.push(theInput[i]);
          illegalCharsFound.push(result.illegalChar);
        }
      }
      // console.log("corrupt chunks", corruptChunks);
      // console.log("illegal chars", illegalCharsFound);

      const result = calcChars(illegalCharsFound);

      console.log("answer", result);

      resolve();
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
})();
