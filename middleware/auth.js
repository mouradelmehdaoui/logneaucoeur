const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Accès refusé, token manquant" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // DEBUG : Vérifie ce qui sort du token dans tes logs Vercel
    console.log("Token décodé :", decoded);

    req.user = {
      // On s'assure de prendre l'ID, peu importe son nom dans le token
      sectorId: decoded.sectorId || decoded.id || decoded._id 
    };

    if (!req.user.sectorId) {
       console.error("❌ sectorId manquant dans le token !");
    }

    next();
  } catch (err) {
    console.error("❌ Erreur JWT :", err.message);
    res.status(401).json({ message: "Token invalide" });
  }
};