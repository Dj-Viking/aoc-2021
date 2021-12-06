import fs from "fs";
let increaseAmount = 0;
(async function(): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      //keep in mind the solve script is running in the context of the dist directory
      const inputVal = fs.readFileSync(`../day1/input.txt`, { encoding: "utf-8" });
      const splitInput = inputVal.split("\n");
      let current = 0;
      let prev = void 0 as void | number;
      for (let i = 1; i < splitInput.length; i++) {
        prev = Number(splitInput[i - 1]);
        current = Number(splitInput[i]);
        if (current > prev) increaseAmount++;
      }
      console.log(increaseAmount);
      resolve();
    } catch (error) {
      reject(error);
    }
  })
})();