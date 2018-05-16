const fetch = require("node-fetch");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
const scraper = require("./scraper");

app.get("/", (req, res) => {
  res.json({ message: "scaping is fun!" });
});
app.get("/search", (req, res) => {
  scraper.searchMovies("star wars");
});
app.listen("3000", () => {
  console.log("server is running!");
});
