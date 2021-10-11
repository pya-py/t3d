import { browserStorage, Routes } from "../configs";
import { Fragment, useCallback, useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UpdateStatistics, ResetMessages } from "../../globals/redux/actions";
import { RecieveMessageFrom } from "../../globals/redux/actions/message";
import { Modal, Button, Row, Col, Badge } from "react-bootstrap";
import { Attention, OK, Sorry, Notify } from "../../tools/notification";
import NotificationCenter from "../../tools/NotificationCenter";
import GlobalContext from "./../../globals/state/GlobalContext";
import {
	EndFriendlyInvitation,
	EndFriendRequest,
	RecieveGameInvitation,
	TriggerRandomSearch,
} from "./../../globals/redux/actions/tools";
import { EnterRoom } from "../../globals/redux/actions/game";
const GlobalSocketManager = () => {
	// I actually used .jsx format to make this Component EventBased
	// On Each event called socket will do some specific operation
	// events are actually useEffects bound to special state changes
	const context = useContext(GlobalContext);
	const [socketGlobal, setSocketGlobal] = useState(null);
	const [incommingFriendRequest, setIncommingFriendRequest] = useState(null);
	const [showFriendshipModal, setShowFriendshipModal] = useState(false);
	const me = useSelector((state) => state.me);
	const tools = useSelector((state) => state.tools);
	const room = useSelector((state) => state.room);
	const message = useSelector((state) => state.message);
	const [clientOnline, toggleClientOnline] = useState(true);
	const dispatch = useDispatch();

	const pack = useCallback((request, msg = null) => {
		return JSON.stringify({
			token: browserStorage.TOKEN(),
			request,
			msg,
		});
	}, []);

	const enableGlobalTimer = useCallback(() => {
		return setInterval(() => {
			if (socketGlobal) socketGlobal.send(pack("online"));
		}, 300000); // every 5 MINUTES request number of online members to update the site
	}, [pack, socketGlobal]);

	useEffect(() => {
		console.log("global timer enabled");
		const timerID = enableGlobalTimer();
		return () => {
			console.log("global timer disabled");
			clearInterval(timerID);
		};
	}, [enableGlobalTimer]);

	const { signOut, redirectToGamePlay } = context;
	const iamSignedIn = me && me.userID;

	const connect = useCallback(() => {
		console.log("global websocket connect called -> new socket returned");
		if (!iamSignedIn) return null; //to make sure just site user trigger this connection
		return new Promise((resolve, reject) => {
			try {
				var socket = new WebSocket(
					`${Routes.Server.WebSocketRoot}/${Routes.Server.wsGlobalRoute}`
				);
				socket.onopen = () => {
					socket.send(pack("online")); //temp
					resolve(socket);
				};

				socket.onmessage = (response) => {
					const { data } = response;
					const { command, msg } = JSON.parse(data);
					switch (command) {
						case "ONLINE": {
							const { players, games } = msg;
							dispatch(UpdateStatistics(players, games)); //playing temp
							break;
						}
						case "NOT_AUTHORIZED": {
							Sorry(
								"نشست شما منقضی شده، لطفا دوباره وارد حساب کاربری خود شوید"
							);
							signOut();
							break;
						}
						case "FIND_RESULT": {
							//response from random game request
							if (msg) {
								dispatch(EnterRoom(msg));
								socket.send(pack("online"));
							} else {
								//search again 5s later
								// **********************
								//time out must be set with rising time out time to prevent server getting fucked up
								setTimeout(() => {
									dispatch(TriggerRandomSearch());
								}, 5000);
							}
							break;
						}
						case "FRIENDSHIP_REQUEST": {
							//if (msg.askerID === opponentID) {
							//if both mes are in game then ask immidiately
							setIncommingFriendRequest(msg);
							setShowFriendshipModal(true);

							/*else {
								//if the friend request is comming from some one else then manage it differently
								//...
							}*/
							break;
						}
						case "FRIENDSHIP_RESPONSE": {
							const { answer, targetName } = msg;
							//if(answer) dispatch(TriggerRecordUpdate());
							if (answer)
								OK(`${targetName} درخواست دوستی شما را پذیرفت`);
							else
								Attention(
									`${targetName} درخواست دوستی شما را رد کرد`
								);
							dispatch(EndFriendRequest());
							break;
						}
						case "TARGET_OFFLINE": {
							//... while chatting or game request
							Sorry(
								"کاربر مورد نظر در حال حاضر آفلاین می باشد. لطفا بعدا تلاش کنید."
							);
							break;
						}
						case "YOUR_BUSY": {
							Sorry(
								"شما هنوز بازی اخیر خود را به اتمام نرسانده اید. پس از پایان آن دوباره تلاش کنید."
							);
							break;
						}
						case "TARGET_BUSY": {
							//... while chatting or game request
							Notify(
								"در حال حاضر کاربر مشغول انجام بازی دیگری است و درخواست شما امکان پذیر نیست"
							);
							break;
						}
						case "FRIENDLY_GAME": {
							// ... trigger and show responding form
							const { askerID, askerName } = msg;
							dispatch(RecieveGameInvitation(askerID, askerName));
							break;
						}
						case "INVITATION_ACCEPTED": {
							// ... friend responded to your request
							// ... if true -> room info has ben sent to you
							// needed to check room state? done in server
							dispatch(EndFriendlyInvitation());
							redirectToGamePlay(msg); //msg -> room
							break;
						}
						case "CHAT": {
							dispatch(
								RecieveMessageFrom(
									msg.name,
									msg.friendID,
									msg.text
								)
							);

							break;
						}
						default: {
							//... whatever
							break;
						}
					}
					resolve(socket);
				};

				socket.onerror = (error) => {
					socket.close();
					reject(error);
				};

				socket.onclose = () => {
					// reconnectr or what?
					console.log("Reconnecting in  5 seconds");
					setTimeout(() => {
						(async () => {
							try {
								let socket = iamSignedIn
									? await connect()
									: null;
								setSocketGlobal(socket);
							} catch (err) {
								console.log(err);
							}
						})();
					}, 5000);
					resolve(null);
					// this part needs editing ? maybe not
				};
			} catch (err) {
				console.log(`global websocket errpr: ${err}`);
			}
		});
	}, [dispatch, signOut, redirectToGamePlay, pack, iamSignedIn]);

	// EVENT NAME: PlayerUpdateEvent
	// happens when player sign in status changes => set ups global socket connection and then if signed in=> reads number of online users in page
	useEffect(() => {
		//updates every time record changes or common user data changes, good or what?
		if (clientOnline && iamSignedIn) {
			(async () => {
				try {
					let socket = iamSignedIn ? await connect() : null;
					setSocketGlobal(socket);
				} catch (err) {
					console.log(err);
				}
			})();
		}
	}, [clientOnline, iamSignedIn, connect]);

	const { fullname } = me ? me : { fullname: null };
	const {
		friendRequestTarget,
		friendlyGameTarget,
		randomSearchTriggered,
		acceptedInviter,
	} = tools;
	// EVENT NAME: RandomGameInitiated Event
	// happens when user clicks on 'Random Game" Tab search button => sends opponent search request to server
	useEffect(() => {
		console.log(room);
		if (room.type) {
			//is it necessary?
			//completely making sure we're on right stage
			if (!room.name && iamSignedIn && socketGlobal)
				socketGlobal.send(pack("find", room.type));
		} else if (!room.name) {
			//room --> {null,null} --> means room has been reset hand u need to remove
			if (socketGlobal) socketGlobal.send(pack("close_game"));
		}
	}, [iamSignedIn, room, randomSearchTriggered, socketGlobal, pack]);

	useEffect(() => {
		if (friendRequestTarget) {
			//friendRequestTarget either contains null => no request, or contains target ID for friendship
			if (socketGlobal)
				socketGlobal.send(
					pack("friendship", {
						targetID: friendRequestTarget,
						askerName: fullname,
					})
				);
		}
		if (acceptedInviter) {
			if (socketGlobal)
				socketGlobal.send(
					pack("respond_friendlygame", {
						answer: true,
						inviterID: acceptedInviter,
					})
				);
		} else if (friendlyGameTarget) {
			if (socketGlobal)
				socketGlobal.send(
					pack("friendly_game", {
						targetID: friendlyGameTarget,
						askerName: fullname,
					})
				);
		}
	}, [
		friendRequestTarget,
		friendlyGameTarget,
		acceptedInviter,
		socketGlobal,
		pack,
		fullname,
	]);

	const respondToFriendshipRequest = (answer) => {
		// handle multiple requests *************

		//target reponds to requester
		if (socketGlobal)
			socketGlobal.send(
				pack("respond_friendship", {
					answer,
					targetName: me.fullname,
					askerID: incommingFriendRequest.askerID,
				})
			);
		// if(answer) dispatch(TriggerRecordUpdate());
		setShowFriendshipModal(false);
		setIncommingFriendRequest(null);
		// dispatch(SendFriendRequestTo(null)); //reset friend request targetID to prevent any future problm
	};

	useEffect(() => {
		if (message.sent && socketGlobal) {
			//if destination is determined, otherwise => means no message has been sent
			socketGlobal.send(pack("chat", message.sent));
			dispatch(ResetMessages());
		}
	}, [message.sent, socketGlobal, pack, dispatch]);

	// if online status changes
	setInterval(() => {
		if (window.navigator.onLine) {
			//client online
			if (!clientOnline)
				//this means -> client JUST became online
				toggleClientOnline(true); //change connection status
		} else {
			// clients offline
			if (clientOnline)
				//this means -> client JUST became offline now
				toggleClientOnline(false); //change connection status
		}
	}, 5000);

	// is it really necessary though ?????
	// move UI to notification center
	return (
		//this is just for firendship request in games
		<Fragment>
			<NotificationCenter />
			<Modal
				show={showFriendshipModal}
				onHide={() => respondToFriendshipRequest(false)}>
				<Modal.Header closeButton />
				<Modal.Body className="text-right">
					<p>
						{!incommingFriendRequest ? null : (
							<Badge
								style={{ fontSize: "18px", margin: "2%" }}
								pill
								variant="warning">
								{incommingFriendRequest.askerName}
							</Badge>
						)}
						به شما پیشنهاد دوستی داده است.
					</p>
					<p>اگر تمایل به دوستی ندارید میتواند درخواست را رد کنید.</p>
				</Modal.Body>
				<Modal.Footer className="w-100 text-right">
					<Row className="w-100">
						<Col>
							<Button
								variant="success"
								block
								onClick={() =>
									respondToFriendshipRequest(true)
								}>
								پذیرفتن
							</Button>
						</Col>
						<Col>
							<Button
								block
								variant="danger"
								onClick={() =>
									respondToFriendshipRequest(false)
								}>
								رد
							</Button>
						</Col>
					</Row>
				</Modal.Footer>
			</Modal>
		</Fragment>
	);
};

export default GlobalSocketManager;
