const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const db = require("./config/db");
const { log } = require("console");

db.connect();

const app = express();
const port = process.env.PORT || 5000;
app.use(compression());

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token"],
};
app.use(cors(corsOption));

require("./app/middlewares/session.mdw")(app);
require("./routes")(app);

app.listen(port, (error) => {
  if (error) {
    console.log("Sthing wrong happen");
    throw error;
  }
  console.log("Server running on port " + port);
});
