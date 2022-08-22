import React from "react";
import { socket } from "core/socketIo";

//@ts-ignore
// import "react-perfect-scrollbar/dist/css/styles.css";
import SimpleBar from "simplebar-react";
import { Message } from "./Message";
import { MessageService } from "services/MessageService";
import { IMessage } from "services/MessageService/types";
import { authSelectors } from "redux/ducks/auth/selectors";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { CircularProgress } from "@mui/material";
//@ts-ignore
import classes from "./styles.module.css";
import { flushSync } from "react-dom";

// const items = [
//     {
//         id: 1,
//         fullname: "Вера Балаева",
//         text: "Привет Дима Еблан фвфцв фвфц фвцф фвфц фвцф фвцфв  фвфцв фвфц фвцф фвфц фвцф фвцфв фвфцв фвфц фвцф фвфц фвцф фвцфв  фвфцв фвфц фвцф фвфц фвцф фвцфв ",
//         avatar: VeraJpg,
//     },
//     {
//         id: 2,
//         fullname: "Дмитрий Белан",
//         text: "Хелло SW adwad adwad adawd  Хелл  adawd Хелло SW adwad adwad adawd  Хелл  adawd Хелло SW adwad adwad adawd  Хелл  ad",
//         avatar: "https://s1.cdn.teleprogramma.pro/wp-content/uploads/2020/12/08de3bbea2bf9268efcb25b1d948fbc7.jpg ",
//     },
//     {
//         id: 2,
//         fullname: "Дмитрий Белан",
//         text: "Хелло SW adwad adwad adawd  Хелл  adawd Хелло SW adwad adwad adawd  Хелл  adawd Хелло SW adwad adwad adawd  Хелл  ad",
//         avatar: "https://s1.cdn.teleprogramma.pro/wp-content/uploads/2020/12/08de3bbea2bf9268efcb25b1d948fbc7.jpg ",
//     },
//     {
//         id: 2,
//         fullname: "Дмитрий Белан",
//         text: "Хелло SW adwad adwad adawd  Хелл  adawd Хелло SW adwad adwad adawd  Хелл  adawd Хелло SW adwad adwad adawd  Хелл  ad",
//         avatar: "https://s1.cdn.teleprogramma.pro/wp-content/uploads/2020/12/08de3bbea2bf9268efcb25b1d948fbc7.jpg ",
//     },
//     {
//         id: 2,
//         fullname: "Дмитрий Белан",
//         text: "Хелло SW adwad adwad adawd  Хелл  adawd Хелло SW adwad adwad adawd  Хелл  adawd Хелло SW adwad adwad adawd  Хелл  ad",
//         avatar: "https://s1.cdn.teleprogramma.pro/wp-content/uploads/2020/12/08de3bbea2bf9268efcb25b1d948fbc7.jpg ",
//     },
//     {
//         id: 2,
//         fullname: "Дмитрий Белан",
//         text: "Хелло SW adwad adwad adawd  Хелл  adawd Хелло SW adwad adwad adawd  Хелл  adawd Хелло SW adwad adwad adawd  Хелл  ad",
//         avatar: "https://s1.cdn.teleprogramma.pro/wp-content/uploads/2020/12/08de3bbea2bf9268efcb25b1d948fbc7.jpg ",
//     },
//     {
//         id: 2,
//         fullname: "Дмитрий Белан",
//         text: "Хелло SW adwad adwad adawd  Хелл  adawd Хелло SW adwad adwad adawd  Хелл  adawd Хелло SW adwad adwad adawd  Хелл  ad",
//         avatar: "https://s1.cdn.teleprogramma.pro/wp-content/uploads/2020/12/08de3bbea2bf9268efcb25b1d948fbc7.jpg ",
//     },
//     {
//         id: 3,
//         fullname: "Сергей лазарев",
//         text: "Хелло SW adwad adwad adawd  Хелл  adawd Хелло SW adwad adwad adawd  Хелл  adawd Хелло SW adwad adwad adawd  Хелл  ad",
//         avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/ESC2016_-_Russia_Meet_%26_Greet_08_%28crop%29.jpg/274px-ESC2016_-_Russia_Meet_%26_Greet_08_%28crop%29.jpg",
//     },
//     {
//         id: 3,
//         fullname: "Сергей лазарев",
//         text: "Хелло SW adwad adwad adawd  Хелл  adawd Хелло SW adwad adwad adawd  Хелл  adawd Хелло SW adwad adwad adawd  Хелл  ad",
//         avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/ESC2016_-_Russia_Meet_%26_Greet_08_%28crop%29.jpg/274px-ESC2016_-_Russia_Meet_%26_Greet_08_%28crop%29.jpg",
//     },
// ];

interface IMessagesBlockProps {
    roomId: string;
}

