import { Button, Card, Container, Form, Row, Tab, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import "./chat.css";
import { SendMessageTo } from "../globals/redux/actions/message";
import Message from "./Message";

const ChatBox = ({ friendID }) => {
	const [myMessage, setMyMessage] = useState("");
	const message = useSelector((state) => state.message);
	const dispatch = useDispatch();
	const me = useSelector((state) => state.me);
	const mostRecentMessageRef = useRef(null);
	const chats = useSelector((state) => state.chats);
	const [ourChat, setOurChat] = useState([]);

	useEffect(() => {
		let ours = chats.find((chat) => chat.with === friendID);
		setOurChat(ours && ours.messages ? ours.messages : []);
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
	}, [message, ourChat, friendID, dispatch]);

	return (
		<Tab.Pane eventKey={friendID}>
			<Container>
				<Row>
					<Card
						border="dark"
						bg="transparent"
						className="big-single-card chat-box-scrollable">
						<Card.Body>
							{ourChat &&
								ourChat instanceof Array &&
								ourChat.map((msg, index) => (
									<div ref={mostRecentMessageRef}>
										<Message
											// key={msg.key}
											msg={msg}
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
						<Row className="w-100 p-0 m-0">
							<Col xs={1} className="m-0 p-0 text-center">
								<Button
									type="submit"
									className="w-100 mx-auto"
									variant="outline-info">
									<i
										className="fa fa-paper-plane"
										aria-hidden="true"></i>
								</Button>
							</Col>
							<Col xs={11} className="m-0 p-0 w-100">
								<Form.Control
									className="p-0 w-100 bg-transparent chat-room-message-box
                                    mx-auto text-right"
									value={myMessage}
									onChange={(e) =>
										setMyMessage(e.target.value)
									}
									placeholder="پیام..."></Form.Control>
							</Col>
						</Row>
					</Form>
				</Row>
			</Container>
		</Tab.Pane>
	);
};

export default ChatBox;
