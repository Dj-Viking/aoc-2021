import { checkCorrupt, Stack, getInput } from "../utils";

(async function (): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      let theInput = getInput("../day10/input.txt");
      // let theInput = getInput("../day10/sample.txt");
      //filter out corrupt chunks and only look at incomplete chunks
      const incompleteChunks: Array<string> = theInput.filter((item) => {
        return !checkCorrupt(item).corrupt;
      });
      let stack = new Stack<string>();
      const matching = {
        "(": ")",
        "[": "]",
        "{": "}",
        "<": ">",
      } as Record<string, string>;
      const tokenScore = {
        ")": 1,
        "]": 2,
        "}": 3,
        ">": 4,
      } as Record<string, number>;
      let remainingCharSet = new Map<number, string>();

      // console.log("incomplete chunks", incompleteChunks);

      function getMedian(arr: Array<number>): number {
        let result = 0;
        let a: Array<number> = [];
        arr = arr.sort((a, b) => a - b);
        if (arr.length % 2 === 0) {
          a = new Array(2);
          a[0] = arr[arr.length / 2 - 1];
          a[1] = arr[arr.length / 2];
          result = Math.floor((a[0] + a[1]) / 2);
        } else {
          a = new Array(1);
          a[0] = arr[arr.length / 2 - 0.5];
          result = a[0];
        }
        return result;
      }

      function calcCharset(charset: Array<string>): number {
        let charSums: Array<number> = [];
        for (let s = 0; s < charset.length; s++) {
          let setVal = 0;
          for (let c = 0; c < charset[s].length; c++) {
            setVal *= 5;
            setVal += tokenScore[charset[s][c]];
          }
          charSums.push(setVal);
        }
        charSums = charSums.sort((a, b) => a - b);
        const median = getMedian(charSums);

        return median;
      }

      function switchMatchingChar(rCharset: Map<number, string>): Array<string> {
        let theMap = rCharset;
        let switched: string[] = [];
        const MAP_SIZE = theMap.size;
        const vIterator = theMap.values();

        for (let i = 0; i < MAP_SIZE; i++) {
          switched.push(vIterator.next().value);
        }

        switched = switched.map((str) => {
          let switchedStr = "";
          for (let c = 0; c < str.length; c++) {
            switchedStr += str[c].replace(str[c], matching[str[c]]);
          }
          switchedStr = switchedStr.split("").reverse().join("");
          return switchedStr;
        });

        return switched;
      }

      function createCompletionCharset(incColl: Array<string>): Map<number, string> {
        let charset = 0;
        for (let s = 0; s < incColl.length; s++) {
          charset = s;
          stack = new Stack<string>();
          for (let c = 0; c < incColl[s].length; c++) {
            if (
              incColl[s][c] === "(" ||
              incColl[s][c] === "{" ||
              incColl[s][c] === "[" ||
              incColl[s][c] === "<"
            ) {
              stack.push(incColl[s][c]);
            }
            if (
              incColl[s][c] === ")" ||
              incColl[s][c] === "}" ||
              incColl[s][c] === "]" ||
              incColl[s][c] === ">"
            ) {
              if (matching[stack.peek() as string] === incColl[s][c]) {
                stack.pop();
              }
            }
          }
          remainingCharSet.set(charset, stack.storage.join(""));
          // console.log("remaining map", remainingCharSet);
        }
        // console.log("stack storage now", stack.storage);
        return remainingCharSet;
      }

      remainingCharSet = createCompletionCharset(incompleteChunks);
      const switched = switchMatchingChar(remainingCharSet);
      const answer = calcCharset(switched);
      console.log("answer", answer);

      resolve();
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
})();
