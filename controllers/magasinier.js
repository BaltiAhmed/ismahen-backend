const httpError = require("../models/error");

const magasinier = require("../models/magasinier");

const { validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }

  const { name, email, password, tel, adresse } = req.body;
  let existinguser;
  try {
    existinguser = await magasinier.findOne({ email: email });
  } catch (err) {
    const error = new httpError("problems!!!", 500);
    return next(error);
  }

  if (existinguser) {
    const error = new httpError("user exist", 422);
    return next(error);
  }

  const createduser = new magasinier({
    name,
    email,
    password,
    tel,
    adresse,
  });

  try {
    await createduser.save();
  } catch (err) {
    const error = new httpError("failed signup", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createduser.id, email: createduser.email },
      "secret-thinks",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new httpError("failed signup try again later", 500);
    return next(error);
  }

  res
    .status(201)
    .json({
      MagasinierId: createduser.id,
      email: createduser.email,
      token: token,
    });
};

const login = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await magasinier.findOne({ email: email });
  } catch {
    return next(new httpError("failed !!", 500));
  }
  if (!existingUser || existingUser.password !== password) {
    return next(new httpError("invalid input passed", 422));
  }
  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "secret-thinks",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new httpError("failed signup try again later", 500);
    return next(error);
  }
  res.status(200).json({ Magasinier: existingUser, token: token });
};

const getmagasinier = async (req, res, next) => {
  let existingUser;
  try {
    existingUser = await magasinier.find({}, "-password");
  } catch {
    const error = new httpError("failed signup try again later", 500);
    return next(error);
  }
  res.json({ existingUserUser: existingUser });
};

const updatemagasinier = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }

  const { name, email, password, tel, adresse } = req.body;
  const UserId = req.params.userId;
  let existingUser;
  try {
    existingUser = await magasinier.findById(UserId);
  } catch {
    const error = new httpError("problem", 500);
    return next(error);
  }



  existingUser.name = name;
  existingUser.email = email;
  existingUser.password = password;
  existingUser.adresse=adresse;
  existingUser.tel=tel

  try {
    existingUser.save();
  } catch {
    const error = new httpError("failed to patch", 500);
    return next(error);
  }

  res.status(200).json({ magasinier: existingUser });
};

const deletemagasinier = async (req, res, next) => {
  const id = req.params.id;
  let existingUser;

  try {
    existingUser = await magasinier.findById(id);
  } catch {
    return next(new httpError("failed !!", 500));
  }
  if (!existingUser) {
    return next(new httpError("user does not exist !!", 500));
  }
  try {
    existingUser.remove();
  } catch {
    return next(new httpError("failed !!!", 500));
  }
  res.status(200).json({ message: "deleted" });
};

const getmagasinierById = async (req, res, next) => {
  const id = req.params.id;
  let existingUser;
  try {
    existingUser = await magasinier.findById(id);
  } catch {
    const error = new httpError("failed signup try again later", 500);
    return next(error);
  }
  res.json({ existingUserUser: existingUser });
};



exports.signup = signup;
exports.login = login;
exports.getmagasinier = getmagasinier;
exports.updatemagasinier = updatemagasinier;
exports.deletemagasinier = deletemagasinier;
exports.getmagasinierById=getmagasinierById
