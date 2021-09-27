import {Routes} from '../configs';

const createSocketRequest = (request, roomName, playerID, msg) =>
    JSON.stringify({
        request,
        roomName,
        playerID,
        msg,
    });

const connect = (roomName, playerID, gameType) => {
    return new Promise((resolve, reject) => {
        var server = new WebSocket(`${Routes.WebSocketRoot}/${Routes.wsGamePlayRoute}`);
        server.onopen = () => {
            server.send(createSocketRequest("join", roomName, playerID, gameType)); //temp
            resolve(server);
        };

        server.onerror = (error) => {
            // console.log(`WebSocket error: ${error}`);
            server.close();
            reject(error);
        };

        server.onclose = () => {
            // setTimeout( () => {
            //     connect(roomName, playerID);
            //     console.log('reconnecting from onClose');
            // }, 1000)
            resolve(null);
            // this part needs editing ? maybe not
        };
    });
};

const gamePlaySocketServices = {
    createSocketRequest,
    connect,
};

export default gamePlaySocketServices;