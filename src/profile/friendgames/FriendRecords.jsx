import noAvatar from "./no-avatar.png"; // definitely must be changed bro!
import { Card, Image, Row, ListGroup, Button, Col } from "react-bootstrap";
import '../profile.css';
import { useSelector } from "react-redux";
import Record from "./Record";

const FriendRecords = (props) => {
    const me = useSelector((state) => state.player);
    if(!me) return null;//because of time delay to load player data, component crashes below
    //fix the bug in a better way
    const { records } = props.friend ? props.friend : me;
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
                    <Row>
                        <Col className="p-0 h-100">
                            <Record title="امتیاز بازیکن">
                                {records.points}
                            </Record>
                        </Col>
                        <Col  className="p-0 h-100">
                            <Record title="تعداد بردها">{records.wins}</Record>
                        </Col>
                        <Col  className="p-0 h-100">
                            <Record title="تعداد تساوی">{records.draws}</Record>
                        </Col>
                        <Col  className="p-0 h-100">
                            <Record title="تعداد باختها">
                                {records.loses}
                            </Record>
                        </Col>
                    </Row>
                    <Row></Row>
                </ListGroup>
            </Card.Body>
            {props.friend && (
                <Card.Footer>
                    <Button variant="outline-danger" block onClick={null}>
                        <i
                            className="fa fa-handshake-o px-2"
                            aria-hidden="true"></i>
                        لغو دوستی
                    </Button>
                </Card.Footer>
            )}
        </Card>
    );
};

export default FriendRecords;
