import { useState, useEffect } from "react";
import LoadingBar from "../../commons/LoadingBar";
import Configs from "../../services/configs";
import gameServices from "../../services/http/gameServices";
import { Card, Col, Nav, Row, Tab } from "react-bootstrap";
import AllScores from "../../tables/scores/AllScores";
import "../profile.css";
import FriendRecords from "./FriendRecords";
import { useSelector } from "react-redux";

const MyGamesAndFriends = () => {
	const me = useSelector((state) => state.me);
	const [loading, setLoading] = useState(false);
	const [myGames, setMyGames] = useState([]);
	const [filterID, setFilterID] = useState("me");
	const [selectedFriendIndex, setSelectedFriendIndex] = useState(-1);
	const myFriends = useSelector((state) => state.friends);

	useEffect(() => {
		(async () => {
			try {
				setLoading(true); // use preloader here?
				let serverResponse = await gameServices.getMyGames();
				if (serverResponse.status === Configs.Status.Successful)
					setMyGames(serverResponse.data.myGames.reverse());
			} catch (err) {
				console.log(err);
				setLoading(false);
			}
			setLoading(false);
		})();
	}, []);

	useEffect(() => {
		setSelectedFriendIndex(
			filterID !== "me"
				? myFriends.findIndex((friend) => friend.userID === filterID)
				: -1
		);
		// if filterID === "me" || frined id wia .findIndex not found ---> returns -1
	}, [filterID, myFriends]);

	const unfriend = (friend) => {
		//... show a modal or sth to ask if user's sure
		// send proper http request to clear both from each others friend list
	};
	return (
		<Card border="secondary" bg="transparent" className="big-single-card">
			<Card.Header className="text-center">
				لیست دوستان و آمار بازی ها
			</Card.Header>
			<LoadingBar loading={loading} />
			<Card.Body>
				<LoadingBar loading={loading} />
				<Tab.Container
					defaultActiveKey={filterID}
					onSelect={(key) => setFilterID(key)}>
					<Row>
						<Col
							lg={3}
							md={4}
							sm={12}
							className="friend-list-name-length tabs-list-friends-in-games-scrollable">
							<Nav
								variant="pills"
								className="flex-column text-right">
								<Nav.Item>
									<Nav.Link eventKey="me">
										همه بازی ها
									</Nav.Link>
								</Nav.Item>
								{myFriends.map((friend) => (
									<Nav.Item>
										<Nav.Link eventKey={friend.userID}>
											<Row className="m-0 w-100">
												<Col>{friend.name}</Col>
												<Col xs={1}>
													<i
														onClick={() =>
															unfriend(friend)
														}
														className="icon-unfriend fa fa-times pl-2"
														area-hidden="true"></i>
												</Col>
											</Row>
										</Nav.Link>
									</Nav.Item>
								))}
							</Nav>
						</Col>
						{/* EDIT MAIL LAYOUT <Col> LIKE THIS */}
						<Col lg={9} md={8} sm={12}>
							<Tab.Content>
								<Tab.Pane eventKey="me">
									{me && <FriendRecords person={me} thisIsMe={true}/>}
									<AllScores scores={myGames} />
								</Tab.Pane>
								{myFriends.map((friend) => (
									<Tab.Pane eventKey={friend.userID}>
										<FriendRecords
											person={
												selectedFriendIndex !== -1
													? myFriends[
															selectedFriendIndex
													  ]
													: me
											}
											thisIsMe={
												me.userID ===
												selectedFriendIndex
											}
										/>
										<AllScores
											scores={myGames.filter(
												(game) =>
													friend.userID ===
														game.players[0].id ||
													friend.userID ===
														game.players[1].id
											)}
										/>
									</Tab.Pane>
								))}
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
			</Card.Body>
		</Card>
	);
};

export default MyGamesAndFriends;
