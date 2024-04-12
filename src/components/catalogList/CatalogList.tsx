import { Movie } from "@/types/Movie";
import MovieCard from "../MovieCard";

interface Props {
  list: Movie[],
}

function CatalogList({ list }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {list.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

export default CatalogList;
