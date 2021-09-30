import { Routes } from "../configs";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    TriggerOpponentSearch,
    UpdateStatistics,
    SetRoom,
    SendFriendRequestTo,
    RecieveMessageFrom,
    ResetMessages,
    TriggerRecordUpdate,
} from "../../dashboard/actions";
import { Modal, Button, Row, Col, Badge } from "react-bootstrap";
import { toast } from "react-toastify";

const GlobalSocketManager = () => {
    // I actually used .jsx format to make this Component EventBased
    // On Each event called socket will do some specific operation
    // events are actually useEffects bound to special state changes
    const [socketGlobal, setSocketGlobal] = useState(null);
    const [incommingFriendRequest, setIncommingFriendRequest] = useState(null);
    const [showFriendshipModal, setShowFriendshipModal] = useState(false);
    const player = useSelector((state) => state.player);
    const opponent = useSelector((state) => state.opponent);
    const tools = useSelector((state) => state.tools);
    const room = useSelector((state) => state.room);
    const message = useSelector((state) => state.message);
    const [clientOnline, toggleClientOnline] = useState(true);
    const dispatch = useDispatch();

    const enableGlobalTimer = useCallback(() => {
        return setInterval(() => {
            
            if (socketGlobal){
                console.log("updating statistics...");
                socketGlobal.send(
                    JSON.stringify({
                        request: "online",
                        clientID: player.userID,
                        msg: null,
                    })
                );}
        }, 60000); // every ONE MINUTE request number of online members to update the site
    }, [socketGlobal, player]);
    
    useEffect(() => {
        console.log("global timer enabled");
        const timerID = enableGlobalTimer();

        return () => {
            console.log("global timer disabled");
            clearInterval(timerID);
        }
    }, [enableGlobalTimer]);

    const connect = useCallback(() => {
        return new Promise((resolve, reject) => {
            var socket = new WebSocket(
                `${Routes.Server.WebSocketRoot}/${Routes.Server.wsGlobalRoute}`
            );
            socket.onopen = () => {
                socket.send(
                    JSON.stringify({
                        request: "online",
                        clientID: player.userID,
                        msg: null,
                    })
                ); //temp
                resolve(socket);
            };

            socket.onmessage = (response) => {
                const { data } = response;
                const { command, msg } = JSON.parse(data);
                switch (command) {
                    case "ONLINE": {
                        const { players, games } = msg;
                        dispatch(
                            UpdateStatistics({
                                players,
                                games,
                            })
                        ); //playing temp
                        break;
                    }
                    case "ENTER_ROOM": {
                        if (msg) {
                            console.log("your room", msg);
                            dispatch(SetRoom(msg));
                            socket.send(
                                JSON.stringify({
                                    request: "online",
                                    clientID: player.userID,
                                    msg: null,
                                })
                            );
                        } else {
                            //search again 5s later
                            // **********************
                            //time out must be set with rising time out time to prevent server getting fucked up
                            setTimeout(() => {
                                dispatch(TriggerOpponentSearch());
                            }, 5000);
                        }
                        break;
                    }
                    case "FRIENDSHIP_REQUEST": {
                        if (msg.askerID === opponent.userID) {
                            //if both players are in game then ask immidiately
                            setIncommingFriendRequest(msg);
                            setShowFriendshipModal(true);
                        } else {
                            //if the friend request is comming from some one else then manage it differently
                            //...
                        }
                        break;
                    }
                    case "FRIENDSHIP_RESPONSE": {
                        const { answer, targetName } = msg;
                        //if(answer) dispatch(TriggerRecordUpdate());
                        toast.warning(
                            `کاربر ${targetName} درخواست دوستی شما را ${
                                answer ? "پذیرفت" : "رد کرد"
                            }`
                        );
                        break;
                    }
                    case "CHAT": {
                        dispatch(
                            RecieveMessageFrom(msg.name, msg.friendID, msg.text)
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
                // console.log(`WebSocket error: ${error}`);
                socket.close();
                reject(error);
            };

            socket.onclose = () => {
                // reconnectr or what?
                console.log("Reconnecting in  5 seconds");
                setTimeout(() => {
                    (async () => {
                        try {
                            console.log("global socket online request");
                            let socket = player ? await connect() : null;
                            setSocketGlobal(socket);
                        } catch (err) {
                            console.log(err);
                        }
                    })();
                }, 5000);
                resolve(null);
                // this part needs editing ? maybe not
            };
        });
    }, [dispatch, opponent, player]);

    // EVENT NAME: PlayerUpdateEvent
    // happens when player sign in status changes => set ups global socket connection and then if signed in=> reads number of online users in page
    useEffect(() => {
        if (clientOnline && player) {
            (async () => {
                try {
                    console.log("global socket online request");
                    let socket = player ? await connect() : null;
                    setSocketGlobal(socket);
                } catch (err) {
                    console.log(err);
                }
            })();
        }
    }, [clientOnline, player, connect]);

    // EVENT NAME: RandomGameInitiated Event
    // happens when user clicks on 'Random Game" Tab search button => sends opponent search request to server
    useEffect(() => {
        if (room.type) {
            //is it necessary?
            //completely making sure we're on right stage
            if (!room.name && socketGlobal && player)
                socketGlobal.send(
                    JSON.stringify({
                        request: "find",
                        clientID: player.userID,
                        msg: room.type,
                    })
                );
        } else if (!room.name) {
            //room --> {null,null} --> means room has been reset hand u need to remove
            if (socketGlobal)
                socketGlobal.send(
                    JSON.stringify({
                        request: "close_game",
                        clientID: player.userID,
                        msg: null,
                    })
                );
        }
    }, [player, room, tools.opponentSearchTriggered, socketGlobal]);

    useEffect(() => {
        if (tools.friendRequest) {
            //tools.friendRequest either contains null => no request, or contains target ID for friendship
            socketGlobal.send(
                JSON.stringify({
                    request: "ask_friendship",
                    clientID: player.userID,
                    msg: {
                        targetID: tools.friendRequest,
                        askerName: player.fullname,
                    },
                })
            );
        }
    }, [tools.friendRequest, socketGlobal, player]);

    const respondToFriendshipRequest = (answer) => {
        // handle multiple requests *************
        socketGlobal.send(
            JSON.stringify({
                request: "respond_friendship",
                clientID: player.userID,
                msg: {
                    answer,
                    targetName: player.fullname,
                    askerID: incommingFriendRequest.askerID,
                },
            })
        );
        // if(answer) dispatch(TriggerRecordUpdate());
        setShowFriendshipModal(false);
        setIncommingFriendRequest(null);
        dispatch(SendFriendRequestTo(null)); //reset friend request targetID to prevent any future problm
    };

    useEffect(() => {
        if (message.sent) {
            //if destination is determined, otherwise => means no message has been sent
            socketGlobal.send(
                JSON.stringify({
                    request: "chat",
                    clientID: player.userID,
                    msg: message.sent,
                })
            );
            console.log("sent: " + message.sent.text);
            dispatch(ResetMessages());
        }
    }, [player, message, socketGlobal, dispatch]);

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

    return (
        //this is just for firendship request in games
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
                            onClick={() => respondToFriendshipRequest(true)}>
                            پذیرفتن
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            block
                            variant="danger"
                            onClick={() => respondToFriendshipRequest(false)}>
                            رد
                        </Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    );
};

export default GlobalSocketManager;
