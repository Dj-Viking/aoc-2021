// how many paths through the cave visit small caves at most once
import { getInput } from "../utils";
(async function (): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      let theInput = getInput("../day12/input.txt");
      console.log("the input", theInput);
      const cavesSet = new Set<string>();
      const paths = new Map<number, string[]>();
      let path = 1;
      const routes = theInput.map((str) => {
        return str.split("-");
      }) as Array<[string, string]>;

      for (let i = 0; i < routes.flat<string[][], 1>().length; i++)
        cavesSet.add(routes.flat<string[][], 1>()[i]);

      const caves = Array.from(cavesSet) as string[];
      const caveAdjList = new Map<string, Array<string>>();

      for (let c = 0; c < caves.length; c++)
        ((cave) => {
          caveAdjList.set(cave, [] as string[]);
        })(caves[c]);

      for (let r = 0; r < routes.length; r++)
        ((origin: string, dest: string) => {
          caveAdjList.get(origin)?.push(dest);
          caveAdjList.get(dest)?.push(origin);
        })(...(routes[r] as [string, string]));

      console.log("cave adj list", caveAdjList);

      resolve();
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
})();
