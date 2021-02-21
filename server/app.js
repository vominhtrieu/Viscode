require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Folder = require("./models/Folder");

mongoose.connect(process.env.DATABASE_HOST, { useUnifiedTopology: true, useNewUrlParser: true }).then(async () => {
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

app.use("/api/my-files/", require("./routes/file"));
app.get("*", (req, res) => res.sendStatus(404));

app.listen(process.env.PORT, () => {
  console.log("Listening at PORT 5000");
});
