import {
  createBrowserRouter,
  Navigate
} from "react-router-dom";

import App from './App.tsx'
import NotFound from './pages/NotFound.tsx';
import Catalog from './pages/Catalog.tsx';
import Favorites from './pages/Favorites.tsx';
import Watched from './pages/Watched.tsx';
import MyList from './pages/MyList.tsx';
import Movie from './pages/Movie.tsx';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Catalog />
      },
      {
        path: "/movies",
        element: <Navigate to="/" />
      },
      {
        path: "/favorites",
        element: <Favorites />
      },
      {
        path: "/watched",
        element: <Watched />
      },
      {
        path: "/my-list",
        element: <MyList />
      },
      {
        path: "/movies/:id",
        element: <Movie />
      },
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]);