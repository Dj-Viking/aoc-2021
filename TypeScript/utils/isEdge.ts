import { EdgeType } from "./index";
export function isEdge(
  graph: string[][],
  row: number,
  col: number
): { isEdge: boolean; type: EdgeType | void } {
  switch (true) {
    //corners
    case (col === 0 || col === graph[row].length - 1) && (row === 0 || row === graph.length - 1):
      return { isEdge: true, type: "corner" };
    //side edges not on top or bottom
    case (col === 0 || col === graph[row].length - 1) && (row > 0 || row === graph.length - 2):
      return { isEdge: true, type: "side" };
    // top and bottom edges but not corners
    case (row === 0 || row === graph.length - 1) && (col > 0 || col < graph[row].length - 1):
      return { isEdge: true, type: "top-bottom" };
  }
  return { isEdge: false, type: void 0 };
}
