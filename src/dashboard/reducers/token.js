import { browserStorage } from "../../services/configs";

export const tokenReducer = (state = null, action) => {
    switch (action.type) {
        case "SAVE_TOKEN":
            return browserStorage.TOKEN();
        // case "RESET_TOKEN":
        //     return null;
        default:
            return state;
    }
};