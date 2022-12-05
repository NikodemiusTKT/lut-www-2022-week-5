
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const imagesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  encoding: String,
  mimetype: String,
  buffer: Schema.Types.Buffer
})

module.exports = mongoose.model("Images", imagesSchema);