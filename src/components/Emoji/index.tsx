import React from "react";

//@ts-ignore
import classes from "./Emoji.module.css";

interface IEmojiProps {
    unified: string;
    alt?: string;
}

export const Emoji: React.FC<IEmojiProps> = ({ unified, alt = "" }) => {
    return (
        <img
            className={classes.emoji}
            src={`https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${unified}.png`}
            alt={alt}
        />
    );
};
