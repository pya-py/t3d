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

export const InviteToFriendlyGame = (targetID) => {
	return async (dispatch, getState) => {
		const previous = { ...getState() };
		previous.friendlyGameTarget = targetID;
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

export const RecieveGameInvitation = (ID, name) => {
	return async (dispatch, getState) => {
		const previous = { ...getState() };
		previous.gameInvitation = { ID, name };
		await dispatch({ type: "UPDATE_TOOLS", payload: previous });
	};
};

export const RejectGameInvitation = (ID, name) => {
	return async (dispatch, getState) => {
		const previous = { ...getState() };
		previous.gameInvitation = null;
		await dispatch({ type: "UPDATE_TOOLS", payload: previous });
	};
};

export const AcceptInvitation = (invitorID) => {
	return async (dispatch, getState) => {
		const previous = { ...getState() };
		previous.acceptedInviter = invitorID;
		previous.gameInvitation = null;
		await dispatch({ type: "UPDATE_TOOLS", payload: previous });
	};
};

// reject invitation by nulling the field
