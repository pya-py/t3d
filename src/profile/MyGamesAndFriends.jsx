import { useState, useEffect } from "react";
import LoadingBar from "../common/LoadingBar";
import userServices from "../services/http/userServices";
import Configs from "../services/configs";
import gameServices from "../services/http/gameServices";
import { Card, Col, Nav, Row, Tab } from "react-bootstrap";
import AllScores from "../tables/scores/AllScores";
import PlayerInfoSideBar from "../sidebars/PlayerInfoSideBar";
import './profile.css';

const MyGamesAndFriends = () => {
    const [loading, setLoading] = useState(false);
    const [myFriends, setMyFriends] = useState([]);
    const [myGames, setMyGames] = useState([]);
    const [filterID, setFilterID] = useState("me");

    useEffect(() => {
        (async () => {
            try {
                setLoading(true); // use preloader here?
                let serverResponse = await gameServices.getMyGames();
                if (serverResponse.status === Configs.Status.Successful)
                    setMyGames(serverResponse.data.myGames.reverse());
                serverResponse = await userServices.getMyFriends();
                if (serverResponse.status === Configs.Status.Successful)
                    setMyFriends(serverResponse.data.friends);
            } catch (err) {
                console.log(err);
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
            <Card.Header className="text-center">
                لیست دوستان و آمار بازی ها
            </Card.Header>
            <LoadingBar loading={loading} />
            <Card.Body >
                <Tab.Container
                    defaultActiveKey={filterID}
                    onSelect={(key) => setFilterID(key)}>
                    <Row>
                        <Col xs={2}>
                            <Nav
                                variant="pills"
                                className="flex-column text-right">
                                <Nav.Item>
                                    <Nav.Link eventKey="me">
                                        همه بازی ها
                                    </Nav.Link>
                                </Nav.Item>
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
                            <Tab.Content >
                                <Tab.Pane eventKey="me">
                                    <AllScores scores={myGames} />
                                </Tab.Pane>
                                {myFriends.map((friend) => (
                                    <Tab.Pane eventKey={friend.userID}>
                                        <AllScores
                                            scores={myGames.filter(
                                                (game) =>
                                                    friend.userID ===
                                                        game.players[0].id ||
                                                    friend.userID ===
                                                        game.players[1].id
                                            )}
                                        />
                                    </Tab.Pane>
                                ))}
                            </Tab.Content>
                        </Col>
                        {/* EDIT MAIL LAYOUT <Col> LIKE THIS */}
                        {filterID !== "me" && myFriends.length && <Col xs={4}>
                            <PlayerInfoSideBar person={myFriends.length ? myFriends[0] : null} />
                        </Col>}
                    </Row>
                </Tab.Container>
            </Card.Body>
        </Card>
    );
};

export default MyGamesAndFriends;
