const express = require('express');
const router = express.Router();
const ctrlUserTypes = require('../controllers/userTypesCtrl');
const jwt = require('express-jwt');
const auth = jwt.expressjwt({
  secret: process.env.jwtSecret,
  userProperty: 'payload',
  algorithms: ['HS256']
});

/* GET home page. */
router.route('').get(ctrlUserTypes.getUserTypes)
  .post(ctrlUserTypes.registerUser);
router.post('/login', ctrlUserTypes.logInUser);
/* GET Single User. */
router.route('/:id').get(auth, ctrlUserTypes.getUser);

router.put('/:id', auth, ctrlUserTypes.updateUser)

router.delete('/:id', auth, ctrlUserTypes.deleteUser);

module.exports = { router, auth };