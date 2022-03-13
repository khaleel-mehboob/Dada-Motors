const catchAsync = require('../utils/catchAsync')
const APIFeatures = require('../utils/apiFeatures');
const Subscription = require('../models/subscriptionSchema');
const AppError = require('../utils/appError');

exports.subscribe = catchAsync(async (req, res, next) => {
  const { email } = req.body

  if (!email) {
    return next(new AppError('Email address required!'));
  }
  
  let subscription = await Subscription.findOne({ email });

  if(!subscription) {
    subscription = new Subscription({ email })
    subscription = await subscription.save();
  }
  
  res.status(201).json({ status: 'success', message: 'You subscribed succesfuly.' });
});

exports.getAllSubscribers = catchAsync(async (req, res, next) => {
  const resPerPage = 100;
  const count = await Subscription.countDocuments()
   const apiFeatures = new APIFeatures(Subscription.find(), req.query)
       .search()
       .filter()
       .pagination(resPerPage)
   const subscribers = await apiFeatures.query;

   res.status(200).send({
       status: 'success',
       count,
       resPerPage,
       subscribers
   });
});

exports.getSubscription = catchAsync(async (req, res) => {
  const subscription = await Subscription.findById(req.params.id);
  if (subscription) {
      res.status(200).send({
          success: 'success',
          subscription
      });
  } else {
      res.status(404).send({ message: "Subscription not found." })
  }
});

exports.deleteSubscription = catchAsync(async (req, res, next) => {
  const subscription = await Subscription.findById(req.params.id);

  if(!subscription) {
    return next(new AppError('Subscription does not exist!'));
  }

  await subscription.remove();
  res.status(204).json({
      status: 'success',
      message: 'Subscription removed successfully.',
      data: {}
  })
});