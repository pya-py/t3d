import { useState, useEffect } from "react";
import LoadingBar from "../../commons/LoadingBar";
import userServices from "../../services/http/userServices";
import Configs from "../../services/configs";
import gameServices from "../../services/http/gameServices";
import { Card, Col, Nav, Row, Tab } from "react-bootstrap";
import AllScores from "../../tables/scores/AllScores";
import "../profile.css";
import FriendRecords from "./FriendRecords";

const MyGamesAndFriends = () => {
	const [loading, setLoading] = useState(false);
	const [myFriends, setMyFriends] = useState([]);
	const [myGames, setMyGames] = useState([]);
	const [filterID, setFilterID] = useState("me");
	const [selectedFriendIndex, setSelectedFriendIndex] = useState(-1);
	useEffect(() => {
		(async () => {
			try {
				setLoading(true); // use preloader here?
				let serverResponse = await gameServices.getMyGames();
				if (serverResponse.status === Configs.Status.Successful)
					setMyGames(serverResponse.data.myGames.reverse());
				serverResponse = await userServices.getMyFriends();
				if (serverResponse.status === Configs.Status.Successful)
					setMyFriends(serverResponse.data.friends);
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

    }
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
					<Row className="tabs-list-friends-in-games-scrollable">
						<Col className="friend-list-name-length" xs={3}>
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
											<Row className="w-100">
												<Col>{friend.fullname}</Col>
												<Col xs={1}>
													<i onClick={() => unfriend(friend)} className="icon-unfriend fa fa-times pl-2" area-hidden="true"></i>
												</Col>
											</Row>
										</Nav.Link>
									</Nav.Item>
								))}
							</Nav>
						</Col>
						{/* EDIT MAIL LAYOUT <Col> LIKE THIS */}
						<Col xs={9}>
							<FriendRecords
								friend={
									selectedFriendIndex !== -1
										? myFriends[selectedFriendIndex]
										: null
								}
							/>
						</Col>

						<Col>
							<Tab.Content>
								<Tab.Pane eventKey="me">
									<AllScores scores={myGames} />
								</Tab.Pane>
								{myFriends.map((friend) => (
									<Tab.Pane eventKey={friend.userID}>
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
						{/* EDIT MAIL LAYOUT <Col> LIKE THIS */}
					</Row>
				</Tab.Container>
			</Card.Body>
		</Card>
	);
};

export default MyGamesAndFriends;
