const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const BrandSchema = Schema({
  name: { type: String, required: true,  index: true, unique: true },
  email: { type: String, required: true, index: true, unique: true },
  password: { type: String, required: true },
  tel : {type :Number, required: true},
  summary :{ type: String, required: true},
  description: { type: String },
  logo :{ type: String, required: true},
  gallery : {type: [String]},
  
});

BrandSchema.pre("save", async function (next) {
  // Check new account, or password is modified
  if (!this.isModified("password")) {
    // this == BrandSchema
    return next();
  }
  // Encrypt the password
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (e) {
    return next(e);
  }
});

BrandSchema.methods.isPasswordMatch = function(password, hashed, callback) {
    bcrypt.compare(password, hashed, (err, success) => {
      if (err) {
        return callback(err);
      }
      callback(null, success);
    });
  };

// display user info without password  
BrandSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
}


const Brand = mongoose.model("Brand", BrandSchema);
module.exports = Brand;
