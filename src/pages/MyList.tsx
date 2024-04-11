import CatalogList from "@/components/catalogList";
import { useAppSelector } from "@/redux/hooks";

function MyList() {
  const { moviesList } = useAppSelector((state) => state.list)
  return (
    <>
      <h1>MyList</h1>
      <section className="py-10">
        <div className="container">
          {moviesList ? <CatalogList list={moviesList} /> : <div>no data</div>}
        </div>
      </section>
    </>
  )
}

export default MyList;