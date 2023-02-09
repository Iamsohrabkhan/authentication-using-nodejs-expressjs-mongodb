const mongoose = require("mongoose");
const connect = async () => {
  try {
    mongoose.set("strictQuery", true);
    mongoose.connect(
      process.env.DATABASE_URL,
      {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        //   socketTimeoutMS: 10000,
        //   useUnifiedAndModify: false,
        //   useCreateIndex: true,
      }
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Connection Error: ",error.message);
  }
};

module.exports = connect;
