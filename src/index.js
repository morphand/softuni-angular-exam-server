// Core modules
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Controllers

const { PORT, DB_NAME } = require("./constants");

// Middlewares
const authToken = require("./middlewares/authToken");

// Init
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/static", express.static("static"));
app.use(authToken);

mongoose.connect(`mongodb://127.0.0.1/${DB_NAME}`).then(() => {
  console.log(`Connected to database ${DB_NAME}.`);
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
  });
});