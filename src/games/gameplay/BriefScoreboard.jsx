import { Card, Col, Row } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import { GameSetting } from "../../services/configs";

const BriefScoreboard = ({ timeRemaining, players }) => {
    const [timeStamp, setTimeStamp] = useState(null);
    const aThird = GameSetting.T3D.TurnTimeOut / 3;
    useEffect(() => {
        let color = null,
            icon = null;
        if (timeRemaining) {
            if (timeRemaining >= aThird) {
                color = "text-success";
                icon = (
                    <i className="fa fa-hourglass-start px-2" aria-hidden="true"></i>
                );
            } else {
                color = "text-danger";
                icon = (
                    <i className="fa fa-hourglass-half px-2" aria-hidden="true"></i>
                );
            }
        } else {
            color = "text-dark";
            icon = <i className="fa fa-hourglass-end px-2" aria-hidden="true"></i>;
        }
        setTimeStamp(<div className={color}>{icon}{timeRemaining}</div>);
    }, [timeRemaining, aThird]);

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
                <Col>{timeStamp}</Col>
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
