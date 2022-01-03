interface IBFSResult {
  distance: number;
  path: string;
}

interface ICaveSystem {
  vertices: Array<string>;
  adjacent: Record<string, Array<string>>;
  edges: number;
  addVertex(vert: string): void;
  addEdge(vert: string, dest: string): void;
  dfs(goal: string, vert: string, visited: Record<string, boolean>): boolean;
  bfs(goal: string, start: string): boolean | IBFSResult;
}

export class CaveSystem implements ICaveSystem {
  public vertices: Array<string>;
  public adjacent: Record<string, Array<string>>;
  public edges: number;
  constructor() {
    this.vertices = [];
    this.adjacent = {};
    this.edges = 0;
  }
  /**
   * add a vertex to the graph cave system
   * @param vert vertex to add to the cave system
   */
  public addVertex(vert: string): void {
    this.vertices.push(vert);
    this.adjacent[vert] = [];
  }
  /**
   *
   * @param vert vertex which we are adding an adjacency to
   * @param dest adjacent destination to a vertex
   */
  public addEdge(vert: string, dest: string): void {
    this.adjacent[vert].push(dest);
    this.adjacent[dest].push(vert);
    this.edges++;
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
    start = this.vertices[0],
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
  public bfs(goal: string, start?: string): boolean | IBFSResult {
    !!start ? (start = start) : (start = this.vertices[0]);
    const adj = this.adjacent;
    if (goal === start) throw new Error("can't begin bfs search from start when our goal is start");

    const queue = [];
    queue.push(start);
    const visited = {} as Record<string, boolean>;
    visited[start] = true;
    const edges = {} as Record<string, number>;
    edges[start] = 0;
    const predecessors = {} as Record<string, string | null>;
    predecessors[start] = null;

    const buildPath = (
      goal: string,
      start: string,
      predecessors: Record<string, string | null>
    ): string => {
      const stack = [] as string[];
      stack.push(goal);

      let u = predecessors[goal];

      while (u !== start) {
        stack.push(u as string);
        u = predecessors[u as string];
      }
      stack.push(start);
      let path = stack.reverse().join("-");
      return path;
    };

    while (queue.length) {
      const vert = queue.shift() as string;

      if (vert === goal) {
        return {
          distance: edges[goal],
          path: buildPath(goal, start, predecessors),
        };
      }

      for (let i = 0; i < adj[vert].length; i++) {
        if (!visited[adj[vert][i]]) {
          visited[adj[vert][i]] = true;
          queue.push(adj[vert][i]);
          edges[adj[vert][i]] = edges[vert] + 1;
          predecessors[adj[vert][i]] = vert;
        }
      }
    }
    return false;
  }
}

const graph = new CaveSystem();

graph.addVertex("start");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");
graph.addVertex("end");

graph.addEdge("start", "B");
graph.addEdge("start", "C");
graph.addEdge("start", "D");
graph.addEdge("B", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "D");
graph.addEdge("C", "E");
graph.addEdge("D", "F");
graph.addEdge("F", "end");

console.log("DFS goal is end", graph.dfs("end"));
console.log("DFS goal is start", graph.dfs("start"));
console.log("BFS goal is end", graph.bfs("end"));
console.log("BFS goal is start", graph.bfs("start"));
