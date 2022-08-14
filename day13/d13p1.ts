/* eslint-disable @typescript-eslint/no-unused-vars */
import { dumpBoard, getInput } from "../utils";
(async function (): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const theInput = getInput("../day13/sample.txt");
      // const theInput = getInput("../day13/input.txt");
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

      const init_graph = Array.from(dots, (coord) => coord.split(","));

      const flat_graph = init_graph.flat<string[][], 1>(1).map((str) => Number(str));

      const MAX_GRAPH_SIZE = Math.max(...flat_graph);

      const debug_graph = [...new Array(MAX_GRAPH_SIZE + 1)].map(() => {
        return new Array(MAX_GRAPH_SIZE + 1).fill(".");
      }) as unknown[][];

      //dump points on graph
      (() => {
        for (let r = 0; r < init_graph.length; r++) {
          const [x, y] = init_graph[r];
          debug_graph[Number(y)][Number(x)] = "#";
        }
        dumpBoard(debug_graph);
      })();

      resolve();
    } catch (error) {
      reject(error);
    }
  });
})();
