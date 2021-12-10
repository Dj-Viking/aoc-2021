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

      let winningBoards = [] as Array<number>;

      //check which board will LOSE first
      //for each board
      // eslint-disable-next-line
        // @ts-ignore
      function boardEx(): { lastDraw: number; whosLast: number } {
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
                  // and store in the winning board map that board if it won
                  // exit
                  // eslint-disable-next-line
                  // @ts-ignore
                  let rowExs = boardMap[`board-${b + 1}`].rows[r].filter((slot) => slot === "x");

                  //check columns with exes part 1 worked even not checking columns...
                  // columns will get filled so have to check this somehow

                  console.log("rows exes", rowExs.length, rowExs, "row", r + 1, "board", b + 1);
                  console.log(
                    "what is board here before checking exes",
                    "board",
                    b + 1,
                    boardMap[`board-${b + 1}`].rows
                  );

                  //check rows with exes
                  if (rowExs.length === 5) {
                    //board won place board in winning board map
                    winningBoards.push(b + 1);
                    console.log("winning boards now", winningBoards);
                  }
                  //check if number of boards in the winning board map is 1 less than the amount of boards in
                  // the entire boardmap
                  // and return which board it is that has not won when all others won
                  if (winningBoards.length === Object.keys(boardMap).length - 1) {
                    // filter out which board number from the boardmap does not match
                    // any of the winning boards

                    //sort winning boards
                    winningBoards = winningBoards.sort((a, b) => a - b);
                    console.log("winning boards now", winningBoards);
                    const currentBoards = Object.keys(boardMap).map((str) =>
                      parseInt(str.split("-")[1])
                    );
                    console.log("board map numbers", currentBoards);
                    for (let bd = 0; bd < currentBoards.length; bd++) {
                      for (const wb of winningBoards) {
                        const lastBoard = currentBoards.filter((b) => b !== wb)[0];
                        return { lastDraw: drawn, whosLast: lastBoard };
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      function getScore(boardMap: BoardMap, lastDraw: number, whosLast: number): void {
        const board = `board-${whosLast}`;
        console.log("calculate score");
        console.log("what is the board that was last", boardMap[board].rows);
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
        console.log("nums of last board", nums);
        console.log("sum", sum);
        console.log("answer", sum * lastDraw);
        // sum all numbers left on the winning board * last number
        // multiply that sum by the last number that was called => solution
      }
      const { lastDraw, whosLast } = boardEx();
      console.log("did we get what we need", lastDraw, whosLast);
      // boardEx();
      getScore(boardMap, lastDraw, whosLast);

      resolve();
    } catch (error) {
      reject(error);
    }
  });
})();
