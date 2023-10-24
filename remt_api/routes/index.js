var express = require('express');
var router = express.Router();
const ctrlUserTypes = require('../controllers/userTypes');

/* GET home page. */
router.get('', ctrlUserTypes.getUserTypes);
router.post('/login', ctrlUserTypes.logInUser);
router.post('/register', ctrlUserTypes.registerUser);

module.exports = router;