import { getInput } from "./getInput";

interface IBFSResult {
  distance: number;
  path: string[][];
}

interface ICaveSystem {
  caves: Array<string>;
  adjacent: Record<string, Array<string>>;
  paths: Record<string, string[]>;
  finalPaths: Array<Array<string>>;
  addCave(cave: string): void;
  addRoute(cave: string, dest: string): void;
  dfs(goal: string, vert: string, visited: Record<string, boolean>): boolean;
  bfs(goal: string, start: string): boolean | IBFSResult | void;
  isSmall(cave: string): boolean;
  removeDupePaths(): void;
}

export class CaveSystem implements ICaveSystem {
  public caves: Array<string>;
  public adjacent: Record<string, Array<string>>;
  public paths: Record<string, string[]>;
  public finalPaths: Array<Array<string>>;
  constructor(private pathNum: number = 0) {
    this.caves = [];
    this.finalPaths = [];
    this.paths = {};
    this.adjacent = {};
  }
  /**
   * add a vertex to the graph cave system
   * @param cave vertex to add to the cave system
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
  }
  /**
   * probably dont need this since I solved this another way
   * @param paths this.paths
   */
  public removeDupePaths(): void {
    const allPaths = Object.keys(this.paths).map((path) => {
      return this.paths[path];
    }) as string[][];
    let slicer = 0;
    let firstPath = [] as string[];
    paths: for (let i = 0; i < allPaths.length; i++) {
      if (i === 0) {
        firstPath = allPaths[i];
        continue;
      }
      if (i !== 0) {
        //checking equality of the contents of an array
        // because [] === [] is false
        if (allPaths[i].join("") === firstPath.join("")) {
          slicer = i;
          break paths;
        }
      }
    }
    this.finalPaths = allPaths.slice(0, slicer);
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
  /**
   * starts the recursion of creating all the possible paths through all the caves in the cave system
   *
   * taken to reach the end
   * @param goal end cave to reach "end"
   * @param start start cave "start"
   */
  private buildPaths(goal: string, start: string): void {
    const isVisited = {} as Record<string, boolean>;
    let loopCount = 0;
    paths: for (let i = 0; i < this.caves.length; i++) {
      loopCount++;
      console.log("getting paths.. standby...", loopCount);
      //break this loop since we will find all paths after one
      // recursion cycle of this.createAllPaths()
      if (loopCount === 2) break paths;
      this.pathNum++;
      isVisited[this.caves[i]] = false;
      const pathList = [] as string[];
      pathList.push(start);
      this.createAllPaths(start, goal, isVisited, pathList);
    }
  }
  /**
   *
   * @param start starts as "start" and changes to a new cave during the recursion
   * @param goal "end"
   * @param visited visited record of booleans passed into the function initially from this.buildPaths gets cleaned up when exhausting the adjacency recursion
   * @param localPathList list of caves taken to reach from start to end changes as each possible path gets created
   * @param path number initially zero used to create the this.paths value to generate a record of all possible paths taken through the cave system from "start" to "end"
   * @returns nothing even though the if (start === goal) condition returns localPathList, this isn't the case for some reason, I still dont quite understand it lol
   */
  private createAllPaths(
    start: string,
    goal: string,
    visited: Record<string, boolean>,
    localPathList: Array<string>,
    path = 0
  ): string[] | void {
    if (start === goal) {
      //creating unique keys need to remove duplicate paths later
      this.paths = {
        ...this.paths,
        [Buffer.from(((Math.random() + 1) * 10000).toString(), "utf-8").toString()]: [
          ...localPathList,
        ],
      };
      // console.log("local path list", localPathList, "path", path, "this.paths", this.paths);
      // console.log("local path list", localPathList);
      // console.log("this.paths", this.paths);
      //this actually doesn't return localPathList as a value from this function for some reason...
      return localPathList;
    }
    //set visited true only if it was small
    // since we can visit big caves more than once
    if (this.isSmall(start)) visited[start] = true;
    for (let i = 0; i < this.adjacent[start].length; i++) {
      if (!visited[this.adjacent[start][i]]) {
        path = this.pathNum;
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

// testing the class with day 12 input
let theInput = getInput("../day12/input.txt");
// console.log("the input", theInput);
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

// console.log("cave system", cs);
// console.log("DFS goal is end did we find it", cs.dfs("end"));
// console.log("DFS goal is start did we find it", cs.dfs("start"));
// console.log("BFS goal is end", cs.bfs("end", "start"));
// console.log("cave system after bfs", cs.paths);
