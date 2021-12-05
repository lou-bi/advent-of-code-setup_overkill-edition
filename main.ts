import { join } from "https://deno.land/std/path/mod.ts";

import rootFolder from "./src/utils/getRootFolder.ts";
import fileExists from "./src/utils/fileExists.ts";
import { logInfo, logWarn } from "./src/utils/coloredLogs.ts";

const exercicesPath = join(rootFolder, "./src/exercices");
const outputsPath = join(rootFolder, "./src/outputs");
const inputsPath = join(rootFolder, "./src/inputs");
const utilsPath = join(rootFolder, "./src/utils");

const action = Deno.args.at(0);
const [, actionArgs] = Deno.args;
const hasActionArgs = !!actionArgs?.length;

switch (action) {
  // Log all or one exercice answer to console
  case "log":
    if (!hasActionArgs) {
      for await (const exercicePath of getExercicePath()) {
        const { resolveExercice } = await import(exercicePath);
        const exerciceNumber = getExerciceNumberFromPath(exercicePath);

        logExerciceResult(exerciceNumber, JSON.stringify(resolveExercice()));
      }
    }
    console.log();
    break;
  // Launch all or one test
  case "test":
    break;
  // Download inputs for all the exercices present in the exercices folder,
  // or skip if they already exist
  case "input":
    if (!hasActionArgs) {
      const { default: downloadInput } = await import(
        join(utilsPath, "downloadInput.ts")
      );
      for await (const exercicePath of getExercicePath()) {
        const exerciceNumber = getExerciceNumberFromPath(exercicePath);
        if (!(await fileExists(join(inputsPath, `${exerciceNumber}.json`)))) {
          logInfo(`Downloading input ${exercicePath}`);
          await downloadInput(exerciceNumber);
        } else {
          logInfo(`Input ${exerciceNumber} exist, skip`);
        }
      }
    }
    break;
  // Write exercice's answer to the output folder
  case "write":
    break;
}

async function* getExercicePath() {
  for await (const fileEntry of Deno.readDir(exercicesPath)) {
    if (!/test/.test(fileEntry.name)) {
      yield join(exercicesPath, fileEntry.name);
    }
  }
}

function logExerciceResult(exerciceNumber: number, exerciceAnswer: string) {
  console.log();
  console.log(logInfo(`Exercice ${exerciceNumber}`));
  console.log(logWarn(exerciceAnswer));
}

function getExerciceNumberFromPath(url: string): number {
  return Number(url.replace(/^.+\/(\d+)\.ts$/, "$1"));
}
