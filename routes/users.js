var express = require('express');
var router = express.Router();
const usersController = require('../controllers/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', usersController.signup )

module.exports = router;
