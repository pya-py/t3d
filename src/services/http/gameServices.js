import { Routes, Status } from '../configs';

import http from "./httpService";
import userServices from "./userServices";

const {Server} = Routes;

const gameServices = {
    
    getAllGames: () => {
        return http.get(`${Server.Root}/${Server.Games}`);
    },
    getMyGames: () => {
        return http.get(`${Server.Root}/${Server.Games}/${Server.Mine}`);
    },
    loadPlayerData: async(userID) => {
        if (userID) var { data, status } = await userServices.getPlayer(userID);

        return new Promise((resolve, reject) => {
            if (userID === null) reject(null);
            if (status === Status.Successful) resolve(data.player);
            reject(null); //create a guest profile
        });
    },
};

export default gameServices;