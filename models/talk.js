const mongoose = require("mongoose")

let Schema = mongoose.Schema

let TalkSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
      },
      text: {
        type: String,
        required: true
      },
      item: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
      }
})

let Talk = mongoose.model("Talk", TalkSchema)

module.exports = Talk