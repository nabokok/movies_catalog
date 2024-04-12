import CatalogList from "@/components/CatalogList";
import NoResult from "@/components/NoResult";
import { useAppSelector } from "@/redux/hooks";
import { getFilteredMovies } from "@/services/getFilteredMovies";

function MyList() {
  const { moviesList } = useAppSelector((state) => state.list);
  const { query } = useAppSelector(state => state.search);
  const movies = getFilteredMovies(query, moviesList);

  return (
    <section className="py-10">
      <div className="container">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">My List</h1>
        {movies?.length ? <CatalogList list={movies} /> : <NoResult text="There are no movies here yet" />}
      </div>
    </section>

  )
}

export default MyList;
