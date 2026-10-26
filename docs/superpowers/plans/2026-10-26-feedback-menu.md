# Feedback Menu Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an accessible Feedback entry to the desktop and compact menus that opens a structured email to `dayestas@crescentcityschools.org`.

**Architecture:** A small pure utility builds the encoded `mailto:` URL from the current app URL. The existing main Vue shell calls it from both menu variants, while Vue I18n supplies the visible label with English fallback.

**Tech Stack:** JavaScript, Vue 2, Vue I18n, Jest, GitHub Actions and Pages

**Spec:** `docs/superpowers/specs/2026-10-26-feedback-menu-design.md`

## Global Constraints

- Do not automatically include student names, vocabulary, messages, user records, or other personal data.
- Use the existing Font Awesome icons and sidebar styles.
- The menu must work in both expanded and compact layouts.
- Composing and sending requires an available email handler and network connection.

## Review Focus

- Page URLs containing query strings or hashes remain correctly encoded in the email body.
- The recipient and subject cannot be altered by page URL content.
- Missing non-English translations fall back to the English `Feedback` label.
- The compact menu invokes the same email builder as the desktop menu.
- No locally stored AAC content is read while constructing feedback.

---

### Task 1: Feedback email builder and menu entries

**Files:**
- Create: `src/js/util/feedbackUtil.js`
- Create: `src/js/util/feedbackUtil.test.js`
- Modify: `src/js/vue/mainVue.js`
- Modify: `index.html`
- Modify: `app/lang/i18n.en.json`

**Interfaces:**
- Produces: `buildFeedbackMailto(currentUrl: string): string`
- Consumes: `window.location.href` at the moment the user selects Feedback

- [ ] **Step 1: Write failing utility tests**

Test that the generated URL uses `dayestas@crescentcityschools.org`, includes the fixed subject and feedback prompts, correctly encodes a URL containing `?` and `#`, and contains no AAC user data fields.

- [ ] **Step 2: Run the focused test and verify it fails**

Run: `npx jest src/js/util/feedbackUtil.test.js --runInBand`
Expected: FAIL because `feedbackUtil.js` does not exist.

- [ ] **Step 3: Implement `buildFeedbackMailto(currentUrl)`**

Use `URLSearchParams` to encode a fixed subject and multiline body. Treat the page URL only as body text.

- [ ] **Step 4: Run the focused test and verify it passes**

Run: `npx jest src/js/util/feedbackUtil.test.js --runInBand`
Expected: PASS.

- [ ] **Step 5: Wire both menu layouts**

Import the utility in `mainVue.js`, expose `openFeedback()` to open the mail URL, add the Feedback item near Help in `index.html`, and add the same action to the compact `setupContextMenu()` menu. Add English `feedback` translation; other languages use the configured English fallback.

- [ ] **Step 6: Run the focused test and full build**

Run: `npm test -- --runInBand src/js/util/feedbackUtil.test.js` and `npm run build`
Expected: all tests pass and the production build exits 0.

- [ ] **Step 7: Commit**

Commit the spec, plan, test, utility, navigation, and translation together as `Add email feedback menu`.

### Task 2: Deploy and verify the installed-app update

**Files:**
- Modify: none beyond generated production output handled by CI

**Interfaces:**
- Consumes: the `master` push and existing `Deploy school AAC app` workflow
- Produces: updated GitHub Pages service-worker bundle

- [ ] **Step 1: Push master to `Tech-Magus/Asterics-AAC`**

- [ ] **Step 2: Verify the GitHub Actions deployment succeeds**

- [ ] **Step 3: Verify the production bundle and page return HTTP 200 and contain the Feedback feature**

- [ ] **Step 4: Open the deployed app and verify Feedback appears in the expanded menu**

- [ ] **Step 5: Verify the generated email link is addressed to `dayestas@crescentcityschools.org` with the expected subject and prompts without sending an email**

