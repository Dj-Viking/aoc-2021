/**
 * print a matrix to the console
 * @param board 2d array to print
 */
export function dumpBoard(board: number[][]): void {
  console.log("dumping board");
  let x, y;
  let str = "";
  for (y = 0; y < board.length; y++) {
    for (x = 0; x < board.length; x++) {
      str += board[y][x] === 0 ? "." + " " : board[y][x].toString() + " ";
    }
    console.log(str);
    str = "";
  }
}
