import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const args = process.argv.slice(2);
const repoIndex = args.indexOf("--repo");
const repo = repoIndex >= 0 ? args[repoIndex + 1] : undefined;
const dryRun = args.includes("--dry-run");

if (repoIndex >= 0 && !repo) {
  throw new Error("--repoにはowner/repo形式の値が必要です");
}

const labels = JSON.parse(readFileSync(new URL("../.github/labels.json", import.meta.url), "utf8"));

for (const label of labels) {
  const commandArgs = [
    "label",
    "create",
    label.name,
    "--color",
    label.color,
    "--description",
    label.description,
    "--force",
  ];

  if (repo) {
    commandArgs.push("--repo", repo);
  }

  if (dryRun) {
    console.log(`gh ${commandArgs.map((value) => JSON.stringify(value)).join(" ")}`);
    continue;
  }

  execFileSync("gh", commandArgs, { stdio: "inherit" });
  console.log(`Synced: ${label.name}`);
}

console.log(dryRun ? `Dry run: ${labels.length} labels` : `Synced ${labels.length} labels`);
