const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const CustomerSchema = new Schema({
  first_name: {
    type: String,
    trim: true,
    required: "Customer must have first name"
  },
  last_name: {
    type: String,
    trim: true,
    required: "Customer must have last name"
  },
  gender: {
    type: String,
    enum: ["Nam", "Nữ", "Male", "Female"]
  },
  email: {
    type: String,
    required: "User must have email"
  },
  password: {
    type: String,
    required: "Customer must have password"
  },
  phone_number: {
    type: String,
    unique: true
  },
  address: {
    type: String,
    default: ""
  },
  county: {
    type: String,
    default: ""
  },
  country: {
    type: String,
    default: ""
  }
});

module.exports = Mongoose.model("customer", CustomerSchema);
