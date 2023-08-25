const app = require("./app");

const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Nazarii:CAQQ8nzEw6POkhDf@cluster0.nxh4bxc.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// dzhamannazar2003
// goYeJQeYhLyjrVvV

// Nazarii
// CAQQ8nzEw6POkhDf
