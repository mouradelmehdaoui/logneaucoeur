const jwt = require("jsonwebtoken");

// Liste des secteurs + login/mdp
const secteurs = [
  { name: "Mailliere", login: "mailliere", password: "sabah", sectorId: 1 },
  { name: "Centreurbain", login: "centreurbain", password: "dominique", sectorId: 2 },
  { name: "Village", login: "village", password: "catherine", sectorId: 3 },
  { name: "Grand Bassin", login: "gdbassin", password: "ramzi", sectorId: 4 },
  { name: "Tourdauvergne", login: "tourdauvergne", password: "jeanmarc", sectorId: 5 },
  { name: "Segrais", login: "segrais", password: "mourad", sectorId: 6 },
];

const login = (req, res) => {
  const { login, password } = req.body;

  const user = secteurs.find(s => s.login === login && s.password === password);

  if (!user) return res.status(401).json({ message: "Login ou mot de passe incorrect" });

  const token = jwt.sign(
    { secteur: user.name, sectorId: user.sectorId },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token, secteur: user.name, sectorId: user.sectorId });
};

module.exports = { login };
