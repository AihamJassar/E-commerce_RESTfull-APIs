const mongoose = require("mongoose");

const dbConnection = (_) => {
  mongoose.connect(process.env.DB_URI).then((conn) => {
    console.log(`Database Connected: ${conn.connection.host}`);
  });
};

module.exports = dbConnection;
