import { isLowerThanAdj, EdgeType, getInput } from "../utils";
(async function (): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      let theInput = getInput("../day9/input.txt").map((str) => {
        return str.split("");
      });

      // let theInput = getInput("../day9/sample.txt").map((str) => {
      //   return str.split("");
      // });
      // console.log("the input", theInput);

      // function dumpGraph(graph: string[][]): void {
      //   for (let i = 0; i < graph.length; i++) {
      //     console.log(`${graph[i]}`.replace(/,/g, ""));
      //   }
      // }
      // dumpGraph(theInput);

      function isEdge(
        graph: string[][],
        row: number,
        col: number
      ): { isEdge: boolean; type: EdgeType | void } {
        switch (true) {
          //corners
          case (col === 0 || col === graph[row].length - 1) &&
            (row === 0 || row === graph.length - 1):
            return { isEdge: true, type: "corner" };
          //side edges not on top or bottom
          case (col === 0 || col === graph[row].length - 1) &&
            (row > 0 || row === graph.length - 2):
            return { isEdge: true, type: "side" };
          // top and bottom edges but not corners
          case (row === 0 || row === graph.length - 1) && (col > 0 || col < graph[row].length - 1):
            return { isEdge: true, type: "top-bottom" };
        }
        return { isEdge: false, type: void 0 };
      }

      function sumRiskLevel(nums: number[]): number {
        let result = 0;
        result = nums.map((num) => num + 1).reduce((curr, next) => curr + next, 0);
        return result;
      }

      function extractLowPoints(graph: string[][]): number[] {
        const nums = [] as number[];
        for (let r = 0; r < graph.length; r++) {
          for (let c = 0; c < graph[r].length; c++) {
            if (/\[/g.test(graph[r][c])) {
              let str = graph[r][c].replace(/\[|\]/g, "");
              nums.push(parseInt(str));
            }
          }
        }
        return nums;
      }

      function findLowPoints(graph: string[][]): string[][] {
        let theGraph = graph;
        for (let r = 0; r < theGraph.length; r++) {
          for (let c = 0; c < theGraph[r].length; c++) {
            const edge = isEdge(theGraph, r, c);
            if (!!edge.isEdge && !!edge.type) {
              if (isLowerThanAdj(theGraph[r][c], theGraph, r, c, edge.type)) {
                theGraph[r][c] = "[" + theGraph[r][c] + "]";
              }
            } else {
              if (isLowerThanAdj(theGraph[r][c], theGraph, r, c)) {
                theGraph[r][c] = "[" + theGraph[r][c] + "]";
              }
            }
          }
        }
        return theGraph;
      }

      theInput = findLowPoints(theInput);
      const nums = extractLowPoints(theInput);
      const answer = sumRiskLevel(nums);
      console.log("answer", answer);

      resolve();
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
})();
