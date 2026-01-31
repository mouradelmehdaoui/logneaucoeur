const mongoose = require("mongoose");

const distributionSchema = new mongoose.Schema({
  sectorId: { type: mongoose.Schema.Types.ObjectId, ref: "Sector" },
  binome: String,
  adresseDistribuees: String,
  adresseNonDistribuee: String,
  statut: String,
  datePlanification: String,
  etatAvance: String
}, { timestamps: true });

module.exports = mongoose.model("Distribution", distributionSchema);
