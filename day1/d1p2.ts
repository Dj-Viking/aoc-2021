/**
 * 199  A      
   200  A B    
   208  A B C  
   210    B C 
 * The sum of measurements in the second window B is larger than the sum of the first A , so this first comparison increased.
 */

import { getInput } from "../utils/getInput";

(async function (): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      //keep in mind the solve script is running in the context of the dist directory

      const splitInput = getInput("../day1/input.txt");
      let increased = 0;
      let currentSum = 0;
      let prevSum = 0;
      let currentWindow = [] as Array<number>;
      let prevWindow = [] as Array<number>;
      for (let i = 0; i < splitInput.length; i++) {
        currentWindow = [];
        currentSum = 0;
        prevWindow = [];
        prevSum = 0;

        currentWindow.push(
          Number(!!splitInput[i + 3] ? splitInput[i + 3] : 0),
          Number(!!splitInput[i + 2] ? splitInput[i + 2] : 0),
          Number(!!splitInput[i + 1] ? splitInput[i + 1] : 0)
        );

        currentSum = currentWindow.reduce(
          (total, nextNum) => total + nextNum,
          0
        );

        prevWindow.push(
          Number(!!splitInput[i + 2] ? splitInput[i + 2] : 0),
          Number(!!splitInput[i + 1] ? splitInput[i + 1] : 0),
          Number(!!splitInput[i] ? splitInput[i] : 0)
        );

        prevSum = prevWindow.reduce((total, nextNum) => total + nextNum, 0);

        if (currentSum - prevSum > 0) increased++;
      }
      console.log(increased);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
})();
