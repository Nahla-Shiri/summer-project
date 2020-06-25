const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const UserSchema = Schema({
  name: { type: String },
  email: { type: String, required: true, index: true, unique: true },
  password: { type: String, required: true },
  joined: { type: Date, defaut: new Date() },
});

UserSchema.pre("save", async function (next) {
  // Check new account, or password is modified
  if (!this.isModified("password")) {
    // this == UserSchema
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

UserSchema.methods.isPasswordMatch = function(password, hashed, callback) {
    bcrypt.compare(password, hashed, (err, success) => {
      if (err) {
        return callback(err);
      }
      callback(null, success);
    });
  };

// display user info without password  
UserSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
}

const User = mongoose.model("User", UserSchema);
module.exports = User;
