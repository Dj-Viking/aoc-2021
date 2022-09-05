export function getAdjOctos(
  r: number,
  c: number,
  graph: number[][]
): Map<number, Array<[number, number]>> {
  const theList = new Map<number, Array<[number, number]>>();

  const up = !!graph[r - 1] ? graph[r - 1][c] : void 0;
  const down = !!graph[r + 1] ? graph[r + 1][c] : void 0;
  const left = !!graph[r][c - 1] ? graph[r][c - 1] : void 0;
  const right = !!graph[r][c + 1] ? graph[r][c + 1] : void 0;
  const ruDiag = !!graph[r - 1] && !!graph[r - 1][c + 1] ? graph[r - 1][c + 1] : void 0;
  const luDiag = !!graph[r - 1] && !!graph[r - 1][c - 1] ? graph[r - 1][c - 1] : void 0;
  const rdDiag = !!graph[r + 1] && !!graph[r + 1][c + 1] ? graph[r + 1][c + 1] : void 0;
  const ldDiag = !!graph[r + 1] && !!graph[r + 1][c - 1] ? graph[r + 1][c - 1] : void 0;

  theList.set(graph[r][c], [] as Array<[number, number]>);

  if (!!up) theList.get(graph[r][c])?.push([r - 1, c]);
  if (!!down) theList.get(graph[r][c])?.push([r + 1, c]);
  if (!!left) theList.get(graph[r][c])?.push([r, c - 1]);
  if (!!right) theList.get(graph[r][c])?.push([r, c + 1]);
  if (!!ruDiag) theList.get(graph[r][c])?.push([r - 1, c + 1]);
  if (!!luDiag) theList.get(graph[r][c])?.push([r - 1, c - 1]);
  if (!!rdDiag) theList.get(graph[r][c])?.push([r + 1, c + 1]);
  if (!!ldDiag) theList.get(graph[r][c])?.push([r + 1, c - 1]);

  return theList;
}
