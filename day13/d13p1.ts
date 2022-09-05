/* eslint-disable @typescript-eslint/no-unused-vars */
import { /*dumpBoard,*/ getInput } from "../utils";
(async function (): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      // const theInput = getInput("../day13/sample.txt");
      const theInput = getInput("../day13/input.txt");
      console.log("input", theInput);
      const dots = theInput
        .map((str) => {
          return !/fold/g.test(str) && str;
        })
        .filter((item) => !!item) as Array<string>;

      const folds = theInput
        .map((str) => {
          return /fold/g.test(str) && str;
        })
        .filter((item) => !!item) as Array<string>;

      console.log("dots", dots);
      console.log("folds", folds);

      const foldY = Number(folds[0].split("=")[1]);
      const foldX = Number(folds[1].split("=")[1]);

      const init_graph = Array.from(dots, (coord) => coord.split(","));

      // console.log("init graph", init_graph);

      const flat_graph = init_graph.flat<string[][], 1>(1).map((str) => Number(str));

      const MAX_GRAPH_SIZE = Math.max(...flat_graph);

      const debug_graph = [...new Array(MAX_GRAPH_SIZE + 1)].map(() => {
        return new Array(MAX_GRAPH_SIZE + 1).fill(".");
      }) as unknown[][];

      for (let r = 0; r < init_graph.length; r++) {
        const [x, y] = init_graph[r];
        debug_graph[Number(y)][Number(x)] = "#";
      }
      // dumpBoard(debug_graph);

      // fold along y first
      function foldOnY(foldNum: number): void {
        for (let r = 0; r < init_graph.length; r++) {
          const [xstr, ystr] = init_graph[r];
          const x = Number(xstr);
          const y = Number(ystr);

          // fold bottom half UP
          if (y > foldNum) {
            // swap debug graph points
            debug_graph[y][x] = ".";
            const newYCoord = foldNum * 2 - y;
            // need to change our coordinate reference to use the new coordinates after the fold over X
            init_graph[r] = [xstr, newYCoord.toString()];
            debug_graph[newYCoord][x] = "#";
          }
        }
      }

      function dotsVisibleAfterFirstFold(graph: any[][]): number {
        let result = 0;

        for (let r = 0; r < graph.length; r++) {
          for (let c = 0; c < graph[r].length; c++) {
            if (graph[r][c] === "#") result++;
          }
        }

        return result;
      }

      foldOnY(foldY);

      const answer = dotsVisibleAfterFirstFold(debug_graph);
      console.log("answer", answer);

      console.log("\nafter y fold");
      // dumpBoard(debug_graph);

      // fold along x next
      function foldOnX(foldNum: number): void {
        //
        for (let r = 0; r < init_graph.length; r++) {
          const [xstr, ystr] = init_graph[r];
          const x = Number(xstr);
          const y = Number(ystr);

          //fold right side over to the left
          if (x > foldNum && y < foldY) {
            debug_graph[y][x] = ".";
            const newXCoord = foldNum * 2 - x;
            debug_graph[y][newXCoord] = "#";
          }
        }
      }

      foldOnX(foldX);

      console.log("\n after x fold");
      // dumpBoard(debug_graph);

      const new_debug = debug_graph.slice(0, 7);
      console.log("\n sliced debug");
      // dumpBoard(new_debug);
      // slice the x coordinates past x === 5
      for (let r = 0; r < new_debug.length; r++) {
        new_debug[r] = new_debug[r].slice(0, 5);
      }
      // console.log("new debug", new_debug);

      resolve();
    } catch (error) {
      reject(error);
    }
  });
})();
