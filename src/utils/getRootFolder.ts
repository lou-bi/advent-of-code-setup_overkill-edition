import { fromFileUrl, dirname } from "https://deno.land/std/path/mod.ts";

export default getRootPart();

function getRootPart() {
  return dirname(fromFileUrl(import.meta.url)).replace(/^(.+)\/src\/.+$/, "$1");
}
