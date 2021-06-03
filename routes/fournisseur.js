const express = require('express');
const route = express.Router();

const fournisseurControllers = require('../controllers/fournisseur')

const {check} = require('express-validator')

route.post('/signup', 
check('name')
.not()
.isEmpty(),
check('tel')
.not()
.isEmpty(),
check('adresse')
.not()
.isEmpty(),
check('email')
.normalizeEmail(),
check('password')
.isLength({min:8})
, fournisseurControllers.signup)

route.post('/login', 
check('email')
.normalizeEmail(),
check('password')
.isLength({min:8})
, fournisseurControllers.login)

route.get('/',fournisseurControllers.getfournisseur)
route.patch('/:id',fournisseurControllers.updatefournisseur)
route.delete('/:id',fournisseurControllers.deletefournisseur)

route.get('/getfournisseur/:id',fournisseurControllers.getfournisseurById)


module.exports = route