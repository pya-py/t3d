import { combineReducers } from "redux";
import { meReducer } from "./me";
import { opponentReducer } from "./opponent";
import { roomReducer } from './room';
import { scoreboardReducer } from './scoreboard';
import { toolsReducer } from "./tools";
import { statisticsReducer } from "./statistics";
import { messageReducer } from './message';
import { chatsReducer } from './chats';
import { friendsReducer } from './freinds';

export const reducers = combineReducers({
    me: meReducer,
    opponent: opponentReducer,
    room: roomReducer,
    scoreboard: scoreboardReducer,
    tools: toolsReducer,
    statistics: statisticsReducer,
    message: messageReducer,
    chats: chatsReducer,
    friends: friendsReducer
});