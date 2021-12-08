import { getInput } from "../utils/getInput";
(async function (): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      //keep in mind the solve script is running in the context of the dist directory
      const splitInput = getInput("../day3/input.txt");
      // console.log(splitInput);
      let bitAcc = [] as Array<string>;
      let gammaAcc = [] as Array<string>;
      let epsAcc = [] as Array<string>;
      let gammaRate = 0;
      let epsRate = 0;
      let zeroAmount = 0;
      let oneAmount = 0;

      for (let k = 0; k < 12; k++) {
        zeroAmount = 0;
        oneAmount = 0;
        bitAcc = splitInput.map(
          (_: string, idx: number, arr: Array<string>) => {
            return arr[idx][k].split("").shift() as string;
          }
        );
        console.log("bit acc should be new on each iteration", bitAcc);
        for (const bit of bitAcc) {
          if (bit === "0") zeroAmount++;
          else oneAmount++;
        }
        console.log("iteration number", k + 1);
        console.log("zero amount", zeroAmount);
        console.log("one amount", oneAmount);
        if (zeroAmount > oneAmount) {
          gammaAcc.push("0");
          epsAcc.push("1");
        } else {
          gammaAcc.push("1");
          epsAcc.push("0");
        }
      }

      gammaRate = parseInt(gammaAcc.join(""), 2);
      epsRate = parseInt(epsAcc.join(""), 2);

      console.log("bit accumulator", bitAcc);
      console.log("gamma accumulator", gammaAcc);
      console.log("eps accumulator", epsAcc);

      console.log("gamma rate", gammaRate);
      console.log("eps rate", epsRate);
      console.log(gammaRate * epsRate);

      // answer is gamma is joined gamma arr converted from binary to decimal
      // multiplied by joined esp arr converted from binary to decimals
      resolve();
    } catch (error) {
      reject(error);
    }
  });
})();
