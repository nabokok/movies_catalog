import useFetch from "@/hooks/useFetch";
import { Movie } from "@/types/Movie";

const API_URL = 'http://localhost:3000/movies/1';

function MoviePage() {
  const { data, loading, error } = useFetch<Movie>(API_URL);

  return (
    <h1>Movie</h1>
  )
}

export default MoviePage;