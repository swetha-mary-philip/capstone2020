const mongoose = require("mongoose");
// Replace this with your MONGOURI.
const MONGOURI = "mongodb+srv://sphilip5993:swetha@cluster0-vcoij.mongodb.net/restaurant?retryWrites=true&w=majority";
const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};
module.exports = InitiateMongoServer;