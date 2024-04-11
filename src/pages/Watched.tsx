import CatalogList from "@/components/catalogList";
import { useAppSelector } from "@/redux/hooks";
import { getFilteredMovies } from "@/services/getFilteredMovies";

function Watched() {
  const { watchedList } = useAppSelector((state) => state.watched);
  const { query } = useAppSelector(state => state.search);
  const movies = getFilteredMovies(query, watchedList);

  return (
    <section className="py-10">
      <div className="container">
        <h1 className="text-2xl mb-6">Watched</h1>
        {movies?.length ? <CatalogList list={movies} /> : <div>no data</div>}
      </div>
    </section>
  )
}

export default Watched;