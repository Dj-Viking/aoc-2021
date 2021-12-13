import { getInput } from "./getInput";
import { recurseCo2 } from "./recurseCo2";
import { recurseOxy } from "./recurseOxy";
import { dumpBoard } from "./dumpBoard";
import { getLanternInput } from "./getLanternInput";
import { getCrabInput } from "./getCrabInput";
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

export { getInput, recurseCo2, recurseOxy, dumpBoard, getLanternInput, getCrabInput };
