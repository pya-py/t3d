import { Alert, Button, Form, Row, InputGroup } from "react-bootstrap";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SendMessageTo } from "./../dashboard/actions/index";

const GameChatRoom = ({ friendID }) => {
    const [myMessage, setMyMessage] = useState(null);
    const message = useSelector((state) => state.message);
    const dispatch = useDispatch();
    const me = useSelector((state) => state.player);

    const composeMessage = (event) => {
        event.preventDefault();
        dispatch(SendMessageTo(me.fullname, friendID, myMessage));
    };

    return (
        <Fragment>
            <Row className="w-100 mt-3 mx-auto">
                <Alert className="w-100 text-right" variant="info">
                    {message.recieved ? message.recieved.text : null}
                </Alert>
            </Row>
            <Row className="w-100 mx-auto mb-3">
                <Form onSubmit={event => composeMessage(event)}>
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

                        <InputGroup.Prepend style={{ width: "90%" }}>
                            <Form.Control
                                placeholder="پیام..."
                                value={myMessage}
                                onChange={(e) => setMyMessage(e.target.value)}
                                className="text-right"></Form.Control>
                        </InputGroup.Prepend>
                    </InputGroup>
                </Form>
            </Row>
        </Fragment>
    );
};

export default GameChatRoom;
