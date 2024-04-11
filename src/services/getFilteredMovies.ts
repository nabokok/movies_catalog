import { Movie } from "@/types/Movie";

export const getFilteredMovies = (query: string, movies: Movie[] | null) => {
  if (!movies) {
    return null;
  }

  const normalizedQuery = query.toLowerCase().trim();

  return movies.filter(({ title }) => title.toLowerCase().includes(normalizedQuery))
}