const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
