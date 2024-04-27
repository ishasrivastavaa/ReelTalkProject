const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const TOTAL_PAGES = 5;

async function fetchMovies(page) {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

exports.getAllMovies = async (req, res) => {
  try {
    let allMovies = [];
    for (let page = 1; page <= TOTAL_PAGES; page++) {
      const movies = await fetchMovies(page);
      const movieNames = movies.map((movie) => movie.title);
      allMovies = allMovies.concat(movieNames);
    }
    return res.status(200).json({ movies: allMovies });
  } catch (error) {
    return res.status(500).json({ error: "error while fetching movies" });
  }
};
