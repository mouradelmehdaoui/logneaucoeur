exports.getDistributions = async (req, res) => {
  const secteur = req.secteur;
  const distributions = await Distribution.find({ secteur });
  res.json(distributions);
};
