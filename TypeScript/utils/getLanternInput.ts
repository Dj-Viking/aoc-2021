import fs from "fs";
export function getLanternInput(path: string): Array<string> {
  return fs.readFileSync(path, { encoding: "utf-8" }).split(",");
}
