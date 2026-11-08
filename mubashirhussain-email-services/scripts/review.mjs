// Headless brand review of one campaign folder.
// Usage: node scripts/review.mjs campaigns/<name>
// Saves review/findings.json, prints a one-line summary and exits 1 if any
// finding is high severity (2 if the review itself could not run).

import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const folder = process.argv[2];
if (!folder) {
  console.error("Usage: node scripts/review.mjs <campaign folder>");
  process.exit(2);
}

const schema = readFileSync("review/findings.schema.json", "utf8");
const prompt = `Review every email in ${folder} against brand/voice.md and .claude/rules/emails.md. Report only real problems.`;

const run = spawnSync(
  "claude",
  ["-p", prompt, "--output-format", "json", "--json-schema", schema, "--allowedTools", "Read,Glob,Grep"],
  { encoding: "utf8", maxBuffer: 50 * 1024 * 1024 }
);
if (run.error || run.status !== 0) {
  let reason = run.error?.message || run.stderr.trim();
  try {
    const out = JSON.parse(run.stdout);
    reason ||= (Array.isArray(out) ? out.at(-1) : out).result;
  } catch {}
  console.error(`Review failed: ${reason || `claude exited ${run.status}`}`);
  process.exit(2);
}

// The output is either one result object, or a list whose last item is the result.
let output = JSON.parse(run.stdout);
if (Array.isArray(output)) output = output.at(-1);
const result = output?.structured_output;
if (!result || !Array.isArray(result.findings)) {
  console.error("Review failed: no structured_output in the claude result.");
  process.exit(2);
}

writeFileSync("review/findings.json", JSON.stringify(result, null, 2) + "\n");

const count = (level) => result.findings.filter((f) => f.severity === level).length;
const high = count("high");
console.log(
  `${folder}: ${result.findings.length} findings (${high} high, ${count("medium")} medium, ${count("low")} low). Saved to review/findings.json`
);
process.exit(high > 0 ? 1 : 0);
