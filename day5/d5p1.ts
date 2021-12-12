import { getInput, getX1, getX2, getY1, getY2 } from "../utils";

type Graph = number[][];
(async function (): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      //keep in mind the solve script is running in the context of the dist directory

      const splitInput = getInput("../day5/input.txt");
      const coords = splitInput;
      // const sample = getInput("../day5/sample.txt");
      // const coords = sample;
      console.log("coordinates inputs", coords.length);
      const newGraph = [...new Array(coords.length * 2)].map(() =>
        new Array(coords.length * 2).fill(0)
      ) as Graph;

      //lets not point to the new graph as it's being created and reference to a copy and modify the copy
      const graph = newGraph;
      console.log("graph length", graph.length);

      // function dumpBoard() {
      //   console.log("dumping board");
      //   let x, y;
      //   let str = "";
      //   for (y = 0; y < graph.length; y++) {
      //     for (x = 0; x < graph.length; x++) {
      //       str += graph[y][x] === 0 ? "." + " " : graph[y][x].toString() + " ";
      //     }
      //     console.log(str);
      //     str = "";
      //   }
      // }

      function drawVertLine(x: number, y1: number, y2: number): void {
        let y;
        const ys = [y1, y2].sort((a, b) => a - b);
        // plot points at the x position of the graph for every y coordinate between the range of y1 - y2
        for (y = ys[0]; y <= ys[1]; y++) {
          graph[y][x]++;
        }
      }
      function drawHorizLine(y: number, x1: number, x2: number): void {
        let x;
        const xs = [x1, x2].sort((a, b) => a - b);
        for (x = xs[0]; x <= xs[1]; x++) {
          graph[y][x]++;
        }
      }

      for (let row = 0; row < coords.length; row++) {
        let x1 = getX1(coords, row);
        let x2 = getX2(coords, row);
        let y1 = getY1(coords, row);
        let y2 = getY2(coords, row);
        if (x1 === x2) {
          drawVertLine(x1, y1, y2);
        }
        if (y1 === y2) {
          drawHorizLine(y1, x1, x2);
        }
      }

      // dumpBoard();

      let answer = 0;
      for (let y = 0; y < graph.length; y++) {
        for (let x = 0; x < graph.length; x++) {
          if (graph[y][x] > 1) {
            answer++;
          }
        }
      }
      console.log("answer", answer);

      resolve();
    } catch (error) {
      reject(error);
    }
  });
})();
