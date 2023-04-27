const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  fname: { type: String, require: true },
  lname: { type: String, require: true },
  phoneno: { type: Number, require: true },
});

const userSchema = new Schema({
  username: { type: String, require: true },
  password: { type: String, require: true },
});

const imageSchema = new Schema({
  image: { data: Buffer, contentType: String },
});

const Candidate = mongoose.model("Candidate", adminSchema);
const userDetails = mongoose.model("userDetails", userSchema);
const imageDetails = mongoose.model("imageDetails", imageSchema);

module.exports = {
  Candidate: Candidate,
  userDetails: userDetails,
  imageDetails: imageDetails,
};
