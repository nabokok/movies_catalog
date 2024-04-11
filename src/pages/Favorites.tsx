import CatalogList from "@/components/catalogList";
import { useAppSelector } from "@/redux/hooks";
import { getFilteredMovies } from "@/services/getFilteredMovies";

function Favorites() {
  const { favoritesList } = useAppSelector((state) => state.favorites);
  const { query } = useAppSelector(state => state.search);
  const movies = getFilteredMovies(query, favoritesList);

  return (
    <>
      <h1>Favorites</h1>
      <section className="py-10">
        <div className="container">
          {movies ? <CatalogList list={movies} /> : <div>no data</div>}
        </div>
      </section>
    </>
  )
}

export default Favorites;