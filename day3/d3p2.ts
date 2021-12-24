import { getInput, recurseCo2, recurseOxy } from "../utils";
(async function (): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      //keep in mind the solve script is running in the context of the dist directory
      const splitInput = getInput("../day3/input.txt");
      // const sample = getInput("../day3/sample.txt");

      console.log("oxy acc", recurseOxy(splitInput));
      console.log("co2 acc", recurseCo2(splitInput));
      console.log(parseInt(recurseOxy(splitInput), 2) * parseInt(recurseCo2(splitInput), 2));
      resolve();
    } catch (error) {
      reject(error);
    }
  });
})();
