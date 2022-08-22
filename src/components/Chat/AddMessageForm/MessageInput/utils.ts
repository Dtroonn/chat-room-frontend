export function getCaret(el: HTMLElement) {
    let caretAt = 0;
    const sel = window.getSelection() as Selection;

    if (sel.rangeCount === 0) {
        return caretAt;
    }

    const range = sel.getRangeAt(0);
    const preRange = range.cloneRange();
    console.log("PRE RANGE", range);
    preRange.selectNodeContents(el);
    console.log("PRE RANGE", preRange.endOffset);
    preRange.setEnd(range.endContainer, range.endOffset);
    caretAt = preRange.toString().length;

    return caretAt;
}

export function setCaret(el: HTMLElement, offset: number) {
    if (!el.childNodes[0]) return;

    let sel = window.getSelection() as Selection;
    let range = document.createRange();

    let nodesContentLength = 0;
    const nodesArr = Array.from(el.childNodes)
    const nodeIdx = nodesArr.findIndex((node) => {
        let nodesLength: number;
        if(node.nodeName === "IMG") {
            //@ts-ignore
            nodesLength = nodesContentLength + node.alt.length;
            // if(nodeLengthWithImg >= offset) {
            //     return true;
            // }
        } else {
            //@ts-ignore
            nodesLength = node.length + nodesContentLength;
        }

        nodesContentLength = nodesLength;

        return nodesLength >= offset;
    } )

    if(nodesArr[nodeIdx].nodeName === 'IMG') {
        console.log('HELLO YA POSTAVIL EMU', nodeIdx + 1);
        range.setStart(el, nodeIdx + 1);
    } else if(nodeIdx === 0) {
        range.setStart(nodesArr[nodeIdx], offset);
    } else {
        const diff = nodesContentLength - offset;
        //@ts-ignore
        range.setStart(nodesArr[nodeIdx], diff === 0 ? nodesArr[nodeIdx].length :  diff);
    }

    // console.log(el.childNodes);
    // console.log(offset);
    // range.setStart(el, offset);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);


}
