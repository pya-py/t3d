export const playerReducer = (state = null, action) => {
    switch (action.type) {
        case "LOAD_ME":
            return action.payload;
        case "SIGN_OUT": {
            sessionStorage.clear();
            return null;
        }

        default:
            return state;
    }
};
