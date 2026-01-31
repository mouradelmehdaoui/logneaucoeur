const jwt = require("jsonwebtoken");

const secteurs = [
  { name: "Mailliere", login: "mailliere", password: "sabah", image: "mailliere.png" },
  { name: "Centreurbain", login: "centreurbain", password: "dominique", image: "centreurbain.png" },
  { name: "Village", login: "village", password: "catherine", image: "village.png" },
  { name: "Grand Bassin", login: "gdbassin", password: "ramzi", image: "grandbassin.png" },
  { name: "Tourdauvergne", login: "tourdauvergne", password: "jeanmarc", image: "tourdauvergne.png" },
  { name: "Segrais", login: "segrais", password: "mourad", image: "segrais.png" },
];

// controllers/authController.js
exports.login = (req, res) => {
  const { login, password } = req.body;
  const secteur = secteurs.find((s) => s.login === login && s.password === password);

  if (!secteur) return res.status(401).json({ message: "Identifiants invalides" });

  const token = jwt.sign(
    { secteur: secteur.name, sectorId: secteur.login }, // 🔹 sectorId ajouté ici
    process.env.JWT_SECRET || "secret123",
    { expiresIn: "1h" }
  );

  res.json({ token, secteur });
};