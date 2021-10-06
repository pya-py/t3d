import noAvatar from "./no-avatar.png"; // definitely must be changed bro!
import {
	Card,
	Row,
	Col,
	Alert,
	Badge,
	Image,
	ListGroup,
	Button,
} from "react-bootstrap";
import OnlineStatistics from "./OnlineStatistics";
import { SendFriendRequestTo } from "../globals/redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import userServices from "./../services/http/userServices";
import Configs from "../services/configs";
import GameChatBox from "../chat/GameChatBox";
import Record from "../profile/friendgames/Record";

const PlayerInfoSideBar = (props) => {
	const me = useSelector((state) => state.player);
	const scoreboard = useSelector((state) => state.scoreboard);

	const dispatch = useDispatch();
	const [personIsFriend, setPersonIsFriend] = useState(false);

	const person = props.person ? props.person : me;
	const onFriendRequestClick = (event) => {
		event.target.innerHTML = "ارسال شد...";
		event.target.disabled = true;
		dispatch(SendFriendRequestTo(person.userID));
	};
	const [piece, setPiece] = useState(null); //piece === mohreh

	useEffect(() => {
		console.log(scoreboard);
		setPiece(
			me && person.userID !== me.userID ? scoreboard.opp : scoreboard.me
		);
	}, [person, me, scoreboard]);
	useEffect(() => {
		if (me && person.userID !== me.userID) {
			(async () => {
				try {
					const { status, data } = await userServices.isMyFriend(
						person.userID
					);
					if (status === Configs.Status.Successful) {
						setPersonIsFriend(data.isFriend);
					}
				} catch (err) {
					// handle error.
					console.log(err);
				}
			})();
		}
	}, [me, person]);
	if (!person) return null;
	const { records } = person;
	return (
		<Card border="info" className="player-info-sidebar">
			<Card.Header className="text-center text-info form-inline">
				<Col>
					<Card.Text className="text-left">
						{person.fullname}
					</Card.Text>
				</Col>
				<Col>
					<Image
						className="card-img-top player-avatar"
						src={noAvatar}
						alt="مشکلی در بارگذاری تصویر پیش آمد"
					/>
				</Col>
			</Card.Header>

			<Card.Body>
				<ListGroup className="list-group list-group-flush">
					{piece && (
						<ListGroup.Item>
							<Alert variant={piece.index ? "danger" : "primary"}>
								<Alert.Heading className="text-center">
									{piece.score} : {piece.shape}
								</Alert.Heading>
							</Alert>
						</ListGroup.Item>
					)}
					<Record small title="امتیاز بازیکن">{records.points}</Record>
					<Record small title="تعداد بردها">{records.wins}</Record>
					<Record small title="تعداد تساوی">{records.draws}</Record>
					<Record small title="تعداد باختها">{records.loses}</Record>
				</ListGroup>
			</Card.Body>
			<Card.Footer>
				{me === person ? (
					<OnlineStatistics />
				) : personIsFriend ? (
					<GameChatBox friendID={person.userID} />
				) : (
					<Button
						variant={"outline-info"}
						block
						onClick={(event) => onFriendRequestClick(event)}>
						<i
							className="fa fa-handshake-o px-2"
							aria-hidden="true"></i>
						درخواست دوستی
					</Button>
				)}
			</Card.Footer>
		</Card>
	);
};

export default PlayerInfoSideBar;
