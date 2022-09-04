/**
 * print a matrix to the console
 * @param board 2d array to print
 */
export function dumpBoard(board: any[][]): void {
  console.log("dumping board");
  let x, y;
  let str = "";

  //display x axis on top of the board
  console.log(
    "   ",
    [...new Array(board.length).fill(null).map((_slot: void, index: number) => index)]
      .toString()
      .split(/,/g)
      .map((num) => {
        let int = Number(num);
        if (int >= 10) {
          return `${int}`;
        } else {
          return `${int} `;
        }
      })
      .join("")
  );

  for (y = 0; y < board.length; y++) {
    for (x = 0; x < board.length; x++) {
      str += board[y][x] === 0 ? "." + " " : board[y][x].toString() + " ";
    }
    // display y axis on left side of the board
    if (y >= 10) {
      console.log("y" + y + " " + str);
    } else {
      console.log("y " + y + " " + str);
    }
    str = "";
  }
}
export function dumpFlashGraph(graph: number[][]): void {
  console.log("dumping graph\n");
  let str = "";
  for (let r = 0; r < graph.length; r++) {
    for (let c = 0; c < graph[r].length; c++) {
      str += graph[r][c].toString() + " ";
    }
    console.log(str);
    str = "";
  }
}

export function dumpBooleanGraph(board: any[][]): void {
  console.log("dumping boolean graph\n");
  let x, y;
  let str = "";
  for (y = 0; y < board.length; y++) {
    //row
    for (x = 0; x < board.length; x++) {
      //column
      str += board[y][x] === false ? "." + " " : "*" + " ";
    }
    console.log(str);
    str = "";
  }
}
