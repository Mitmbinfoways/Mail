const express = require("express");
const SendmailRoute = express.Router();
const { SendEmail } = require("../controller/Sendmail.controller");

SendmailRoute.post("/", SendEmail);

module.exports = SendmailRoute;
