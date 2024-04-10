import { Movie } from "@/types/Movie";

interface Props {
  list: Movie[]
}

function CatalogList({ list }: Props) {
  return (
    <div>{list.map((movie) => (
      <div>{movie.id}</div>
    ))}</div>
  )
}

export default CatalogList;