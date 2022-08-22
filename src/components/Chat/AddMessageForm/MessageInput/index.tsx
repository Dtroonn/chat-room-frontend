import { useScrollbar } from "hooks/useScrollbar";
import React from "react";
import emojiRegex from "emoji-regex";
//@ts-ignore
import classes from "./MessageInput.module.css";
import { getCaret, setCaret } from "./utils";

const EditableDiv = React.memo(
    //@ts-ignore
    React.forwardRef(({ handleInput }, ref) => {
        return (
            <div
                //@ts-ignore
                ref={ref}
                onInput={handleInput}
                suppressContentEditableWarning={true}
                className={classes.editableItem}
                contentEditable></div>
        );
    }),
);

interface IMessageInputProps {
    onChange: (value: string) => void;
    value: string;
}

const regexEmoji = emojiRegex();
export const MessageInput: React.FC<IMessageInputProps> = ({ onChange, value }) => {
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const caretPos = React.useRef(0);
    useScrollbar(wrapperRef);

    // React.useEffect(() => {
    //     caretPos.current = getCaret(contentRef.current as HTMLElement);
    //     console.log(caretPos.current);
    // });

    const handleInput: React.FormEventHandler<HTMLDivElement> = React.useCallback((e) => {
        // console.log("HELLO", e.currentTarget.childNodes);
        // console.log("HELLO2", e.currentTarget.childNodes[1].nodeName);
        caretPos.current = getCaret(contentRef.current as HTMLElement);
        console.log('HELLO FROM HANDLE INPUT')
        const value = Array.from(e.currentTarget.childNodes)
            .map((node) => {
                if (node.nodeName === "IMG") {
                    //@ts-ignore
                    return node.alt;
                }
                //@ts-ignore
                return node.data;
            })
            .join("");

        onChange(value);

        // const cloneNode = (contentRef.current as HTMLElement).cloneNode(true);
        //@ts-ignore
        // contentRef.current.innerHTML = value;

        // console.log(cloneNode);

        // console.log(getCaret(cloneNode as HTMLElement));
        // console.log("HI", e.currentTarget.innerText);
        // onChange(e.currentTarget.innerText);
    }, []);

    React.useEffect(() => {
        // console.log(contentRef.current);
        // console.log("TEXT NODE");

        const messagesArr = value.split(new RegExp(`(${regexEmoji.source})`, "g"));
        const nodes = messagesArr.map((msg: string, index) => {
            if (regexEmoji.test(msg)) {
                const emojiUnified = Array.from(msg)
                    .map((e) => e.codePointAt(0)?.toString(16))
                    .join(`-`);

                const imgElem = document.createElement("img");
                imgElem.src = `https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${emojiUnified}.png`;
                imgElem.alt = msg;
                imgElem.style.width = "20px";
                imgElem.style.height = "20px";
                return imgElem;
            }

            return document.createTextNode(msg);
        });

        //@ts-ignore
        contentRef.current.innerHTML = "";
        //@ts-ignore
        nodes.forEach((node) => {
            contentRef.current!.appendChild(node);
        });
        console.log('CAREPOSOSOS', caretPos.current);
        //@ts-ignore
        setCaret(contentRef.current as HTMLElement, caretPos.current);
        // contentRef.current?.focus();
    }, [value]);

    // const setRef = React.useCallback((node) => {
    //     wrapperRef.current = node;
    // }, [])

    const handlePaste:React.ClipboardEventHandler<HTMLDivElement>= (e) => {
        console.log(e.currentTarget.childNodes)
        e.preventDefault();
        const caresPos1 = getCaret(contentRef.current as HTMLElement);
        const pastedText = e.clipboardData.getData('Text');

        console.log('caret pos', caresPos1)
        //@ts-ignore
        // console.log('UCRRENT', e.currentTarget.childNodes)
        const value = Array.from(contentRef.current.childNodes)
            .map((node) => {
                if (node.nodeName === "IMG") {
                    //@ts-ignore
                    return node.alt;
                }
                //@ts-ignore
                return node.data;
            })
            .join("");

        const newValue = value.substring(0, caresPos1) + pastedText + value.substring(caresPos1, value.length);

        caretPos.current = caresPos1 + pastedText.length;
        console.log('PASTED TEXT LEGTH', pastedText.length);
        console.log('WILL CCARRET POS', caresPos1 + pastedText.length)
        onChange(newValue);

        // console.log(value);
        // caretPos.current = caresPos1  + e.clipboardData.getData('Text').length
        // onChange(value);

    }

    return (
        <div ref={wrapperRef} className={classes.wrapper}>
            {/* @ts-ignore */}
            {/* <EditableDiv ref={contentRef} handleInput={handleInput} /> */}
            <div
                onPaste={handlePaste}
                ref={contentRef}
                onInput={handleInput}
                suppressContentEditableWarning={true}
                className={classes.editableItem}
                contentEditable></div>
        </div>
    );
};
