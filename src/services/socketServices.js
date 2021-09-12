import config from "./config.json";

const createSocketRequest = (request, roomName, playerID, msg) =>
    JSON.stringify({
        request,
        roomName,
        playerID,
        msg,
    });

const connect = (roomName, playerID) => {
    return new Promise((resolve, reject) => {
        var server = new WebSocket(config.webSocketRoot);
        console.log(roomName);
        server.onopen = () => {
            server.send(createSocketRequest("join", roomName, playerID, null));
            resolve(server);
        };

        server.onerror = (error) => {
            // console.log(`WebSocket error: ${error}`);
            reject(error);
        };

        server.onclose = () => {
            // change
            resolve(null);
        };
    });
};

const socketServices = {
    createSocketRequest,
    connect,
};

export default socketServices;