export const MessagesBlock: React.FC<IMessagesBlockProps> = ({ roomId }) => {
    const [messages, setMessages] = React.useState<IMessage[]>([]);
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    // const [scrollbarTarget, setScrollbarTarget] = React.useState<HTMLDivElement | null>(null);
    const simplebarRef = React.useRef(null);
    const isScrollBottomRef = React.useRef<boolean>(false);
    const [isLoading, setIsLoading] = React.useState(true);

    const authUser = useSelector(authSelectors.user);

    const forceScrollToBottom = () => {
        //@ts-ignore
        const scrollableHeight = document
            .querySelector(`.${classes.messages}`)
            ?.querySelector(".simplebar-content").scrollHeight;

        //@ts-ignore
        simplebarRef.current.getScrollElement().scrollTop = scrollableHeight;
    };

    React.useEffect(() => {
        (async function () {
            const data = await MessageService.getMessages(roomId);
            setMessages((prev) => [...prev, ...data.items]);
            setIsLoading(false);
            socket.on("ROOM/NEW_MESSAGE", (msg: IMessage) => {
                //@ts-ignore
                const scrollableElement = simplebarRef.current.getScrollElement();
                //@ts-ignore
                const scrollHeight = document
                    .querySelector(`.${classes.messages}`)
                    ?.querySelector(".simplebar-content").scrollHeight;

                if (
                    Math.abs(
                        scrollableElement.scrollTop +
                            scrollableElement.clientHeight -
                            (scrollHeight as number),
                    ) < 5
                ) {
                    isScrollBottomRef.current = true;
                } else {
                    isScrollBottomRef.current = false;
                }

                setMessages((prev) => [...prev, msg]);
            });
        })();
    }, []);

    //Временное решение
    React.useEffect(() => {
        if (messages[messages.length - 1]?.user._id === authUser?._id) {
            forceScrollToBottom();
            return;
        }
        if (isScrollBottomRef.current) {
            forceScrollToBottom();
        }
    }, [messages, authUser]);

    //Здесь используется layout, чтобы скрыть прыжок скролла вниз
    React.useLayoutEffect(() => {
        if (!isLoading) {
            //@ts-ignore
            const scrollableHeight = document
                .querySelector(`.${classes.messages}`)
                ?.querySelector(".simplebar-content").scrollHeight;

            //@ts-ignore
            simplebarRef.current.getScrollElement().scrollTop = scrollableHeight;
            isScrollBottomRef.current = true;
        }
    }, [isLoading]);

    const func = (messages: IMessage[]): IMessage[][] => {
        const newItems: IMessage[][] = [];

        messages.forEach((message, index) => {
            if (newItems.length === 0) {
                newItems[0] = [message];
                return;
            }

            if (message.user._id !== messages[index - 1]?.user._id) {
                newItems[newItems.length] = [message];
                return;
            }

            newItems[newItems.length - 1].push(message);
        });

        return newItems;
    };

    const messagesForChat = func(messages);

    // const handleScrollbarTargetRef = React.useCallback((node: HTMLDivElement) => {
    //     setScrollbarTarget(node);
    // }, []);

    // if (isLoading) {
    //     return (
    //         <div>
    //             <h1>загрузка...</h1>
    //         </div>
    //     );
    // }

    return (
        <SimpleBar
            ref={simplebarRef}
            className={classes.messages}
            // ref={handleScrollbarTargetRef}
        >
            {isLoading && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <CircularProgress size={40} color="primary" />
                </div>
            )}

            {messagesForChat.map((messages, index: number) => {
                const isAuthUserMessages = authUser?._id === messages[0].user._id;
                return (
                    <div
                        key={messages[0]._id}
                        style={{
                            alignSelf: isAuthUserMessages ? "flex-end" : "flex-start",
                            marginTop: !index ? "auto" : 0,
                            display: "flex",
                            marginBottom: index === messagesForChat.length - 1 ? 0 : 24,
                        }}>
                        {!isAuthUserMessages && (
                            <Avatar
                                sx={{
                                    width: 45,
                                    height: 45,
                                    position: "sticky",
                                    bottom: 0,
                                    zIndex: messages.length - index,
                                    mt: "auto",
                                    mr: "4px",
                                    mb: "-6px",
                                }}
                                src="https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg"
                            />
                        )}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: isAuthUserMessages ? "flex-end" : "flex-start",
                            }}>
                            {messages.map((message, index: number) => (
                                <div
                                    key={message._id}
                                    style={{
                                        marginBottom: index === messages.length - 1 ? 0 : 10,
                                    }}>
                                    <Message
                                        showArrow={index === messages.length - 1}
                                        directionArrow={isAuthUserMessages ? "right" : "left"}
                                        fullName={isAuthUserMessages ? "" : message.user.username}
                                        text={message.text}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
            {/* {messages.map((message, index) => (
                <React.Fragment>
                    {message.id !== messages[index + 1]?.id && (
                        <Avatar
                            sx={{
                                width: 35,
                                height: 35,
                                position: "sticky",
                                bottom: 0,
                                zIndex: messages.length - index,
                            }}
                            src={message.avatar}
                        />
                    )}
                    <div
                        key={index}
                        style={{
                            alignSelf: !index ? "flex-end" : "flex-start",
                            marginTop: !index ? "auto" : 0,
                            marginBottom: message.id !== messages[index + 1]?.id ? 20 : 10,
                        }}>
                        <Message showAvatar={message.id !== messages[index + 1]?.id} {...message} />
                    </div>
                </React.Fragment>
            ))} */}
        </SimpleBar>
    );
};
