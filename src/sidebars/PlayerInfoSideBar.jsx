import { Fragment } from "react";
import noAvatar from "./no-avatar.png"; // definitely must be changed bro!
import {
    Card,
    Row,
    Container,
    Col,
    Alert,
    Badge,
    Image,
    ListGroup,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import ContactInfo from "./../informations/ContactInfo";
const PlayerInfoSideBar = (props) => {
    const { player, inGame } = props;
    const statistics = useSelector((state) => state.statistics);

    return (
        <Fragment>
            <Row>
                <Card border="info" className="playerInfoSideBar">
                    <Card.Header className="text-center text-info">
                        {player.fullname}
                    </Card.Header>
                    <Image
                        className="card-img-top playerAvatar"
                        src={noAvatar}
                        alt="مشکلی در بارگذاری تصویر پیش آمد"
                    />
                    <hr />
                    <Card.Body className="card-body">
                        <ListGroup className="list-group list-group-flush">
                            {inGame && (
                                <ListGroup.Item>
                                    <Alert
                                        variant={
                                            inGame.index ? "danger" : "primary"
                                        }>
                                        <Alert.Heading>
                                            {inGame.shape} : {inGame.score}
                                        </Alert.Heading>
                                    </Alert>
                                </ListGroup.Item>
                            )}
                            <ListGroup.Item>
                                <Row className="py-2">
                                    <Col className="text-right">
                                        <Card.Text>امتیاز بازیکن</Card.Text>
                                    </Col>
                                    <Col className="text-left">
                                        <Badge
                                            className="badgeFontSize"
                                            pill
                                            variant="primary">
                                            {player.records.points}
                                        </Badge>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row className="py-2">
                                    <Col className="text-right">
                                        <Card.Text>تعداد بردها</Card.Text>
                                    </Col>
                                    <Col className="text-left">
                                        <Badge
                                            className="badgeFontSize"
                                            pill
                                            variant="primary">
                                            {player.records.wins}
                                        </Badge>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row className="py-2">
                                    <Col className="text-right">
                                        تعداد تساوی ها
                                    </Col>
                                    <Col className="text-left">
                                        <Badge
                                            className="badgeFontSize"
                                            pill
                                            variant="primary">
                                            {player.records.points}
                                        </Badge>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row className="py-2">
                                    <Col className="text-right">
                                        تعداد باخت ها
                                    </Col>
                                    <Col className="text-left">
                                        <Badge
                                            className="badgeFontSize"
                                            pill
                                            variant="primary">
                                            {player.records.points}
                                        </Badge>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Row>
            <Row>
                <Alert className="w-100 mx-auto" variant="primary">
                    <Row className="m-auto">
                        <Col className="text-right">
                            <Card.Text>
                                <i
                                    className="fa fa-wifi px-2"
                                    aria-hidden="true"></i>{" "}
                                تعداد کاربران آنلاین{" "}
                            </Card.Text>
                        </Col>
                        <Col>
                            <Badge
                                className="badgeFontSize"
                                variant="success"
                                pill>
                                {statistics.all}
                            </Badge>
                        </Col>
                    </Row>
                    <hr />
                    <Row className="m-auto">
                        <Col className="text-right">
                            <Card.Text>
                                <i
                                    className="fa fa-gamepad px-2"
                                    aria-hidden="true"></i>
                                در حال بازی
                            </Card.Text>
                        </Col>
                        <Col>
                            <Badge
                                className="badgeFontSize"
                                variant="success"
                                pill>
                                {statistics.playing}
                            </Badge>
                        </Col>
                    </Row>
                </Alert>
            </Row>
        </Fragment>
    );
};

export default PlayerInfoSideBar;
