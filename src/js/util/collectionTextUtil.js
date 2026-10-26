function joinCollectionText(elements, getText) {
    return elements.reduce((result, element) => {
        let text = getText(element) || '';
        if (element.collectionAppendExact || !result || /\s$/.test(result) || /^\s/.test(text)) {
            return result + text;
        }
        return result + ' ' + text;
    }, '');
}

export { joinCollectionText };
