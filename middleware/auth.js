const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Accès refusé, token manquant" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");
    
    // On attache les infos décodées à req.user
    req.user = {
      secteur: decoded.secteur,
      sectorId: decoded.sectorId // <--- Sera utilisé par la route POST
    };
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalide" });
  }
};