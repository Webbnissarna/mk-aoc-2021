import { promises as fs } from "fs";
import path from "path";

export async function readInput(challengeID: number): Promise<string> {
  const filePath = path.join("src/", challengeID.toString(), "input");
  const file = await fs.readFile(filePath, { encoding: "utf-8" });
  return file;
}
