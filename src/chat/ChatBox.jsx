import {
    Button,
    Card,
    Container,
    Form,
    InputGroup,
    Row,
    Tab,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useCallback, useRef } from "react";
import { SendMessageTo } from "../dashboard/actions";
import "./chat.css";
import { Devices, Status } from "../services/configs";
import chatServices from "../services/http/chatServices";

import Message from "./Message";

const ChatBox = ({ friendID, Device }) => {
    const [myMessage, setMyMessage] = useState("");
    const message = useSelector((state) => state.message);
    const dispatch = useDispatch();
    const me = useSelector((state) => state.player);
    const mostRecentMessageRef = useRef(null);

    //...TEMP: just save msges in client side
    const [allMsgs, setAllMsgs] = useState([
        { me: null, friend: null, date: null, key: 0 },
    ]);

    const loadPreviousMessages = useCallback(async () => {
        try {
            const { status, data } = await chatServices.getOurChat(friendID);
            if (status === Status.Successful) {
                const { myIndex, chat } = data;
                const previousMsgs = chat.map((message) => {
                    const { text, owner, date } = message;
                    if (owner === myIndex)
                        return {
                            me: text,
                            friend: null,
                            date,
                            key: message._id.toString(),
                        };
                    return {
                        me: null,
                        friend: text,
                        date,
                        key: message._id.toString(),
                    };
                });
                setAllMsgs(previousMsgs);
            }
        } catch (err) {
            //consider a special place in chat box to show status change or error messages
        }
    }, [friendID]);

    useEffect(() => {
        loadPreviousMessages();

        return () => {
            setAllMsgs([]);
        };
    }, [loadPreviousMessages]);

    const composeMessage = (event) => {
        event.preventDefault();
        let tempMsg = [...allMsgs];
        tempMsg.push({
            me: myMessage,
            friend: null,
            date: new Date(),
            key: allMsgs.length,
        });
        setAllMsgs(tempMsg);
        dispatch(SendMessageTo(me.fullname, friendID, myMessage));
        setMyMessage("");

        if (mostRecentMessageRef && mostRecentMessageRef.current) {
            setTimeout(() => {
                mostRecentMessageRef.current.scrollIntoView({
                    behavior: "smooth",
                    top: mostRecentMessageRef.current.offsetTop,
                });
            }, 100);
        }
    };

    const recieveMessage = useCallback(
        (msg) => {
            let tempMsg = [...allMsgs];
            tempMsg.push({ me: null, friend: msg.text, date: new Date() });
            return tempMsg;
        },
        [allMsgs]
    );

    useEffect(() => {
        const { recieved } = message;
        if (!message.sent && recieved && recieved.friendID === friendID) {
            setAllMsgs(recieveMessage(message.recieved));
            if (mostRecentMessageRef && mostRecentMessageRef.current) {
                setTimeout(() => {
                    mostRecentMessageRef.current.scrollIntoView({
                        behavior: "smooth",
                        top: mostRecentMessageRef.current.offsetTop,
                    });
                }, 100);
            }
        }
    }, [message, friendID]);

    return (
        <Tab.Pane eventKey={friendID}>
            <Container>
                <Row>
                    <Card
                        border="dark"
                        bg="transparent"
                        className={`big-single-card ${
                            Device !== Devices.SmartPhone
                                ? "chat-box-scrollable"
                                : "smartphone-chat-box-scrollable"
                        }`}>
                        <Card.Body>
                            {allMsgs.map((msg, index) => (
                                <div ref={mostRecentMessageRef}>
                                    <Message
                                        key={msg.key}
                                        msg={msg}
                                        inDesktop={Device === Devices.Desktop}
                                        previousDay={
                                            index !== 0
                                                ? new Date(
                                                      allMsgs[index - 1].date
                                                  ).getDate()
                                                : 0
                                        }
                                    />
                                </div>
                            ))}
                        </Card.Body>
                    </Card>
                </Row>
                <Row>
                    <Form
                        onSubmit={(event) => composeMessage(event)}
                        className="w-100 mt-3">
                        <InputGroup className="w-100">
                            <InputGroup.Prepend
                                style={{
                                    width: "8%",
                                }}>
                                <Button
                                    type="submit"
                                    style={{ border: "none", fontSize: '22px' }}
                                    className="w-100 mx-auto"
                                    variant="outline-info">
                                    <i
                                        className="fa fa-telegram"
                                        aria-hidden="true"></i>
                                </Button>
                            </InputGroup.Prepend>

                            <InputGroup.Prepend
                                style={{ margin: "auto", width: "92%" }}>
                                <Form.Control
                                    value={myMessage}
                                    onChange={(e) =>
                                        setMyMessage(e.target.value)
                                    }
                                    placeholder="پیام..."
                                    className="bg-transparent chat-room-message-box
                                    mx-auto text-right"></Form.Control>
                            </InputGroup.Prepend>
                        </InputGroup>
                    </Form>
                </Row>
            </Container>
        </Tab.Pane>
    );
};

export default ChatBox;
