const mongoose = require("mongoose"); // Installs mongoose
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    id: String,
    name: String,
    email: String,
    status: String,
  });
  
const Member = mongoose.model("Member", memberSchema);

module.exports = Member;