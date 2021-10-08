export const chatsReducer = (state = [], action) => {
	switch (action.type) {
		case "LOAD_CHATS":
			// use a copy of?
			return [...action.payload];
		case "RESET_CHATS":
			//... what to do?
			return [];
		default:
			return state;
	}
};
