const multer = require('multer');
const sharp = require('sharp');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const defaultVehicles = require("../defaultData/defaultVehicles.js");
const Vehicle = require("../models/vehicleSchema");
const AppError = require('../utils/appError');
const Subscription = require('../models/subscriptionSchema');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/vehicles');
//   },
//   filename: (req, file, cb) => {
//     // vehicle-8376956234875.jpeg
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `vehicle-${Date.now()}.${ext}`);
//   }
// });

multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if(file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an Image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadImages = upload.array('images', 20);

// exports.uploadImages = upload.fields([
  //   {name: 'images', maxCount: 20},
  //   {name: 'imageCover', maxCount: 1},
  // ]);
  
  // exports.uploadImage = upload.single('image');
  
exports.processImages = catchAsync(async (req, res, next) => {
  
  if(!req.files) return next();
  
  req.body.images= [];

  await Promise.all(req.files.map(async (file, i) => {
    const fileName = `vehicle-${Date.now()}-${i + 1}.jpeg`;

    await sharp(req.files[i].buffer).resize(900, 560)
      .toFormat('jpeg')
      .jpeg({ quality: 90})
      .toFile(`client/public/img/vehicles/${fileName}`);  

    req.body.images.push(fileName);
  }));

  next();
});

exports.getAllVehicles = catchAsync(async (req, res, next) => {
  const resPerPage = 100;
  const count = await Vehicle.countDocuments()
   const apiFeatures = new APIFeatures(Vehicle.find(), req.query)
       .search()
       .filter()
       .pagination(resPerPage)
   const vehicles = await apiFeatures.query;

   res.status(200).send({
       status: 'success',
       count,
       resPerPage,
       vehicles
   });
});

exports.createDefaultVehicles = catchAsync(async (req, res) => {
    await Vehicle.deleteMany();
    const vehicles = await Vehicle.insertMany(defaultVehicles);
    res.status(201).send({ 
      status: 'success', 
      vehicles 
    });
  }
);

exports.getVehicle = catchAsync(async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);
  if (vehicle) {
      res.status(200).send({
          success: 'success',
          vehicle
      });
  } else {
      res.status(404).send({ message: "Vehicle not found." })
  }
});

exports.updateVehicle = catchAsync(async (req, res) => {
  const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false
  });
  if (product) {
      res.status(200).send({
          status: 'success',
          product
      });
  } else {
      res.status(404).send({ message: "Product not found" })
  }
});

exports.createVehicle = catchAsync(async (req, res) => {
  
  const vehicle = await Vehicle.create(req.body);

  const emails = await Subscription.find();
  const emailsArray = emails.map(el => el.email);

  if(emailsArray.length > 0){
    // var nodemailer = require('nodemailer');
    // var smtpTransport = require('nodemailer-smtp-transport');
    // const to = emailsArray.shift();
    // const bcc = emailsArray;

    // var transporter = nodemailer.createTransport(smtpTransport({
    //   service: 'gmail',
    //   host: 'smtp.gmail.com',
    //   auth: {
    //     user: 'khaleel.mehboob@gmail.com',
    //     pass: 'Tnallag92'
    //   }
    // }));

    // var mailOptions = {
    //   from: 'khaleel.mehboob@gmail.com',
    //   to,
    //   subject: 'Data Motors - Subscription Email',
    //   text: 'That was easy!',
    //   bcc
    // };

    // transporter.sendMail(mailOptions, function(error, info){
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log('Email sent: ' + info.response);
    //     res.status(201).json({
    //     status: 'success',
    //     message: 'Vehicle added to Collection successfully.',
    //     data: {
    //       vehicle
    //     }
    //   });
    //   }
    // });
  } else {
    res.status(201).json({
      status: 'success',
      message: 'Vehicle added to Collection successfully.',
      data: {
        vehicle
      }
    });
  }
});

exports.deleteVehicle = catchAsync(async (req, res, next) => {
  const vehicle = await Vehicle.findById(req.params.id);

  if(!vehicle) {
    return next(new AppError('Vehicle does not exist!'));
  }

  await vehicle.remove();
  res.status(204).json({
      status: 'success',
      message: 'Vehicle removed from Collection.',
      data: {}
  })
});