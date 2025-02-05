const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow frontend requests
    methods: ["GET", "POST"],
  },
});

app.use(cors());

app.get("/", (req, res) => res.send("Chatbot Server Running..."));

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("user_message", (msg) => {
    console.log("User:", msg);
    const botReply = `Bot: I received "${msg}"`;
    io.emit("bot_reply", botReply);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(5000, () => console.log("Server running on port 5000"));