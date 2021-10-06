export const roomReducer = (state = {name: null, type: null}, action) => {
    switch (action.type) {
        case "SET_ROOM":
            const {name, type} = action.payload;            
            return {name, type};
        // case "SET_GAME_ID":
        //     return action.payload;
        case "RESET_ROOM":
            return {name: null, type: null}
        default:
            return state;
    }
};