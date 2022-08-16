import React from "react";
import { socket } from "core/socketIo";

//@ts-ignore
import VeraJpg from "./../../../assets/Vera.jpg";
import "react-perfect-scrollbar/dist/css/styles.css";

import Avatar from "@mui/material/Avatar";

import { Message } from "./Message";
import PerfectScrollbar from "react-perfect-scrollbar";
import { MessageService } from "services/MessageService";
import { IMessage } from "services/MessageService/types";
import { authSelectors } from "redux/ducks/auth/selectors";
import { useSelector } from "react-redux";

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

    const authUser = useSelector(authSelectors.user);

    React.useEffect(() => {
        (async function () {
            const data = await MessageService.getMessages(roomId);
            setMessages((prev) => [...prev, ...data.items]);

            socket.on("ROOM/NEW_MESSAGE", (msg: IMessage) => {
                setMessages((prev) => [...prev, msg]);
            });
        })();
    }, []);

    const perfectScrollbarRef = React.useRef<HTMLElement>();

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

    // React.useEffect(() => {
    //     if (perfectScrollbarRef.current) {
    //         //perfectScrollbarRef.current.scrollTop = 1000;
    //     }
    // }, []);

    // const handleDeleteMessages = () => {
    //     setMessages(items.filter((item) => item.id !== 2));
    // };

    return (
        <PerfectScrollbar
            component="div"
            containerRef={(container: HTMLElement) => (perfectScrollbarRef.current = container)}
            style={{
                flexDirection: "column",
                display: "flex",
                flex: 1,
                overflow: "auto",
                padding: 20,
            }}>
            {messagesForChat.map((messages, index: number) => (
                <div
                    key={messages[0]._id}
                    style={{
                        alignSelf:
                            authUser?._id === messages[0].user._id ? "flex-end" : "flex-start",
                        marginTop: !index ? "auto" : 0,
                        display: "flex",
                        marginBottom: index === messagesForChat.length - 1 ? 0 : 24,
                    }}>
                    <Avatar
                        sx={{
                            width: 35,
                            height: 35,
                            position: "sticky",
                            bottom: 0,
                            zIndex: messages.length - index,
                            mt: "auto",
                            mr: "4px",
                            mb: "-6px",
                        }}
                        src="https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg"
                    />
                    <div>
                        {messages.map((message, index: number) => (
                            <div key={message._id}>
                                <Message
                                    showArrow={index === messages.length - 1}
                                    fullName={message.user.username}
                                    text={message.text}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
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
        </PerfectScrollbar>
    );
};
