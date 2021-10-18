import { Card, Row, Col, Nav, Tab } from "react-bootstrap";
import { useContext } from "react";
import { Devices } from "../services/configs";
import ChatBox from "./ChatBox";
import "./chat.css";
import GlobalContext from "../globals/state/GlobalContext";
import { useSelector } from "react-redux";

const ChatRoom = () => {
	const context = useContext(GlobalContext);

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
							lg={3} md={3} sm={12}>
							<Nav
								variant="pills"
								className="flex-column text-right">
								{myfriends.map((friend) => (
									<Nav.Item>
										<Nav.Link
											// key={friend.userID}
											eventKey={friend.userID}>
											{friend.name}
										</Nav.Link>
									</Nav.Item>
								))}
							</Nav>
						</Col>
						{/* EDIT MAIL LAYOUT <Col> LIKE THIS */}
						<Col lg={9} md={9} sm={12}>
							<Tab.Content>
								{myfriends.map((friend) => (
									<ChatBox
										// key={uuidv1()}
										friendID={friend.userID}
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
