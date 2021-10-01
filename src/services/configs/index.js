const ClientRoutes = require ('./client');
const ServerRoutes = require ('./local');
const Status = require('./status');
const BrowserStorage = require('./browser');
const GameSetting = require('./gamesetting');

//all configs
module.exports = {
    BrowserStorage,
    Routes: {Server: ServerRoutes, Client: ClientRoutes},
    Status,
    GameSetting,
    Device: {Desktop: 0, Tablet: 1, SmartPhone: 2}
}
