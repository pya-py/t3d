import {
	Button,
	Card,
	Container,
	Form,
	InputGroup,
	Row,
	Tab,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef, useContext } from "react";
import "./chat.css";
import { Devices } from "../services/configs";
import { SendMessageTo } from "../globals/redux/actions/message";
import Message from "./Message";
import GlobalContext from "../globals/state/GlobalContext";

const ChatBox = ({ friendID }) => {
	const [myMessage, setMyMessage] = useState("");
	const message = useSelector((state) => state.message);
	const dispatch = useDispatch();
	const me = useSelector((state) => state.me);
	const mostRecentMessageRef = useRef(null);
	const context = useContext(GlobalContext);
	const chats = useSelector(state => state.chats);
	const [ourChat, setOurChat] = useState([]);

	useEffect(() => {
		let ours = chats.find(chat => chat.with === friendID);
		setOurChat((ours && ours.messages) ? ours.messages : []);
	}, [chats, friendID]);
	
	const composeMessage = (event) => {
		event.preventDefault();
		// init state vears ro get chat
		if (myMessage) {
			dispatch(SendMessageTo(me.fullname, friendID, myMessage));
			setMyMessage("");

			if (mostRecentMessageRef && mostRecentMessageRef.current) {
				setTimeout(() => {
					mostRecentMessageRef.current.scrollIntoView({
						behavior: "smooth",
						top: mostRecentMessageRef.current.offsetTop,
					});
				}, 100);
			}
		}
	};

	useEffect(() => {
		const { recieved } = message;
		if (!message.sent && recieved && recieved.friendID === friendID) {
			setTimeout(() => {
				if (mostRecentMessageRef && mostRecentMessageRef.current)
					mostRecentMessageRef.current.scrollIntoView({
						behavior: "smooth",
						top: mostRecentMessageRef.current.offsetTop,
					});
			}, 100);
        }
	}, [message,ourChat, friendID, dispatch]);

	return (
		<Tab.Pane eventKey={friendID}>
			<Container>
				<Row>
					<Card
						border="dark"
						bg="transparent"
						className={`big-single-card ${
							context.device !== Devices.SmartPhone
								? "chat-box-scrollable"
								: "smartphone-chat-box-scrollable"
						}`}>
						<Card.Body>
							{ourChat && ourChat instanceof Array && ourChat.map((msg, index) => (
									<div ref={mostRecentMessageRef}>
										<Message
											// key={msg.key}
											msg={msg}
											inDesktop={
												context.device ===
												Devices.Desktop
											}
											previousDay={
												index !== 0
													? new Date(
															ourChat[
																index - 1
															].date
													  ).getDate()
													: 0
											}
										/>
									</div>
								))}
						</Card.Body>
					</Card>
				</Row>
				<Row>
					<Form
						onSubmit={(event) => composeMessage(event)}
						className="w-100 mt-3">
						<InputGroup className="w-100">
							<InputGroup.Prepend
								style={{
									width: "8%",
								}}>
								<Button
									type="submit"
									style={{ border: "none", fontSize: "22px" }}
									className="w-100 mx-auto"
									variant="outline-info">
									<i
										className="fa fa-paper-plane"
										aria-hidden="true"></i>
								</Button>
							</InputGroup.Prepend>

							<InputGroup.Prepend
								style={{ margin: "auto", width: "92%" }}>
								<Form.Control
									value={myMessage}
									onChange={(e) =>
										setMyMessage(e.target.value)
									}
									placeholder="پیام..."
									className="bg-transparent chat-room-message-box
                                    mx-auto text-right"></Form.Control>
							</InputGroup.Prepend>
						</InputGroup>
					</Form>
				</Row>
			</Container>
		</Tab.Pane>
	);
};

export default ChatBox;
