const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("File", schema);
