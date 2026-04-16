const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Charge les variables en haut

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// 🔹 CONNEXION MONGODB (Version Singleton pour Vercel)
let cachedDb = null;

const connectDB = async () => {
  if (cachedDb) return;

  // Si MONGO_URI est absent, on log l'erreur pour débugger dans Vercel
  if (!process.env.MONGO_URI) {
    console.error("❌ Erreur : MONGO_URI est indéfini dans les variables d'environnement.");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Évite de faire attendre le client trop longtemps
    });
    cachedDb = db;
    console.log("✅ MongoDB Connecté");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    // On ne jette pas d'erreur ici pour éviter de bloquer tout le middleware
  }
};

// 🔹 MIDDLEWARE DE CONNEXION
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Routes
// Vérifie bien que les chemins vers tes fichiers routes sont exacts (attention aux majuscules)
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/distribution', require('./routes/distribution.routes'));

// Route de test pour vérifier que le backend répond
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", db: mongoose.connection.readyState === 1 ? "connected" : "disconnected" });
});

module.exports = app;

// MODE TEST CE DOUSSOUS :

// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const authRoutes = require("./routes/auth.routes");
// const distributionRoutes = require("./routes/distribution.routes");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/distribution", distributionRoutes);

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));