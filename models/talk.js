const mongoose = require("mongoose")

let Schema = mongoose.Schema

let TalkSchema = new Schema({
  date: Date,
  body: String
})

let Talk = mongoose.model("Talk", TalkSchema)

module.exports = Talk