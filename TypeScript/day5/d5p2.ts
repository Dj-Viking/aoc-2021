import { getInput, /*dumpBoard,*/ getX1, getX2, getY1, getY2 } from "../utils";

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

      function drawLine(x1: number, y1: number, x2: number, y2: number): void {
        let x, y, i;
        //line length based on input coordinates
        let n = Math.max(Math.abs(x2 - x1) + 1, Math.abs(y2 - y1) + 1);
        for (i = 0; i < n; i++) {
          //determine what points to plot
          x = x1 + Math.sign(x2 - x1) * i;
          y = y1 + Math.sign(y2 - y1) * i;
          graph[y][x]++;
        }
      }

      for (let row = 0; row < coords.length; row++) {
        let x1 = getX1(coords, row);
        let x2 = getX2(coords, row);
        let y1 = getY1(coords, row);
        let y2 = getY2(coords, row);

        //horiz and verticals
        //if (x1 === x2 || y1 === y2) drawLine(x1, y1, x2, y2);

        //draw horiz, vert, and diag
        drawLine(x1, y1, x2, y2);
      }

      // dumpBoard(graph);

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
