export const messageReducer = (
    state = { sent: null, recieved: null },
    action
) => {
    switch (action.type) {
        case "RECIEVE_MESSAGE": {
            const { friendID, name, text } = action.payload;
            return {
                recieved: { name, friendID, text, pushed: false },
                sent: state.sent,
            };
        }
        case "SEND_MESSAGE": {
            const { friendID, name, text } = action.payload;
            console.log("payload", action.payload);
            return { sent: { name, friendID, text }, recieved: state.recieved };
        }
        case "MEESAGE_PUSHED":
            if (state.recieved) state.recieved.pushed = true;
            return state;
        case "RESET_MESSAGES":
            return { sent: null, recieved: null };
        default:
            return state;
    }
};
