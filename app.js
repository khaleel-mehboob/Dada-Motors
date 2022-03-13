const express=  require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const app = express();

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

dotenv.config({path: './config.env'});
require('./db/conn');

app.use(express.json());
app.use(express.urlencoded({extended:false}))

const authRouter = require('./routes/authRoutes');
const vehicleRouter = require('./routes/vehicleRoutes');
const subscriptionRouter = require('./routes/subscriptionRoutes');

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/vehicles', vehicleRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

// Have Node serve the files for our built React app
// SET CORS POLICY
let origin;
if(process.env.NODE_ENV === 'development') {
  app.use(express.static(path.resolve(__dirname, './client`/src/containers/App.js')));
  origin = 'http://localhost:5000';
}

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  origin = 'https://vast-depths-15917.herokuapp.com'
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use(
  cors({
    origin,
    methods: ["GET", "POST"]
  })
)

app.use(globalErrorHandler);

module.exports = app;