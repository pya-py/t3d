export const EnterRoom = (room) => {
	return async (dispatch) => {
		await dispatch({
			type: "ENTER_ROOM",
			payload: room,
		});
	};
};

export const ExitRoom = () => {
	return async (dispatch) => {
		await dispatch({
			type: "EXIT_ROOM",
		});
	};
};

export const CleanScoreboard = () => {
	return async (dispatch) => {
		await dispatch({ type: "CLEAN_SCOREBOARD" });
	};
};

export const UpdateScoreboard = (details) => {
	return async (dispatch) => {
		await dispatch({
			type: "UPDATE_SCOREBOARD",
			payload: details,
		});
	};
};

/*export const SetGameID = (gameID) => {
	return async (dispatch) => {
		await dispatch({
			type: "SET_GAME_ID",
			payload: gameID,
		});
	};
};*/
