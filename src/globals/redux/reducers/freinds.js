export const friendsReducer = (state = [], action) => {
    switch (action.type) {
        case "LOAD_FRIENDS":
            return [...action.payload];
        case "RESET_FRIENDS":
            return [];
        default:
            return state;
    }
};
