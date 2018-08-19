var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const productController = require('../controllers/product')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/', productController.validateUser, productController.addProduct )
router.get('/all', productController.getProduct )

module.exports = router;