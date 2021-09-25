export const toolsReducer = (state = {trigger: false}, action) => {
    switch (action.type) {
        case "TRIGGER_UPDATE":
            return {trigger: !state.trigger}; //trigger update
        default:
            return state;
    }
};