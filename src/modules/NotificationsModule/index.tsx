//@ts-nocheck
import React from "react";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { notificationSelectors } from "redux/ducks/notification/selectors";
import { useUpdateEffect } from "hooks/useUpdateEffect";

export const NotificationsModule: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();

    const data = useSelector(notificationSelectors.data);

    useUpdateEffect(() => {
        enqueueSnackbar(data.message, data.options);
    }, [data]);

    return null;
};
