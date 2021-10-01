import { Card, Row, Col, Nav, Tab } from "react-bootstrap";
import { useEffect, useState } from "react";
import Configs from "../services/configs";
import userServices from "../services/http/userServices";
import SingleChatCard from "./ChatMessageBox";
import { useSelector } from "react-redux";
import "./chat.css";
import LoadingBar from '../common/LoadingBar';

const ChatRoom = () => {
    const [loading, setLoading] = useState(false);
    const device = useSelector((state) => state.device);
    const [myFriends, setMyFriends] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true); // use preloader here?
                const { status, data } = await userServices.getMyFriends();
                if (status === Configs.Status.Successful)
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
            className="mx-auto bigSingleCard">
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
                                device !== Configs.Device.SmartPhone
                                    ? "chatRoomDevider chatScrollableFriends"
                                    : "smartphoneChatScrollableFriends"
                            }
                            sm={3}>
                            <Nav
                                variant="pills"
                                className="flex-column text-right">
                                {myFriends.map((friend) => (
                                    <Nav.Item>
                                        <Nav.Link eventKey={friend.userID}>
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
                                    <SingleChatCard friendID={friend.userID} />
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
