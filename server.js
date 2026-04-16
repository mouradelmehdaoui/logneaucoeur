require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// 1️⃣ MIDDLEWARES
app.use(cors());
app.use(express.json());

console.log("--- Démarrage du Backend ---");
console.log("Vérification du lien MongoDB :", process.env.MONGO_URI ? "Lien trouvé (OK)" : "Lien MANQUANT (Vérifie ton .env)");

// 2️⃣ FONCTION DE CONNEXION AVEC LOGS CONSOLE
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    // On force une petite attente pour être sûr de l'état
    const db = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    
    isConnected = !!db.connections[0].readyState;
    
    if (isConnected) {
        console.log("✅ [DATABASE] Connexion établie avec succès !");
    }
  } catch (err) {
    console.error("❌ [DATABASE] Erreur critique de connexion :");
    console.error(err.message);
  }
};

// 3️⃣ MIDDLEWARE POUR FORCER LA CONNEXION AVANT CHAQUE ROUTE
app.use(async (req, res, next) => {
  if (!isConnected) {
      await connectDB();
  }
  next();
});

// 4️⃣ ROUTES
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/distribution', require('./routes/distribution.routes'));

// Route de test rapide (Tape http://localhost:5000/api/status dans ton navigateur)
app.get("/api/status", (req, res) => {
  res.json({ 
    message: "Serveur actif", 
    mongodb: isConnected ? "CONNECTÉ ✅" : "DÉCONNECTÉ ❌" 
  });
});

// 5️⃣ LANCEMENT LOCAL (Pour voir les messages dans ta console VS Code)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, async () => {
    console.log(`🚀 [SERVER] Lancé sur le port ${PORT}`);
    // On lance la connexion immédiatement au démarrage en local
    await connectDB();
  });
}

// 6️⃣ EXPORT VERCEL
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