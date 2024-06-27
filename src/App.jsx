
// rrd
import { createBrowserRouter, RouterProvider } from "react-router-dom"

// pages
import { Home, Login, Register } from './pages'

// layout
import MainLayout from './layout/MainLayout'

// hooks

function App() {
  let routes = createBrowserRouter([
    {
      path: `/`,
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />
        }
      ]
    },
    {
      path: `/login`,
      element: <Login />
    },
    {
      path: `/register`,
      element: <Register />
    }
  ])

  return <RouterProvider router={routes} />
}

export default App