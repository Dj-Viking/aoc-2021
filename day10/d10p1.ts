import { getInput, Stack, checkChunk } from "../utils";
(async function (): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      // let theInput = getInput("../day10/input.txt");
      let theInput = getInput("../day10/sample.txt");
      console.log("input", theInput);
      const stack = new Stack<string>();
      const corruptChunks: Array<string> = [];

      const illegalTokenScore = {
        ")": 3,
        "]": 57,
        "}": 1197,
        ">": 25137,
      };

      //get corrupt chunks from input
      for (let i = 0; i < theInput.length; i++) {
        if (checkChunk(theInput[i]).corrupt) {
          corruptChunks.push(theInput[i]);
        }
      }
      console.log("corrupt chunks", corruptChunks);

      resolve();
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
})();
