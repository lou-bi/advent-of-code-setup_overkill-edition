/** A COPIER DANS TOUT LES EXERCICES */
////////////////////////////////////////////////////////////////////
import getInput from "../utils/getInput.ts";

const currentDay = import.meta.url.match(/(\d+)\.ts$/)?.at(1);
if (!currentDay) throw new Error("Nom de fichier invalide");
const input = await getInput(+currentDay, Number);
////////////////////////////////////////////////////////////////////

export function getCount(input: number[]): number {
  let prev = 0;
  let count = 0;
  for (const measure of input) {
    if (prev && measure > prev) count++;
    prev = measure;
  }
  return count;
}

export function groupMeasurements(input: number[]): number[] {
  const groupedMeasurements = [];
  for (let i = 0; i < input.length; i++) {
    groupedMeasurements.push(
      input[i] + (input[i + 1] || 0) + (input[i + 2] || 0)
    );
  }
  return groupedMeasurements;
}

export const resolveExercice = () => ({
  "#1:": getCount(input),
  "#2:": getCount(groupMeasurements(input)),
});
