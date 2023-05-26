const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({ title: "Fried rice", cuisine: "Asian" });
  })
  .then((newRecipe) => console.log(newRecipe.title))
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then(() => console.log("Successfully insert data"))
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  .then(console.log("Successfully update duration of Rigatoni"))
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(console.log(`Deleted Carrot Cake`))
  .catch((error) => {
    console.error("Error connecting to the database", error);
  })
  .then(() => {
    return mongoose.connection.close();
  })
  .then(() => console.log("Mongoose connection has closed"));
