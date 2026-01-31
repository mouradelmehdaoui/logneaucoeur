const router = require("express").Router();
const auth = require("../middleware/auth");

// "DB" temporaire en mémoire
let distributions = [];
let nextId = 1;

// GET distributions pour le secteur connecté (pagination)
router.get("/", auth, (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const sectorDistributions = distributions.filter(d => d.sectorId === req.sectorId);
  const start = (page - 1) * limit;
  const end = start + limit;

  res.json({
    data: sectorDistributions.slice(start, end),
    totalPages: Math.ceil(sectorDistributions.length / limit)
  });
});

// POST création distribution
router.post("/", auth, (req, res) => {
  const newDist = {
    _id: nextId++,
    ...req.body,
    sectorId: req.sectorId
  };
  distributions.push(newDist);
  res.json(newDist);
});

module.exports = router;
