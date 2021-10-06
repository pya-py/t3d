import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import "../profile.css";
import noAvatar from "./no-avatar.png"; // definitely must be changed bro!
import Record from "./Record";
import Avatar from "react-avatar";
const FriendRecords = (props) => {
	const me = useSelector((state) => state.player);
	if (!me) return null; //because of time delay to load player data, component crashes below
	//fix the bug in a better way
	const { records } = props.friend ? props.friend : me;
	return (
		<Card border="success" bg="transparent" className="friend-records">
			<Card.Body>
				<Row className="w-100 p-0 mx-auto">
					{/* <hr /> */}
					<Col xs={3} className="text-center mx-auuto">
						<Avatar
							style={{
								width: "100%",
								height: "100%",
								margin: "auto",
								textAlign: "center",
							}}
							round={true}
							src={noAvatar}
						/>
					</Col>
					<Col>
						<ListGroup className=" list-group list-group-flush">
							<Row>
								<Col className="p-0 w-100">
									<Record title="امتیاز بازیکن">
										{records.points}
									</Record>
								</Col>
								<Col className="p-0 w-100">
									<Record title="تعداد بردها">
										{records.wins}
									</Record>
								</Col>
							</Row>
							<Row>
								<Col className="p-0 w-100">
									<Record title="تعداد تساوی">
										{records.draws}
									</Record>
								</Col>
								<Col className="p-0 w-100">
									<Record title="تعداد باختها">
										{records.loses}
									</Record>
								</Col>
							</Row>
						</ListGroup>
					</Col>
				</Row>
			</Card.Body>
			{props.friend && (
				<Card.Footer>
					<Row>
						<Col>
							<Button
								variant="secondary"
								block
								onClick={null}>
								<i
									className="fa fa-handshake-o px-2"
									aria-hidden="true"></i>
								درخواست بازی
							</Button>
						</Col>
						<Col>
							<Button
								variant="danger"
								block
								onClick={null}>
								تست
							</Button>
						</Col>
					</Row>
				</Card.Footer>
			)}
		</Card>
	);
};

export default FriendRecords;
