const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  farmName: { type: String },
  isConfirmed: { type: Boolean },
  token: { type: String },
  userType: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
const validate = (user) => {
  const schema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(8),
    userType: Joi.string(),
  });
  return schema.validate(user);
};
module.exports = { User, validate };
