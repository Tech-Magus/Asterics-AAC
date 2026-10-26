# Feedback Menu Design

## Intent

Give the speech pathologist a simple way to send development feedback from Asterics AAC directly to `dayestas@crescentcityschools.org`.

## User flow

- Add a **Feedback** item to the expanded left sidebar, near Help.
- Add the same item to the compact mobile **More** menu.
- Selecting it opens the device's email composer with the recipient and subject already filled in.
- The message body contains short prompts for what happened, what was expected, and the device being used. It also includes the current Asterics AAC page URL.
- The app does not automatically include student names, vocabulary, messages, user records, or other personal data.

## Approaches considered

1. **Direct email link — selected.** This fits a single speech pathologist sending feedback to one school IT contact and requires no GitHub account or additional service.
2. **GitHub Issues.** This would organize development reports well, but Issues are currently disabled and submissions would require a GitHub account. Reports could also become public.
3. **Google Form.** This would provide structured private storage, but adds a separate form and response-management workflow that is unnecessary for one regular reporter.

## Constraints and scope

- Use the existing Font Awesome icons and sidebar styles.
- Keep the feature usable in the installed/offline app; composing and sending the email still requires an available email handler and network connection.
- Add the English label and safe fallback translations so every supported language can render the menu without breaking.
- Do not add an email service, credentials, analytics, or automatic transmission.

## Validation

- The desktop sidebar displays Feedback.
- The compact mobile menu displays Feedback.
- Activating either entry opens a correctly addressed draft with the expected subject and prompts.
- Existing build and relevant tests pass.

