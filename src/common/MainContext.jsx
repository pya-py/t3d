import { createContext } from "react";
// 1. write <MainContext.Provider> for MainContext in Database reader
// 2. use consumer for state, in ScoresTable.jsx for gathering live and final match results
const MainContext = createContext({
    player: null,
    signOutPlayer: () => {},
    gatherPlayerData: () => {}
});

export default MainContext;