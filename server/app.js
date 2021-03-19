require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Folder = require("./models/Folder");
const http = require("http").createServer(app);
const socketIo = require("socket.io");

mongoose
  .connect(process.env.DATABASE_HOST, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(async () => {
    try {
      const folder = await Folder.findOne({ name: "root" });
      if (!folder) await Folder.create({ name: "root" });
      console.log("Connected to database");
    } catch (err) {
      console.log("Error: ", err);
    }
  });

app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
  })
);
app.use(express.json());
app.use(cookieParser());

const io = socketIo(http, {
  cors: {
    origin: process.env.ORIGIN,
  },
});

io.on("connection", (socket) => {
  socket.join("test-room");
  socket.on("eventTriggered", (event) => {
    socket.to("test-room").emit("eventMirrored", event);
  });

  socket.on("disconnect", (evt) => {});
});

app.use("/api/my-files/", require("./routes/file"));
app.use("/api/user/", require("./routes/auth"));
app.get("*", (req, res) => res.sendStatus(404));

http.listen(process.env.PORT, () => {
  console.log("Listening at PORT 5000");
});
