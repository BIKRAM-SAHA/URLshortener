const mongoose = require("mongoose");
const shortid = require("shortid");

const shortenedUrlSchema = mongoose.Schema({
  long: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    require: true,
    default: shortid.generate(),
  },
  clicks: {
    type: String,
    required: true,
    default: 0,
  },
  expireAt: {
    type: Date,
    required: true,
    default: (() => {
      const date = new Date();
      date.setDate(date.getDate() + 30);
      return date;
    })(),
  },
});

module.exports = mongoose.model("urls", shortenedUrlSchema);
