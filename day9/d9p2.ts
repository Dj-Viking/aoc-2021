// research DFS graph traversal
import { getInput, isEdge, isLowerThanAdj, dumpBoard } from "../utils";
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
        visited[startR][startC] = true;
        dumpBoard(visited);

        // basins.set(currentBasin, [
        //   ...(basins.get(currentBasin) as number[]),
        //   parseInt(graph[startR][startC]),
        // ]);
        const up =
          !!graph[startR - 1] && !!graph[startR - 1][startC] ? graph[startR - 1][startC] : void 0;
        const down =
          !!graph[startR + 1] && !!graph[startR + 1][startC] ? graph[startR + 1][startC] : void 0;
        const left = !!graph[startR][startC - 1] ? graph[startR][startC - 1] : void 0;
        const right = !!graph[startR][startC + 1] ? graph[startR][startC + 1] : void 0;
        console.log("up", up, "down", down, "left", left, "right", right);
        // store neighbors up down left right as visited
        switch (true) {
          case !!up && visited[startR - 1][startC] === false: {
            visited[startR - 1][startC] = true;
            if (parseInt(up as string) !== 9) {
              basins.set(currentBasin, [
                ...(basins.get(currentBasin) as number[]),
                parseInt(graph[startR - 1][startC]),
              ]);
              console.log("basins now", basins);
              // recurse at this new point that we added to the basin
              return basinDFS(startR - 1, startC, visited, graph);
            } else {
              // recurse from the current point because we visited a 9
              return basinDFS(startR, startC, visited, graph);
            }
          }
          case !!down && visited[startR + 1][startC] === false: {
            visited[startR + 1][startC] = true;
            if (parseInt(down as string) !== 9) {
              basins.set(currentBasin, [
                ...(basins.get(currentBasin) as number[]),
                parseInt(graph[startR + 1][startC]),
              ]);
              console.log("basins now", basins);
              return basinDFS(startR + 1, startC, visited, graph);
            } else {
              //was nine start over
              return basinDFS(startR, startC, visited, graph);
            }
          }
          case !!left && visited[startR][startC - 1] === false: {
            visited[startR][startC - 1] = true;
            if (parseInt(left as string) !== 9 && visited) {
              basins.set(currentBasin, [
                ...(basins.get(currentBasin) as number[]),
                parseInt(graph[startR][startC - 1]),
              ]);
              console.log("basins now", basins);
              return basinDFS(startR, startC - 1, visited, graph);
            } else {
              return basinDFS(startR, startC, visited, graph);
            }
          }
          case !!right && visited[startR][startC + 1] === false: {
            visited[startR][startC + 1] = true;
            if (parseInt(right as string) !== 9) {
              basins.set(currentBasin, [
                ...(basins.get(currentBasin) as number[]),
                parseInt(graph[startR][startC + 1]),
              ]);
              console.log("basins now", basins);
              return basinDFS(startR, startC + 1, visited, graph);
            } else {
              return basinDFS(startR, startC, visited, graph);
            }
          }
          default:
            //maybe default return to another location or the same?
            return;
        }
      }

      function findBasins(graph: string[][]): void {
        let theGraph = graph;
        for (let r = 0; r < theGraph.length; r++) {
          for (let c = 0; c < theGraph[r].length; c++) {
            if (/\[/g.test(theGraph[r][c])) {
              currentBasin++;
              theGraph[r][c] = theGraph[r][c].replace(/\[|\]/g, "");
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
