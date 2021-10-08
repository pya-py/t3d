//ONLY for class components: purpose: using redux in class components
import { connect } from "react-redux";
import { UpdateScoreboard, CleanScoreboard } from "./actions/game";
import { LoadThisPlayer, ResetOpponent } from "./actions/player";
import { EnterRoom, ExitRoom } from "./actions/game";
// useSelector for functional components
// state==>props : redux

function withReduxDashboard(component) {
	const mapStateToProps = (state) => ({
		me: state.me,
		opponent: state.opponent,
		room: state.room,
		scoreboard: state.scoreboard,
		tools: state.tools,
	});

	const mapDispatchToProps = (dispatch) => ({
		LoadThisPlayer: (userID) => dispatch(LoadThisPlayer(userID)),
		ResetOpponent: () => dispatch(ResetOpponent()),
		EnterRoom: (room) => dispatch(EnterRoom(room)),
		ExitRoom: () => dispatch(ExitRoom()),
		// SetGameID: (gameID) => dispatch(SetGameID(gameID)),
		UpdateScoreboard: (details) => dispatch(UpdateScoreboard(details)),
		CleanScoreboard: () => dispatch(CleanScoreboard()),
	});
	return connect(mapStateToProps, mapDispatchToProps)(component);
}

export default withReduxDashboard;
