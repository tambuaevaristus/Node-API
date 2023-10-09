const mongoose = require("mongoose");
const crypto = require("crypto");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  photo: String,
  role: {
    type: String,
    enum: ["user", "guide", "lead-guide", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Password is required"],
    validate: {
      validator(el) {
        return el === this.password;
      },
      message: "passwords are not the same",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = function (
  candidatePassword,
  userPassword
) {
  return bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const chaangeTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(this.passwordChangedAt, JWTTimestamp);
    return JWTTimestamp < chaangeTimeStamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    console.log({resetToken}, this.passwordResetToken)
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
const User = mongoose.model("User", userSchema);
module.exports = User;