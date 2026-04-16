const router = require("express").Router();
const auth = require("../middleware/auth");
const Distribution = require("../models/Distribution");

// 🟢 GET : Toutes les distributions
router.get("/", auth, async (req, res) => {
  try {
    // Sécurité : si le middleware a laissé passer un user sans sectorId
    if (!req.user?.sectorId) {
      return res.status(400).json({ message: "Le token ne contient pas d'ID de secteur." });
    }

    const query = { sectorId: req.user.sectorId };
    const data = await Distribution.find(query).sort({ createdAt: -1 });

    res.json({ data, totalPages: 1 });
  } catch (err) {
    // On renvoie l'erreur précise pour la voir dans F12 > Network
    res.status(500).json({ message: "Erreur GET", error: err.message });
  }
});

// 🔵 POST : Créer une distribution
router.post("/", auth, async (req, res) => {
  try {
    if (!req.user?.sectorId) {
      return res.status(400).json({ message: "Identification du secteur impossible." });
    }

    const newEntry = new Distribution({
      ...req.body,
      sectorId: req.user.sectorId
    });

    const saved = await newEntry.save();
    res.status(201).json(saved);
  } catch (err) {
    // Si c'est une erreur de validation (champs manquants), on renvoie 400
    res.status(400).json({ message: "Données invalides", error: err.message });
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