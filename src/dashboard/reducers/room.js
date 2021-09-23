export const roomReducer = (state = null, action) => {
    switch (action.type) {
        case "SET_ROOM":
            const {roomName, gameType} = action.payload;
            return {name: roomName, type: gameType};
        // case "SET_GAME_ID":
        //     return action.payload;
        default:
            return state;
    }
};