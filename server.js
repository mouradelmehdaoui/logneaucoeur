const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// 🔹 CONNEXION MONGODB (Optimisée pour Vercel)
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    throw err; // Crucial pour que Vercel sache que ça a planté
  }
};

// 🔹 INJECTER LA CONNEXION DANS CHAQUE REQUÊTE
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ message: "Erreur de connexion base de données" });
  }
});

// Tes routes ici...
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/distribution', require('./routes/distribution.routes'));

// 🔹 TRÈS IMPORTANT : Export pour Vercel (Pas de app.listen)
module.exports = app;