import React from "react";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { UsersList } from "./UsersList";
import Divider from "@mui/material/Divider";
import { MessagesBlock } from "./MessagesBlock";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { AddMessageForm } from "./AddMessageForm";
import { socket } from "core/socketIo";
import { useParams } from "react-router-dom";

export const Chat: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    React.useEffect(() => {
        socket.emit("ROOM/JOIN_USER", id);
    }, []);

    return (
        <Paper
            elevation={8}
            sx={{
                height: "calc(100vh - 124px)",
                // overflow: "hidden",
            }}>
            <Grid container sx={{ height: "100%", flexWrap: "nowrap" }}>
                <Grid item container sx={{ flex: "0 0 320px", height: "100%" }}>
                    <UsersList />
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid
                    item
                    container
                    sx={{
                        flexGrow: 1,
                        height: "100%",
                        flexDirection: "column",
                    }}>
                    <StyledChatHeader>
                        <Typography variant="subtitle2">Название комнаты</Typography>
                        <Typography color="gray" variant="body2">
                            100 человек, 2 онлайн
                        </Typography>
                    </StyledChatHeader>
                    <Divider />
                    <MessagesBlock roomId={id} />
                    <AddMessageForm roomId={id} />
                </Grid>
            </Grid>
        </Paper>
    );
};

const StyledChatHeader = styled("div")(({ theme }) => ({
    padding: theme.spacing(1.5),
}));
