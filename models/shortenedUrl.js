const mongoose = require("mongoose");

const shortenedUrlSchema = mongoose.Schema({
  long: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    require: true,
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
