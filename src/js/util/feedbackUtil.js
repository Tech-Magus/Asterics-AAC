const FEEDBACK_EMAIL = 'dayestas@crescentcityschools.org';
const FEEDBACK_SUBJECT = 'Asterics AAC feedback';

function buildFeedbackMailto(currentUrl) {
    const body = [
        'Please describe what happened:',
        '',
        'What did you expect to happen?',
        '',
        'Device/browser:',
        '',
        `App page: ${currentUrl}`
    ].join('\n');
    const params = new URLSearchParams({
        subject: FEEDBACK_SUBJECT,
        body
    });
    return `mailto:${FEEDBACK_EMAIL}?${params.toString()}`;
}

export { buildFeedbackMailto };
