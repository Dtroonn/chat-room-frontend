import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";

import { fetchRooms } from "redux/ducks/rooms/actions";
import { roomsSelectors } from "redux/ducks/rooms/selectors";
import { RoomCard } from "components/RoomCard";
import { RoomService } from "services/RoomService";


export const Rooms: React.FC = () => {
    const dispatch = useDispatch();

    const history = useHistory();

    const rooms = useSelector(roomsSelectors.items);
    const isLoading = useSelector(roomsSelectors.isLoadingFetchRoomsStatus);
    const isLoaded = useSelector(roomsSelectors.isLoadedFetchRoomsStatus);

    React.useEffect(() => {
        dispatch(fetchRooms());
    }, [dispatch]);

    const handleJoinToRoom = async (id: string): Promise<void> => {
        await RoomService.joinToRoom(id);
        history.push(`rooms/${id}`)
    }

    return (
        <>
            {isLoading && (
                <Grid container spacing={3}>
                    {new Array(6).fill(0).map((_, index) => (
                        <Grid key={index} item xs={4}>
                            <Stack spacing={1}>
                                <Skeleton
                                    variant="rectangular"
                                    sx={{
                                        height: 265,
                                        width: "100%",
                                        borderTopLeftRadius: 20,
                                        borderTopRightRadius: 20,
                                    }}
                                />
                                <Skeleton variant="text" sx={{ width: "30%" }} />
                                <Skeleton variant="text" sx={{ width: "70%", display: "block" }} />
                                <div style={{ marginTop: 10 }}>
                                    <Grid
                                        container
                                        sx={{
                                            justifyContent: "space-between",
                                            alignItems: "flex-end",
                                        }}>
                                        <Grid item xs={4}>
                                            <Skeleton
                                                variant="text"
                                                sx={{ width: "100%", height: 30 }}
                                            />
                                        </Grid>
                                        <Grid item xs={5}>
                                            <Skeleton
                                                variant="rectangular"
                                                sx={{
                                                    height: 36.5,
                                                    width: "100%",
                                                    borderRadius: 20,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                            </Stack>
                        </Grid>
                    ))}
                </Grid>
            )}

            {!!rooms.length && isLoaded && (
                <Grid container spacing={3}>
                    {rooms.map((room) => (
                        <Grid key={room._id} item md={4} sm={6} xs={12}>
                            <RoomCard
                                onJoin={handleJoinToRoom}
                                id={room._id}
                                title={room.title}
                                description={room.description}
                                image={room.image}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}

            {!rooms.length && isLoaded && (
                <Typography textAlign="center">На данный момент нет комнат</Typography>
            )}
        </>
    );
};
