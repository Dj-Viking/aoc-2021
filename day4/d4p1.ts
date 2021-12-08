import { getInput } from "../utils";
(async function (): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      //keep in mind the solve script is running in the context of the dist directory
      const splitInput = getInput("../day4/input.txt");
      const sample = getInput("../day4/sample.txt");
      console.log(sample);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
})();
