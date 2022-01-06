interface ICaveSystem {
  caves: Array<string>;
  adjacent: Record<string, Array<string>>;
  paths: Record<string, any>[];
  addCave(cave: string): void;
  addRoute(cave: string, dest: string): void;
  isSmall(cave: string): boolean;
  findPaths(
    adj: Record<string, string[]>,
    start: string,
    end: string,
    paths: Record<string, any>[],
    currentPath: Record<string, any>
  ): void;
}

export class CaveSystemTwo implements ICaveSystem {
  public caves: Array<string>;
  public adjacent: Record<string, Array<string>>;
  public paths: Record<string, any>[];
  constructor() {
    this.caves = [];
    this.paths = [];
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
  public findPaths(
    adj: Record<string, string[]>,
    start: string,
    end: string,
    paths: Record<string, any>[] = [],
    currentPath: Record<string, any> = {}
  ): void {
    currentPath[start] = currentPath[start] + 1 || 1;
    if (this.isSmall(start) && currentPath[start] === 2) {
      currentPath["small-visited-twice"] = true;
    }
    if (start === end) {
      paths.push(currentPath);
      return;
    }
    if (!adj[start]) {
      return;
    }
    for (const cave of adj[start]) {
      if (this.isSmall(cave) && cave in currentPath) {
        if (
          ["start", "end"].includes(cave) ||
          currentPath["small-visited-twice"]
        ) {
          continue;
        }
      }
      this.findPaths(adj, cave, end, paths, { ...currentPath });
    }
    this.paths = paths;
  }
}
