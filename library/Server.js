<<<<<<< HEAD
const ConfigFetcher = require("../config");
const Express = require("express");
// const Logger = require("./Logger");
const http = require("http");
const fs = require("fs");
=======
const ConfigFetcher = require('../config');
const Express = require("express");
// const Logger = require("./Logger");
const http = require("http");
const fs = require('fs');
>>>>>>> c0a177c2caff4a23864972e4d134ffb95e0e6879
const path = require("path");
const { ServerSocket } = require("socket.io");

class Server {
<<<<<<< HEAD
  constructor() {
    // Load Config File
    this.config = ConfigFetcher;

    //Creating Web portal
    // var https_options = {
    //     key: fs.readFileSync('./cert/private.key', 'utf8'),
    //     cert: fs.readFileSync('./cert/certificate.crt', 'utf8')
    // };
    this.server = Express();
    // this.http = http.createServer(function (req, res) {
    //     res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    //     res.end();
    // });
    // this.https = https.createServer(https_options, this.server);
    this.http = http.createServer(this.server);
    this.server.use("/", require("../express"));
    // this.io = new ServerSocket(this.http);
    // require('../express/socket')(this.io);
  }

  build(token) {
    console.warn("Server is starting");
    console.log("Server started...");
=======

  constructor(){

        // Load Config File
        this.config = ConfigFetcher;

        //Creating Web portal
        // var https_options = {
        //     key: fs.readFileSync('./cert/private.key', 'utf8'),
        //     cert: fs.readFileSync('./cert/certificate.crt', 'utf8')
        // };
        this.server = Express();
        // this.http = http.createServer(function (req, res) {
        //     res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
        //     res.end();
        // });
        // this.https = https.createServer(https_options, this.server);
        this.http = http.createServer(this.server);
        this.server.use('/', require('../express'));
        // this.io = new ServerSocket(this.http);
        // require('../express/socket')(this.io);

    }

  build(token){
    console.warn('Server is starting');
    console.log('Server started...');
>>>>>>> c0a177c2caff4a23864972e4d134ffb95e0e6879
    // this.https.listen(this.config.httpsPort, (data) =>
    //     this.log(`Web HTTPS Server has been started at ${this.config.httpsPort}`)
    // );
    this.http.listen(this.config.httpPort, () =>
<<<<<<< HEAD
      console.log(`Web HTTP Server has been started at ${this.config.httpPort}`)
=======
        console.log(`Web HTTP Server has been started at ${this.config.httpPort}`)
>>>>>>> c0a177c2caff4a23864972e4d134ffb95e0e6879
    );
  }
}

module.exports = Server;
