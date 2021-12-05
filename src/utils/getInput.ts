import { join, fromFileUrl } from "https://deno.land/std/path/mod.ts";
import rootFolder from "./getRootFolder.ts";
import { logInfo } from "./coloredLogs.ts";

export default async function getInput<T = unknown>(
  day: number,
  transform?: (x: unknown) => T
): Promise<T[]> {
  const path = join(rootFolder, "./src/inputs", `${day}.json`);
  let input;
  try {
    console.log(path);
    input = JSON.parse(await Deno.readTextFile(path));
  } catch (e) {
    logInfo(`\nLaunch "yarn input" to download missing inputs.\n`);
    throw e;
  }
  if (transform) {
    return input.map(transform);
  }
  return input;
}
