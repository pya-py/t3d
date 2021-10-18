import { Status } from "../../../services/configs";
import chatServices from "../../../services/http/chatServices";
import { Sorry } from "./../../../tools/notification";

// chats and friends
export const LoadMyFriendsChats = () => {
	return async (dispatch) => {
		try {
			var myFriends = [],
				myChats = [];
			const { status, data } = await chatServices.getMyInteractions();
			if (status === Status.Successful) {
				const { interactions } = data;
				if (!(interactions instanceof Array))
					throw new Error("server response is not an array!");
				interactions
					.sort(
						(i1, i2) =>
							new Date(i2.messages[i2.messages.length - 1].date).getTime() -
							new Date(i1.messages[i1.messages.length - 1].date).getTime()
					)
					.forEach((interact) => {
						const { friend, messages, ownerOf } = interact;
						myFriends.push(friend);
						myChats.push({
							with: friend.userID,
							messages: messages.map((msg) =>
								ownerOf === msg.owner
									? {
											me: msg.text,
											friend: null,
											date: msg.date,
									  }
									: {
											me: null,
											friend: msg.text,
											date: msg.date,
									  }
							),
						});
					});
				await dispatch({
					type: "LOAD_FRIENDS",
					payload: myFriends,
				});
				await dispatch({ type: "LOAD_CHATS", payload: myChats });
				// dispatch friends here
				// myChats key-value array: its keys are friendID that is relative to a special chat
			} else throw new Error("Error happened while forming chats list");
		} catch (err) {
			console.log(
				`Loading chats interrupted cause of this error: ${err}`
			);
			//show proper message
			Sorry(
				"حین بارگذاری پیام ها مشکلی پیش آمد. لطفا لحظاتی بعد دوباره تلاش کنید"
			);
			await dispatch({ type: "RESET_FRIENDS" });
			await dispatch({ type: "RESET_CHATS" });
		}
	};
};

export const ResetMyFriendsChats = () => {
	return async (dispatch) => {
		await dispatch({ type: "RESET_FRIENDS" });
		await dispatch({ type: "RESET_CHATS" });
	};
};
