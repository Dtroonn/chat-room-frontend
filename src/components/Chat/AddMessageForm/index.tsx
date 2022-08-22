import React from "react";
import emojiRegex from "emoji-regex";

import AttachFileIcon from "@mui/icons-material/AttachFile";
import Grid from "@mui/material/Grid";
import Popper from "@mui/material/Popper";
import Grow from "@mui/material/Grow";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import EmojiPicker, { IEmojiData } from "emoji-picker-react";

import "react-perfect-scrollbar/dist/css/styles.css";
import { MessageService } from "services/MessageService";
import { useScrollbar } from "hooks/useScrollbar";
import { MessageInput } from "./MessageInput";
import { Emoji } from "components/Emoji";

interface IAddMessageFormProps {
    roomId: string;
}
// const regexEmoji = emojiRegex();
export const AddMessageForm: React.FC<IAddMessageFormProps> = ({ roomId }) => {
    const [message, setMessage] = React.useState("");
    const [openEmojiPicker, setOpenEmojiPicker] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);

    const toggleOpenEmojiPicker = () => {
        setOpenEmojiPicker((prev) => !prev);
    };

    // const handleChangeInputMessage = (value: string) => {
    //     setMessage(value);
    // };

    const handleChangeMessage: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmitMessage = async () => {
        await MessageService.create(roomId, message);
        setMessage("");
    };

    // const handleEmojiClick = (
    //     event: React.MouseEvent<Element, MouseEvent>,
    //     emojiObject: IEmojiData,
    // ) => {
    //     // console.log(emojiObject);
    //     console.log(emojiObject.emoji.match(regexEmoji));
    //     // console.log(
    //     //     Array.from(emojiObject.emoji)
    //     //         .map((e) => e.codePointAt(0)?.toString(16))
    //     //         .join(`-`),
    //     // );
    //     //@ts-ignore
    //     // const src = event.target.getAttribute("src");
    //     setMessage((prev) => prev + emojiObject.emoji);
    // };

    // const messageArr = message.split(new RegExp(`(${regexEmoji.source})`, "g"));
    // const messageContent = messageArr.map((msg, index) => {
    //     if (regexEmoji.test(msg)) {
    //         const emojiUnified = Array.from(msg)
    //             .map((e) => e.codePointAt(0)?.toString(16))
    //             .join(`-`);

    //         return <Emoji key={msg + index} unified={emojiUnified} alt={msg} />;
    //     }

    //     return <React.Fragment key={msg + index}>{msg}</React.Fragment>;
    // });
    // console.log(regexEmoji.source);
    // console.log("MESSAGE ARR", messageArr);

    return (
        <div style={{ padding: "5px 10px" }}>
            <form>
                <Grid
                    container
                    sx={{
                        minHeight: 50,
                        backgroundColor: "#fff",
                        flexWrap: "nowrap",
                    }}
                    spacing={1}>
                    <Grid item sx={{ alignSelf: "flex-end" }}>
                        <AttachFileIcon
                            sx={{
                                transform: "rotate(-135deg)",
                                cursor: "pointer",
                                color: "gray",
                                fontSize: 30,
                            }}
                            fontSize="large"
                        />
                    </Grid>
                    <Grid item flexGrow={1}>
                        {/* <MessageInput value={message} onChange={handleChangeMessage} /> */}

                        <StyledTextField
                            sx={{ width: "100%" }}
                            multiline
                            variant="standard"
                            onChange={handleChangeMessage}
                            value={message}
                            maxRows={5}
                            placeholder="Напишите сообщение..."
                        />
                    </Grid>
                    <Grid item sx={{ alignSelf: "flex-end" }}>
                        <div onClick={toggleOpenEmojiPicker} ref={anchorRef}>
                            <InsertEmoticonIcon
                                color="primary"
                                fontSize="large"
                                sx={{
                                    cursor: "pointer",
                                    fontSize: 30,
                                    mr: 1,
                                }}
                            />
                        </div>
                        {/* <Popper
                            open={openEmojiPicker}
                            anchorEl={anchorRef.current}
                            placement="top"
                            transition
                            disablePortal>
                            {({ TransitionProps, placement }) => (
                                <Grow {...TransitionProps}>
                                    <div>
                                        <EmojiPicker
                                            disableSkinTonePicker
                                            pickerStyle={{ zIndex: "10000", position: "relative" }}
                                            onEmojiClick={handleEmojiClick}
                                        />
                                    </div>
                                </Grow>
                            )}
                        </Popper> */}
                    </Grid>
                    <Grid item sx={{ alignSelf: "flex-end" }}>
                        <div onClick={handleSubmitMessage}>
                            <SendIcon
                                color="primary"
                                sx={{
                                    fontSize: 30,
                                    cursor: "pointer",
                                }}
                            />
                        </div>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

const StyledTextField = styled(TextField)({
    height: "100%",
    display: "flex",
    "& .MuiInput-root": {
        height: "100%",
        "&::after, &::before": {
            border: "0 !important",
        },
    },
});
