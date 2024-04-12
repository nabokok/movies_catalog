import { useAppSelector } from "@/redux/hooks";
import useFetch from "../hooks/useFetch"
import { Loader2 } from "lucide-react"
import CatalogList from "@/components/catalogList";
import { Movie } from "@/types/Movie";
import { getFilteredMovies } from "@/services/getFilteredMovies";
import NoResult from "@/components/noResult";

const API_URL = 'http://localhost:3000/movies';

function Catalog() {
  const { data, loading, error } = useFetch<Movie[]>(API_URL);
  const { query } = useAppSelector(state => state.search);
  const movies = getFilteredMovies(query, data);

  if (error) {
    return (
      <section className='py-10'>
        <div className='container'>
          <NoResult text="Something went wrong." />
        </div>
      </section>
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    )
  }

  return (
    <section className="py-10">
      <div className="container">
        {movies ? <CatalogList list={movies} /> : <NoResult text="No movies found" />}
      </div>
    </section>
  )
}

export default Catalog;