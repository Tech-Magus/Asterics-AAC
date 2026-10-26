import { joinCollectionText } from './collectionTextUtil';

const join = (items) => joinCollectionText(items, (item) => item.text);

test('preserves exact case and repeated whitespace', () => {
    expect(join([
        { text: 'A', collectionAppendExact: true },
        { text: '  ', collectionAppendExact: true },
        { text: 'v', collectionAppendExact: true },
        { text: ' ', collectionAppendExact: true }
    ])).toBe('A  v ');
});

test('separates normal words and attaches exact suffixes', () => {
    expect(join([
        { text: 'is' },
        { text: "n't", collectionAppendExact: true },
        { text: 'on' }
    ])).toBe("isn't on");
});
