const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('./utils/passport.js');
require('dotenv').config();

const authRoute = require('./routes/authRoute');

const app = express();

// DB Connection
const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB CONNECTED SUCCESSFULLY');
  })
  .catch(() => {
    console.log('PROBLEM CONNECTING DB');
  });

// middlewares
app.use(cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(cookieParser());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Routes
app.use('/auth', authRoute);
// server
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Port is running at ${port}`);
});
