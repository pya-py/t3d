import config from "./config.json";

const createSocketRequest = (request, roomName, playerID, msg) =>
    JSON.stringify({
        request,
        roomName,
        playerID,
        msg,
    });

const connect = (roomName, playerID, gameType) => {
    return new Promise((resolve, reject) => {
        var server = new WebSocket(config.webSocketRoot);
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
            // change
            // setTimeout( () => {
            //     connect(roomName, playerID);
            //     console.log('reconnecting from onClose');
            // }, 1000)
            resolve(null);
            // this part needs editing ? maybe not
        };
    });
};

const socketServices = {
    createSocketRequest,
    connect,
};

export default socketServices;