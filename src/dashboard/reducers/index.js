import { combineReducers } from "redux";
import { playerReducer } from "./player";
import { opponentReducer } from "./opponent";
import { roomReducer } from './room';
import { scoreboardReducer } from './scoreboard';

export const reducers = combineReducers({
    player: playerReducer,
    opponent: opponentReducer,
    room: roomReducer,
    scoreboard: scoreboardReducer
});
