import fs from "fs";
import { findUnsafeHtml } from "./src/index.js";

const code = fs.readFileSync("test.svelte", "utf8");
console.log(JSON.stringify(findUnsafeHtml(code, "test.svelte", ["sanitize"], true)));

const code2 = fs.readFileSync("test2.svelte", "utf8");
console.log(JSON.stringify(findUnsafeHtml(code2, "test2.svelte", ["sanitize"], true)));