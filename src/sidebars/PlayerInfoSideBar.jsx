import noAvatar from "./no-avatar.png"; // definitely must be changed bro!
import {
    Card,
    Row,
    Col,
    Alert,
    Badge,
    Image,
    ListGroup,
    Button,
} from "react-bootstrap";
import OnlineStatistics from "./OnlineStatistics";
import { SendFriendRequestTo } from "../globals/redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import userServices from "./../services/http/userServices";
import Configs from "../services/configs";
import GameChatBox from "../chat/GameChatBox";

const PlayerInfoSideBar = (props) => {
    const { inGame } = props;
    const me = useSelector((state) => state.player);
    const dispatch = useDispatch();
    const [personIsFriend, setPersonIsFriend] = useState(false);

    const person = props.person ? props.person : me;
    
    const onFriendRequestClick = (event) => {
        event.target.innerHTML = "ارسال شد...";
        event.target.disabled = true;
        dispatch(SendFriendRequestTo(person.userID));
    };
    
    useEffect(() => {
        if (me && person.userID !== me.userID) {
            (async () => {
                try {
                    const { status, data } = await userServices.isMyFriend(
                        person.userID
                    );
                    if (status === Configs.Status.Successful) {
                        setPersonIsFriend(data.isFriend);
                    }
                } catch (err) {
                    // handle error.
                    console.log(err);
                }
            })();
        }
    }, [person, me]);
    if(!person) return null;
    return (
        <Card border="info" className="player-info-sideBar">
            <Card.Header className="text-center text-info form-inline">
                <Col>
                    <Card.Text className="text-left">{person.fullname}</Card.Text>
                </Col>
                <Col>
                    <Image
                        className="card-img-top player-avatar"
                        src={noAvatar}
                        alt="مشکلی در بارگذاری تصویر پیش آمد"
                    />
                </Col>
            </Card.Header>

            <Card.Body>
                <ListGroup className="list-group list-group-flush">
                    {inGame && (
                        <ListGroup.Item>
                            <Alert
                                variant={inGame.index ? "danger" : "primary"}>
                                <Alert.Heading className="text-center">
                                    {inGame.score} : {inGame.shape}
                                </Alert.Heading>
                            </Alert>
                        </ListGroup.Item>
                    )}
                    <ListGroup.Item>
                        <Row>
                            <Col className="text-right">
                                <Card.Text>امتیاز بازیکن</Card.Text>
                            </Col>
                            <Col className="text-left">
                                <Badge
                                    className="player-badge-font-size"
                                    pill
                                    variant="primary">
                                    {person.records.points}
                                </Badge>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col className="text-right">
                                <Card.Text>تعداد بردها</Card.Text>
                            </Col>
                            <Col className="text-left">
                                <Badge
                                    className="player-badge-font-size"
                                    pill
                                    variant="primary">
                                    {person.records.wins}
                                </Badge>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col className="text-right">تعداد تساوی ها</Col>
                            <Col className="text-left">
                                <Badge
                                    className="player-badge-font-size"
                                    pill
                                    variant="primary">
                                    {person.records.draws}
                                </Badge>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col className="text-right">تعداد باخت ها</Col>
                            <Col className="text-left">
                                <Badge
                                    className="player-badge-font-size"
                                    pill
                                    variant="primary">
                                    {person.records.loses}
                                </Badge>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
            <Card.Footer>
                {me === person ? (
                    <OnlineStatistics />
                ) : personIsFriend ? (
                    <GameChatBox friendID={person.userID} />
                ) : (
                    <Button
                        variant={"outline-info"}
                        block
                        onClick={(event) => onFriendRequestClick(event)}>
                        <i
                            className="fa fa-handshake-o px-2"
                            aria-hidden="true"></i>
                        درخواست دوستی
                    </Button>
                )}
            </Card.Footer>
        </Card>
    );
};

export default PlayerInfoSideBar;
