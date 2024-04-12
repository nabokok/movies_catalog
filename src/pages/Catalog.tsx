import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Loader2 } from "lucide-react"
import CatalogList from "@/components/CatalogList";
import { getFilteredMovies } from "@/services/getFilteredMovies";
import NoResult from "@/components/NoResult";
import { useEffect } from "react";
import { fetchMovies } from "@/redux/slices/moviesSlice";

function Catalog() {
  const { query } = useAppSelector(state => state.search);
  const { movies, loading, error } = useAppSelector(state => state.movies);
  const moviesList = getFilteredMovies(query, movies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMovies())
  }, [])

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
        {moviesList ? <CatalogList list={moviesList} /> : <NoResult text="No movies found" />}
      </div>
    </section>
  )
}

export default Catalog;
