const { promisify } = require('util');
const User = require("../models/userSchema");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const defaultUsers = require("../defaultData/defaultUsers.js");

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

exports.createDefaultUsers = catchAsync(async (req, res) => {
  try {
      await User.deleteMany();
      const users = await User.insertMany(defaultUsers);
      res.status(201).send({ 
        status: 'success', 
        users 
      });
    } catch (error) {
        console.log(error.message);
    }
  }
);

const changedPasswordAfter = function(passwordChangedAt, JWTTimeStamp) {
  if(passwordChangedAt) {
    const changedTimeStamp = parseInt(passwordChangedAt.getTime() / 1000, 10);
    return JWTTimeStamp < changedTimeStamp;
  }

  return false;
};
 
exports.login = catchAsync(async (req, res, next) => {

  const { email, password } = req.body;

  // Check if username and password exist
  if(!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  // Check if user exists and password is correct
  const user = await User.findOne({ email });

  if(!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = signToken(user.id);
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  };
  // Use below option if deploying on https
  // x-forwarded-proto is heroku specific
  
  res.cookie('jwt', token, cookieOptions);

  // Remove the password from the output
  user.password = undefined;
  
  if(process.env.NODE_ENV === 'production') {
    return res.redirect('/vehicles');
  }

  // return res.redirect('/');
  res.status(200).json({user});

});

exports.tempLogin = catchAsync(async (req, res, next) => {

  const email = 'admin786@carworld.com';
  const password = '0786';

  // Check if user exists and password is correct
  const user = await User.findOne({ email });

  if(!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect username or password', 401));
  }

  const token = signToken(user.id);
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  };
  // Use below option if deploying on https
  // x-forwarded-proto is heroku specific
  
  res.cookie('jwt', token, cookieOptions);

  // Remove the password from the output
  user.password = undefined;
  
  res.redirect('/vehicles');
  
  // res.status(200).json({
  //   status: 'success',
  //   token,
  //   data: {
  //     user
  //   }
  // });
});

exports.logout = (req, res) => {
  // JONAS' IMPLEMENTATION
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10  * 1000),
    httpOnly: true
  });
  // res.status(200).json({ status: 'success' });
  req.user = undefined;
  
  return res.redirect('/');

  // STEPHEN's IMPLEMENTATION
  // req.logout();
  // res.send(req.user);
}

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it's there
  let token
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if(req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if(!token) {
    return next(new AppError('You are not logged in! Please login to get access.', 401));
  }
  // 2) Verification Token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  
  // 3) Check if user still exists 
  const currentUser = await User.findOne({ id: decoded.id });
  if(!currentUser) {
    return next(new AppError('The user belonging to this token does no longer exist', 401));
  }

  // 4) Check if user changed password after the token was issued
  if(changedPasswordAfter(currentUser.passwordChangedAt, decoded.iat)) {
    return next(new AppError('User recently changed password! Please log in again.', 401));
  };

  // Grant access to the protected route
  currentUser.password = undefined;
  req.user = currentUser;
  return next();
});

// Only for rendered pages, no errors!
exports.isLoggedIn = async (req, res, next) => {
  // 1) Getting token and check if it's there
  if(req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt, 
        process.env.JWT_SECRET
      );
      
      // 2) Check if user still exists 
      const currentUser = await User.findOne({ id: decoded.id });
      
      if(!currentUser) {
        return next();
      }
    
      // 3) Check if user changed password after the token was issued
      if(changedPasswordAfter(currentUser.passwordChangedAt, decoded.iat)) {
        return next();
      };
    
      // THERE IS A LOGGED IN USER
      currentUser.password = undefined;
      req.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  return next();
};

exports.restrictTo = (...userRoles) => {
  return (req, res, next) => {
    if(!userRoles.includes(req.user.userRole)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    return next();
  }
}

exports.getAllUsers = catchAsync(async (req, res, next) => {

  const users = await User.findAll({attributes: {exclude: 'password'}});

  res.status(201).json(
    {
      status: 'success',
      data: {
        users
      }
    }
  );
});

exports.getCurrentUser = (req, res) => {
  res.send(req.user);
}