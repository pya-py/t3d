export const toolsReducer = (state = {updateTriggered: false, opponentSearchTriggered: false}, action) => {
    switch (action.type) {
        case "TRIGGER_UPDATE":
            return {updateTriggered: !state.updateTriggered, opponentSearchTriggered: state.opponentSearchTriggered}; //trigger update
        case "TRIGGER_OPPONENT_SEARCH":
            return {updateTriggered: state.updateTriggered, opponentSearchTriggered: !state.opponentSearchTriggered}; //trigger search
        default:
            return state;
    }
};