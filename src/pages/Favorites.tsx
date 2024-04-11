import CatalogList from "@/components/catalogList";
import { useAppSelector } from "@/redux/hooks";

function Favorites() {
  const { favoritesList } = useAppSelector((state) => state.favorites)
  return (
    <>
      <h1>Favorites</h1>
      <section className="py-10">
        <div className="container">
          {favoritesList ? <CatalogList list={favoritesList} /> : <div>no data</div>}
        </div>
      </section>
    </>
  )
}

export default Favorites;