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

      // initialize graphs for the work
      const init_graph = Array.from(dots, (coord) => coord.split(","));

      const flat_graph = init_graph.flat<string[][], 1>(1).map((str) => Number(str));

      const MAX_GRAPH_SIZE = Math.max(...flat_graph);

      const debug_graph = [...new Array(MAX_GRAPH_SIZE + 1)].map(() => {
        return new Array(MAX_GRAPH_SIZE + 1).fill(".");
      }) as string[][];

      // populate debug with current plotted coordinates from input
      for (let r = 0; r < init_graph.length; r++) {
        const [x, y] = init_graph[r];
        debug_graph[Number(y)][Number(x)] = "#";
      }

      function foldOnY(foldY: number, inputGraph: string[][], debugGraph: string[][]): string[][] {
        for (let r = 0; r < inputGraph.length; r++) {
          const [xstr, ystr] = inputGraph[r];
          const x = Number(xstr);
          const y = Number(ystr);

          // fold bottom half UP
          if (y > foldY) {
            // swap debug graph points
            debugGraph[y][x] = ".";
            const newYCoord = foldY * 2 - y;
            // need to change our coordinate reference to use the new coordinates after the fold over X
            inputGraph[r] = [xstr, newYCoord.toString()];
            debugGraph[newYCoord][x] = "#";
          }
        }
        let new_debug = [...debugGraph];
        // dumpBoard(new_debug);
        // new_debug = [...new_debug].slice(0, foldY);
        return new_debug;
      }

      function foldOnX(foldX: number, inputGraph: string[][], debugGraph: string[][]): string[][] {
        //
        for (let r = 0; r < inputGraph.length; r++) {
          const [xstr, ystr] = inputGraph[r];
          const x = Number(xstr);
          const y = Number(ystr);

          //fold right side over to the left
          if (x > foldX) {
            debugGraph[y][x] = ".";
            const newXCoord = foldX * 2 - x;
            inputGraph[r] = [newXCoord.toString(), ystr];
            debugGraph[y][newXCoord] = "#";
          }
        }
        const new_debug = [...debugGraph];
        // slice the x coordinates past x === foldNum
        // for (let r = 0; r < new_debug.length; r++) {
        //   new_debug[r] = debugGraph[r].slice(0, foldX);
        // }
        return new_debug;
      }

      let answerArray: string[][] = [];

      // only one fold for part 1
      for (let i = 0; i < 1; i++) {
        if (/y/g.test(folds[i])) {
          const yFold = Number(folds[i].split("=")[1]);
          answerArray = foldOnY(yFold, init_graph, debug_graph);
        }
        if (/x/g.test(folds[i])) {
          const xFold = Number(folds[i].split("=")[1]);
          answerArray = foldOnX(xFold, init_graph, debug_graph);
        }
      }

      function dotsVisibleAfterFirstFold(graph: string[][]): number {
        let result = 0;

        for (let r = 0; r < graph.length; r++) {
          for (let c = 0; c < graph[r].length; c++) {
            if (graph[r][c] === "#") result++;
          }
        }

        return result;
      }

      // console.log("answer array", answerArray);

      const answer = dotsVisibleAfterFirstFold(answerArray);
      console.log("answer", answer);

      resolve();
    } catch (error) {
      reject(error);
    }
  });
})();
