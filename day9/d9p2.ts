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
      let adjList = new Map<string, Array<[number, number]>>();
      let basinLowPoint = { startR: 0, startC: 0 };
      let visitedBool = [] as boolean[][];
      visitedBool = initVisited(visitedBool);
      let currentBasin = 0;

      function initVisited(arr: boolean[][]): boolean[][] {
        arr = [...new Array(theInput.length * 2)].map(() =>
          new Array(theInput.length * 2).fill(false)
        );
        return arr;
      }

      function getAdjToPoint(
        r: number,
        c: number,
        graph: string[][]
      ): Map<string, Array<[number, number]>> {
        let theList = adjList;
        const up = !!graph[r - 1] ? graph[r - 1][c] : void 0;
        const down = !!graph[r + 1] ? graph[r + 1][c] : void 0;
        const left = !!graph[r][c - 1] ? graph[r][c - 1] : void 0;
        const right = !!graph[r][c + 1] ? graph[r][c + 1] : void 0;

        theList.set(graph[r][c], [] as Array<[number, number]>);
        if (!!up) {
          theList.get(graph[r][c])?.push([r - 1, c]);
        }
        if (!!down) {
          theList.get(graph[r][c])?.push([r + 1, c]);
        }
        if (!!left) {
          theList.get(graph[r][c])?.push([r, c - 1]);
        }
        if (!!right) {
          theList.get(graph[r][c])?.push([r, c + 1]);
        }

        return theList;
      }

      function basinBFS(
        startR: number,
        startC: number,
        adjList: Map<string, Array<[number, number]>>,
        visitedBool: boolean[][],
        graph: string[][]
      ): void {
        console.log("what is r c", startR, startC);
        dumpBooleanGraph(visitedBool);
        // implement BFS here!!!
        let theAdjList = adjList;
        const visited = new Set<string>();
        const queue = [[startR, startC]];
        console.log("what is queue here", queue);
        while (queue.length > 0) {
          const [r, c] = queue.shift() as [number, number];
          theAdjList = getAdjToPoint(r, c, graph);
          console.log("adjecency list of current coord we are on", theAdjList);
          console.log("basins now", basins);

          visitedBool[r][c] = true;
          dumpBooleanGraph(visitedBool);
          for (const [row, col] of theAdjList.get(graph[r][c]) as Array<[number, number]>) {
            console.log("current adj coord", row, col);
            if (parseInt(graph[row][col]) === 9) {
              continue;
            }
            if (!visited.has(graph[row][col])) {
              visitedBool[row][col] = true;
              dumpBooleanGraph(visitedBool);
              visited.add(graph[row][col]);
              if (!basins.get(currentBasin)?.includes(parseInt(graph[row][col]))) {
                basins.set(currentBasin, [
                  ...(basins.get(currentBasin) as number[]),
                  parseInt(graph[row][col]),
                ]);
              }
              console.log("basins now", basins);
              queue.push([row, col]);
              console.log("what is queue now", queue);
            }
          }
        }
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
              adjList = new Map<string, Array<[number, number]>>();
              basinBFS(r, c, adjList, visitedBool, theGraph);
              visitedBool = initVisited(visitedBool);
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
