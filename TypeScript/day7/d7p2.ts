import { getCrabInput } from "../utils";

type CrabTable = Record<string | number, number>;

console.time("main finished in");
(async function (): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const crabInput = getCrabInput("../day7/input.txt");
      const theInput = crabInput;
      const INPUT_LENGTH = theInput.length;
      const UPPER_BOUND = 2000;
      const MIN = theInput[0];
      const MAX = theInput[INPUT_LENGTH - 1];

      // const crabSample = getCrabInput("../day7/sample.txt");
      // const theInput = crabSample;
      // const INPUT_LENGTH = theInput.length;
      // const UPPER_BOUND = 20;
      // const MIN = theInput[0];
      // const MAX = theInput[INPUT_LENGTH - 1];

      let crabTable = {} as CrabTable;
      // console.log("the input", theInput);

      // function dumpTable(ct: CrabTable): void {
      //   console.log("\n");
      //   for (let i = 0; i < UPPER_BOUND; i++) {
      //     if (ct[i] > 0) console.log(`${i}: ${ct[i]}`);
      //   }
      //   console.log("\n");
      // }

      function fuelCount2(align: number): number {
        let n, fuel;
        let result = 0;
        for (let i = 0; i < UPPER_BOUND; i++) {
          n = Math.abs(align - i);
          fuel = (n * (n + 1)) / 2;
          result += fuel * crabTable[i];
        }
        return result;
      }

      //init table
      crabTable = ((ct: CrabTable): CrabTable => {
        let table = ct;
        for (let i = 0; i < UPPER_BOUND; i++) {
          table = {
            ...table,
            [i]:
              theInput.filter((item) => item === i).length > 0
                ? theInput.filter((item) => item === i).length
                : 0,
          };
        }
        return table;
      })(crabTable);

      // console.log("init crab table", crabTable);
      // dumpTable(crabTable);

      //main

      function Main(): void {
        let result = Number.MAX_SAFE_INTEGER;
        //loop through all numbers in the available array since this is not linear anymore
        for (let i = MIN; i <= MAX; i++) {
          result = Math.min(result, fuelCount2(i));
        }
        console.log("answer", result);
      }

      console.time("internal main");
      Main();
      console.timeEnd("internal main");

      resolve();
    } catch (error) {
      reject(error);
    }
  });
})();
console.timeEnd("main finished in");
