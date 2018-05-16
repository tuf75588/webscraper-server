const cheerio = require("cheerio");
const fetch = require("node-fetch");
const searchUrl = "https://www.imdb.com/find?s=tt&ttype=ft&ref_=fn_ft&q=";
const movieUrl = "https://www.imdb.com/title/";
function searchMovies(searchTerm) {
  return fetch(`${searchUrl}${searchTerm}`)
    .then(res => res.text())
    .then(body => {
      const movies = [];
      const $ = cheerio.load(body);
      $(".findResult").each(function(i, element) {
        const $element = $(element);
        const $image = $element.find("td a img");
        const $title = $element.find("td.result_text a");
        console.log($image.attr("src"));
        const movie = {
          image: $image.attr("src"),
          title: $title.text()
        };
        movies.push(movie);
      });

      return movies;
    });
}

module.exports = {
  searchMovies
};
