import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Hero from "./MainPage/Hero";
import BooksInfo from "./ApiSec/BooksInfo";
import Cta from "./MainPage/Cta";
import About from "./MainPage/About";
import Login from "./MainPage/Login";
import Information from "./MainPage/information";
import Registr from "./auth/Registr";

import Allbooks from "./MainPage/Allbooks";
import UserProfile from "./Profile/UserProfile";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,

      children: [
        {
          index: true,
          element: (
            <>
              <Hero />
              <BooksInfo />
              <Cta />
            </>
          ),
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/auth/registr",
          element: <Registr />,
        },
        {
          path: "/books",
          element: <Allbooks />,
        },
        {
          path: "/profile",
          element: <UserProfile />,
        },
        {
          path: "/information/:id",
          element: <Information />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
