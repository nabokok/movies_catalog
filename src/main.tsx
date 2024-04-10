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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <div>home</div>
      },
      {
        path: "/movies",
        element: <Navigate to="/" />
      },
      {
        path: "/favorites",
        element: <div>favorites</div>
      },
      {
        path: "/watched",
        element: <div>watched</div>
      },
      {
        path: "/my-list",
        element: <div>my list</div>
      },
      {
        path: "/movies/:id",
        element: <div>id</div>
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
