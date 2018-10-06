const express = require("express");
const util = require("util");
const bodyParser = require("body-parser");
const apiRoutes = require("./api");
const initDB = require("./store/init");
const fileUpload = require('express-fileupload');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(fileUpload());
app.use(apiRoutes);
app.use((req, res, next) => {
  res.status(404).send({message: "Not Found"});
})
app.use((err, req, res, next) => {
  util.log(err);
  return res.status(500).send({message: err.message || "Something Went Wrong"});
})

initDB().then((db) => {
  global.DB = db;
  app.listen(PORT)
});

console.log("Warehouse server listening on port " + PORT + " in " + process.env.NODE_ENV);
