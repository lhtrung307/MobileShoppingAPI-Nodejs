const Mongoose = require("mongoose");

const { start } = require("./server");

Mongoose.connect("mongodb://mongo:27017/mobile-shopping", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((error) => {
    console.log(error);
  });

start();
