import { bold, blue, yellow, red } from "https://deno.land/std/fmt/colors.ts";

export const logError = (txt: string) => console.log(bold(red(txt)));
export const logWarn = (txt: string) => console.log(bold(yellow(txt)));
export const logInfo = (txt: string) => console.log(bold(blue(txt)));
