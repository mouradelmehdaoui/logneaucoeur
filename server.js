require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// 1. Configuration CORS
app.use(cors());
app.use(express.json());

// 2. Connexion MongoDB (une seule fois au démarrage)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connecté avec succès sur le Cluster sbil3e6"))
  .catch(err => {
    console.error("❌ Erreur de connexion MongoDB :", err.message);
    process.exit(1);
  });

// 3. Tes routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/distribution', require('./routes/distribution.routes'));

// 4. Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur en ligne sur le port ${PORT}`);
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