
export const statisticsReducer = (state = {all: 0, playing: 0}, action) => {
    switch (action.type) {
        case "UPDATE_STATISTICS":
            const {all, playing} = action.payload;
            return {all, playing};
        
        default:
            return state;
    }
};