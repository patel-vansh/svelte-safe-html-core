import fs from "fs";
import path from "path";

export function getFixtures(version) {
    const fixtureDirs = [
        path.normalize(__dirname + "/../fixtures/common"),
        path.normalize(__dirname + `/../fixtures/${version}`)
    ];

    let fixtures = [];
    for (const dir of fixtureDirs) {
        if (fs.existsSync(dir)) {
            for (const file of fs.readdirSync(dir)) {
                if (file.endsWith(".svelte")) {
                    fixtures.push({ base: file.replace(/\.svelte$/, ''), file, filepath: path.join(dir, file), expected: JSON.parse(fs.readFileSync(path.join(dir, file.replace(/\.svelte$/, '.expected.json')), "utf-8")) });
                }
            }
        }
    }
    return fixtures;
}