const express = require("express");
const mongoose = require("mongoose");
const logger = require('morgan');
const routes = require('./routes/routes');
const passport = require('passport');
const cors = require('cors');

const app = express();

//---------------DB Config----------------//
mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to the database");
});

mongoose.connection.on("error", (err) => {
  console.error(`Failed to connect to the database : ${err}`);
});

//---------------Middelware ----------------//

app.use(cors());

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded( ));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//--------------Routes----------------//

app.use('/api/bo', routes);


//-----------------ERRORS------------//

app.use((req, res, next) => {
  //404 Not Found
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const error = err.message || 'Error processing your request';

  res.status(status).send({
    error,
  });
});

module.exports = app;
