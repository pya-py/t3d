import { Card, Col, Row } from "react-bootstrap";

const BriefScoreboard = ({ players }) => {
    return (
        <Card.Header className="w-100 text-center">
            <Row>
                <Col
                    style={{
                        fontSize: "20px",
                        textAlign: "right",
                        color: players[1].color,
                    }}>
                    {players[1].shape} : {players[1].score}
                </Col>
                <Col className="text-warning" style={{
                        fontSize: "18px"}}>
                    <i className="fa fa-clock-o px-2" aria-hidden="true"></i>
                    Timer: Edit:
                </Col>
                <Col
                    style={{
                        fontSize: "20px",
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
