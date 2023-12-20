var express = require('express');
var router = express.Router();
const ctrlUserTypes = require('../controllers/userTypes');

/* GET Single User. */
router.get('/:id', ctrlUserTypes.getUser);
router.put('/:id', ctrlUserTypes.updateUser);
router.delete('/:id', ctrlUserTypes.deleteUser);
// router.post('/login', ctrlUserTypes.logInUser);
// router.post('/register', ctrlUserTypes.registerUser);

module.exports = router;