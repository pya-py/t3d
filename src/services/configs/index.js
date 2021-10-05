const ClientRoutes = require('./client');
const ServerRoutes = require('./local');
const Status = require('./status');
const browserStorage = require('./browser');
const GameSetting = require('./gamesetting');
const {Error, OK} = require('../../tools/msgbox');
//all configs
module.exports = {
    browserStorage,
    Routes: { Server: ServerRoutes, Client: ClientRoutes },
    Status,
    GameSetting,
    Devices:{ SmartPhone: 2, Tablet: 1, Desktop: 0 },
    MsgBox: {Error, OK}
}