import { Routes } from "../configs";

import http from "./httpService";

const { Server } = Routes;

const gameServices = {
	getAllGames: () => http.get(`${Server.Root}/${Server.Games}`),
	getMyGames: () => http.get(`${Server.Root}/${Server.Games}/${Server.Mine}`),
	loadLeague: (leagueID) =>
		http.get(`${Server.Root}/${Server.Games}/${Server.Leagues}/${Server.LeaguesList}/${leagueID}`),
	listLeagues: () =>
		http.get(`${Server.Root}/${Server.Games}/${Server.Leagues}`),
	joinLeague: (leagueID, teamID = null) =>
		http.post(
			`${Server.Root}/${Server.Games}/${Server.Leagues}/${Server.LeaguesList}/${leagueID}`,
			JSON.stringify({ teamID })
		),
	createLeague: (password, Mode, title, capacity, prize, deadline) =>
		http.post(
			`${Server.Root}/${Server.Games}/${Server.Leagues}/${Server.NewLeague}`,
			JSON.stringify({ password, title, Mode, deadline, capacity, prize })
		),
};

export default gameServices;
