export const roomReducer = (state = null, action) => {
    switch (action.type) {
        case "SET_ROOM":
            return action.payload;
        // case "SET_GAME_ID":
        //     return action.payload;
        default:
            return state;
    }
};