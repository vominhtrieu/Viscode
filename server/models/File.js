const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("File", schema);
