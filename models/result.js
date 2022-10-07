const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const resultSchema = mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  response: { type: Array },
  result: { type: Object },
});

module.exports = mongoose.model("Result", resultSchema);
