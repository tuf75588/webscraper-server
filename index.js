const fetch = require("node-fetch");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
const scraper = require("./scraper");

app.get("/", (req, res) => {
  res.json({ message: "scaping is fun!" });
});
app.get("/search/:title", (req, res) => {
  scraper.searchMovies(req.params.title).then(movies => {
    res.json(movies);
  });
});
app.get("/movie/:imdbID", (req, res) => {
  scraper.getMovie(req.params.title).then(movie => {
    res.json(movie);
  });
});
app.listen("3000", () => {
  console.log("server is running!");
});
