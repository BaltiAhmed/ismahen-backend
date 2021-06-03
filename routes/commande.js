const express = require("express");
const route = express.Router();

const commandeControllers = require("../controllers/commande");

const { check } = require("express-validator");


route.post('/ajout',commandeControllers.ajoutcommande)

route.delete('/:id',commandeControllers.deletecommande)
route.patch('/:id',commandeControllers.updatecommande)
route.get('/:getcommande',commandeControllers.getcommande)

module.exports = route;