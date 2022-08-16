import { ThemeOptions } from "@mui/material";

export const componentsOverrides = (palette: any): ThemeOptions["components"] => ({
    MuiAppBar: {
        styleOverrides: {
            root: {
                borderRadius: 0,
                backgroundColor: "#1f2d41",
            },
        },
    },
    MuiButton: {
        styleOverrides: {
            root: {
                borderRadius: 20,
            },
        },
    },
    MuiLink: {
        styleOverrides: {
            root: {
                textDecoration: "none",
                "&:hover": {
                    textDecoration: "underline",
                },
            },
        },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                borderRadius: 20,
            },
        },
    },

    MuiList: {
        styleOverrides: {
            root: {
                padding: 18,
            },
        },
    },

    MuiMenuItem: {
        styleOverrides: {
            root: {
                borderRadius: 20,
                padding: 16,
                transition: "all 0.4s ease-in-out 0s",
                "&.Mui-selected": {
                    background: `${palette.primary.light} !important`,
                    "& svg ": {
                        fill: palette.primary.dark,
                    },
                },
                "&:hover": {
                    background: palette.primary.light,
                    "& svg ": {
                        fill: palette.primary.dark,
                    },
                },
            },
        },
    },
});
