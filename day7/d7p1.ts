import { getCrabInput } from "../utils";
(async function (): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      // console.log("highest number", theInput[parsed.length - 1]); //1911
      // const crabInput = getCrabInput("../day7/input.txt");
      // const theInput = crabInput;

      const crabSample = getCrabInput("../day7/sample.txt");
      const theInput = crabSample;
      console.log("the input", theInput);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
})();
