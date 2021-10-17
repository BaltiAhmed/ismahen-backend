const httpError = require("../models/error");

const { validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");

const pointage = require("../models/pointage");
const ouvrier = require("../models/ouvrier");

const ajout = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }

  const { idOuvrier, type, date, heure } = req.body;

  let existingOuvrier;

  try {
    existingOuvrier = await ouvrier.findById(idOuvrier);
  } catch {
    const error = new httpError("problem", 500);
    return next(error);
  }

  const createdPointage = new pointage({
    idOuvrier,
    type,
    date,
    heure,
  });

  try {
    createdPointage.save();
    existingOuvrier.pointage.push(createdPointage);
    existingOuvrier.save();
  } catch (err) {
    const error = new httpError("failed signup", 500);
    return next(error);
  }
  res.status(201).json({
    pointage: createdPointage,
  });
};

exports.ajout = ajout;
