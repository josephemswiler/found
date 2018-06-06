const mongoose = require("mongoose")

let Schema = mongoose.Schema

let ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  altImg: {
    type: String,
  },
  description: {
    type: String,
  },
  talk: {
    type: Schema.Types.ObjectId,
    ref: "Talk"
  }
})

let Item = mongoose.model("Item", ItemSchema)

module.exports = Item