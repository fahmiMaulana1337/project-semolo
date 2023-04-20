const cors = require("cors");
const express = require("express");
require('dotenv').config()
const app = express();
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const port = process.env.PORT || 3000;

app.use(cors());
const routes = require("./routes/index");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
