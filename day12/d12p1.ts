// how many paths through the cave visit small caves at most once
import { getInput, CaveSystem } from "../utils";
(async function (): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      let theInput = getInput("../day12/input.txt");
      console.log("the input", theInput);
      const cavesSet = new Set<string>();
      const cs = new CaveSystem();

      //start the parsing of the routes from the input
      const routes = theInput.map((str) => {
        return str.split("-");
      }) as Array<[string, string]>;

      //create a set of all the caves from the parsed routes
      for (let i = 0; i < routes.flat<string[][], 1>().length; i++)
        cavesSet.add(routes.flat<string[][], 1>()[i]);

      //create caves array from the set to remove dupes
      const caves = Array.from(cavesSet) as string[];

      //add the caves to the cave system
      for (let c = 0; c < caves.length; c++) {
        cs.addCave(caves[c]);
      }
      //add the routes for each cave in the system
      for (let r = 0; r < routes.length; r++) {
        cs.addRoute(...(routes[r] as [string, string]));
      }

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
