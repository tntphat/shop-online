const config = require("./config/config");
const express = require("express");
const cors = require("cors");
const compression = require("compression");
const db = require("./config/db");
const path = require("path");

db.connect();

const app = express();
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static("public"));

const corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token"],
};
app.use(cors(corsOption));

app.use(express.static(path.join(__dirname, "public")));

require("./app/middlewares/session.mdw")(app);
require("./routes")(app);
app.listen(config.PORT, (error) => {
  if (error) {
    console.log("Sthing wrong happen");
    throw error;
  }
  console.log("Server running on " + config.PORT);
});
