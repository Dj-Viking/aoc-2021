export type EdgeType = "corner" | "side" | "top-bottom";
export function isLowerThanAdj(
  item: string,
  graph: string[][],
  row: number,
  col: number,
  edgeType?: EdgeType | void
): boolean {
  if (!!edgeType) {
    switch (edgeType) {
      case "corner": {
        //check bounds of top right corner
        if (!!graph[row + 1] && !!graph[row][col - 1] && !!graph[row + 1][col]) {
          if (
            //top right corner (left down)
            parseInt(item) < parseInt(graph[row][col - 1]) &&
            parseInt(item) < parseInt(graph[row + 1][col])
          ) {
            return true;
          }
          return false;
        }
        //check bounds of top left corner
        if (!!graph[row][col + 1] && !!graph[row + 1] && !!graph[row + 1][col]) {
          if (
            // (right down)
            parseInt(item) < parseInt(graph[row][col + 1]) &&
            parseInt(item) < parseInt(graph[row + 1][col])
          ) {
            return true;
          }
          return false;
        }
        //check bounds of bottom left corner
        if (!!graph[row][col + 1] && !!graph[row - 1][col]) {
          if (
            // (right up)
            parseInt(item) < parseInt(graph[row][col + 1]) &&
            parseInt(item) < parseInt(graph[row - 1][col])
          ) {
            return true;
          }
          return false;
        }
        //check bounds of bottom right corner
        if (!!graph[row][col - 1] && !!graph[row - 1][col]) {
          if (
            // (left up)
            parseInt(item) < parseInt(graph[row][col - 1]) &&
            parseInt(item) < parseInt(graph[row - 1][col])
          ) {
            return true;
          }
          return false;
        }
        break;
      }
      case "side": {
        // check bounds of right side edge
        if (!!graph[row - 1][col] && !!graph[row][col - 1] && !!graph[row + 1][col]) {
          // (up left down)
          if (
            parseInt(item) < parseInt(graph[row - 1][col]) &&
            parseInt(item) < parseInt(graph[row][col - 1]) &&
            parseInt(item) < parseInt(graph[row + 1][col])
          ) {
            return true;
          }
          return false;
        }
        // check bounds of left side edge
        if (!!graph[row - 1][col] && !!graph[row][col + 1] && !!graph[row + 1][col]) {
          // (up right down)
          if (
            parseInt(item) < parseInt(graph[row - 1][col]) &&
            parseInt(item) < parseInt(graph[row][col + 1]) &&
            parseInt(item) < parseInt(graph[row + 1][col])
          ) {
            return true;
          }
          return false;
        }
        break;
      }
      case "top-bottom": {
        // check bounds of top edge
        if (
          !!graph[row + 1] &&
          !!graph[row][col - 1] &&
          !!graph[row][col + 1] &&
          !!graph[row + 1][col]
        ) {
          // (left down right)
          if (
            parseInt(item) < parseInt(graph[row][col - 1]) &&
            parseInt(item) < parseInt(graph[row][col + 1]) &&
            parseInt(item) < parseInt(graph[row + 1][col])
          ) {
            return true;
          }
          return false;
        }
        // check bounds of bottom edge
        if (
          !!graph[row - 1] &&
          !!graph[row][col - 1] &&
          !!graph[row - 1][col] &&
          !!graph[row][col + 1]
        ) {
          // ( left up right )
          if (
            parseInt(item) < parseInt(graph[row][col - 1]) &&
            parseInt(item) < parseInt(graph[row - 1][col]) &&
            parseInt(item) < parseInt(graph[row][col + 1])
          ) {
            return true;
          }
          return false;
        }
      }
    }
  } else {
    //for any number not an an edge
    // (up down left right)
    if (
      parseInt(item) < parseInt(graph[row - 1][col]) &&
      parseInt(item) < parseInt(graph[row + 1][col]) &&
      parseInt(item) < parseInt(graph[row][col - 1]) &&
      parseInt(item) < parseInt(graph[row][col + 1])
    )
      return true;
    return false;
  }
  return false;
}
