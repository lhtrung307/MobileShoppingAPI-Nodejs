const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const CategorySchema = new Schema({
  code: {
    type: String,
    unique: true,
    trim: true,
    required: "Category must have code"
  },
  description: {
    type: String,
    trim: true
  }
});

module.exports = Mongoose.model("category", CategorySchema);
