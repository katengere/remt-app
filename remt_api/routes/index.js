var express = require('express');
var router = express.Router();
const ctrlUserTypes = require('../controllers/userTypes');

/* GET home page. */
router.get('', ctrlUserTypes.getUserTypes);

module.exports = router;