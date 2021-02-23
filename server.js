import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import passport from "passport";
import cors from "cors";

const users = require("./routes/api/users");
const supply = require("./routes/api/supply");
const order = require("./routes/api/order");
const measurement = require("./routes/api/measurement");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()); // Allow All Requests

// DB config
const db = require("./config/keys").mongoURI;

// Use routes
app.use("/api/user", users);
app.use("/api/supply", supply);
app.use("/api/order", order);
app.use("/api/measurement", measurement);

// connect to DB
mongoose
  .connect(db, { useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
