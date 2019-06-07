const Category = require("../models/category");

result = {
  message: "",
  data: {}
};

module.exports.list = async (request, h) => {
  try {
    const categories = await Category.find().exec();
    result.data = categories;
    return h.response(categories);
  } catch (error) {
    return h.response(error).code(500);
  }
};

module.exports.create = async (request, h) => {
  try {
    if (request.payload) {
      let category = new Category(request.payload);
      let result = await category.save();
      if (result) {
        return h.response(result);
      }
    }
  } catch (error) {
    return h.response(error).code(500);
  }
};

module.exports.detail = async (request, h) => {
  try {
    let category = await Category.findById(request.params.id);
    if (category == null) {
      return h.response({}).code(404);
    } else {
      return h.response(category);
    }
  } catch (error) {
    return h.response(error).code(500);
  }
};

module.exports.update = async (request, h) => {
  try {
    let updatedCategory = await Category.findByIdAndUpdate(
      request.params.id,
      request.payload,
      { new: true }
    );
    return h.response(updatedCategory);
  } catch (error) {
    return h.response(error).code(500);
  }
};

module.exports.delete = async (request, h) => {
  try {
    await Category.findByIdAndDelete(request.params.id);
    return h.response({ message: "Delete successfully" });
  } catch (error) {
    return h.response(error).code(500);
  }
};
