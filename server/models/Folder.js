const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  folders: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Folder",
    },
  ],
  files: [
    {
      type: mongoose.Types.ObjectId,
      ref: "File",
    },
  ],
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Folder", schema);
