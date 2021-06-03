const express = require("express");
const route = express.Router();

const produitControllers = require("../controllers/produit");

const { check } = require("express-validator");


route.post('/ajout',produitControllers.ajoutProduit)

route.delete('/:id',produitControllers.deleteproduit)
route.patch('/:id',produitControllers.updateproduit)
route.get('/',produitControllers.getproduit)

module.exports = route;
