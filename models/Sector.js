const mongoose = require("mongoose");

const sectorSchema = new mongoose.Schema({
  name: String,
  login: String,
  password: String,
  image: String,
  role: {
    type: String,
    enum: ["admin", "responsable"],
    default: "responsable"
  }
});

module.exports = mongoose.model("Sector", sectorSchema);
