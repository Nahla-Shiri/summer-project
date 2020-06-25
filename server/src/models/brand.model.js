const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const BrandSchema = Schema({
  title: { type: String, required: true,  index: true, unique: true },
  description: { type: String, required: true},
  owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  }
});


const Brand = mongoose.model("Brand", BrandSchema);
module.exports = Brand;
