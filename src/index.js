// Core modules
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Controllers
const loginController = require("./controllers/login");
const registerController = require("./controllers/register");
const logoutController = require("./controllers/logout");
const catalogController = require("./controllers/catalog");
const rentController = require("./controllers/rent");

const { PORT, DB_NAME } = require("./constants");

// Middlewares
const authTokenMiddleware = require("./middlewares/authToken");

// Init
const app = express();
const authCache = new Map();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/static", express.static("static"));

mongoose.connect(`mongodb://127.0.0.1/${DB_NAME}`).then(() => {
  console.log(`Connected to database ${DB_NAME}.`);
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
  });
});

// Login
app.post("/login", loginController(authCache));

// Register
app.post("/register", registerController(authCache));

// Logout
app.post("/logout", logoutController);

// Catalog
app.get("/catalog", catalogController.getAllCars);
app.get("/catalog/:id", catalogController.getCarById);

app.post("/rent", authTokenMiddleware, rentController.rent);
app.get("/rent", authTokenMiddleware, rentController.getRentedCars);
