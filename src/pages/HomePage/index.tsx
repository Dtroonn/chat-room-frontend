import React from "react";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { Rooms } from "./Rooms";

export const HomePage: React.FC = () => {
    return (
        <Container maxWidth="lg">
            <div style={{ textAlign: "center", marginBottom: 24 }}>
                <Typography sx={{ fontWeight: 700, mb: 1 }} variant="h4">
                    Бесплатные онлайн чаты
                </Typography>
                <Typography color="gray" variant="subtitle1">
                    Это сайт бесплатных онлайн-чатов. Где вы можете встретить новых друзей и
                    пообщаться на разные темы.
                </Typography>
            </div>
            <Rooms />
        </Container>
    );
};
