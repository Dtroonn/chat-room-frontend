import React from "react";

import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

interface IMessageProps {
    fullName: string;
    text: string;
    avatarUrl?: string;
    showArrow?: boolean;
}

export const Message: React.FC<IMessageProps> = React.memo(
    ({
        fullName,
        text,
        avatarUrl = "https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg",
        showArrow,
    }) => {
        const mountRef = React.useRef(false);
        React.useEffect(() => {
            console.log("DID MOUNT", fullName);
            return () => console.log("will UNMOUNT:", fullName);
        }, []);

        React.useEffect(() => {
            if (!mountRef.current) {
                mountRef.current = true;
                return;
            }
            console.log("did update", fullName);
        }, [fullName]);

        return (
            <StyledMessage>
                {/* {false && (
                <Avatar
                    sx={{ width: 35, height: 35, mb: -0.5, position: "sticky", bottom: 0 }}
                    src={avatar}
                />
            )} */}
                <Paper
                    elevation={3}
                    sx={{
                        padding: "8px 16px",
                        borderBottomLeftRadius: showArrow ? 0 : "",
                    }}>
                    <div style={{ marginRight: 45 }}>
                        <Typography variant="subtitle2">{fullName}</Typography>
                        <Typography sx={{ lineHeight: 1.4 }} component="p" variant="subtitle1">
                            {text}
                        </Typography>
                    </div>
                    <Typography
                        color="gray"
                        sx={{ textAlign: "end", lineHeight: 0, mb: 1 }}
                        variant="body2">
                        14:30
                    </Typography>
                </Paper>
            </StyledMessage>
        );
    },
);

const StyledMessage = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "flex-end",
    maxWidth: 500,
}));
