import { Card, Row, Col, Nav, Tab } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { Devices } from "../services/configs";
import ChatBox from "./ChatBox";
import "./chat.css";
import GlobalContext from "../globals/state/GlobalContext";
import { useDispatch, useSelector } from "react-redux";
import { LoadMyFriendsChats } from "../globals/redux/actions/friends";
const ChatRoom = () => {
	const context = useContext(GlobalContext);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(LoadMyFriendsChats());
		// chat room unmounted
		return () => {
			// remove chat list from redux to save memory
		};
	}, [dispatch]);

	const myfriends = useSelector((state) => state.friends);
	
	return (
		<Card border="secondary" bg="transparent" className="chat-main-card">
			<Card.Header className="text-center">چت روم شما</Card.Header>
			<Card.Body>
				<Tab.Container
				// id="left-tabs-example"
				// defaultActiveKey={filterID}
				// onSelect={(key) => setFilterID(key)}
				>
					<Row>
						<Col
							className={
								context.device !== Devices.SmartPhone
									? "chat-room-devider chat-scrollable-friends"
									: "smartphone-chat-scrollable-friends"
							}
							md={3} sm={12}>
							<Nav
								variant="pills"
								className="flex-column text-right">
								{myfriends.map((friend) => (
									<Nav.Item>
										<Nav.Link
											// key={friend.ID}
											eventKey={friend.ID}>
											{friend.name}
										</Nav.Link>
									</Nav.Item>
								))}
							</Nav>
						</Col>
						{/* EDIT MAIL LAYOUT <Col> LIKE THIS */}
						<Col>
							<Tab.Content>
								{myfriends.map((friend) => (
									<ChatBox
										// key={uuidv1()}
										friendID={friend.ID}
									/>
								))}
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
			</Card.Body>
		</Card>
	);
};

export default ChatRoom;
