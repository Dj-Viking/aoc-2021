import { getInput } from "./getInput";
import { recurseCo2 } from "./recurseCo2";
import { recurseOxy } from "./recurseOxy";
import { dumpBoard, dumpBooleanGraph } from "./dumpBoard";
import { getLanternInput } from "./getLanternInput";
import { getCrabInput } from "./getCrabInput";
import { getSegmentInput } from "./getSegmentInput";
import { getPermutations } from "./getPermutations";
import { decimalToBinary } from "./decimalToBinary";
import { isLowerThanAdj, EdgeType } from "./isLowerThanAdj";
import { isEdge } from "./isEdge";
import { dumpLowPointGraph } from "./dumpLowPointGraph";
import { Stack, checkCorrupt, ICheckChunkResult } from "./stack";
export function getX1(coords: string[], iter: number): number {
  return parseInt(coords[iter].split(/\s->\s/g)[0].split(",")[0]);
}
export function getX2(coords: string[], iter: number): number {
  return parseInt(coords[iter].split(/\s->\s/g)[1].split(",")[0]);
}
export function getY1(coords: string[], iter: number): number {
  return parseInt(coords[iter].split(/\s->\s/g)[0].split(",")[1]);
}
export function getY2(coords: string[], iter: number): number {
  return parseInt(coords[iter].split(/\s->\s/g)[1].split(",")[1]);
}

export {
  getInput,
  recurseCo2,
  recurseOxy,
  dumpBoard,
  getLanternInput,
  getCrabInput,
  getSegmentInput,
  getPermutations,
  decimalToBinary,
  isLowerThanAdj,
  EdgeType,
  isEdge,
  dumpBooleanGraph,
  dumpLowPointGraph,
  Stack,
  checkCorrupt,
  ICheckChunkResult,
};
