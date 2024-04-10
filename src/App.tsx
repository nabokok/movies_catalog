import { Outlet } from "react-router-dom";
import useFetch from "./hooks/useFetch"
import Header from "./components/header";

const API_URL = 'http://localhost:3000/movies';

function App() {

  const { data, loading, error } = useFetch(API_URL);

  console.log('data: ', data)
  console.log('loading: ', loading)
  console.log('error: ', error)

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
