const { urlencoded } = require("express");
const express = require("express");
const { nanoid } = require("nanoid");
const validUrl = require("valid-url");
require("dotenv").config();
const conn2DB = require("./config/db");
const shortenedUrl = require("./models/shortenedUrl");

const PORT = process.env.PORT || 5000;
const app = express();
conn2DB();

app.set("view engine", "ejs");

app.use(urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const urls = await shortenedUrl.find();
  res.render("app", { urls });
});

app.post("/urlshorten", async (req, res) => {
  if (!validUrl.isUri(req.body.urlLong)) {
    res.status(401).send("Invalid URL");
  } else {
    await shortenedUrl.create({ long: req.body.urlLong, short: nanoid(9) });
    res.redirect("/");
  }
});

app.get("/:urlParam", async (req, res) => {
  const urlEntry = await shortenedUrl.findOne({ short: req.params.urlParam });
  if (!urlEntry) {
    res.status(404).send("Not Found");
  } else {
    const urlLong = urlEntry.long;
    urlEntry.clicks++;
    await urlEntry.save();
    res.redirect(urlLong);
  }
});

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
