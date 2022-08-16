import React from "react";

import IconButton from "@mui/material/IconButton";
import ExitIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ListSubheader from "@mui/material/ListSubheader";
import Divider from "@mui/material/Divider";
import { useSelector } from "react-redux";
import { authSelectors } from "redux/ducks/auth/selectors";

export const ProfileMenu = () => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const user = useSelector(authSelectors.user);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            <IconButton ref={anchorRef} onClick={handleToggle} size="large">
                <Avatar
                    sx={{ width: 50, height: 50 }}
                    src="https://s1.cdn.teleprogramma.pro/wp-content/uploads/2020/12/08de3bbea2bf9268efcb25b1d948fbc7.jpg"
                />
            </IconButton>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom"
                transition
                disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: "left right",
                        }}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    subheader={
                                        <ListSubheader
                                            disableGutters
                                            sx={{ mb: 1 }}
                                            component="div">
                                            <Typography sx={{ mb: 1, fontWeight: 500 }}>
                                                Вы авторизованы как{" "}
                                                <Typography
                                                    fontWeight="inherit"
                                                    component="span"
                                                    color="black">
                                                    {user?.username}
                                                </Typography>
                                            </Typography>
                                            <Divider />
                                        </ListSubheader>
                                    }
                                    sx={{ minWidth: 240 }}
                                    autoFocusItem={open}>
                                    <MenuItem sx={{ mb: 1 }} onClick={handleClose}>
                                        <ListItemIcon>
                                            <PersonIcon />
                                        </ListItemIcon>
                                        <Typography color="black">Профиль</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <ListItemIcon>
                                            <ExitIcon />
                                        </ListItemIcon>
                                        <Typography color="black">Выйти</Typography>
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
};
