import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import { RoomCardProps } from "./RoomCard.props";

export const RoomCard: React.FC<RoomCardProps> = ({ id, title, description, image, onJoin }) => {
    const [isLoading, setIsLoading] = React.useState(false);

    const handleClickJoin = async () => {
        setIsLoading(true);
        await onJoin(id);
        setIsLoading(false);
    };

    return (
        <Card
            style={{ display: "flex", flexDirection: "column", height: "100%", maxHeight: "100%" }}>
            <div
                style={{
                    paddingBottom: "65%",
                    backgroundImage: `url(${image.secureUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}></div>
            {/* <CardMedia component="img" sx={{height: '40%'}}  image={image.secureUrl} alt="room" /> */}
            <CardContent sx={{ flex: "1 1 auto" }}>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                {description && (
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                )}
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between" }}>
                <Typography variant="h4" sx={{ fontWeight: 300 }} component="p">
                    100
                    <Typography sx={{ ml: "5px" }} component="span" variant="subtitle2">
                        участников
                    </Typography>
                </Typography>
                <LoadingButton loading={isLoading} onClick={handleClickJoin} variant="contained">
                    Присоединиться
                </LoadingButton>
            </CardActions>
        </Card>
    );
};
