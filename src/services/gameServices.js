import config from './config.json';
import http from './httpService';

const gameServices = {
    saveGame: newGame => {
        return http.post(
            `${config.serverRoot}/${config.gamesRoute}/${config.gameSaveRoute}`,
            JSON.stringify(newGame)
        );
    },
    getAllResults: () => {
        return http.get(`${config.serverRoot}/${config.gamesRoute}`);
    },
};

export default gameServices;