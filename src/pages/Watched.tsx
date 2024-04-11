import CatalogList from "@/components/catalogList";
import { useAppSelector } from "@/redux/hooks";
import { getFilteredMovies } from "@/services/getFilteredMovies";

function Watched() {
  const { watchedList } = useAppSelector((state) => state.watched);
  const { query } = useAppSelector(state => state.search);
  const movies = getFilteredMovies(query, watchedList);

  return (
    <>
      <h1>Watched</h1>
      <section className="py-10">
        <div className="container">
          {movies ? <CatalogList list={movies} /> : <div>no data</div>}
        </div>
      </section>
    </>
  )
}

export default Watched;