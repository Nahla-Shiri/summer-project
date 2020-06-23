const express = require("express");
const mongoose = require("mongoose");
const logger = require('morgan');

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


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded( ));

//--------------Routes----------------//
app.post('/hello',(req, res)=>{
    const name = req.body.name;
    res.send({
        message : `welcome ${name}`
    })
})

module.exports = app;
