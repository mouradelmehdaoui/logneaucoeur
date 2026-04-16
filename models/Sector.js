const mongoose = require("mongoose");

const sectorSchema = new mongoose.Schema({
  name: String,
  login: String,
  password: String,
  image: String,
});

module.exports = mongoose.model("Sector", sectorSchema);
