import React from "react";

import "react-perfect-scrollbar/dist/css/styles.css";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import PerfectScrollbar from "react-perfect-scrollbar";

export const UsersList: React.FC = () => {
    return (
        <PerfectScrollbar
            component="ul"
            style={{ overflowY: "auto", height: "100%", padding: 0, margin: 0 }}>
            {Array(200)
                .fill(0)
                .map((i, index) => (
                    <ListItem key={index} alignItems="flex-start" button>
                        <ListItemAvatar>
                            <Avatar alt="Дмитрий Плотников" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Typography sx={{ mb: 0.5 }} component="div" variant="subtitle2">
                                    Дмитрий Плотников
                                </Typography>
                            }
                            secondary={" — I'll be in your neighborhood doing errands this…"}
                        />
                    </ListItem>
                ))}
        </PerfectScrollbar>
    );
};
