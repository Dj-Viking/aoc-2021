// how many paths through the cave visit small caves at most once
import { getInput, CaveSystem } from "../utils";
(async function (): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      // let theInput = getInput("../day12/input.txt");
      // let theInput = getInput("../day12/sample.txt");
      // let theInput = getInput("../day12/sample2.txt");
      let theInput = getInput("../day12/sample3.txt");
      // console.log("the input", theInput);
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

      //find all paths in the created cave system
      cs.bfs("end", "start");
      // console.log("paths generated", cs.paths);
      console.log("path length", Object.keys(cs.paths).length);

      //remove dupe paths
      cs.removeDupePaths();
      console.log("cs paths now", cs.finalPaths.length);

      // console.log("cave system after bfs", cs.paths);
      // parse which paths have only one small cave
      // visited between start and end
      // let onlyOneSmallCavePaths = [] as string[][];

      // function hasOnlyOneSmallInPath(pathList: string[]): boolean {
      //   let count = 0;
      //   let list = pathList;
      //   list = list.filter((cave) => !/start|end/g.test(cave));
      //   for (let i = 0; i < list.length; i++) {
      //     // console.log("cave", list[i]);
      //     if (cs.isSmall(list[i])) count++;
      //   }
      //   // console.log("count", count);

      //   if (count === 1) return true;
      //   return false;
      // }

      // Object.keys(cs.paths).forEach((path) => {
      //   // console.log("cs path", _path, cs.paths[path]);
      //   onlyOneSmallCavePaths = [
      //     ...onlyOneSmallCavePaths,
      //     hasOnlyOneSmallInPath(cs.paths[path]) ? cs.paths[path] : void 0,
      //   ].filter((item) => item !== void 0) as string[][];
      // });
      // console.log("small cave paths", onlyOneSmallCavePaths);

      resolve();
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
})();
