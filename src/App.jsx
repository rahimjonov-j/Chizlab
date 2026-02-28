
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./Layout"
import Hero from "./maincomponents/Hero"
import BooksInfo from "./ApiSec/BooksInfo"
import Cta from "./maincomponents/Cta"
import About from "./maincomponents/About"
import Login from "./maincomponents/Login"

import Allbooks from "./maincomponents/Allbooks"
import UserProfile from "./Profile/UserProfile"

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
          path: "about",
          element: <About />,
        },{
          path:"login",
          element:<Login/>
        },{
          path:"books",
          element:<Allbooks/>
        },{
          path:"profile",
          element:<UserProfile/>
        }
      ],
    },
  ])

  return <RouterProvider router={router} />
}