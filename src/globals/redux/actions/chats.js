
export const UpdateMyChatList = (name, friendID, text, { sent, recieved }) => {
	// one time u load from server, then new messages are simply pushed to previous data
	return async (dispatch, getState) => {
		try {
			const previous = [...getState().chats];
			// is it ok to use by refrence ?
			console.log("recieve update");
			previous.find(chat => chat.with === friendID).messages.push({
				name: name, //is name needed?
				me: sent ? text : null,
				friend: recieved ? text : null,
				date: new Date(),
			});
			await dispatch({
				type: "LOAD_CHATS",
				payload: previous,
			});
		} catch (err) {
			console.log(err);
			//..propeer message
			// ...reset?
		}
	};
};
/*
// load all chats
export const LoadMyChats = () => {
	return async (dispatch) => {
		try {
			const { status, data } = await chatServices.getMyChats();
			if (status === Status.Successful) {
				const {myChats} = data;
				console.log(myChats);
				const chats = myChats.map((chat) => {
					const { ownerOf, friendID, messages } = chat;
					return {
						with: friendID,
						messages: messages.map((msg) =>
							ownerOf === msg.owner
								? { me: msg.text, friend: null, date: msg.date }
								: { me: null, friend: msg.text, date: msg.date }
						),
					};
				});

				await dispatch({ type: "LOAD_CHATS", payload: chats });
				// dispatch friends here
				// chats key-value array: its keys are friendID that is relative to a special chat
				await dispatch({ type: "LOAD_FRIENDS", payload: chats });
			} else throw new Error("Error happened while forming chats list");
		} catch (err) {
			console.log(
				`Loading chats interrupted cause of this error: ${err}`
			);
			//show proper message
			Sorry(
				"حین بارگذاری پیام ها مشکلی پیش آمد. لطفا لحظاتی بعد دوباره تلاش کنید"
			);
			await dispatch({ type: "RESET_CHATS" });
			await dispatch({ type: "RESET_FRIENDS" });
		}
	};
};*/