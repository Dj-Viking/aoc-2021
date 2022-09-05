import { getLanternInput } from "../utils";

interface FishTable {
  [key: string | number]: number;
}

(async function (): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const lanternInput = getLanternInput("../day6/input.txt")
        .map((str) => parseInt(str))
        .sort((a, b) => a - b);
      const theInput = lanternInput;

      // const lanternInput = getLanternInput("../day6/sample.txt")
      //   .map((str) => parseInt(str))
      //   .sort((a, b) => a - b);
      // const theInput = lanternInput;

      // console.log("theInput", theInput);

      let fishTable = {} as FishTable;
      const TABLE_SIZE = 9;
      const DAYS = 256;

      function initTable(ft: FishTable): FishTable {
        let table = ft;
        for (let i = 0; i < TABLE_SIZE; i++) {
          table = {
            ...table,
            [i]:
              theInput.filter((item) => item === i).length > 0
                ? theInput.filter((item) => item === i).length
                : 0,
          };
        }
        return table;
      }

      // on the next day our first 5 fish will advance a day in their life cycle
      function nextDay(): void {
        // each fish loses a day of their life
        console.time("shift fish days");
        let birthFactor = fishTable[0];
        fishTable[0] = 0;
        for (let k = 1; k < TABLE_SIZE; k++) {
          fishTable[k - 1] += fishTable[k];
          fishTable[k] = 0;
        }
        fishTable[8] = birthFactor;
        fishTable[6] += birthFactor;
        console.timeEnd("shift fish days");
      }

      //begin
      fishTable = initTable(fishTable);
      console.log("init table", fishTable);

      for (let day = 0; day < DAYS; day++) {
        console.log("calculating fishes....please stand by...day: ", day + 1);
        nextDay();
        console.log("fish map", fishTable, "day", day + 1);
      }
      console.log("answer", sumFishes(fishTable));

      function sumFishes(table: FishTable): number {
        return Object.keys(table)
          .map((key) => {
            return table[key];
          })
          .reduce((total, curr) => total + curr, 0);
      }

      resolve();
    } catch (error) {
      reject(error);
    }
  });
})();
