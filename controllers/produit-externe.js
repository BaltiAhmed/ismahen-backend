const httpError = require("../models/error");

const { validationResult } = require("express-validator");

const produitExterne = require("../models/produit-externe");

const commandeExterne = require("../models/commandeExterne");

const ajoutProduit = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }

  const {
    name,
    categorie,
    poidsNet,
    dateFb,
    quantite,
    prix,
    commandeExterneId,
  } = req.body;

  let existingCommandeExterne;

  try {
    existingCommandeExterne = await commandeExterne.findById(commandeExterneId);
  } catch {
    const error = new httpError("problem", 500);
    return next(error);
  }

  const createdProduit = new produitExterne({
    name,
    categorie,
    poidsNet,
    dateFb,
    quantite,
    prix,
  });

  try {
    await createdProduit.save();
    existingCommandeExterne.produits.push(createdProduit);
    await existingCommandeExterne.save();
  } catch (err) {
    const error = new httpError("failed signup", 500);
    return next(error);
  }
  res.status(201).json({
    produit: createdProduit,
  });
};

exports.ajoutProduit = ajoutProduit
