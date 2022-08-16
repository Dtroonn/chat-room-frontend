import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "@redux-saga/core";

import { rootReducer } from "./rootReducer";
import { rootSaga } from "./rootSaga";
import { setNotification } from "./ducks/notification/actions";
import axios from "axios";

const composeEnhancers =
    //@ts-ignore
    (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const sagaMiddleware = createSagaMiddleware({
    onError: (err) => {
        if (axios.isAxiosError(err)) {
            //@ts-ignore
            const errData: { message: string; errorrs: string[] } = err.response?.data;
            store.dispatch(
                setNotification({
                    message: errData.message,
                    options: {
                        variant: "error",
                        anchorOrigin: {
                            horizontal: "center",
                            vertical: "bottom",
                        },
                    },
                }),
            );
        }
    },
});

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
