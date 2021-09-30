import {
    Alert,
    Button,
    Card,
    Col,
    Container,
    Form,
    InputGroup,
    Row,
    Tab,
} from "react-bootstrap";
import { useSelector, useDispatch} from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { SendMessageTo } from "../dashboard/actions";
import './chat.css';
import {Device} from '../services/configs';

const ChatMessageBox = ({ friendID }) => {
    const [myMessage, setMyMessage] = useState("");
    const message = useSelector((state) => state.message);
    const device = useSelector((state) => state.device);
    const dispatch = useDispatch();
    const me = useSelector((state) => state.player);

    //...TEMP: just save msges in client side
    const [allMsgs, setAllMsgs] = useState([{ me: null, friend: null }]);

    const composeMessage = (event) => {
        event.preventDefault();
        let tempMsg = [...allMsgs];
        tempMsg.push({ me: myMessage, friend: null });
        setAllMsgs(tempMsg);
        dispatch(SendMessageTo(me.fullname, friendID, myMessage));
        setMyMessage(null);
    };

    const recieveMessage = useCallback(
        (msg) => {
            let tempMsg = [...allMsgs];
            tempMsg.push({ me: null, friend: msg.text });
            return tempMsg;
        },
        [allMsgs]
    );

    useEffect(() => {
        const { recieved } = message;
        if (!message.sent && recieved && recieved.friendID === friendID) {
            setAllMsgs(recieveMessage(message.recieved));
        }
    }, [message, friendID]);

    return (
        <Tab.Pane eventKey={friendID}>
            <Container>
                <Row>
                    <Card
                        border="dark"
                        bg="transparent"
                        className={`mx-auto bigSingleCard ${device !== Device.SmartPhone ? "chatBoxScrollable" : "smartphoneChatBoxScrollable"}`}>
                        <Card.Body>
                            {allMsgs.map((msg) => (
                                <Row>
                                    <Col>
                                        {msg.me && (
                                            <Alert
                                                className="w-100 text-right"
                                                variant="dark">
                                                {msg.me}
                                            </Alert>
                                        )}
                                    </Col>
                                    <Col>
                                        {msg.friend && (
                                            <Alert
                                                className="w-100 text-right"
                                                variant="primary">
                                                {msg.friend}
                                            </Alert>
                                        )}
                                    </Col>
                                </Row>
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
                                    style={{
                                        border: "none",
                                    }}
                                    className="w-100 mx-auto"
                                    variant="outline-info">
                                    <i
                                        className="fa fa-paper-plane"
                                        aria-hidden="true"></i>
                                </Button>
                            </InputGroup.Prepend>

                            <InputGroup.Prepend
                                style={{
                                    margin: "auto",
                                    width: "92%",
                                }}
                                value={myMessage}
                                onChange={(e) => setMyMessage(e.target.value)}>
                                <Form.Control
                                    placeholder="پیام..."
                                    className="bg-transparent chatRoomMessageBox mx-auto text-right"></Form.Control>
                            </InputGroup.Prepend>
                        </InputGroup>
                    </Form>
                </Row>
            </Container>
        </Tab.Pane>
    );
};

export default ChatMessageBox;
