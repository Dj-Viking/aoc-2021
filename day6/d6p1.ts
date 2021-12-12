import { getLanternInput } from "../utils";

(async function (): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      // const lanternInput = getLanternInput("../day6/input.txt");
      // const theInput = lanternInput;
      const lanternInput = getLanternInput("../day6/sample.txt");
      const theInput = lanternInput;
      console.log("theInput", theInput);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
})();
