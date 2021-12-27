import { getInput, isEdge, isLowerThanAdj /*dumpBooleanGraph*/ } from "../utils";
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
        let theList = new Map<string, Array<[number, number]>>();
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
        // console.log("what is r c", startR, startC);
        // dumpBooleanGraph(visitedBool);
        // implement BFS here!!!
        let theAdjList = adjList;
        const queue = [[startR, startC]];
        // console.log("what is queue here", queue);
        while (queue.length > 0) {
          const [r, c] = queue.shift() as [number, number];
          theAdjList = getAdjToPoint(r, c, graph);
          //visited first coordinate in the queue
          // was added to basin before entering bfs
          visitedBool[r][c] = true;
          // dumpBooleanGraph(visitedBool);
          for (const [row, col] of theAdjList.get(graph[r][c]) as Array<[number, number]>) {
            if (parseInt(graph[row][col]) === 9) {
              continue;
            }
            if (visitedBool[row][col] === false) {
              //havent visited the coordinate yet if on next iteration of this loop
              // of all the adjacencies of the current coordinate in the queue
              visitedBool[row][col] = true;
              // dumpBooleanGraph(visitedBool);
              basins.set(currentBasin, [
                ...(basins.get(currentBasin) as number[]),
                parseInt(graph[row][col]),
              ]);
              // console.log("basins now", basins);
              queue.push([row, col]);
              // console.log("what is queue now", queue);
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

      function calcBasins(basins: Map<number, number[]>): number {
        let result = 0;
        let basinCollection = [] as number[][]; //sizes of basins
        // find 3 biggest basins and multiply their sizes
        const valIterator = basins.values();

        // console.log("map size", basins.size);
        // console.log("iterator of the basins map keys", valIterator);
        for (let i = 0; i < basins.size; i++) {
          basinCollection.push(valIterator.next().value);
        }
        // console.log("largest basins before filtering", basinCollection);
        let sizes = [] as number[];
        for (let j = 0; j < basinCollection.length; j++) {
          sizes.push(basinCollection[j].length);
        }
        // console.log("sizes now", sizes);
        sizes = sizes.sort((a, b) => a - b);
        // console.log("sizes now", sizes, "sizes length", sizes.length);
        // for (let r = 0; r < sizes.length; r++) {
        //   console.log(sizes[r]);
        //   if (r % 10 === 0) {
        //     console.log("\n");
        //   }
        // }
        // console.log("sizes length - 3", sizes.length - 3);
        // console.log("sizes now", sizes);
        result = sizes
          .sort((a, b) => a - b)
          .slice(sizes.length - 3, sizes.length)
          .reduce((curr, next) => (curr *= next));
        return result;
      }

      theInput = findLowPoints(theInput);
      // dumpGraph(theInput);
      // console.log("\n");
      findBasins(theInput);
      // console.log("\n");
      // console.log("basins now after finding basins", basins);
      const answer = calcBasins(basins);
      console.log("answer", answer);

      resolve();
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
})();
