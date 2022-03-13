const express = require('express');
const authController = require('../controllers/authController');
const APIFeatures = require('../utils/apiFeatures')

const router = express.Router();

router
  .route('/seed')
  .get(authController.createDefaultUsers);

router
  .route('/login')
  .post(authController.login);
  
router
  .route('/logout')
  .get(authController.logout);

router
  .route('/current_user')
  .get(authController.isLoggedIn, authController.getCurrentUser);

router
  .route('/temp_login')
  .get(authController.tempLogin);
  
module.exports = router; 