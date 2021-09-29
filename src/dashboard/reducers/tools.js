export const toolsReducer = (
    state = {
        updateTriggered: false,
        opponentSearchTriggered: false,
        friendRequest: false,
    },
    action
) => {
    switch (action.type) {
        case "TRIGGER_UPDATE":
            return {
                updateTriggered: !state.updateTriggered,
                opponentSearchTriggered: state.opponentSearchTriggered,
                friendRequest: null,
            }; //trigger update
        case "TRIGGER_OPPONENT_SEARCH":
            return {
                updateTriggered: state.updateTriggered,
                opponentSearchTriggered: !state.opponentSearchTriggered,
                friendRequest: null,
            }; //trigger search
        case "SEND_FRIEND_REQUEST":
            return {
                updateTriggered: state.updateTriggered,
                opponentSearchTriggered: state.opponentSearchTriggered,
                friendRequest: action.payload,
            };
        default:
            return state;
    }
};
