import CatalogList from "@/components/catalogList";
import useFetch from "../hooks/useFetch"
import { Movie } from "@/types/Movie";

const API_URL = 'http://localhost:3000/movies';

function Catalog() {
  const { data, loading, error } = useFetch<Movie[]>(API_URL);

  console.log('data: ', data)
  console.log('loading: ', loading)
  console.log('error: ', error)

  if (error) {
    return <div>error</div>
  }

  if (loading) {
    return <div>loading</div>
  }

  return (
    <section className="py-10">
      <div className="container">
        {data ? <CatalogList list={data} /> : <div>no data</div>}
      </div>
    </section>
  )
}

export default Catalog;