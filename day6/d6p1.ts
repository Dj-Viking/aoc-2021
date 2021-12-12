import { getLanternInput } from "../utils";

interface FishTable {
  [key: string]: number;
}

(async function (): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      // const lanternInput = getLanternInput("../day6/input.txt");
      // const theInput = lanternInput;
      const lanternInput = getLanternInput("../day6/sample.txt");
      const theInput = lanternInput;
      console.log("theInput", theInput);
      let fishTable = {} as FishTable;
      let prevTable = {} as FishTable;
      let fishDays = [] as Array<number>;
      fishDays = theInput.map((str) => parseInt(str));
      console.log("starting fish days'", fishDays);

      function dumpTable(table: FishTable): void {
        for (let i = 0; i < Object.keys(table).length; i++) {
          console.log(`${i}: `, table[i]);
        }
      }
      async function copyToPrev(): Promise<void> {
        return new Promise((resolve) => {
          prevTable = fishTable;
          resolve();
        });
      }

      //zero the table for all allocated space for each day that a fish lives for
      function zeroTable(): void {
        for (let i = 0; i < 9; i++) {
          fishTable = {
            ...fishTable,
            [i]: 0,
          };
        }
      }

      function advanceTable(): void {
        // make first day state table.
        for (let d = 0; d < fishDays.length; d++) {
          for (const key in fishTable) {
            if (key === fishDays[d].toString()) {
              fishTable[key]++;
            }
          }
        }
      }

      // on the next day our first 5 fish will advance a day in their life cycle
      //
      async function nextDay(): Promise<void> {
        // each fish loses a day of their life
        console.log("fish days before changing", fishDays);
        for (let f = 0; f < fishDays.length; f++) {
          fishDays[f]--;
        }
        copyToPrev();
        console.log("previous table");
        dumpTable(prevTable);
        //zero the table to then track the new fish days state
        zeroTable();
        //increment the days on the table
        advanceTable();
        //check if a fish has reached the end of it's life cycle....
        // make a table of the previous day to compare the arriving current day
      }

      //begin
      zeroTable();
      advanceTable();

      console.log("init table");
      dumpTable(fishTable);

      nextDay();
      console.log("next day table");
      dumpTable(fishTable);
      nextDay();
      console.log("next day table");
      dumpTable(fishTable);

      resolve();
    } catch (error) {
      reject(error);
    }
  });
})();
