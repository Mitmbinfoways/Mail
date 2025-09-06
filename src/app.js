const express = require("express");
const cors = require("cors");
const path = require("path");
const SendmailRoute = require("./Routers/Sendmail.route");
require("dotenv").config();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/mail", SendmailRoute);


module.exports = app;
