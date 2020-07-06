const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const AmbassadorSchema = Schema({
  name: { type: String },
  email: { type: String, required: true, index: true, unique: true },
  password: { type: String, required: true },
  photo : { type: String, required: true },
  street : { type: String, required: true },
  cp : { type: Number, required: true },
  city : { type: String, required: true },
  country : { type: String, required: true },

  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand'
  }
});

AmbassadorSchema.pre("save", async function (next) {
  // Check new account, or password is modified
  if (!this.isModified("password")) {
    // this == AmbassadorSchema
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

AmbassadorSchema.methods.isPasswordMatch = function(password, hashed, callback) {
    bcrypt.compare(password, hashed, (err, success) => {
      if (err) {
        return callback(err);
      }
      callback(null, success);
    });
  };

// display Ambassador info without password  
AmbassadorSchema.methods.toJSON = function() {
  const AmbassadorObject = this.toObject();
  delete AmbassadorObject.password;
  return AmbassadorObject;
}

const Ambassador = mongoose.model("Ambassador", AmbassadorSchema);
module.exports = Ambassador;
