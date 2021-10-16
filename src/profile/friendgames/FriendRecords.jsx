import { Button, Card, Col, ListGroup, Row, InputGroup, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import "../profile.css";
import Record from "./Record";
import { Sorry } from "./../../tools/notification";
import { useState } from 'react';
import {
	EndFriendlyInvitation,
	InviteToFriendlyGame,
} from "../../globals/redux/actions/tools";

const FriendRecords = (props) => {
	const me = useSelector((state) => state.me);
	const room = useSelector((state) => state.room);
	const [gameType, setGameType] = useState(4);
	const dispatch = useDispatch();
	if (!me) return null; //because of time delay to load player data, component crashes below
	//fix the bug in a better way
	const person = props.friend ? props.friend : me;
	const {records, avatar, userID: currentID} = person;
	const onInviteToGameClick = () => {
		if (!room.type && !room.type && currentID !== me.userID) {
			//if you want to enable players play multiple games then remove this
			// if player isnt still in a game
			//check room info?
			dispatch(InviteToFriendlyGame(currentID,gameType));
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
					<Col
						sm={12}
						md={12}
						lg={3}
						className="text-center mx-auuto">
						<Image className="friends-section-avatar" src={avatar} roundedCircle />
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
						<Col sm={4} xs={12}>
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
						<Col sm={8} xs={12}>
							<InputGroup>
								<InputGroup.Prepend>
									<InputGroup.Radio
										value="3"
										name="tableDimension"
										checked={gameType === 3}
										onChange={() => setGameType(3)}
									/>
									<InputGroup.Text>3 * 3 * 3</InputGroup.Text>
								</InputGroup.Prepend>
								<InputGroup.Prepend>
									<InputGroup.Radio
										value="4"
										name="tableDimension"
										checked={gameType === 4}
										onChange={() => setGameType(4)}
									/>
									<InputGroup.Text>4 * 4 * 4</InputGroup.Text>
								</InputGroup.Prepend>
								<InputGroup.Prepend>
									<InputGroup.Radio
										value="5"
										name="tableDimension"
										checked={gameType === 5}
										onChange={() => setGameType(5)}
									/>
									<InputGroup.Text>5 * 5 * 5</InputGroup.Text>
								</InputGroup.Prepend>
							</InputGroup>
						</Col>
					</Row>
				</Card.Footer>
			)}
		</Card>
	);
};

export default FriendRecords;
