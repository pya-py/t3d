//ONLY for class components: purpose: using redux in class components
import { connect } from "react-redux";
import {
    LoadMe,
    LoadOpponent,
    ResetOpponent,
    SetRoom,
    SetGameID,
    UpdateScoreboard,
    CleanScoreboard,
    ResetRoom,
    TriggerRecordUpdate,
    SaveNewToken
    // UpdateStatistics,
    // TriggerOpponentSearch,
    // SendFriendRequestTo,
    // SendMessageTo,
    // RecieveMessageFrom,
    // ResetMessages,
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
        tools: state.tools,
    });

    const mapDispatchToProps = (dispatch) => ({
        LoadMe: (player) => dispatch(LoadMe(player)),
        LoadOpponent: (opponent) => dispatch(LoadOpponent(opponent)),
        ResetOpponent: () => dispatch(ResetOpponent()),
        SetRoom: (room) => dispatch(SetRoom(room)),
        ResetRoom: () => dispatch(ResetRoom()),
        SetGameID: (gameID) => dispatch(SetGameID(gameID)),
        UpdateScoreboard: (details) => dispatch(UpdateScoreboard(details)),
        CleanScoreboard: () => dispatch(CleanScoreboard()),
        TriggerRecordUpdate: () => dispatch(TriggerRecordUpdate()),
        SaveNewToken: () => dispatch(SaveNewToken())
        //for memory managment these are commented because they arent used in Class Components yet
        //UpdateStatistics: (stat) => dispatch(UpdateStatistics(stat)),
        //TriggerOpponentSearch: () => dispatch(TriggerOpponentSearch()),
        //SendFriendRequestTo: () => dispatch(SendFriendRequestTo()),
        //SendMessageTo: (name, friendID, text) => dispatch(SendMessageTo(name, friendID, text)),
        //RecieveMessageFrom: (name, friendID, text) => dispatch(RecieveMessageFrom(name, friendID, text)),
        //ResetMessages: () => dispatch(ResetMessages())
    });
    return connect(mapStateToProps, mapDispatchToProps)(component);
}

export default withReduxDashboard;
// export const useDashboard = connect(mapStateToProps, mapDispatchToProps);
