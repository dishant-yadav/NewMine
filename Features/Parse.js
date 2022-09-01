// we need axios to make HTTP requests
const axios = require("axios");

// and we need jsdom and Readability to parse the article HTML
const { JSDOM } = require("jsdom");
const { Readability } = require("@mozilla/readability");
const { flushSync } = require("react-dom");

// First lets get some search data from News API

// Build the URL we are going request. This will get articles related to Apple and sort them newest first
let url =
  "https://newsapi.org/v2/top-headlines?country=in&category=science&apiKey=40c38ba5eefd4fb094758dd46ba59226&page=1&pagesize=12";

// Make the request with axios' get() function
axios.get(url).then(function (r1) {
  // At this point we will have some search results from the API. Take the first search result...
  let firstResult = r1.data.articles[2];

  // ...and download the HTML for it, again with axios
  axios.get(firstResult.url).then(function (r2) {
    // We now have the article HTML, but before we can use Readability to locate the article content we need jsdom to convert it into a DOM object
    let dom = new JSDOM(r2.data, {
      url: firstResult.url,
    });

    // now pass the DOM document into readability to parse
    let article = new Readability(dom.window.document).parse();

    // Done! The article content is in the textContent property
    console.log(article.content);
    console.log(article.textContent.trim());
  });
});
