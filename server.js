//npm install websocket
var WebSocketServer = require('websocket').server;
const express = require('express');
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http, { cors: { origin: '*' } });

var path = require('path');

http.listen(5000, function () {
  console.log('Server is listening on port 5000');
});


app.use("/", express.static("./public"))


io.on("connection", function (socket) {
  console.log(socket.id)
})

var wsServer = new WebSocketServer({
  httpServer: http,
  autoAcceptConnections: false
});

var msg = "null";

wsServer.on('request', function (request) {
  //console.log(request)

  var connection = request.accept(null, request.origin)
  if (connection.remoteAddresses[0] === "::ffff:192.168.1.14") {

    connection.on('message', function (message) {
      if (message.type === 'utf8') {
        if (message.utf8Data !== "/") {
          console.log(message.utf8Data);
          msg = message.utf8Data
        } else {
          connection.sendUTF(msg);
          console.log("esp 32" + msg)
        }

      }
      else if (message.type === 'binary') {
        console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
        connection.sendBytes(message.binaryData);
      }
    });



    connection.on('close', function (reasonCode, description) {
      console.log(' Peer ' + connection.remoteAddress + ' disconnected.');
    });
  }
});