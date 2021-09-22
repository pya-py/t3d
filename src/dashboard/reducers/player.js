export const playerReducer = (state = null, action) => {
    switch (action.type) {
        case "LOAD_ME":
            return action.payload;

        case "UPDATE_ME":
            return null; //sets state.player => null, forces Mainlayout to reload and update state.player data

        case "SIGN_OUT": {
            sessionStorage.clear();
            return null;
        }

        default:
            return state;
    }
};
