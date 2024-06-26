
import { Movie } from '../types/Movie';
import { client } from '../utils/fetchClient';

export const getMovies = () => {
  return client.get<Movie[]>('/movies');
};

export const getSingleMovie = (id: string) => {
  return client.get<Movie>(`/movies/${id}`);
};

export const addMovie = (movie: Movie) => {
  return client.post<Movie>('/movies', movie);
};

export const updateMovie = (movie: Partial<Movie>) => {
  return client.patch<Movie>(`/movies/${movie.id}`, movie);
};

export const deleteMovie = (id: string) => {
  return client.delete(`/movies/${id}`);
};

