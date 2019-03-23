var express = require("express");
var app = express();
var server = app.listen(3001);
app.use(express.static("public"));
console.log("Server is running");
var socket = require("socket.io");
var io = socket(server);
var sellers = [];
var bidLogs = {};
io.sockets.on("connection", socket => {
  socket.emit("getSellers", { sellers: sellers });
  socket.on("createSeller", data => {
    sellers.push(data.name);
    socket.join(data.name);
    bidLogs[data.name] = [];
    io.emit("updateSellers", { sellers: sellers });
    console.log(data.name + " joined");
  });

  socket.on("joinSeller", data => {
    var rooms = Object.keys(socket.rooms);
    if (rooms.length > 1) {
      console.log(`${socket.id} left room ${rooms[1]}`);
      socket.leave(rooms[1]);
    }
    socket.join(data.seller);

    console.log(rooms);
    socket.emit("getBids", bidLogs[data.seller]);
    console.log(`${socket.id} joined room ${data.seller}`);
  });

  socket.on("logBid", data => {
    console.log(
      `${data.bid.bid} from ${data.bid.buyer} in room ${data.bid.seller}`
    );
    io.in(data.bid.seller).emit("newBid", data);
    bidLogs[data.bid.seller].push(data.bid);
  });
});
