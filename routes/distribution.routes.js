const router = require("express").Router();
const auth = require("../middleware/auth");
const Distribution = require("../models/Distribution");

// 🟢 GET : Toutes les distributions DU SECTEUR CONNECTÉ
router.get("/", auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    // On filtre impérativement par sectorId pour que chaque secteur voit son tableau
    const query = { sectorId: req.user.sectorId };

    const data = await Distribution.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Distribution.countDocuments(query);

    res.json({
      data,
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
  }
});

// 🔵 POST : Créer une nouvelle distribution
router.post("/", auth, async (req, res) => {
  try {
    const newEntry = new Distribution({
      ...req.body,
      sectorId: req.user.sectorId // Injecté par le token
    });
    const saved = await newEntry.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Erreur ajout", error: err.message });
  }
});

// 🟡 PUT : Modifier une distribution
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Distribution.findOneAndUpdate(
      { _id: req.params.id, sectorId: req.user.sectorId }, // Sécurité : on vérifie que c'est le bon secteur
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Erreur modification", error: err.message });
  }
});

// 🔴 DELETE : Supprimer une distribution
router.delete("/:id", auth, async (req, res) => {
  try {
    await Distribution.findOneAndDelete({ _id: req.params.id, sectorId: req.user.sectorId });
    res.json({ message: "Supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur suppression", error: err.message });
  }
});

module.exports = router;