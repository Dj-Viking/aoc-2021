// research DFS graph traversal
import { getInput, isEdge, isLowerThanAdj, dumpBooleanGraph } from "../utils";
(async function (): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      // let theInput = getInput("../day9/input.txt").map((str) => {
      //   return str.split("");
      // });
      let theInput = getInput("../day9/sample.txt").map((str) => {
        return str.split("");
      });

      console.log("the input", theInput);
      // dump the graph to see the numbers squared off without the space between the [] and the next number
      // looks neater
      function dumpGraph(graph: string[][]): void {
        for (let i = 0; i < graph.length; i++) {
          console.log(
            `${graph[i]}`
              .replace(/,/g, " ")
              .replace(/\s(?=\[)/g, "") //remove the space only if it was preceded by a [ character
              .replace(/(?<=\])\s/g, "") // remove the space only if it was followed by a ] character
          );
        }
      }

      const basins = new Map<number, Array<number>>();
      let basinLowPoint = { startR: 0, startC: 0 };
      let visited = [] as boolean[][];
      visited = initVisited(visited);
      let currentBasin = 0;

      function initVisited(arr: boolean[][]): boolean[][] {
        arr = [...new Array(theInput.length * 2)].map(() =>
          new Array(theInput.length * 2).fill(false)
        );
        return arr;
      }

      function basinDFS(
        startR: number,
        startC: number,
        visited: boolean[][],
        graph: string[][]
      ): void {
        console.log("what is r c", startR, startC);
        // implement BFS here!!!
      }

      function findBasins(graph: string[][]): void {
        let theGraph = graph;
        for (let r = 0; r < theGraph.length; r++) {
          for (let c = 0; c < theGraph[r].length; c++) {
            if (/\[/g.test(theGraph[r][c])) {
              currentBasin++;
              theGraph[r][c] = theGraph[r][c].replace(/\[|\]/g, "");
              basinLowPoint.startR = r;
              basinLowPoint.startC = c;
              basins.set(currentBasin, []);
              basins.set(currentBasin, [
                ...(basins.get(currentBasin) as number[]),
                parseInt(graph[r][c]),
              ]);
              basinDFS(r, c, visited, theGraph);
              visited = initVisited(visited);
            }
          }
        }
        return;
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
      console.log("\n");
      findBasins(theInput);
      console.log("\n");

      resolve();
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
})();
