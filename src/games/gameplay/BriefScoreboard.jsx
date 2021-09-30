import { Card, Col, Row } from "react-bootstrap";

const BriefScoreboard = ({ timeRemaining, players }) => {
    return (
        <Card.Header className="w-100 text-center">
            <Row style={{ fontSize: "20px" }}>
                <Col
                    style={{
                        textAlign: "right",
                        color: players[1].color,
                    }}>
                    {players[1].shape} : {players[1].score}
                </Col>
                <Col>
                    <Card.Text
                        className={
                            timeRemaining >= 10 ? "text-success" : "text-danger"
                        }>
                        {timeRemaining > 0 && <i
                            className="fa fa-clock-o px-2"
                            aria-hidden="true"></i>}
                        {timeRemaining > 0 ? timeRemaining : "نوبت حریف"}
                    </Card.Text>
                </Col>
                <Col
                    style={{
                        textAlign: "left",
                        color: players[0].color,
                    }}>
                    {players[0].score} : {players[0].shape}
                </Col>
            </Row>
        </Card.Header>
    );
};

export default BriefScoreboard;
