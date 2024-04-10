import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";

import App from './App.tsx'
import './assets/globals.css'
import NotFound from './pages/NotFound.tsx';
import Catalog from './pages/Catalog.tsx';
import Favorites from './pages/Favorites.tsx';
import Watched from './pages/Watched.tsx';
import MyList from './pages/MyList.tsx';
import Movie from './pages/Movie.tsx';

const router = createBrowserRouter([
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
