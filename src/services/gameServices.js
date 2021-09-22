import config from "./config.json";
import http from "./httpService";
import userServices from "./userServices";

const gameServices = {
    
    getAllResults: () => {
        return http.get(`${config.serverRoot}/${config.gamesRoute}`);
    },
    loadPlayerData: async (userID) => {
        if (userID) var { data, status } = await userServices.getPlayer(userID);

        return new Promise((resolve, reject) => {
            const STATUS = { SUCCESSFULL: 200 };
            if (userID === null) reject(null);
            if (status === STATUS.SUCCESSFULL) resolve(data.player);
            reject(null); //create a guest profile
        });
    },
};

export default gameServices;
