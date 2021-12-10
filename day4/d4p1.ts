import { getInput } from "../utils";

//bingo game win by completing a row, column, or diagonal.

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
    rows: Array<string | number | Array<number>>;
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
      let xs = 0;

      function getBoardNum(currIdx: number): number {
        if (currIdx >= 1 && currIdx <= 5) {
          return 1;
        } else {
          return 2;
        }
      }

      drawnNums = sample
        .shift()
        ?.split(",")
        .map((str) => parseInt(str)) as Array<number>;

      console.log("samples after shifting drawn nums out", sample);

      for (let i = 0; i < sample.length; i++) {
        //keep tabs on how many times we hit a boundary
        // to determine if we increment the board number
        if (sample[i] === "") hitBoundary++;
        if (sample[i] !== "") {
          boardNum = 0;
          boardNum = getBoardNum(i);
          if (Object.keys(boardMap).length > 1 && hitBoundary > 2) boardNum = hitBoundary;
          boardMap = {
            ...boardMap,
            [`board-${boardNum}`]: {
              rows:
                !!boardMap[`board-${boardNum}`] && !!boardMap[`board-${boardNum}`].rows
                  ? ([...boardMap[`board-${boardNum}`].rows, sample[i]] as Array<string>)
                  : [sample[i]],
            },
          };
        }
      }
      console.log("board map", boardMap);

      //convert the board map rows array into an Array<Array<number>>
      console.log("amount of boards now", Object.keys(boardMap).length);
      for (let b = 0; b < Object.keys(boardMap).length; b++) {
        boardMap = {
          ...boardMap,
          [`board-${b + 1}`]: {
            rows: boardMap[`board-${b + 1}`].rows
              .join(" ")
              .match(/\d{1,2}/g)
              ?.map((str) => parseInt(str))
              .map((_, i, arr): Array<number> | void =>
                i % 5 === 1 ? [arr[i - 1], arr[i], arr[i + 1], arr[i + 2], arr[i + 3]] : void 0
              )
              .filter((item) => item !== void 0) as Array<Array<number>>,
          },
        };
      }

      console.log("new board map", boardMap);

      console.log("new board row 1", boardMap["board-1"].rows);
      console.log("new board row 2", boardMap["board-2"].rows);
      console.log("new board row 3", boardMap["board-3"].rows);

      console.log("drawn nums", drawnNums);

      function boardEx(boardMap: BoardMap, drawn: number): void {
        //check which board will win first
        //for each board
        for (let s = 0; s < Object.keys(boardMap).length; s++) {
          //for each row of the board
          for (let r = 0; r < boardMap[`board-${s + 1}`].rows.length; r++) {
            //for each num in the row
            for (
              let n = 0;
              // eslint-disable-next-line
              // @ts-ignore
              n < (boardMap[`board-${s + 1}`].rows[r].length as Array<Array<number>>["length"]);
              n++
            ) {
              // eslint-disable-next-line
              // @ts-ignore
              if (boardMap[`board-${s + 1}`].rows[r][n] === drawn) {
                // eslint-disable-next-line
                // @ts-ignore
                boardMap[`board-${s + 1}`].rows[r][n] = "yo"; //stuck here.....
              }
            }
          }
        }
      }

      for (const draw of drawnNums) {
        boardEx(boardMap, draw);
      }

      //check marked numbers with x in that position
      console.log("x board 1", boardMap["board-1"].rows);
      console.log("x board 2", boardMap["board-2"].rows);
      console.log("x board 3", boardMap["board-3"].rows);

      //add all unmarked numbers on the board that won first
      // multiply that sum by the last number that was called => solution

      // console.log(sample);
      // console.log("drawn nums", drawnNums);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
})();
