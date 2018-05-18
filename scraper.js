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
        const imdbID = $title.attr("href").match(/title\/(.*)\//)[1];
        console.log($image.attr("src"));
        const movie = {
          image: $image.attr("src"),
          title: $title.text(),
          imdbID
        };
        movies.push(movie);
      });

      return movies;
    });
}
function getMovie(imdbID) {
  return fetch(`${movieUrl}${imdbID}`)
    .then(response => response.text())
    .then(body => {
      const $ = cheerio.load(body);
      const $title = $(".title_wrapper h1");
      const title = $title
        .first()
        .contents()
        .filter(function() {
          return this.type === "text";
        })
        .text()
        .trim();
      const rating = $('meta[itemProp="contentRating"]').attr("content");
      const runTime = $('time[itemProp="duration"]')
        .first()
        .contents()
        .filter(function() {
          return this.type === "text";
        })
        .text()
        .trim();
      const genres = [];
      $('span[itemProp="genre"]').each(function(i, element) {
        const genre = $(element);
        const $genre = genre.text();
        genres.push($genre);
        return genres;
      });
      const datePublished = $('meta[itemProp="datePublished"]').attr("content");
      const imdbRating = $('span[itemProp="ratingValue"]').text();
      const poster = $('img[itemProp="image"]').attr("src");
      const plot = $('div[class="summary_text"]')
        .text()
        .trim();
      return {
        imdbID,
        title,
        rating,
        runTime,
        genres,
        datePublished,
        imdbRating,
        poster,
        plot
      };
    });
}
module.exports = {
  searchMovies,
  getMovie
};
