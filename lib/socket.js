var include = require("includemvc");
var app = include.app();
var io = require("socket.io");

module.exports = function(server) {
  var sio = io.listen(server, {log: true});

  sio.sockets.on("connection", function(socket) {
    /**
     * Define events here
     
    app.on("group:event", function(data) {
        socket.emit("group:event", data);
    })
    
    */
  })
}