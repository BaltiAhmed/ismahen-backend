const httpError = require("../models/error");

const { validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");

const commandeExterne = require("../models/commandeExterne");
const fournisseur = require('../models/fournisseur');
const magasinier = require("../models/magasinier");

const ajoutcommandeExterne = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }

  const { idProduit, idMagasinier} = req.body;

  let existingmagasinier

  try {
    existingmagasinier = await magasinier.findById(idmagasinier);
  } catch {
    const error = new httpError("problem", 500);
    return next(error);
  }

  console.log(existingmagasinier.commandeExterne)

  const d = new Date();

  const createduser = new commandeExterne({
    date: d,
    idProduit,
    idMagasinier,
    idFournisseur,
  });

  try {
    await createduser.save();
    await existingmagasinier.commandeExterne.push(createduser)
    await existingmagasinier.save()
  } catch (err) {
    const error = new httpError("failed signup", 500);
    return next(error);
  }
  res.status(201).json({
    commandeExterne: createduser,
  });
};

const getcommandeExterne = async (req, res, next) => {
  let existingUser;
  try {
    existingUser = await user.find({}, "-password");
  } catch {
    const error = new httpError("failed signup try again later", 500);
    return next(error);
  }
  res.json({ existingUser: existingUser });
};

const updatecommandeExterne = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }

  const { idMagasinier, idProduit ,idFournisseur } = req.body;
  const userId = req.params.userId;
  let existingUser;
  try {
    existingUser = await commandeExterne.findById(userId);
  } catch {
    const error = new httpError("problem", 500);
    return next(error);
  }

  console.log(existingUser);
  console.log(idProduit);
  console.log(idFournisseur);
  console.log(idMagasinier);

  existingUser.idProduit = idProduit;
  existingUser.idOuvrier = idMagasinier;
  existingUser.idOuvrier = idFournisseur;

  try {
    existingUser.save();
  } catch {
    const error = new httpError("failed to patch", 500);
    return next(error);
  }

  res.status(200).json({ existingUser: existingUser });
};

const deletecommandeExterne = async (req, res, next) => {
  const id = req.params.id;
  let existingUser;

  try {
    existingUser = await commandeExterne.findById(id);
  } catch {
    return next(new httpError("failed !!", 500));
  }
  if (!existingUser) {
    return next(new httpError("commande does not exist !!", 500));
  }
  try {
    existingUser.remove();
  } catch {
    return next(new httpError("failed !!!", 500));
  }
  res.status(200).json({ message: "deleted" });
};

const getcommandeExterneById = async (req, res, next) => {
  const userId = req.params.id;
  let existingUser;
  try {
    existingUser = await commandeExterne.findById(userId);
  } catch {
    const error = new httpError("failed signup try again later", 500);
    return next(error);
  }
  res.json({ commandeExterne: existingUser });
};

exports.ajoutcommandeExterne = ajoutcommandeExterne;
exports.getcommandeExterne = getcommandeExterne;
exports.updatecommandeExterne = updatecommandeExterne;
exports.deletecommandeExterne = deletecommandeExterne;
exports.getcommandeExterneById = getcommandeExterneById;
