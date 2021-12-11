import { getInput, getX1, getX2, getY1, getY2 } from "../utils";

type Graph = number[][];

(async function (): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      //keep in mind the solve script is running in the context of the dist directory

      // const splitInput = getInput("../day5/input.txt");
      // const theInput = splitInput;
      const sample = getInput("../day5/sample.txt");
      const theInput = sample;
      console.log("the input", theInput);
      const graph = new Array(theInput.length).fill(
        "0"
          .repeat(10)
          .split("")
          .map((str) => parseInt(str))
      ) as Graph;

      function dumpBoard() {
        console.log("dumping board");
        let x, y;
        let str = "";
        for (y = 0; y < graph.length; y++) {
          for (x = 0; x < graph.length; x++) {
            str += graph[y][x].toString() + " ";
          }
          console.log(str);
          str = "";
        }
      }

      function drawVertLine(x: number, y1: number, y2: number): void {
        let y;
        const ys = [y1, y2].sort((a, b) => a - b);
        console.log("what are ys", ys);
        for (y = ys[0]; y <= ys[1]; y++) {
          console.log("what is x here", x);
          console.log("what is y here", y);
          graph[y][x]++;
        }
      }
      // function drawHorizLine(y: number, x1: number, x2: number): void {}

      console.log("coordinates");
      for (let row = 0; row < theInput.length; row++) {
        let x1 = getX1(theInput, row);
        let x2 = getX2(theInput, row);
        let y1 = getY1(theInput, row);
        let y2 = getY2(theInput, row);
        console.log("x1 =", x1, "x2 =", x2, "y1 =", y1, "y2 =", y2);
        if (x1 === x2) {
          drawVertLine(x1, y1, y2);
        }
      }

      dumpBoard();

      resolve();
    } catch (error) {
      reject(error);
    }
  });
})();
