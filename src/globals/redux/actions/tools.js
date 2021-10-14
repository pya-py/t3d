export const TriggerRandomSearch = () => {
	return async (dispatch, getState) => {
		const previous = { ...getState() };
		previous.randomSearchTriggered = !previous.randomSearchTriggered;
		await dispatch({ type: "UPDATE_TOOLS", payload: previous });
	};
};

export const SendFriendRequestTo = (targetID) => {
	return async (dispatch, getState) => {
		const previous = { ...getState() };
		previous.friendRequestTarget = targetID;
		await dispatch({ type: "UPDATE_TOOLS", payload: previous });
	};
};

export const EndFriendRequest = () => {
	return async (dispatch, getState) => {
		const previous = { ...getState() };
		previous.friendRequestTarget = null;
		await dispatch({ type: "UPDATE_TOOLS", payload: previous });
	};
};

export const InviteToFriendlyGame = (targetID, gameType) => {
	return async (dispatch, getState) => {
		const previous = { ...getState() };
		previous.friendlyGameTarget = { targetID, type: gameType };
		await dispatch({ type: "UPDATE_TOOLS", payload: previous });
	};
};

export const EndFriendlyInvitation = () => {
	return async (dispatch, getState) => {
		const previous = { ...getState() };
		previous.friendlyGameTarget = null;
		await dispatch({ type: "UPDATE_TOOLS", payload: previous });
	};
};

export const RecieveGameInvitation = (ID, name, gameType) => {
	return async (dispatch, getState) => {
		const previous = { ...getState() };
		previous.gameInvitation = { ID, name, type: gameType };
		await dispatch({ type: "UPDATE_TOOLS", payload: previous });
	};
};

export const RejectGameInvitation = () => {
	return async (dispatch, getState) => {
		const previous = { ...getState() };
		previous.gameInvitation = null;
		await dispatch({ type: "UPDATE_TOOLS", payload: previous });
	};
};

export const AcceptInvitation = (inviterID, gameType) => {
	return async (dispatch, getState) => {
		const previous = { ...getState() };
		previous.acceptedGame = {inviterID, type: gameType};
		previous.gameInvitation = null;
		await dispatch({ type: "UPDATE_TOOLS", payload: previous });
	};
};

// reject invitation by nulling the field
