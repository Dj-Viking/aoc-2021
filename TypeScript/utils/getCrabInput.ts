import fs from "fs";
export function getCrabInput(path: string): Array<number> {
  return fs
    .readFileSync(path, { encoding: "utf-8" })
    .split(",")
    .map((str) => parseInt(str))
    .sort((a, b) => a - b);
}
