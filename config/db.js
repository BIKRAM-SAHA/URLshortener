const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const conn2DB = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URI);
  console.log(connection.connection.host);
};

module.exports = conn2DB;
