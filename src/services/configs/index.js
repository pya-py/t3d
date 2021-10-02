const ClientRoutes = require('./client');
const ServerRoutes = require('./server');
const Status = require('./status');
const BrowserStorage = require('./browser');
const GameSetting = require('./gamesetting');

//all configs
module.exports = {
    BrowserStorage,
    Routes: { Server: ServerRoutes, Client: ClientRoutes },
    Status,
    GameSetting,
    Device: { SmartPhone: 2, Tablet: 1, Desktop: 0 }
}