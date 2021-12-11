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
      const splitInput = getInput("../day4/input.txt");
      // const sample = getInput("../day4/sample.txt");
      let drawnNums = [] as Array<number>;
      let boardMap = {} as BoardMap;
      let boardNum = 0 as number;
      let hitBoundary = 0;

      function getBoardNum(currIdx: number): number {
        if (currIdx >= 1 && currIdx <= 5) {
          return 1;
        } else {
          return 2;
        }
      }

      drawnNums = splitInput
        .shift()
        ?.split(",")
        .map((str) => parseInt(str)) as Array<number>;

      console.log("splitInputs after shifting drawn nums out", splitInput);

      for (let i = 0; i < splitInput.length; i++) {
        //keep tabs on how many times we hit a boundary
        // to determine if we increment the board number
        if (splitInput[i] === "") hitBoundary++;
        if (splitInput[i] !== "") {
          boardNum = 0;
          boardNum = getBoardNum(i);
          if (Object.keys(boardMap).length > 1 && hitBoundary > 2) boardNum = hitBoundary;
          boardMap = {
            ...boardMap,
            [`board-${boardNum}`]: {
              rows:
                !!boardMap[`board-${boardNum}`] && !!boardMap[`board-${boardNum}`].rows
                  ? ([...boardMap[`board-${boardNum}`].rows, splitInput[i]] as Array<string>)
                  : [splitInput[i]],
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

      //check which board will win first
      //for each board
      // eslint-disable-next-line
        // @ts-ignore
      function boardEx(): { lastDraw: number; whoWon: string } {
        for (const drawn of drawnNums) {
          console.log("drawn", drawn);
          for (let b = 0; b < Object.keys(boardMap).length; b++) {
            // for each row
            for (let r = 0; r < boardMap[`board-${b + 1}`].rows.length; r++) {
              //for each num in row
              // eslint-disable-next-line
              // @ts-ignore
              for (let n = 0; n < boardMap[`board-${b + 1}`].rows[r].length; n++) {
                // eslint-disable-next-line
                  // @ts-ignore
                if (boardMap[`board-${b + 1}`].rows[r][n] === drawn) {
                  // eslint-disable-next-line
                  // @ts-ignore
                  boardMap[`board-${b + 1}`].rows[r][n] = "x";

                  //check boards for winner
                  // eslint-disable-next-line
                  // @ts-ignore
                  let rowExs = boardMap[`board-${b + 1}`].rows[r].filter((slot) => slot === "x");

                  console.log("rows exes", rowExs.length, rowExs, "row", r + 1, "board", b + 1);
                  console.log(
                    "what is board here before checking exes",
                    "board",
                    b + 1,
                    boardMap[`board-${b + 1}`].rows
                  );
                  //check columns with exes part 1 worked even not checking columns...

                  //check rows with exes
                  if (rowExs.length === 5) {
                    console.log("SHOULD EXIT");
                    return { lastDraw: drawn, whoWon: (b + 1).toString() };
                  }
                }
              }
            }
          }
        }
      }
      function getScore(boardMap: BoardMap, lastDraw: number, whoWon: string): void {
        const board = `board-${whoWon}`;
        console.log("calculate score");
        console.log("what is the board that won", boardMap[board].rows);
        let nums = [] as Array<number>;
        for (let r = 0; r < boardMap[board].rows.length; r++) {
          // eslint-disable-next-line
          // @ts-ignore
          for (let n = 0; n < boardMap[board].rows[r].length; n++) {
            // eslint-disable-next-line
            // @ts-ignore
            if (typeof boardMap[board].rows[r][n] === "number")
              // eslint-disable-next-line
            // @ts-ignore
              nums.push(boardMap[board].rows[r][n]);
          }
        }
        const sum = nums.reduce((curr, next) => curr + next, 0);
        console.log("nums of winning board", nums);
        console.log("sum", sum);
        console.log("answer", sum * lastDraw);
        // sum all numbers left on the winning board * last number
        // multiply that sum by the last number that was called => solution
      }
      const { lastDraw, whoWon } = boardEx();
      getScore(boardMap, lastDraw, whoWon);

      resolve();
    } catch (error) {
      reject(error);
    }
  });
})();
