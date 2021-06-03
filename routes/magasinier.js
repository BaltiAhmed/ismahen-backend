const express = require('express');
const route = express.Router();

const magasinierControllers = require('../controllers/magasinier')

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
, magasinierControllers.signup)

route.post('/login', 
check('email')
.normalizeEmail(),
check('password')
.isLength({min:8})
, magasinierControllers.login)

route.get('/',magasinierControllers.getmagasinier)

route.post('/:userId', 
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
, magasinierControllers.updatemagasinier)

route.delete('/:id',magasinierControllers.deletemagasinier)

route.get('/magasinier/:id',magasinierControllers.getmagasinierById)


module.exports = route