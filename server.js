const express = require("express");
const app = express();
const http = require("http").createServer(app);
const port = 3000;

http.listen(port, () => {
  console.log(`responding from port ${port}`);
});

//using middleware for accessing static files

app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//using socket
const io = require("socket.io")(http);
io.on("connection", (socket) => {
  console.log("connection established");
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});
