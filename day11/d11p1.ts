import { getInput, getAdjOctos } from "../utils";
(async function (): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      let theInput = getInput("../day11/input.txt");
      // let theInput = getInput("../day11/sample.txt");
      let graph = theInput.map((row) => {
        return row.split("").map((str) => parseInt(str));
      }) as number[][];

      function flash(startR: number, startC: number, graph: number[][]): number {
        //dont increment flashes counter that is incrementing
        // by the return value of flash in the currentstep because the number was either
        // not able to flash yet at a lower energy level or it was not 10
        if (graph[startR][startC] !== 10) return 0;

        let count = 1;
        //get neighbors to current octo
        const adjOctos = getAdjOctos(startR, startC, graph) as Map<number, Array<[number, number]>>;

        //check if neighbor is less or equal to 9 and increment it and recurse flash
        // if the recursion results in the coordinate not being 10 then the flash counter is not
        // incremented in the current step
        for (const [row, col] of adjOctos.get(graph[startR][startC]) as Array<[number, number]>) {
          if (graph[row][col] <= 9) {
            graph[row][col]++;
            count += flash(row, col, graph);
          }
        }
        //this gets set zero in the next traversal loop in the current step
        // because it is greater than 9 but not 10 because 10 is the trigger for flashing
        graph[startR][startC] = 11;
        return count;
      }

      let flashes = 0;
      for (let step = 0; step < 100; step++) {
        for (let r = 0; r < graph.length; r++) {
          for (let c = 0; c < graph[r].length; c++) {
            graph[r][c]++;
          }
        }
        for (let r = 0; r < graph.length; r++) {
          for (let c = 0; c < graph[r].length; c++) {
            flashes += flash(r, c, graph);
          }
        }
        for (let r = 0; r < graph.length; r++) {
          for (let c = 0; c < graph[r].length; c++) {
            //if some octos are set 11 in flash() then set them zero before the next step
            graph[r][c] > 9 ? (graph[r][c] = 0) : void 0;
          }
        }
      }
      console.log("flashes", flashes);

      resolve();
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
})();
