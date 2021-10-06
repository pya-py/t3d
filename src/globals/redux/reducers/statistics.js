
export const statisticsReducer = (state = {players: 0, games: 0}, action) => {
    switch (action.type) {
        case "UPDATE_STATISTICS":
            const {players, games} = action.payload;
            return {players, games};
        
        default:
            return state;
    }
};