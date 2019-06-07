const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const ProductSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
    required: "Must have category"
  },
  name: {
    type: String,
    required: "Product must have a name"
  },
  price: {
    type: String,
    required: "Product must have a price"
  },
  colors: [
    {
      color_description: {
        type: String,
        unique: true,
        trim: true,
        required: "Must have color description"
      }
    }
  ],
  size: String,
  description: String
});
