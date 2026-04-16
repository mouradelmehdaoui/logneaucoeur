require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// ✅ 1. Middlewares (CORS doit être en PREMIER)
app.use(cors());
app.use(express.json());

// ✅ 2. Connexion MongoDB Stable
// On se connecte UNE SEULE FOIS au démarrage du serveur
const connectDB = async () => {
  try {
    // On force des options de stabilité pour éviter le ENOTFOUND
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("✅ MongoDB Connecté avec succès");
  } catch (err) {
    console.error("❌ Erreur de connexion MongoDB :", err.message);
    // On ne crash pas le serveur immédiatement pour laisser Render nous donner les logs
  }
};

connectDB();

// ✅ 3. Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/distribution', require('./routes/distribution.routes'));

// ✅ 4. Démarrage du serveur (OBLIGATOIRE sur Render)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});

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