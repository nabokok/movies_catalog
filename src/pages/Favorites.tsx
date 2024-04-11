import CatalogList from "@/components/catalogList";
import { useAppSelector } from "@/redux/hooks";
import { getFilteredMovies } from "@/services/getFilteredMovies";

function Favorites() {
  const { favoritesList } = useAppSelector((state) => state.favorites);
  const { query } = useAppSelector(state => state.search);
  const movies = getFilteredMovies(query, favoritesList);

  return (
    <section className="py-10">
      <div className="container">
        <h1 className="text-2xl mb-6">Favorites</h1>
        {movies?.length ? <CatalogList list={movies} /> : <div>no data</div>}
      </div>
    </section>
  )
}

export default Favorites;