import CatalogList from "@/components/catalogList";
import NoResult from "@/components/noResult";
import { useAppSelector } from "@/redux/hooks";
import { getFilteredMovies } from "@/services/getFilteredMovies";

function Watched() {
  const { watchedList } = useAppSelector((state) => state.watched);
  const { query } = useAppSelector(state => state.search);
  const movies = getFilteredMovies(query, watchedList);

  return (
    <section className="py-10">
      <div className="container">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">Watched</h1>
        {movies?.length ? <CatalogList list={movies} /> : <NoResult text="There are no movies here yet" />}
      </div>
    </section>
  )
}

export default Watched;