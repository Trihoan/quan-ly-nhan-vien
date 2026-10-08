import { spawn } from "node:child_process";

const isWindows = process.platform === "win32";
const npmCommand = isWindows ? "npm.cmd" : "npm";
const children = ["dev", "graphql", "start:nest", "dev:producer"].map((script) => {
    const child = spawn(npmCommand, ["run", script], {
        stdio: "inherit",
        shell: isWindows
    });

    child.on("error", (error) => {
        console.error(`Không thể chạy npm run ${script}:`, error);
        stop(1);
    });

    child.on("exit", (code) => {
        if (!stopping) {
            console.error(`npm run ${script} đã dừng.`);
            stop(code ?? 1);
        }
    });

    return child;
});

let stopping = false;

function stop(exitCode = 0) {
    if (stopping) return;
    stopping = true;
    process.exitCode = exitCode;

    for (const child of children) {
        if (child.exitCode === null && !child.killed) child.kill();
    }
}

process.on("SIGINT", () => stop(0));
process.on("SIGTERM", () => stop(0));
