const app = require("./express");
const Server = require("./library/Server");

const server = new Server(app);

server.build();

module.exports = server;
