//ONLY for class components: purpose: using redux in class components
import { connect } from "react-redux";
import {
    LoadMe,
    UpdateMyRecords,
    LoadOpponent,
    ResetOpponent,
    SetRoom,
    SetGameID,
    UpdateScoreboard,
    CleanScoreboard,
    ResetRoom,
    TriggerRecordUpdate,
    UpdateStatistics,
    TriggerOpponentSearch
} from "./actions";
// ***** remove the ones that arent used in class components => for memory management/ not necessary though
// useSelector for functional components
// state==>props : redux

function withReduxDashboard(component) {
    const mapStateToProps = (state) => ({
        player: state.player,
        opponent: state.opponent,
        room: state.room,
        scoreboard: state.scoreboard,
        tools: state.tools
    });

    const mapDispatchToProps = (dispatch) => ({
        LoadMe: (player) => dispatch(LoadMe(player)),
        LoadOpponent: (opponent) => dispatch(LoadOpponent(opponent)),
        UpdateMyRecords: () => dispatch(UpdateMyRecords()),
        ResetOpponent: () => dispatch(ResetOpponent()),
        SetRoom: (room) => dispatch(SetRoom(room)),
        ResetRoom: () => dispatch(ResetRoom()),
        SetGameID: (gameID) => dispatch(SetGameID(gameID)),
        UpdateScoreboard: (details) => dispatch(UpdateScoreboard(details)),
        CleanScoreboard: () => dispatch(CleanScoreboard()),
        TriggerRecordUpdate: () => dispatch(TriggerRecordUpdate()),
        UpdateStatistics: (stat) => dispatch(UpdateStatistics(stat)),
        TriggerOpponentSearch: () => dispatch(TriggerOpponentSearch())
    });
    return connect(mapStateToProps, mapDispatchToProps)(component);
}

export default withReduxDashboard;
// export const useDashboard = connect(mapStateToProps, mapDispatchToProps);
