import { Routes } from "../configs";

import http from "./httpService";

const { Server } = Routes;

const gameServices = {
	getAllGames: () => {
		return http.get(`${Server.Root}/${Server.Games}`);
	},
	getMyGames: () => {
		return http.get(`${Server.Root}/${Server.Games}/${Server.Mine}`);
	}
};

export default gameServices;
