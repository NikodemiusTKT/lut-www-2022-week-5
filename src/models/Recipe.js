const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const recipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: {
    type: [String],
    required: true
  },
  instructions: {
    type: [String],
    required: true
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: "Category"
  }],
  images: [{
    type: Schema.Types.ObjectId,
    ref: "Images"
  }]
})

module.exports = mongoose.model("Recipe", recipeSchema);