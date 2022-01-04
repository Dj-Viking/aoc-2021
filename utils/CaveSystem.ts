import { getInput } from "./getInput";

interface IBFSResult {
  distance: number;
  path: string[][];
}

interface ICaveSystem {
  caves: Array<string>;
  adjacent: Record<string, Array<string>>;
  paths: Record<number, string[]>;
  edges: number;
  addCave(cave: string): void;
  addRoute(cave: string, dest: string): void;
  dfs(goal: string, vert: string, visited: Record<string, boolean>): boolean;
  bfs(goal: string, start: string): boolean | IBFSResult | void;
  isSmall(cave: string): boolean;
}

export class CaveSystem implements ICaveSystem {
  public caves: Array<string>;
  public adjacent: Record<string, Array<string>>;
  public paths: Record<number, string[]>;
  public edges: number;
  constructor() {
    this.caves = [];
    this.paths = {};
    this.adjacent = {};
    this.edges = 0;
  }
  /**
   * add a vertex to the graph cave system
   * @param vert vertex to add to the cave system
   */
  public addCave(cave: string): void {
    this.caves.push(cave);
    this.adjacent[cave] = [];
  }
  /**
   *
   * @param cave vertex which we are adding an adjacency to
   * @param dest adjacent destination to a cave
   */
  public addRoute(cave: string, dest: string): void {
    this.adjacent[cave].push(dest);
    this.adjacent[dest].push(cave);
    this.edges++;
  }
  /**
   * "start" and "end" can be considered small because we only are leaving start after
   *
   * visiting "start" once and "end" concludes the path finding by entering it only once
   * @param cave cave name
   * @returns boolean if the cave name is lowercase signifying a small cave
   */
  public isSmall(cave: string): boolean {
    if (!/start/g.test(cave) || !/end/g.test(cave)) {
      return /^[a-z]+$/g.test(cave);
    }
    return false;
  }

  /**
   *
   * @param goal vertex we want to end our search
   * @param start vertex we are starting on
   * @param visited record of all visited vertices
   * @returns boolean that we reached our goal in the graph traversal and the vertex exists in the graph
   */
  public dfs(
    goal: string,
    start = this.caves[0],
    visited = {} as Record<string, boolean>
  ): boolean {
    const adj = this.adjacent;
    visited[start] = true;
    for (let i = 0; i < adj[start].length; i++) {
      let next = adj[start][i];
      if (!visited[next]) {
        this.dfs(goal, next, visited);
      }
    }
    return visited[goal] || false;
  }
  /**
   *
   * @param goal end node to reach
   * @param start node to start at
   * @returns boolean false if the node doesn't exist, and IBFSResult if the node was found which describes how many steps it took to get to goal and the path that was taken
   */
  public bfs(goal: string, start?: string): boolean | IBFSResult | void {
    !!start ? (start = start) : (start = "start");
    const adj = this.adjacent;
    if (goal === start) throw new Error("can't begin bfs search from start when our goal is start");

    const queue = [];
    queue.push(start);
    const visited = {} as Record<string, boolean>;
    visited[start] = true;
    const routes = {} as Record<string, number>;
    routes[start] = 0;
    const parents = {} as Record<string, string | null>;
    parents[start] = null;

    while (queue.length > 0) {
      const cave = queue.shift() as string;

      if (cave === goal) {
        this.buildPaths(goal, start);
        console.log("this.paths", this.paths);
        return;
      }

      for (let dest = 0; dest < adj[cave].length; dest++) {
        if (!visited[adj[cave][dest]]) {
          visited[adj[cave][dest]] = true;
          queue.push(adj[cave][dest]);
          routes[adj[cave][dest]] = routes[cave] + 1;
          parents[adj[cave][dest]] = cave;
        }
      }
    }
    return false;
  }
  private buildPaths(goal: string, start: string): void {
    const isVisited = {} as Record<string, boolean>;
    for (let i = 0; i < this.caves.length; i++) {
      isVisited[this.caves[i]] = false;
      const pathList = [] as string[];
      pathList.push(start);
      this.createAllPaths(start, goal, isVisited, pathList);
    }
  }
  private createAllPaths(
    start: string,
    goal: string,
    visited: Record<string, boolean>,
    localPathList: Array<string>,
    path = 0
  ): string[] | void {
    if (start === goal) {
      this.paths[path] = [];
      this.paths[path].push(...localPathList);
      // console.log("path", path, "this.paths", this.paths, "local path list", localPathList);
      //this actually doesn't return this as a value for some reason...
      return localPathList;
    }
    visited[start] = true;
    for (let i = 0; i < this.adjacent[start].length; i++) {
      if (!visited[this.adjacent[start][i]]) {
        path++;
        localPathList.push(this.adjacent[start][i]);
        //recurse with the recently modified pathList
        this.createAllPaths(this.adjacent[start][i], goal, visited, localPathList, path);
        //clean up the previous node in local pathlist
        localPathList.splice(localPathList.indexOf(this.adjacent[start][i]), 1);
      }
    }
    //clean up visited node
    visited[start] = false;
  }
}

let theInput = getInput("../day12/input.txt");
console.log("the input", theInput);
const cavesSet = new Set<string>();
const cs = new CaveSystem();
// const paths = new Map<number, string[]>();
// let path = 1;
const routes = theInput.map((str) => {
  return str.split("-");
}) as Array<[string, string]>;

for (let i = 0; i < routes.flat<string[][], 1>().length; i++)
  cavesSet.add(routes.flat<string[][], 1>()[i]);

const caves = Array.from(cavesSet) as string[];

for (let c = 0; c < caves.length; c++) cs.addCave(caves[c]);

for (let r = 0; r < routes.length; r++) cs.addRoute(...(routes[r] as [string, string]));

console.log("cave system", cs);

console.log("DFS goal is end did we find it", cs.dfs("end"));
console.log("DFS goal is start did we find it", cs.dfs("start"));

console.log("BFS goal is end", cs.bfs("end", "start"));
console.log("cave system after bfs", cs.paths);