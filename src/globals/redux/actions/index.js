export const LoadMe = (player) => ({
    type: "LOAD_ME",
    payload: player,
});

export const SaveNewToken = () => ({
    type: "SAVE_TOKEN",
});

export const TriggerRecordUpdate = () => ({
    type: "TRIGGER_UPDATE",
});

export const SignOut = () => ({
    type: "SIGN_OUT",
});

export const LoadOpponent = (opponent) => ({
    type: "LOAD_OPPONENT",
    payload: opponent,
});

export const ResetOpponent = () => ({
    type: "RESET_OPPONENT",
});

export const SetRoom = (room) => ({
    type: "SET_ROOM",
    payload: room,
});
export const ResetRoom = () => ({
    type: "RESET_ROOM",
});
export const SetGameID = (gameID) => ({
    type: "SET_GAME_ID",
    payload: gameID,
});

export const UpdateScoreboard = (details) => ({
    type: "UPDATE_SCOREBOARD",
    payload: details,
});

export const CleanScoreboard = () => ({
    type: "CLEAN_SCOREBOARD",
});

export const UpdateStatistics = (statistics) => ({
    type: "UPDATE_STATISTICS",
    payload: statistics,
});

export const TriggerOpponentSearch = () => ({
    type: "TRIGGER_OPPONENT_SEARCH",
});

export const SendFriendRequestTo = (targetID) => ({
    type: "SEND_FRIEND_REQUEST",
    payload: targetID,
});

export const SendMessageTo = (name, friendID, text) => ({
    type: "SEND_MESSAGE",
    payload: { name, friendID, text },
});

export const RecieveMessageFrom = (name, friendID, text) => ({
    type: "RECIEVE_MESSAGE",
    payload: { name, friendID, text },
});

export const MessagePushed = () => ({
    type: "MEESAGE_PUSHED",
});
export const ResetMessages = () => ({
    type: "RESET_MESSAGES",
});
