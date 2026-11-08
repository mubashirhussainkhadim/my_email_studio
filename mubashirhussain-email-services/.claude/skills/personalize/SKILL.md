---
name: personalize
description: Write a version of each campaign email for every lead group in leads/leads.csv. Use when a campaign's emails are final and you want one copy per group.
argument-hint: "[campaign folder]"
context: fork
allowed-tools: Read, Glob, Grep, Write
---

# Personalize a campaign for each lead group

Campaign folder: $ARGUMENTS

## 1. Check the campaign folder

- If no campaign folder was given, stop. Use Glob on `campaigns/*/` and reply with the campaign folders that exist, one per line. Ask which one to use. Write nothing.
- Accept either `ai-era-pricing-launch` or `campaigns/ai-era-pricing-launch`.
- If the folder doesn't exist, or it has no `emails/*.md` files, stop. Say so and list the campaign folders that exist. Write nothing.

## 2. Read before writing

1. `brand/voice.md` and `brand/offers.md`. Every word you write must follow them.
2. `.claude/rules/emails.md`. Every file you write must still follow it.
3. `leads/leads.csv`. Take the group names from the `group` column only. Expect `ai-curious`, `comparing-devs` and `ready-to-scope`. Use every group the file has. Never copy names or email addresses from this file into an email.
4. The campaign's `plan.md`, if there is one. Use its "Who it's for" table and "The angle for each group" table to understand each group. If the plan doesn't describe a group, use this:
   - **ai-curious:** exploring what an AI agent could do, never hired a developer. Wants simple examples and a demo they can try alone.
   - **comparing-devs:** weighing an AI website or chatbot builder against hiring an expert. Wants a fair comparison and clear prices.
   - **ready-to-scope:** knows roughly what they want built. Wants a written, fixed quote before work starts.
5. Every file in `<campaign folder>/emails/`.

## 3. Write one version per email, per group

For each email and each group, change only two things:

1. **The opening line.** This is the first sentence after "Hi {{first_name}},". Rewrite it so it speaks to that group.
2. **One example.** Pick one example, list item or sentence in the body and swap it for one that fits the group better. Change only one.

Keep everything else exactly as it is, word for word:

- the `Subject:` and `Preview:` lines
- the greeting and the order of the sections
- the one main link and its button text
- the sign-off and the footer
- the `{{first_name}}`, `{{company_address}}` and `{{unsubscribe_url}}` placeholders

The new lines must also follow the brand:

- Plain English, short sentences. No hype words.
- Use only services, packages and prices from `brand/offers.md`. Say "from $600", not "$600", unless you name a package.
- No guaranteed results. No promise of more sales, customers or money.
- No delivery dates or numbers of days.
- Don't mention support, training or documentation unless the package named includes them.

## 4. Save the files

Save each version to `<campaign folder>/groups/<group>/emails/` with the same file name as the original. For example: `campaigns/ai-era-pricing-launch/groups/ai-curious/emails/01-new-fixed-prices.md`.

- Never change the original files in `<campaign folder>/emails/`.
- If a file already exists at the new path, don't overwrite it. Skip it and note it for the summary.
- Only write drafts. Never send, schedule or test-send anything.

## 5. Reply with a short summary only

When you finish, reply with this and nothing else:

```
Wrote <number> files in <campaign folder>/groups/.

ai-curious: "<one opening line you wrote>"
comparing-devs: "<one opening line you wrote>"
ready-to-scope: "<one opening line you wrote>"
```

If you skipped any files, add one line at the end: `Skipped <number> files that already existed.`
