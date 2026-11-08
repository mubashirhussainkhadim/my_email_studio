// PreToolUse guard for the Resend MCP server.
// Blocks any send to an address that is not a Resend test address (@resend.dev)
// or the owner's own email (MY_EMAIL). Exit code 2 blocks the tool call.

const ALWAYS_BLOCK = new Set([
  "send-broadcast",
  "create-automation",
  "send-inbox-draft",
  "send-new-inbox-email",
]);
const CHECK_RECIPIENTS = new Set(["send-email", "send-batch-emails"]);

function block(reason) {
  process.stderr.write(`Send guard: ${reason}\n`);
  process.exit(2);
}

// Turn "Name <a@b.com>", "a@b.com" or a list of either into bare lowercase addresses.
function addresses(value) {
  if (value == null) return [];
  if (Array.isArray(value)) return value.flatMap(addresses);
  if (typeof value === "object") return addresses(value.email ?? value.address);
  return String(value)
    .split(",")
    .map((part) => {
      const match = part.match(/<([^>]+)>/);
      return (match ? match[1] : part).trim().toLowerCase();
    })
    .filter(Boolean);
}

function recipients(input) {
  const found = [];
  for (const field of ["to", "cc", "bcc"]) found.push(...addresses(input[field]));
  // A batch send carries a list of emails, each with its own to, cc and bcc.
  for (const value of Object.values(input)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        if (item && typeof item === "object" && !Array.isArray(item)) {
          found.push(...recipients(item));
        }
      }
    }
  }
  return found;
}

function isAllowed(address, myEmail) {
  if ((address.match(/@/g) || []).length !== 1) return false;
  if (address.endsWith("@resend.dev")) return true;
  return myEmail !== "" && address === myEmail;
}

let raw = "";
for await (const chunk of process.stdin) raw += chunk;

let call;
try {
  call = JSON.parse(raw);
} catch {
  block("could not read the tool call, so it was blocked to be safe.");
}

const tool = String(call.tool_name || "")
  .replace(/^mcp__resend__/, "")
  .replace(/_/g, "-");
const input = call.tool_input || {};
const myEmail = (process.env.MY_EMAIL || "").trim().toLowerCase();

if (ALWAYS_BLOCK.has(tool)) {
  block(`${tool} is always blocked because it can reach whole lists of people.`);
}

if (CHECK_RECIPIENTS.has(tool)) {
  const list = recipients(input);
  if (list.length === 0) block(`${tool} has no recipients to check, so it was blocked.`);
  for (const address of list) {
    if (!isAllowed(address, myEmail)) {
      block(
        `${address} is not allowed. Only addresses ending in @resend.dev or your own email (MY_EMAIL) can receive email.`
      );
    }
  }
}

process.exit(0);
