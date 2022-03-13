const express = require('express');
const authController = require('../controllers/authController');
const vehicleController = require('../controllers/vehicleController');  

const router = express.Router();

router
  .route('/')
  .get(vehicleController.getAllVehicles)
  .post(authController.protect, authController.restrictTo('admin'), vehicleController.uploadImages, vehicleController.processImages, vehicleController.createVehicle);
  
  router.route('/seed')
  .get(authController.protect, authController.restrictTo('admin'), vehicleController.createDefaultVehicles);
  
router
  .route('/:id')
  .get(vehicleController.getVehicle)
  .patch(authController.protect, authController.restrictTo('admin'), vehicleController.updateVehicle)
  .delete(authController.protect, authController.restrictTo('admin'), vehicleController.deleteVehicle);

module.exports = router;