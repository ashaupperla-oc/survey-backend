const ConfigFetcher = require("../config");
const Express = require("express");
// const Logger = require("./Logger");
const http = require("http");
const fs = require("fs");
const path = require("path");
const { ServerSocket } = require("socket.io");

class Server {
  constructor(app) {
    // Load Config File
    this.config = ConfigFetcher;

    //Creating Web portal
    // var https_options = {
    //     key: fs.readFileSync('./cert/private.key', 'utf8'),
    //     cert: fs.readFileSync('./cert/certificate.crt', 'utf8')
    // };
    // this.http = http.createServer(function (req, res) {
    //     res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    //     res.end();
    // });
    // this.https = https.createServer(https_options, this.server);
    this.http = http.createServer(app);
    // this.server.use("/", require("../express"));
    // this.io = new ServerSocket(this.http);
    // require('../express/socket')(this.io);
  }

  build(token) {
    console.warn("Server is starting");
    console.log("Server started...");
    // this.https.listen(this.config.httpsPort, (data) =>
    //     this.log(`Web HTTPS Server has been started at ${this.config.httpsPort}`)
    // );
    this.http.listen(this.config.httpPort, () =>
      console.log(`Web HTTP Server has been started at ${this.config.httpPort}`)
    );
  }
}

module.exports = Server;
