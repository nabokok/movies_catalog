import CatalogList from "@/components/catalogList";
import { useAppSelector } from "@/redux/hooks";
import { getFilteredMovies } from "@/services/getFilteredMovies";

function MyList() {
  const { moviesList } = useAppSelector((state) => state.list);
  const { query } = useAppSelector(state => state.search);
  const movies = getFilteredMovies(query, moviesList);

  return (
    <section className="py-10">
      <div className="container">
        <h1 className="text-2xl mb-6">My List</h1>
        {movies?.length ? <CatalogList list={movies} /> : <div>no data</div>}
      </div>
    </section>

  )
}

export default MyList;