import { combineReducers } from "redux";
import { playerReducer } from "./player";
import { opponentReducer } from "./opponent";
import { roomReducer } from './room';
import { scoreboardReducer } from './scoreboard';
import { toolsReducer } from "./tools";
import { statisticsReducer } from "./statistics";
import { messageReducer } from './message';
import { tokenReducer } from './token';

export const reducers = combineReducers({
    player: playerReducer,
    opponent: opponentReducer,
    room: roomReducer,
    scoreboard: scoreboardReducer,
    tools: toolsReducer,
    statistics: statisticsReducer,
    message: messageReducer,
    token: tokenReducer
});