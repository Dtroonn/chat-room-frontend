import React from "react";

import AttachFileIcon from "@mui/icons-material/AttachFile";
import Grid from "@mui/material/Grid";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";

import "react-perfect-scrollbar/dist/css/styles.css";
import { MessageService } from "services/MessageService";

interface IAddMessageFormProps {
    roomId: string;
}

export const AddMessageForm: React.FC<IAddMessageFormProps> = ({ roomId }) => {
    const [message, setMessage] = React.useState("");

    const handleChangeMessage: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmitMessage = async () => {
        await MessageService.create(roomId, message);
        setMessage("");
    };

    return (
        <div style={{ padding: "5px 10px" }}>
            <form>
                <Grid container sx={{ minHeight: 50, backgroundColor: "#fff" }} spacing={1}>
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
                        <InsertEmoticonIcon
                            color="primary"
                            fontSize="large"
                            sx={{
                                cursor: "pointer",
                                fontSize: 30,
                                mr: 1,
                            }}
                        />
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
