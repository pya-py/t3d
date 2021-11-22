import { Sorry } from './../../../tools/notification';
import gameServices from './../../../services/http/gameServices';
import { Status } from '../../../services/configs';

export const EnterLeague = (leagueID) => {
	return async (dispatch) => {
		if (leagueID) {
			try {
				// check laugue object for validty(?)
				const { data, status } = await gameServices.loadLeague(leagueID);
				console.log(data.league);
				if (status === Status.Successful) 
					await dispatch({ type: "ENTER_LEAGUE", payload: data.league });
			} catch (err) {
				Sorry(
					"مشکلی حین ورود به لیگ پیش آمد. لطفا وضعیت اینترنت خود را بررسی کنید."
				);
				// ... toast proper message?
				await dispatch(ExitLeague());
			}
		} else {
			// ...propere message
			await dispatch(ExitLeague());
		}
	};
};

export const ExitLeague = () => {
	return async (dispatch) => {
		await dispatch({ type: "EXIT_LEAGUE" });
	};
};
