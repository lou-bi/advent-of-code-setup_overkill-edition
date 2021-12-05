import { join, fromFileUrl } from "https://deno.land/std/path/mod.ts";

import config from "./getConfig.ts";
import fileExists from "./fileExists.ts";
import { logInfo } from "./coloredLogs.ts";

const exercicesPath = "../exercices";
const inputsPath = "../inputs";

async function main() {
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

async function downloadInput(day: number): Promise<unknown[]> {
  const input = await fetchInput(day);
  const fmtInput = formatInputToJson(input);
  await writeInput(day, fmtInput);
  return fmtInput;
}

async function fetchInput(day: number): Promise<string> {
  const reqInit: RequestInit = {
    credentials: "include",
    headers: {
      Cookie: `session=${config.AOC_SESSION}`,
    },
    // mode: "cors",
  };

  const dataText = await fetch(
    `https://adventofcode.com/2021/day/${day}/input`,
    reqInit
  );

  return dataText.text();
}

function formatInputToJson(input: string): unknown[] {
  const inputArray = input.split(/\n/);
  inputArray.pop();
  return inputArray;
}

function writeInput(day: number, input: unknown[]): Promise<void> {
  const path = join(
    fromFileUrl(import.meta.url),
    "../../inputs",
    `${day}.json`
  );
  return Deno.writeTextFile(path, JSON.stringify(input));
}

async function* getExercicePath() {
  for await (const fileEntry of Deno.readDir(exercicesPath)) {
    if (!/test/.test(fileEntry.name)) {
      yield join(exercicesPath, fileEntry.name);
    }
  }
}

function getExerciceNumberFromPath(url: string): number {
  return Number(url.replace(/^.+\/(\d+)\.ts$/, "$1"));
}

await main();
