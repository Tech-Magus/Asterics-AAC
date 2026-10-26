import fs from 'fs';
import path from 'path';

describe('desktop feedback link', () => {
    beforeEach(() => {
        const html = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf8');
        document.documentElement.innerHTML = html;
        window.history.replaceState({}, '', '/Asterics-AAC/#grid/example');
    });

    test('works without depending on the current Vue bundle', () => {
        const link = document.getElementById('feedbackLink');

        expect(link).not.toBeNull();
        expect(link.getAttribute('@click')).toBeNull();
        expect(link.getAttribute('href')).toContain('mailto:dayestas@crescentcityschools.org');
    });

    test('adds the current app page before opening the email draft', () => {
        const link = document.getElementById('feedbackLink');
        const clickHandler = new Function(link.getAttribute('onclick'));

        clickHandler.call(link);

        expect(decodeURIComponent(link.href)).toContain('App page: http://localhost/Asterics-AAC/#grid/example');
    });
});
