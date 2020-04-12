const Server = require('boardgame.io/server').Server;
const Sheepshead = require('./Sheepshead').Sheepshead;
const server = Server({ games: [Sheepshead] });
server.run(8000);
