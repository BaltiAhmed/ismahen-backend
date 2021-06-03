const httpError = require("../models/error");

const { validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");

const commande = require("../models/commande");
const ouvrier = require('../models/ouvrier')

const ajoutcommande = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }

  const { idProduit, idOuvrier } = req.body;

  let existingOuvrier

  try {
    existingOuvrier = await ouvrier.findById(idOuvrier);
  } catch {
    const error = new httpError("problem", 500);
    return next(error);
  }

  console.log(existingOuvrier.commande)

  const d = new Date();

  const createduser = new commande({
    date: d,
    idProduit,
    idOuvrier,
  });

  try {
    await createduser.save();
    await existingOuvrier.commande.push(createduser)
    await existingOuvrier.save()
  } catch (err) {
    const error = new httpError("failed signup", 500);
    return next(error);
  }
  res.status(201).json({
    Commande: createduser,
  });
};

const getcommande = async (req, res, next) => {
  let existingUser;
  try {
    existingUser = await user.find({}, "-password");
  } catch {
    const error = new httpError("failed signup try again later", 500);
    return next(error);
  }
  res.json({ existingUser: existingUser });
};

const updatecommande = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }

  const { idOuvrier, idProduit } = req.body;
  const userId = req.params.userId;
  let existingUser;
  try {
    existingUser = await commande.findById(userId);
  } catch {
    const error = new httpError("problem", 500);
    return next(error);
  }

  console.log(existingUser);
  console.log(idProduit);
  console.log(idOuvrier);

  existingUser.idProduit = idProduit;
  existingUser.idOuvrier = idOuvrier;

  try {
    existingUser.save();
  } catch {
    const error = new httpError("failed to patch", 500);
    return next(error);
  }

  res.status(200).json({ existingUser: existingUser });
};

const deletecommande = async (req, res, next) => {
  const id = req.params.id;
  let existingUser;

  try {
    existingUser = await commande.findById(id);
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

const getcommandeById = async (req, res, next) => {
  const userId = req.params.id;
  let existingUser;
  try {
    existingUser = await commande.findById(userId);
  } catch {
    const error = new httpError("failed signup try again later", 500);
    return next(error);
  }
  res.json({ commande: existingUser });
};

exports.ajoutcommande = ajoutcommande;
exports.getcommande = getcommande;
exports.updatecommande = updatecommande;
exports.deletecommande = deletecommande;
exports.getcommandeById = getcommandeById;
