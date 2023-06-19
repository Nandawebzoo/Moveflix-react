import axios from 'axios';

async function getMoviesbyGenre(genreId) {
  const response = await axios.get(`https://api.themoviedb.org/3/list/${genreId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
  return response.data;
}

async function getMovie(id) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&append_to_response=credits`
  );

  return response.data;
}

async function markAsFavorite(value, movieId, accountId, sessionId) {
  const params = new URLSearchParams({
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    session_id: sessionId,
  });

  const response = await axios.post(`https://api.themoviedb.org/3/account/${accountId}/favorite?${params.toString()}`, {
    media_type: 'movie',
    media_id: movieId,
    favorite: value,
  });

  return response.data;
}

export const tmdbService = {
  getMoviesbyGenre,
  getMovie,
  markAsFavorite,
};
