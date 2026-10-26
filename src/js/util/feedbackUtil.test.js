import { buildFeedbackMailto } from './feedbackUtil.js';

describe('buildFeedbackMailto', () => {
    test('addresses a structured Asterics AAC feedback draft', () => {
        const feedbackUrl = new URL(buildFeedbackMailto('https://example.test/Asterics-AAC/#welcome'));

        expect(feedbackUrl.protocol).toBe('mailto:');
        expect(feedbackUrl.pathname).toBe('dayestas@crescentcityschools.org');
        expect(feedbackUrl.searchParams.get('subject')).toBe('Asterics AAC feedback');
        expect(feedbackUrl.searchParams.get('body')).toBe(
            'Please describe what happened:\n\n' +
                'What did you expect to happen?\n\n' +
                'Device/browser:\n\n' +
                'App page: https://example.test/Asterics-AAC/#welcome'
        );
    });

    test('keeps query strings and hashes inside the email body', () => {
        const currentUrl = 'https://example.test/Asterics-AAC/?mode=school&voice=on#grid/123';
        const feedbackUrl = new URL(buildFeedbackMailto(currentUrl));

        expect(feedbackUrl.searchParams.get('body')).toContain(`App page: ${currentUrl}`);
        expect(feedbackUrl.searchParams.get('voice')).toBeNull();
    });

    test('does not add AAC user or vocabulary data', () => {
        const feedbackUrl = new URL(buildFeedbackMailto('https://example.test/Asterics-AAC/#welcome'));
        const body = feedbackUrl.searchParams.get('body').toLowerCase();

        expect(body).not.toContain('student name');
        expect(body).not.toContain('current user');
        expect(body).not.toContain('vocabulary');
        expect(body).not.toContain('message history');
    });
});
