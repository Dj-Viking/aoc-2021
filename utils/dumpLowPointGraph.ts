// dump the graph to see the numbers squared off without the space between the [] and the next number
// looks neater
export function dumpLowPointGraph(graph: string[][]): void {
  for (let i = 0; i < graph.length; i++) {
    console.log(
      `${graph[i]}`
        .replace(/,/g, " ")
        .replace(/\s(?=\[)/g, "") //remove the space only if it was preceded by a [ character
        .replace(/(?<=\])\s/g, "") // remove the space only if it was followed by a ] character
    );
  }
}
