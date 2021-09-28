import { Routes } from "../configs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TriggerOpponentSearch, UpdateStatistics } from "../../dashboard/actions";
import { SetRoom } from "./../../dashboard/actions/index";

const GlobalSocketManager = () => {
    // I actually used .jsx format to make this Component EventBased
    // On Each event called socket will do some specific operation
    // events are actually useEffects bound to special state changes
    const [socketGlobal, setSocketGlobal] = useState(null);

    const player = useSelector((state) => state.player);
    const tools = useSelector((state) => state.tools);
    const room = useSelector((state) => state.room);
    const dispatch = useDispatch();

    const createSocketRequest = (request, clientID, msg) =>
        JSON.stringify({
            request,
            clientID,
            msg,
        });

    // EVENT NAME: PlayerUpdateEvent
    // happens when player sign in status changes => set ups global socket connection and then if signed in=> reads number of online users in page
    useEffect(() => {
        const connect = (clientID) => {
            return new Promise((resolve, reject) => {
                var socket = new WebSocket(
                    `${Routes.WebSocketRoot}/${Routes.wsGlobalRoute}`
                );
                socket.onopen = () => {
                    socket.send(createSocketRequest("online", clientID, null)); //temp
                    resolve(socket);
                };

                socket.onmessage = (response) => {
                    const { data } = response;
                    const { command, msg } = JSON.parse(data);
                    switch (command) {
                        case "ONLINE": {
                            dispatch(
                                UpdateStatistics({
                                    all: Number(msg),
                                    playing: 0,
                                })
                            ); //playing temp
                            break;
                        }
                        case "ENTER_ROOM": {
                            if (msg) {
                                console.log("your room", msg);
                                dispatch(SetRoom(msg));
                            } else {
                                //search again 5s later
                                setTimeout(() => {
                                    dispatch(TriggerOpponentSearch());
                                }, 5000);
                            }
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

                    resolve(null);
                    // this part needs editing ? maybe not
                };
            });
        };
        (async () => {
            try {
                console.log("read onlines");
                let socket = player ? await connect(player.userID) : null;
                setSocketGlobal(socket);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [player, dispatch]);

    // EVENT NAME: RandomGameInitiated Event
    // happens when user clicks on 'Random Game" Tab search button => sends opponent search request to server
    useEffect(() => {
        if (room.type && !room.name && socketGlobal && player) { //completely making sure we're on right stage
            console.log(room.type);
            socketGlobal.send(
                createSocketRequest("find", player.userID, room.type)
            );
        }
    }, [player, room, tools.opponentSearchTriggered, socketGlobal]);
    return null;
};

export default GlobalSocketManager;
