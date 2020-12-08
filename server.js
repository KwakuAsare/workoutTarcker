const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require('path');

const app = express();
var PORT = process.env.PORT || 3500;

const db = require("./models");

app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

require("./routes/api-routes.js")(app);

app.listen(PORT, function() {
  console.log(`Now listening on port: ${PORT}`);
});
