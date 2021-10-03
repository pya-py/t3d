import { Card, Row, Col, Nav, Tab } from "react-bootstrap";
import { useEffect, useState } from "react";
import {Status, Devices} from "../services/configs";
import userServices from "../services/http/userServices";
import ChatBox from "./ChatBox";
import "./chat.css";
import LoadingBar from '../commons/LoadingBar';
import { v1 as uuidv1 } from 'uuid'
const ChatRoom = ({Device}) => {
    const [loading, setLoading] = useState(false);
    const [myFriends, setMyFriends] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true); // use preloader here?
                const { status, data } = await userServices.getMyFriends();
                if (status === Status.Successful)
                    setMyFriends(data.friends);
            } catch (err) {
                setLoading(false);
            }
            setLoading(false);
        })();
    }, []);

    return (
        <Card
            border="secondary"
            bg="transparent"
            className="chat-main-card">
            <LoadingBar loading={loading} />
            <Card.Header className="text-center">چت روم شما</Card.Header>
            <Card.Body>
                <Tab.Container
                // id="left-tabs-example"
                // defaultActiveKey={filterID}
                // onSelect={(key) => setFilterID(key)}
                >
                    <Row>
                        <Col
                            className={
                                Device !== Devices.SmartPhone
                                    ? "chat-room-devider chat-scrollable-friends"
                                    : "smartphone-chat-scrollable-friends"
                            }
                            sm={3}>
                            <Nav
                                variant="pills"
                                className="flex-column text-right">
                                {myFriends.map((friend) => (
                                    <Nav.Item>
                                        <Nav.Link key={friend.userID} eventKey={friend.userID}>
                                            {friend.fullname}
                                        </Nav.Link>
                                    </Nav.Item>
                                ))}
                            </Nav>
                        </Col>
                        {/* EDIT MAIL LAYOUT <Col> LIKE THIS */}
                        <Col>
                            <Tab.Content>
                                {myFriends.map((friend) => (
                                    <ChatBox key={uuidv1()} friendID={friend.userID} Device={Device} />
                                ))}
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Card.Body>
        </Card>
    );
};

export default ChatRoom;
