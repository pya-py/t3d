import noAvatar from "./no-avatar.png"; // definitely must be changed bro!
import {
    Card,
    Row,
    Col,
    Badge,
    Image,
    ListGroup,
    Button,
} from "react-bootstrap";

import { useSelector } from 'react-redux';

const FriendRecords = (props) => {
    const me = useSelector(state => state.player);

    const friend = props.friend ? props.friend : me;
    return (
        <Card border="success" bg="transparent" className="friend-records">
            <Image
                className="card-img-top my-friend-avatar"
                src={noAvatar}
                alt="مشکلی در بارگذاری تصویر پیش آمد"
            />
            <hr />
            <Card.Body>
                <ListGroup className=" list-group list-group-flush">
                    <ListGroup.Item className="bg-transparent">
                        <Row className="py-2">
                            <Col className="text-right">
                                <Card.Text>امتیاز بازیکن</Card.Text>
                            </Col>
                            <Col className="text-left">
                                <Badge
                                    className="friend-badge-font-size"
                                    pill
                                    variant="primary">
                                    {friend.records.points}
                                </Badge>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="bg-transparent">
                        <Row className="py-2">
                            <Col className="text-right">
                                <Card.Text>تعداد بردها</Card.Text>
                            </Col>
                            <Col className="text-left">
                                <Badge
                                    className="friend-badge-font-size"
                                    pill
                                    variant="primary">
                                    {friend.records.wins}
                                </Badge>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="bg-transparent">
                        <Row className="py-2">
                            <Col className="text-right">تعداد تساوی ها</Col>
                            <Col className="text-left">
                                <Badge
                                    className="friend-badge-font-size"
                                    pill
                                    variant="primary">
                                    {friend.records.draws}
                                </Badge>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="bg-transparent">
                        <Row className="py-2">
                            <Col className="text-right">تعداد باخت ها</Col>
                            <Col className="text-left">
                                <Badge
                                    className="friend-badge-font-size"
                                    pill
                                    variant="primary">
                                    {friend.records.loses}
                                </Badge>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
            {friend !== me && <Card.Footer>
                <Button
                    variant="outline-danger"
                    block
                    onClick={null}>
                    <i
                        className="fa fa-handshake-o px-2"
                        aria-hidden="true"></i>
                    لغو دوستی
                </Button>
            </Card.Footer>}
        </Card>
    );
};

export default FriendRecords;
