/* eslint-disable @typescript-eslint/no-unused-vars */
import { dumpFlashGraph, getInput } from "../utils";
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

      let debug_graph = [...new Array(MAX_GRAPH_SIZE + 1)].map(() => {
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

        let new_debug: string[][] = [];
        for (let i = 0; i < debugGraph.length; i++) {
          if (i < foldY) {
            console.log("row here", debugGraph[i]);
            new_debug.push(debugGraph[i]);
          } else continue;
        }

        // reassign debug graph to cut off part of the graph that was folded
        debug_graph = [...new_debug];

        return new_debug;
      }

      function foldOnX(foldX: number, inputGraph: string[][], debugGraph: string[][]): string[][] {
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
        for (let r = 0; r < new_debug.length; r++) {
          new_debug[r] = new_debug[r].slice(0, foldX);
        }

        debug_graph = [...new_debug];

        return new_debug;
      }

      let answerGraph: string[][] = [];

      // all folds for part 2
      for (let i = 0; i < folds.length; i++) {
        switch (true) {
          case /y/g.test(folds[i]):
            {
              const yFold = Number(folds[i].split("=")[1]);
              answerGraph = foldOnY(yFold, init_graph, debug_graph);
            }
            break;
          case /x/g.test(folds[i]):
            {
              const xFold = Number(folds[i].split("=")[1]);
              answerGraph = foldOnX(xFold, init_graph, debug_graph);
            }
            break;
        }
      }

      dumpFlashGraph(answerGraph);

      resolve();
    } catch (error) {
      reject(error);
    }
  });
})();
