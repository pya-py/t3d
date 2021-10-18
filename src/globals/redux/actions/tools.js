import { GameSetting } from "../../../services/configs";

export const ReapeatRandomSearch = () => {
	return async (dispatch, getState) => {
		const previous = { ...(getState().tools) };
		previous.randomSearchRepeats = (previous.randomSearchRepeats + 1) % GameSetting.RandomSearchRepeatLimit;
		// randomSearchRepeats === 0 => means nor search is not happening or its happening and has reached to maximum allowed retries
		await dispatch({ type: "UPDATE_TOOLS", payload: previous });
	};
};

export const CloseRandomSearch = () => {
	return async (dispatch, getState) => {
		const previous = { ...(getState().tools) };
		previous.randomSearchRepeats = 0;
		await dispatch({ type: "UPDATE_TOOLS", payload: previous });
	};
};

export const SendFriendRequestTo = (targetID) => {
	return async (dispatch, getState) => {
		const previous = { ...(getState().tools) };
		previous.friendRequestTarget = targetID;
		await dispatch({ type: "UPDATE_TOOLS", payload: previous });
	};
};

export const EndFriendRequest = () => {
	return async (dispatch, getState) => {
		const previous = { ...(getState().tools) };
		previous.friendRequestTarget = null;
		await dispatch({ type: "UPDATE_TOOLS", payload: previous });
	};
};

export const InviteToFriendlyGame = (targetID, gameType) => {
	return async (dispatch, getState) => {
		const previous = { ...(getState().tools) };
		previous.friendlyGameTarget = { targetID, type: gameType };
		await dispatch({ type: "UPDATE_TOOLS", payload: previous });
	};
};

export const EndFriendlyInvitation = () => {
	return async (dispatch, getState) => {
		const previous = { ...(getState().tools) };
		previous.friendlyGameTarget = null;
		await dispatch({ type: "UPDATE_TOOLS", payload: previous });
	};
};

export const RecieveGameInvitation = (ID, name, gameType) => {
	return async (dispatch, getState) => {
		const previous = { ...(getState().tools) };
		previous.gameInvitation = { ID, name, type: gameType };
		await dispatch({ type: "UPDATE_TOOLS", payload: previous });
	};
};

export const RejectGameInvitation = () => {
	return async (dispatch, getState) => {
		const previous = { ...(getState().tools) };
		previous.gameInvitation = null;
		await dispatch({ type: "UPDATE_TOOLS", payload: previous });
	};
};

export const AcceptInvitation = (inviterID, gameType) => {
	return async (dispatch, getState) => {
		const previous = { ...(getState().tools) };
		previous.acceptedGame = { inviterID, type: gameType };
		previous.gameInvitation = null;
		await dispatch({ type: "UPDATE_TOOLS", payload: previous });
	};
};

export const ReloadRecords = () => {
	return async (dispatch, getState) => {
		const previous = { ...(getState().tools) };
		previous.recordReloadTrigger = !previous.reloadTrigger;
		await dispatch({ type: "UPDATE_TOOLS", payload: previous });
	};
};
