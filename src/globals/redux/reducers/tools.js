export const toolsReducer = (
	state = {
		randomSearchTriggered: false,
		friendRequestTarget: null,
		friendlyGameTarget: null,
		gameInvitation: null,
		acceptedGame: null,
	},
	action
) => {
	switch (action.type) {
		case "UPDATE_TOOLS":
			return { ...action.payload };
		default:
			return state;
	}
};
