const express = require("express");
const mongoose = require("mongoose");
const userProfileRoutes = require("./routes/userProfile");
const resultRoutes = require("./routes/result");
const userRoutes = require("./routes/user");
const ibmRoutes = require("./routes/ibmCloud");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/userProfile", userProfileRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/csv", ibmRoutes);
app.use("/api/result", resultRoutes);
// app.use("/api/product", productRoutes);

module.exports = app;
