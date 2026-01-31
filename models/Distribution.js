const mongoose = require("mongoose");

const DistributionSchema = new mongoose.Schema({
  binome: { type: String, required: true },
  adresseDistribuees: { type: String },
  statut: { type: String, default: "en cours" },
  adresseNonDistribuee: { type: String },
  datePlanification: { type: Date },
  etatAvance: { type: String },
  secteur: { type: String }, // Le nom (ex: "Mailliere")
  sectorId: { type: String, required: true } // Le login (ex: "mailliere")
});

module.exports = mongoose.model("Distribution", DistributionSchema);