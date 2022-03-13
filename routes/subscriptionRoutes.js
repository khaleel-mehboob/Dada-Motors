const express = require('express');
const subscriptionController = require('../controllers/subscriptionController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/')
  .post(subscriptionController.subscribe)
  .get(subscriptionController.getAllSubscribers);

router.route('/:id')
  .get(subscriptionController.getSubscription)
  .delete(authController.protect, authController.restrictTo('admin'), subscriptionController.deleteSubscription);

module.exports = router;