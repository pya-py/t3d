import config from './config.json';
import http from './httpService';

const gameServices = {
    saveGame: newGame => {
        return http.post(
            `${config.localRoot}/${config.gamesRoute}/${config.gameSaveRoute}`,
            JSON.stringify(newGame)
        );
    },
    getAllResults: () => {
        return http.get(`${config.localRoot}/${config.gamesRoute}`);
    },
};

export default gameServices;