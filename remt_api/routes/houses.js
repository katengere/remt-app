const express = require('express');
const router = express.Router();
const housesCtrl = require('../controllers/housesCtrl');
const auth = require('./index').auth;

/* GET home page. */
router.route('').get(housesCtrl.getAllHouses).post(auth, housesCtrl.houseRegister);
router.route('/:id')
  .put(auth, housesCtrl.houseUpdate)
  .delete(auth, housesCtrl.houseDelete);

module.exports = router;
