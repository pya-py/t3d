export const LoadMe = (player) => ({
    type: "LOAD_ME",
    payload: player,
});

export const UpdateMyRecords = () => ({
    type: "UPDATE_ME",
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

export const SetGameID = (gameID) => ({
    type: "SET_GAME_ID",
    payload: gameID,
});

export const UpdateScoreboard = (details) => ({
    type: "UPDATE_SCOREBOARD",
    payload: details ,
});

export const CleanScoreboard = () => ({
    type: "CLEAN_SCOREBOARD",
});
