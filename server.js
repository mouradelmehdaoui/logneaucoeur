require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Connexion MongoDB optimisée pour Vercel (évite les connexions multiples)
let cachedDb = null;
const connectDB = async () => {
  if (cachedDb) return cachedDb;
  
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    cachedDb = db;
    console.log("✅ MongoDB Connecté");
    return db;
  } catch (err) {
    console.error("❌ Erreur DB:", err);
    throw err;
  }
};

// Middleware pour s'assurer que la DB est connectée avant chaque route
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/distribution', require('./routes/distribution.routes'));

// TRÈS IMPORTANT POUR VERCEL
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