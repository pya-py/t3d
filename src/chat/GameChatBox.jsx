import { Alert, Button, Form, Row, InputGroup } from "react-bootstrap";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SendMessageTo } from "../globals/redux/actions";

const GameChatBox = ({ friendID }) => {
    const [myMessage, setMyMessage] = useState("");
    const message = useSelector((state) => state.message);
    const dispatch = useDispatch();
    const me = useSelector((state) => state.player);

    const composeMessage = (event) => {
        if (myMessage) {
            //if message is not empty
            event.preventDefault();
            dispatch(SendMessageTo(me.fullname, friendID, myMessage));
            setMyMessage("");
        }
    };

    return (
        <Form onSubmit={(event) => composeMessage(event)}>
            <Row className="w-100 mt-3 mx-auto">
                <Alert className="w-100 text-right" variant="info">
                    {message && message.recieved ? (
                        message.recieved.text
                    ) : (
                        <p className="p-1"> </p>
                    )}
                </Alert>
            </Row>
            <Row className="w-100 mx-auto mb-3">
                <InputGroup className="w-100">
                    <InputGroup.Prepend style={{ width: "10%" }}>
                        <Button
                            type="submit"
                            className="mx-auto"
                            variant="outline-info">
                            <i
                                className="fa fa-paper-plane"
                                aria-hidden="true"></i>
                        </Button>
                    </InputGroup.Prepend>

                    <InputGroup.Prepend style={{ width: "88%" }}>
                        <Form.Control
                            placeholder="پیام..."
                            value={myMessage}
                            onChange={(e) => setMyMessage(e.target.value)}
                            className="text-right"></Form.Control>
                    </InputGroup.Prepend>
                </InputGroup>
            </Row>
        </Form>
    );
};

export default GameChatBox;
