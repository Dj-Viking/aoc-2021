import { getInput } from "../utils/getInput";
(async function (): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      //keep in mind the solve script is running in the context of the dist directory
      const splitInput = getInput("../day3/input.txt");
      // const sample = getInput("../day3/sample.txt");

      function recurseOxy(list: Array<string>, step = 0): string {
        let count = 0;
        for (let i = 0; i < list.length; i++) {
          if (parseInt(list[i][step]) === 1) count++;
        }

        let k = 1;
        if (count < list.length / 2) k = 0;

        let subOxy = [] as Array<string>;
        for (let j = 0; j < list.length; j++) {
          if (parseInt(list[j][step]) === k) subOxy.push(list[j]);
        }

        if (subOxy.length > 1 && step < subOxy[0].length)
          return recurseOxy(subOxy, step + 1);
        else return subOxy[0];
      }
      recurseOxy(splitInput);

      function recurseCo2(list: Array<string>, step = 0): string {
        let count = 0;
        for (let i = 0; i < list.length; i++) {
          if (parseInt(list[i][step]) === 1) count++;
        }

        let k = 0;
        if (count < list.length / 2) k = 1;

        let subOxy = [] as Array<string>;
        for (let j = 0; j < list.length; j++) {
          if (parseInt(list[j][step]) === k) subOxy.push(list[j]);
        }

        if (subOxy.length > 1 && step < subOxy[0].length)
          return recurseCo2(subOxy, step + 1);
        else return subOxy[0];
      }
      recurseOxy(splitInput);

      console.log("oxy acc", recurseOxy(splitInput));
      console.log("co2 acc", recurseCo2(splitInput));
      console.log(
        parseInt(recurseOxy(splitInput), 2) *
          parseInt(recurseCo2(splitInput), 2)
      );
      resolve();
    } catch (error) {
      reject(error);
    }
  });
})();
