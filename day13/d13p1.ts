import { getInput } from "../utils";
(async function (): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const theInput = getInput("../day13/sample.txt");
      // const theInput = getInput("../day13/input.txt")
      console.log("input", theInput);

      resolve();
    } catch (error) {
      reject(error);
    }
  });
})();
