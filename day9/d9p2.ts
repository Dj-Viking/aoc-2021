import { getInput, isEdge, isLowerThanAdj } from "../utils";
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

      function isMarked(item: string): boolean {
        return /\[\d\]/.test(item);
      }

      // dumpGraph(theInput);
      function adjAreNotNineOrMarked(graph: string[][], row: number, col: number): boolean {
        const up = !!graph[row - 1] ? graph[row - 1][col] : void 0;
        const down = !!graph[row + 1] ? graph[row + 1][col] : void 0;
        const left = !!graph[row][col - 1] ? graph[row][col - 1] : void 0;
        const right = !!graph[row][col + 1] ? graph[row][col + 1] : void 0;
        console.log(
          "item",
          graph[row][col],
          "row",
          row,
          "col",
          col,
          "up",
          up,
          "down",
          down,
          "left",
          left,
          "right",
          right
        );
        //if on top left corner and ( down, right ) are not 9 or marked
        if (row === 0 && col === 0 && !!down && !!right && !isMarked(down) && !isMarked(right)) {
          if (parseInt(down) !== 9) return true;
          if (parseInt(right) !== 9) return true;
        }
        //if on top edge but not corners and ( left, down, right ) are not 9 or marked
        if (
          row === 0 &&
          !!down &&
          !!left &&
          !!right &&
          (col > 0 || col === graph[row].length - 2) &&
          !isMarked(left) &&
          !isMarked(down) &&
          !isMarked(right)
        ) {
          if (parseInt(left) !== 9) return true;
          if (parseInt(down) !== 9) return true;
          if (parseInt(right) !== 9) return true;
        }
        //if on top right corner and ( down, left ) are not 9 or marked
        if (
          row === 0 &&
          col === graph[row].length - 1 &&
          !!down &&
          !!left &&
          !isMarked(down) &&
          !isMarked(left)
        ) {
          if (parseInt(down) !== 9) return true;
          if (parseInt(left) !== 9) return true;
        }
        //if on left side edge and ( up, right, down ) are not 9 or marked
        if (
          row > 0 &&
          col === 0 &&
          !!up &&
          !!down &&
          !!right &&
          !isMarked(up) &&
          !isMarked(right) &&
          !isMarked(down)
        ) {
          if (parseInt(up) !== 9) return true;
          if (parseInt(right) !== 9) return true;
          if (parseInt(down) !== 9) return true;
        }
        //if on right side edge and ( up, left, down ) are not 9 or marked
        if (
          row > 0 &&
          col === graph[row].length - 1 &&
          !!up &&
          !!down &&
          !!left &&
          !isMarked(up) &&
          !isMarked(left) &&
          !isMarked(down)
        ) {
          if (parseInt(up) !== 9) return true;
          if (parseInt(left) !== 9) return true;
          if (parseInt(down) !== 9) return true;
        }
        //if on bottom left corner and ( up, right ) are not 9 or marked
        if (
          row === graph.length - 1 &&
          col === 0 &&
          !!up &&
          !!right &&
          !isMarked(up) &&
          !isMarked(right)
        ) {
          if (parseInt(up) !== 9) return true;
          if (parseInt(right) !== 9) return true;
        }
        //if on bottom edge not corners and (left, up, right) are not 9 or marked
        if (
          row === graph.length - 1 &&
          col > 0 &&
          !!up &&
          !!left &&
          !!right &&
          !isMarked(left) &&
          !isMarked(up) &&
          !isMarked(right)
        ) {
          if (parseInt(left) !== 9) return true;
          if (parseInt(up) !== 9) return true;
          if (parseInt(right) !== 9) return true;
        }
        //if on bottom right corner and ( up, left ) are not 9 or marked
        if (
          row === graph.length - 1 &&
          col === graph[row].length - 1 &&
          !!up &&
          !!left &&
          !isMarked(up) &&
          !isMarked(left)
        ) {
          if (parseInt(up) !== 9) return true;
          if (parseInt(left) !== 9) return true;
        }
        //if any location not an edge and (up, down, left, right) are not 9 or marked

        return false;
      }

      function findBasins(graph: string[][]): string[][] | void {
        let theGraph = graph;
        for (let row = 0; row < theGraph.length; row++) {
          for (let col = 0; col < theGraph[row].length; col++) {
            //get the lowpoint or the numbers recursed from the lowpoint
            if (/\[/g.test(theGraph[row][col]) && adjAreNotNineOrMarked(theGraph, row, col)) {
              console.log("did we get here");
              //check if previous row in the same column is in bounds and is
              // greater than the current item but less than 9
              if (
                //check up
                !!theGraph[row - 1] &&
                parseInt(theGraph[row - 1][col]) !== 9
              ) {
                theGraph[row - 1][col] = "[" + theGraph[row - 1][col] + "]";
              }
              if (
                //check left
                !!theGraph[row][col - 1] &&
                parseInt(theGraph[row][col - 1]) !== 9
              ) {
                theGraph[row][col - 1] = "[" + theGraph[row][col - 1] + "]";
              }
              if (
                // check down
                !!theGraph[row + 1] &&
                parseInt(theGraph[row + 1][col]) !== 9
              ) {
                theGraph[row + 1][col] = "[" + theGraph[row + 1][col] + "]";
              }
              if (
                //check right
                !!theGraph[row][col + 1] &&
                parseInt(theGraph[row][col + 1]) !== 9
              ) {
                theGraph[row][col + 1] = "[" + theGraph[row][col + 1] + "]";
              }
              return findBasins(theGraph);
            }
          }
        }

        return theGraph;
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
      theInput = findBasins(theInput) as string[][];
      console.log("\n");
      dumpGraph(theInput);
      resolve();
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
})();
