import { getInput } from "../utils";

/**
 * object containing all boards with their respective rows
 * stored in a key value pair
 * key being the board-(num) or the board number containing the rows on that board
 */
interface BoardMap {
  /**
   * board-1, board-2, etc..
   */
  [key: string]: {
    rows: Array<string>;
  };
}

(async function (): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      //keep in mind the solve script is running in the context of the dist directory
      // const splitInput = getInput("../day4/input.txt");
      const sample = getInput("../day4/sample.txt");
      let drawnNums = [] as Array<number>;
      let boardMap = {} as BoardMap;
      let boardNum = 0 as number;
      let hitBoundary = 0;

      function getBoardNum(
        currIdx: number,
        currentBoardAmount?: number
      ): number {
        console.log("current board amount", currentBoardAmount);
        if (currIdx >= 1 && currIdx <= 5) {
          return 1;
        } else {
          return 2;
        }
      }

      //sample array will change in place after shift() which removes drawn numbers
      drawnNums = sample
        .shift()
        ?.split(",")
        .map((str) => parseInt(str)) as Array<number>;

      for (let i = 0; i < sample.length; i++) {
        console.log(
          "sample here",
          sample[i],
          "curr idx",
          i,
          "curr idx mod 6",
          i % 6
        );
        if (sample[i] === "") {
          hitBoundary++;
          console.log("hit boundary", hitBoundary);
        }
        //not in range if item was empty space at this input[index] so continue the loop
        // to the next iteration where we will have a new board to push rows onto
        if (sample[i] !== "") {
          boardNum = 0;
          boardNum = getBoardNum(i);
          let boardAmount = Object.keys(boardMap).length;
          if (boardAmount > 1 && hitBoundary > 2) {
            (boardNum as number) = hitBoundary;
          }
          boardMap = {
            ...boardMap,
            [`board-${boardNum}`]: {
              rows:
                !!boardMap[`board-${boardNum}`] &&
                !!boardMap[`board-${boardNum}`].rows
                  ? [...boardMap[`board-${boardNum}`].rows, sample[i]]
                  : [sample[i]],
            },
          };
        }
      }

      console.log(sample);
      // console.log("drawn nums", drawnNums);
      console.log("board map", boardMap);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
})();
