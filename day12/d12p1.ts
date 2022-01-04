// how many paths through the cave visit small caves at most once
import { getInput, CaveSystem } from "../utils";
(async function (): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      let theInput = getInput("../day12/input.txt");
      console.log("the input", theInput);
      const cavesSet = new Set<string>();
      const cs = new CaveSystem();

      const routes = theInput.map((str) => {
        return str.split("-");
      }) as Array<[string, string]>;

      for (let i = 0; i < routes.flat<string[][], 1>().length; i++)
        cavesSet.add(routes.flat<string[][], 1>()[i]);

      const caves = Array.from(cavesSet) as string[];

      for (let c = 0; c < caves.length; c++) cs.addCave(caves[c]);

      for (let r = 0; r < routes.length; r++) cs.addRoute(...(routes[r] as [string, string]));

      //path find through the cave and then
      // parse which paths have only one small cave
      // visited between start and end
      cs.bfs("end", "start");
      console.log("cave system after bfs", cs.paths);

      resolve();
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
})();
