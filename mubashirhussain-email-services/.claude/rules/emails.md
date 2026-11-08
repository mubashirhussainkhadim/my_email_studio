---
paths:
  - "campaigns/**/emails/*.md"
---

# Email file rules

These rules apply to every email file in every campaign. Each email file must follow all of them.

## 1. Subject and preview come first

The first line is the subject. The second line is the preview text.

```
Subject: ...
Preview: ...
```

- The subject line is 50 characters or fewer, counting the words after "Subject: ".
- The preview line is 90 characters or fewer, counting the words after "Preview: ".

## 2. Greet the reader by first name

Greet the reader with `{{first_name}}`. For example: "Hi {{first_name}},"

## 3. One main link only

Each email has exactly one main link. Write it like this:

```
[Button text](https://mubashirhussain.example/book)
```

Change the button text to fit the email. The link can go to /book, /demos or /services, whichever fits the email. Do not add a second main link.

`mubashirhussain.example` is a placeholder. Keep it in the draft. Mubashir swaps in the real mubashirhussain.com link, with tracking tags, when loading the email into the email tool.

## 4. End with the sign-off, then the footer

End the email with our sign-off from brand/voice.md. Put the two-line footer straight after it.

Write the sign-off and footer as plain text in the email file. Do not put them inside a code block. The end of every email file looks like this:

Best,
Mubashir Hussain
mubashirhussain.com

You're getting this because you got in touch with Mubashir Hussain.
Mubashir Hussain, {{company_address}} · Unsubscribe: {{unsubscribe_url}}
