const express = require("express");
const SendmailRoute = express.Router();
const { SendEmail, Newsletter } = require("../controller/Sendmail.controller");

SendmailRoute.post("/", SendEmail);
SendmailRoute.post("/newsletter", Newsletter);

module.exports = SendmailRoute;
