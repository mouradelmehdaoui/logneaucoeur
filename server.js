const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // 🔹 Importation manquante
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const distributionRoutes = require("./routes/distribution.routes");

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 CONNEXION À MONGODB
// Remplace l'URL par la tienne si tu utilises MongoDB Atlas
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/logneaucoeur";

mongoose.connect(mongoURI)
  .then(() => console.log("✅ Connexion à MongoDB réussie !"))
  .catch((err) => console.error("❌ Erreur de connexion MongoDB :", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/distribution", distributionRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));