import { Routes } from "../configs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UpdateStatistics } from "../../dashboard/actions";

const GlobalSocketManager = () => {
    const [socketGlobal, setSocketGlobal] = useState(null);

    const player = useSelector((state) => state.player);
    const dispatch = useDispatch();

    const createSocketRequest = (request, clientID, msg) =>
        JSON.stringify({
            request,
            clientID,
            msg,
        });
    const connectGWS = (clientID) => {
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
                        console.log(msg);
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
    useEffect(() => {
        const connect = connectGWS;
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
    return null;
};

export default GlobalSocketManager;
