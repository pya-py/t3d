import { Badge, Card, Col, ListGroup, Row } from "react-bootstrap";
import { useSelector } from 'react-redux';

const OnlineStatistics = () => {
    const {players, games} = useSelector((state) => state.statistics);
    return (
        <ListGroup className="list-group list-group-flush">
            <ListGroup.Item className="bg-transparent">
                <Row>
                    <Col>
                        <Card.Text className="text-center">
                            <i
                                className="fa fa-wifi px-2"
                                aria-hidden="true"></i>
                            کاربران آنلاین
                        </Card.Text>
                    </Col>
                    <Col>
                        <Badge className="badgeFontSize" variant="success" pill>
                            {players}
                        </Badge>
                    </Col>
                </Row>
            </ListGroup.Item>
            <ListGroup.Item className="bg-transparent">
                <Row>
                    <Col>
                        <Card.Text className="text-center">
                            <i
                                className="fa fa-gamepad px-2"
                                aria-hidden="true"></i>
                            بازی های فعال
                        </Card.Text>
                    </Col>
                    <Col>
                        <Badge className="badgeFontSize" variant="success" pill>
                            {games}
                        </Badge>

                    </Col>
                </Row>
            </ListGroup.Item>
        </ListGroup>
    );
};

export default OnlineStatistics;
