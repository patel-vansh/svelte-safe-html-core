import { describe, it, expect } from "vitest";
import fs from "fs";

import { findUnsafeHtml } from "../../src/index.js";
import { getFixtures } from "../utils/getFixtures";

const fixtures = getFixtures("svelte4");

describe("Svelte version: svelte4", () => {
    for (const f of fixtures) {
        it(f.base, () => {
            const code = fs.readFileSync(f.filepath, "utf-8");

            const result = findUnsafeHtml(code, f.file, [], false);

            expect(result).toEqual(f.expected);
        });
    }
});