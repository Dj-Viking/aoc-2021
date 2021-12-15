import fs from "fs";
export function getSegmentInput(path: string): Array<string> {
  return fs.readFileSync(path, { encoding: "utf-8" }).split("\n");
}
