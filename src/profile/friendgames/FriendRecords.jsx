import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import "../profile.css";
import noAvatar from "./no-avatar.png"; // definitely must be changed bro!
import Record from "./Record";
import Avatar from "react-avatar";
import { Notify, Sorry } from "./../../tools/notification";
import { EndFriendlyInvitation, InviteToFriendlyGame } from "../../globals/redux/actions/tools";

const FriendRecords = (props) => {
	const me = useSelector((state) => state.me);
	const room = useSelector((state) => state.room);
	const dispatch = useDispatch();
	if (!me) return null; //because of time delay to load player data, component crashes below
	//fix the bug in a better way
	const { userID, records } = props.friend ? props.friend : me;

	const onInviteToGameClick = () => {
		if (!room.type && !room.type && userID !== me.userID) {
			//if you want to enable players play multiple games then remove this
			// if player isnt still in a game
			//check room info?
			dispatch(InviteToFriendlyGame(userID));
			setTimeout(() => {
				//Notify('دوست مورد نظر درخواست شما را نپذیرفت')
				dispatch(EndFriendlyInvitation());
			}, 10000);
		} else {
			Sorry("برای شروع بازی جدید، باید بازی قبلی شما به اتمام برسد");
		}
	};
	return (
		<Card border="success" bg="transparent" className="friend-records">
			<Card.Body>
				<Row className="w-100 p-0 mx-auto">
					{/* <hr /> */}
					<Col sm={12} md={12} lg={3} className="text-center mx-auuto">
						<Avatar
							style={{
								margin: "auto",
								textAlign: "center",
							}}
							size="128"
							round={true}
							src={noAvatar}
						/>
					</Col>
					<Col sm={12} md={12} lg={9}>
						<ListGroup className="list-group list-group-flush">
							<Row className="h-100">
								<Col className="p-0 h-100 w-100">
									<Record title="امتیاز بازیکن">
										{records.points}
									</Record>
								</Col>
								<Col className="p-0 h-100 w-100">
									<Record title="تعداد بردها">
										{records.wins}
									</Record>
								</Col>
							</Row>
							<Row className="h-100">
								<Col className="p-0 h-100 w-100">
									<Record title="تعداد تساوی">
										{records.draws}
									</Record>
								</Col>
								<Col className="p-0 h-100 w-100">
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
						<Col sm={6} xs={12}>
							<Button
								variant="secondary"
								block
								onClick={onInviteToGameClick}>
								<i
									className="fa fa-handshake-o px-2"
									aria-hidden="true"></i>
								درخواست بازی
							</Button>
						</Col>
						<Col sm={6} xs={12}>
							<Button variant="danger" block onClick={null}>
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
