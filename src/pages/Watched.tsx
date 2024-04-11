import CatalogList from "@/components/catalogList";
import { useAppSelector } from "@/redux/hooks";

function Watched() {
  const { watchedList } = useAppSelector((state) => state.watched)
  return (
    <>
      <h1>Watched</h1>
      <section className="py-10">
        <div className="container">
          {watchedList ? <CatalogList list={watchedList} /> : <div>no data</div>}
        </div>
      </section>
    </>
  )
}

export default Watched;