import { getInput } from "../utils/getInput";
(async function (): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      let theInput = getInput("../day9/input.txt").map((str) => {
        return str.split("");
      });

      // let theInput = getInput("../day9/sample.txt").map((str) => {
      //   return str.split("");
      // });
      console.log("the input", theInput);

      function dumpGraph(graph: string[][]): void {
        for (let i = 0; i < graph.length; i++) {
          console.log(`${graph[i]}`.replace(/,/g, ""));
        }
      }
      // dumpGraph(theInput);
      type EdgeType = "corner" | "side" | "top-bottom";
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

      function isLowerThanAdj(
        item: string,
        graph: string[][],
        row: number,
        col: number,
        edgeType?: EdgeType | void
      ): boolean {
        if (!!edgeType) {
          switch (edgeType) {
            case "corner": {
              //check bounds of top right corner
              if (!!graph[row + 1] && !!graph[row][col - 1] && !!graph[row + 1][col]) {
                if (
                  //top right corner (left down)
                  parseInt(item) < parseInt(graph[row][col - 1]) &&
                  parseInt(item) < parseInt(graph[row + 1][col])
                ) {
                  return true;
                }
                return false;
              }
              //check bounds of top left corner
              if (!!graph[row][col + 1] && !!graph[row + 1] && !!graph[row + 1][col]) {
                if (
                  // (right down)
                  parseInt(item) < parseInt(graph[row][col + 1]) &&
                  parseInt(item) < parseInt(graph[row + 1][col])
                ) {
                  return true;
                }
                return false;
              }
              //check bounds of bottom left corner
              if (!!graph[row][col + 1] && !!graph[row - 1][col]) {
                if (
                  // (right up)
                  parseInt(item) < parseInt(graph[row][col + 1]) &&
                  parseInt(item) < parseInt(graph[row - 1][col])
                ) {
                  return true;
                }
                return false;
              }
              //check bounds of bottom right corner
              if (!!graph[row][col - 1] && !!graph[row - 1][col]) {
                if (
                  // (left up)
                  parseInt(item) < parseInt(graph[row][col - 1]) &&
                  parseInt(item) < parseInt(graph[row - 1][col])
                ) {
                  return true;
                }
                return false;
              }
              break;
            }
            case "side": {
              // check bounds of right side edge
              if (!!graph[row - 1][col] && !!graph[row][col - 1] && !!graph[row + 1][col]) {
                // (up left down)
                if (
                  parseInt(item) < parseInt(graph[row - 1][col]) &&
                  parseInt(item) < parseInt(graph[row][col - 1]) &&
                  parseInt(item) < parseInt(graph[row + 1][col])
                ) {
                  return true;
                }
                return false;
              }
              // check bounds of left side edge
              if (!!graph[row - 1][col] && !!graph[row][col + 1] && !!graph[row + 1][col]) {
                // (up right down)
                if (
                  parseInt(item) < parseInt(graph[row - 1][col]) &&
                  parseInt(item) < parseInt(graph[row][col + 1]) &&
                  parseInt(item) < parseInt(graph[row + 1][col])
                ) {
                  return true;
                }
                return false;
              }
              break;
            }
            case "top-bottom": {
              // check bounds of top edge
              if (
                !!graph[row + 1] &&
                !!graph[row][col - 1] &&
                !!graph[row][col + 1] &&
                !!graph[row + 1][col]
              ) {
                // (left down right)
                if (
                  parseInt(item) < parseInt(graph[row][col - 1]) &&
                  parseInt(item) < parseInt(graph[row][col + 1]) &&
                  parseInt(item) < parseInt(graph[row + 1][col])
                ) {
                  return true;
                }
                return false;
              }
              // check bounds of bottom edge
              if (
                !!graph[row - 1] &&
                !!graph[row][col - 1] &&
                !!graph[row - 1][col] &&
                !!graph[row][col + 1]
              ) {
                // ( left up right )
                if (
                  parseInt(item) < parseInt(graph[row][col - 1]) &&
                  parseInt(item) < parseInt(graph[row - 1][col]) &&
                  parseInt(item) < parseInt(graph[row][col + 1])
                ) {
                  return true;
                }
                return false;
              }
            }
          }
        } else {
          //for any number not an an edge
          // (up down left right)
          if (
            parseInt(item) < parseInt(graph[row - 1][col]) &&
            parseInt(item) < parseInt(graph[row + 1][col]) &&
            parseInt(item) < parseInt(graph[row][col - 1]) &&
            parseInt(item) < parseInt(graph[row][col + 1])
          )
            return true;
          return false;
        }
        return false;
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
      dumpGraph(theInput);
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
