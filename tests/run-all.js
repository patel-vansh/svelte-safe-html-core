import { exec } from "child_process";
import path from "path";
import { promisify } from "util";

const asyncExec = promisify(exec);

const dirs = ["svelte3", "svelte4", "svelte5-legacy"];
const cwd = process.cwd();


async function testDir(dir) {
    const testDir = path.join(cwd, "tests", dir);
    console.log(`\n🧹 Testing ${dir}...`);

    try {
        // Cleanup
        await asyncExec("rm -rf node_modules package-lock.json", { cwd: testDir });
        // await asyncExec("npm cache clean --force");

        // Install
        await asyncExec("npm install", { cwd: testDir, stdio: "inherit" });

        // Run tests
        await asyncExec("npm test", { cwd: testDir, stdio: "inherit" });

        console.log(`✅ ${dir} passed`);
    } catch (err) {
        console.error(`❌ ${dir} failed:\n`, err.stderr || err.message);
        process.exitCode = 1;
    }
}

(async () => {
    console.log("🚀 Running tests in parallel...\n");
    await Promise.all(dirs.map(testDir));
    console.log("\n✅ All tests completed.");
})();