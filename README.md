# Email Studio: Mubashir Hussain

An email studio built with Claude Code, for planning, writing, checking and safely test-sending email campaigns for [mubashirhussain.com](https://mubashirhussain.com).

Mubashir Hussain is a forward deployed engineer who builds AI agents, WhatsApp automation and software for small businesses. The emails in this studio help small business owners understand what that work can do for them and what it costs.

## Project submission

This repository is my project submission for the **Email Studio Lab**.

| | |
|---|---|
| **Course** | FDE-102 |
| **Class** | Class 9 |
| **Project** | Email Studio Lab |
| **Started** | 25 October 2026 |
| **Due** | 8 November 2026, 11:59 PM PKT |
| **Status** | Submitted |
| **Student** | Mubashir Hussain ([mubashirhussain.com](https://mubashirhussain.com)) |

## What the studio does

1. **Plans campaigns.** Claude writes a campaign plan from the brand files, using the official Anthropic marketing plugin.
2. **Writes the emails.** It drafts an email sequence, then one copy of each email for every lead group.
3. **Checks every email.** A rules file, a brand review and an automatic review script catch problems before anything goes out.
4. **Sends safely.** Emails can only go to Resend test addresses or to my own address. A guard blocks every other send.

No email in this studio has ever been sent to a real customer. All leads are made up.

## The campaign: new fixed prices

The main campaign is in `campaigns/ai-era-pricing-launch/`. It tells about 500 people who have already been in touch that Mubashir now publishes fixed starting prices for six kinds of work, and invites them to book a call.

| # | Email | Main link |
|---|---|---|
| 01 | My prices are now fixed and written down | Book a call |
| 02 | How a fixed price works, step by step | Book a call |
| 03 | Not ready for a call? Try a demo first | Try a demo |
| 04 | Book a call before the break | Book a call |

Each email also has a version for each of the three lead groups:

- **ai-curious:** exploring what an AI agent could do, and have never hired a developer.
- **comparing-devs:** weighing a typical AI website or chatbot builder against hiring an expert.
- **ready-to-scope:** know what they want built, and want a fixed price.

## Folder guide

All the studio files are in `mubashirhussain-email-services/`.

| Path | What it is |
|---|---|
| `CLAUDE.md` | The studio's main rules: plain English, never email real people, ask before deleting. It also loads the brand files. |
| `brand/voice.md` | How the emails sound: trusted, plain, honest. Words to use, words to avoid, and claims we must never make. |
| `brand/offers.md` | Every service and its starting price, taken from mubashirhussain.com/services. |
| `leads/leads.csv` | 24 made-up practice leads in three groups. Every address ends in `@example.com`. |
| `leads/CLAUDE.md` | Rules for the leads folder only: no real people, always a consent value. |
| `campaigns/ai-era-pricing-launch/plan.md` | The campaign plan: goal, groups, messages, timing and risks. |
| `campaigns/ai-era-pricing-launch/sequence.md` | The four-email sequence, send dates and flow. |
| `campaigns/ai-era-pricing-launch/emails/` | The four shared email drafts. |
| `campaigns/ai-era-pricing-launch/groups/` | One copy of each email for each lead group (12 files). |
| `campaigns/test-bad/` | A deliberately bad email, used to prove the automatic review works. |
| `.claude/rules/emails.md` | Rules every email file must follow. They load only when Claude works on email files. |
| `.claude/skills/personalize/` | My own skill: `/personalize <campaign>` writes one copy of each email per lead group. |
| `.claude/hooks/send-guard.mjs` | The safety guard that blocks sends to real people. |
| `.claude/settings.json` | Turns on the marketing plugin and the send guard. |
| `review/findings.schema.json` | The shape of the automatic review's report. |
| `review/findings.json` | The latest review report. |
| `scripts/review.mjs` | The automatic review script. |
| `notes/` | Research and decisions, such as which skills I chose and why. |

## The rules every email follows

From `.claude/rules/emails.md`:

- Line 1 is the subject (50 characters or fewer). Line 2 is the preview (90 characters or fewer).
- Greet the reader with `Hi {{first_name}},`.
- Exactly one main link, to /book, /demos or /services.
- End with the sign-off, then the two-line footer with the address and unsubscribe link.

From `brand/voice.md` and `brand/offers.md`:

- Never promise results, extra sales or a delivery time.
- Always say "from $600", not just "$600".
- No hype words such as "revolutionary", "game-changer" or "leverage".

## Safety: the send guard

`.claude/hooks/send-guard.mjs` runs before every Resend tool call that Claude makes.

- It always blocks tools that can reach whole lists: broadcasts, automations and inbox sends.
- For single and batch sends, it checks every `to`, `cc` and `bcc` address. Only addresses ending in `@resend.dev`, or my own address (`MY_EMAIL`), are allowed.
- If it can't read the tool call, it blocks it to be safe.

## Automatic review

`scripts/review.mjs` reviews a campaign with no one typing. It's built so it can later run on every pull request.

```
node scripts/review.mjs campaigns/ai-era-pricing-launch
```

It runs Claude Code headless (`claude -p`) with read-only tools. Claude checks every email against `brand/voice.md` and `.claude/rules/emails.md`, and returns its findings in the shape set by `review/findings.schema.json`. Each finding has a file, line, severity, problem and fix.

| Exit code | Meaning |
|---|---|
| 0 | No high-severity problems |
| 1 | At least one high-severity problem |
| 2 | The review could not run |

Results so far:

- **`campaigns/test-bad`:** 6 findings (4 high), exit code 1. It caught the 24-hour delivery promise, the second link and the "last chance" line.
- **`campaigns/ai-era-pricing-launch`:** 4 findings (all medium), exit code 0. Email 01 and its group copies say prices are "now fixed", which suggests they weren't fixed before.

## How to run it

You need Node.js, Git and [Claude Code](https://claude.com/claude-code).

1. Clone the repository and open the studio folder:
   ```
   git clone https://github.com/mubashirhussainkhadim/my_email_studio.git
   cd my_email_studio/mubashirhussain-email-services
   ```
2. Start Claude Code with `claude`. Accept the marketing plugin when asked.
3. To test-send through Resend, create your own `.mcp.json` for the `resend-mcp` server, and put your Resend API key in an environment variable. This file is ignored by git, so keys are never committed.
4. Set `MY_EMAIL` in `.claude/settings.local.json`, so the send guard knows your own address.

Useful commands inside Claude Code:

- `/marketing:campaign-plan`: plan a new campaign
- `/marketing:email-sequence`: draft the emails
- `/marketing:brand-review`: check a draft against the brand voice
- `/personalize <campaign>`: write a copy of each email for every lead group

## About Mubashir Hussain

Mubashir builds AI agents, WhatsApp automation, system connections and custom web apps for small businesses. Every job has a fixed price, agreed in writing before work starts. No surprises.

- Website: [mubashirhussain.com](https://mubashirhussain.com)
- Services and prices: [mubashirhussain.com/services](https://mubashirhussain.com/services)
- Try a demo: [mubashirhussain.com/demos](https://mubashirhussain.com/demos)
- Book a call: [mubashirhussain.com/book](https://mubashirhussain.com/book)
- Email: hello@mubashirhussain.com
