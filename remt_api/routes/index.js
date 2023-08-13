var express = require('express');
var router = express.Router();
const ctrlUserTypes = require('../controllers/userTypes');

/* GET home page. */
router.get('', ctrlUserTypes.getUserTypes);
router.post('/auth/login', ctrlUserTypes.logInUser);
router.post('/auth/register', ctrlUserTypes.registerUser);

module.exports = router;