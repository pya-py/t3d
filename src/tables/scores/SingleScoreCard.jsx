import { Button, Card, Row } from "react-bootstrap";
import "./scores.css";

const SingleScoreCard = ({
    Type,
    playerXName,
    playerOName,
    xScore,
    oScore,
}) => {
    // format score text:
    let xBadgeColor = null;
    let oBadgeColor = null; // null means default badge color

    if (xScore > oScore) {
        // x won
        xBadgeColor = "badge-success";
        oBadgeColor = "badge-danger";
    } else if (xScore === oScore) {
        //draw
        xBadgeColor = "badge-warning";
        oBadgeColor = "badge-warning";
    } else {
        // o won
        oBadgeColor = "badge-success";
        xBadgeColor = "badge-danger";
    }

    // make this card 'bg-transparent' too?
    return (
        <Card border="dark" className="single-score-card">
            {/* <Card.Header className="text-center border-dark">{`T3D ${Type}x${Type}x${Type}`}</Card.Header> */}
            <Card.Body>
                <Row className="text-center mx-auto">
                    <span className="col-5">{playerXName}</span>
                    <span
                        className={`badge badge-pill ${xBadgeColor} single-score-badge col-1`}>
                        {xScore}
                    </span>

                    <span
                        className={`badge badge-pill ${oBadgeColor} single-score-badge col-1`}>
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
                        مشخصات بازی
                </Button>
            </Card.Footer>
        </Card>
    );
};

export default SingleScoreCard;
