import { Button, Card, Row } from "react-bootstrap";
import "./scores.css";
import { useEffect, useState } from 'react';
import { toHijri } from "../../tools/format";

const SingleScoreCard = ({
    Type,
    date,
    playerXName,
    playerOName,
    xScore,
    oScore,
}) => {
    // format score text:
    const [xBadge, setXBadge] = useState(null);
    const [oBadge, setOBadge] = useState(null);
    const [hijriDate, setHijriDate] = useState(null);
    useEffect(() => {
        setHijriDate(toHijri(date)[0]);//toHijri = [date, time]
        if (xScore > oScore) {
            // x won
            setXBadge("badge-success");
            setOBadge("badge-danger");
        } else if (xScore === oScore) {
            //draw
            setXBadge("badge-warning");
            setOBadge("badge-warning");
        } else {
            // o won
            setOBadge("badge-success");
            setXBadge("badge-danger");
        }
    }, [date, xScore, oScore]);
    // make this card 'bg-transparent' too?
    return (
        <Card border="dark" className="single-score-card">
            {/* <Card.Header className="text-center border-dark">{`T3D ${Type}x${Type}x${Type}`}</Card.Header> */}
            <Card.Body>
                <Row className="text-center mx-auto">
                    <span className="col-5">{playerXName}</span>
                    <span
                        className={`badge badge-pill ${xBadge} single-score-badge col-1`}>
                        {xScore}
                    </span>

                    <span
                        className={`badge badge-pill ${oBadge} single-score-badge col-1`}>
                        {oScore}
                    </span>
                    <span className="col-5">{playerOName}</span>
                </Row>
            </Card.Body>
            <Card.Footer className="p-0">
                <Button
                    variant="outline-dark"
                    block
                    size="lg"
                    className="replay-game-button">
                        {hijriDate} 
                        <i className="fa fa-pie-chart px-3" aria-hidden="true"></i>
                </Button>
            </Card.Footer>
        </Card>
    );
};

export default SingleScoreCard;
