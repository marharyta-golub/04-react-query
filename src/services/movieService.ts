import axios from 'axios';
import type { Movie } from '../types/movie';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const myToken = import.meta.env.VITE_TMDB_TOKEN;

interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
const fetchMovies = async (
  query: string,
  page: number = 1,
): Promise<TMDBResponse> => {
  const { data } = await axios.get<TMDBResponse>('/search/movie', {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page,
    },
    headers: {
      Authorization: `Bearer ${myToken}`,
      accept: 'application/json',
    },
  });

  return data;
};

export default fetchMovies;
