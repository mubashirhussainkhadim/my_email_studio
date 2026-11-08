# Email sequence: New fixed prices

Written 8 November 2026. Four emails, sent to everyone on the list. Goal, timing and messages come from [plan.md](plan.md). The email drafts are in [emails/](emails/).

## How this differs from the plan

The plan has six emails, and E2 and E3 are written separately for each of the three groups. This sequence has four emails, and everyone gets the same ones. All four go out in weeks 1 and 2, before the holidays, as risk 1 in the plan suggests.

| Plan email | In this sequence |
|---|---|
| E1: New fixed prices | 01 |
| E2: First group email | 02 (uses the ready-to-scope idea, "how a fixed quote works", for everyone) |
| E3: Second group email | 03 (uses the ai-curious idea, "try a demo first", for everyone) |
| E4: Book before the break | 04 (also does the job of E6: it says this is the last email about the new prices) |
| E5: Plan January now | Left out. 04 already offers January slots. |
| E6: Last note | Merged into 04. |

## Overview

| # | File | Subject | Purpose | Send | Main link | Who gets it |
|---|---|---|---|---|---|---|
| 1 | 01-new-fixed-prices.md | My prices are now fixed and written down | Share the news and the starting prices | Tue 8 Dec | Book a call | Everyone |
| 2 | 02-how-a-fixed-quote-works.md | How a fixed price works, step by step | Explain the steps to a fixed quote, and the safety rules | Thu 10 Dec | Book a call | Not booked yet |
| 3 | 03-try-a-demo-first.md | Not ready for a call? Try a demo first | Give people who aren't ready a low-effort next step | Tue 15 Dec | Try a demo | Not booked yet |
| 4 | 04-book-before-the-break.md | Last note: book a call before the break | Last ask, with January slots as an option | Thu 17 Dec | Book a call | Not booked yet |

Optional: resend 01 on Mon 14 Dec to people who didn't open it, with a new subject line (see below).

## Flow

```
[Start: everyone on the list]
        |
   01 (Tue 8 Dec) --booked--> [EXIT]
        |
        +-- didn't open --> 01 resend, new subject (Mon 14 Dec, optional)
        |
   02 (Thu 10 Dec) --booked--> [EXIT]
        |
   03 (Tue 15 Dec) --booked--> [EXIT]
        |
   04 (Thu 17 Dec) --booked--> [EXIT]
        |
   [End: no more emails about the new prices]
```

## Rules for sending

- **Exit:** anyone who books a call stops getting these emails.
- **Replies:** anyone who replies stops getting the sequence too. Mubashir answers them by hand.
- **Unsubscribes:** never send to anyone who has unsubscribed.
- **Consent:** check what each person agreed to receive before the first send (risk 4 in the plan).
- **No re-entry:** nobody gets the sequence twice.

## Other subject lines

| # | Option B | Option C |
|---|---|---|
| 01 | Fixed prices, agreed before work starts | What would your job cost? |
| 02 | No surprises: how my quotes work | From first call to a fixed price |
| 03 | See a sample agent before you decide | Curious about AI agents? Start here |
| 04 | Book a call now, or for January | Calls are open until [date] |

Use 01 option B as the subject for the 01 resend.

## A/B tests

1. **01 subject line.** Split the first send 50/50 between the main subject and option B. The winner is the one with more clicks to /book, not more opens. Opens are unreliable.
2. **Reply line placement in 04.** Version A as written. Version B moves "Just reply whenever you're ready" above the button. Measure bookings plus replies.

With about 500 people, the results will be rough. Treat them as hints for the next campaign, not proof.

## What to measure

- **Main number:** calls booked from these emails. Target: 30 by Sun 3 Jan 2027 (see section 7 of the plan for weekly targets).
- **Per email:** clicks on the main link, replies and unsubscribes. Keep unsubscribes under 0.5% per email.
- **Overall:** total bookings, replies that turned into calls, and which email each booking came from.
- **When to check:** the Friday counts in the plan, and a results note after 3 January.

## Before sending

- [ ] Mubashir confirms what is actually new about the prices. 01 says "now fixed and published on my website". Change it if that isn't accurate.
- [ ] Fill in `[date]` in the 04 preview and body (and in subject option C) with the last call date before the break.
- [ ] Run `/marketing:brand-review` on each email, then Mubashir approves.
- [ ] Load the emails into the email tool, set the exit rules and add tracking tags to each link.
- [ ] Check that /book, /services and /demos all work.
