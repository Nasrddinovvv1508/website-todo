
// rrd
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"

// redux
import { useDispatch, useSelector } from "react-redux"

// pages
import { Home, Login, Register, Profile } from './pages'

// layout
import MainLayout from './layout/MainLayout'

// actions
import { action as LoginAction } from './pages/Login'
import { action as RegisterAction } from './pages/Register'
import { action as HomeAction } from './pages/Home'
import { action as ProfileAction } from "./pages/Profile"

// components
import { ProtectedRoutes } from "./components"

// hooks
import { useEffect } from "react"

// firebase
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase/firebaseConfig"

import { isAuthChange, login, UpdateProfile } from "./app/userSlice"


function App() {
  let dispatch = useDispatch();

  let { user, isAuthReady } = useSelector((state) => state.user)

  let routes = createBrowserRouter([
    {
      path: `/`,
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
          action: HomeAction,
        },
        {
          path: `/profile`,
          element: <Profile />,
          action: ProfileAction,
        }
      ]
    },
    {
      path: `/login`,
      element: user ? <Navigate to={`/`} /> : <Login />,
      action: LoginAction,
    },
    {
      path: `/register`,
      element: user ? <Navigate to={`/`} /> : <Register />,
      action: RegisterAction,
    }
  ])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.displayName) {
        dispatch(login(user));
      }
      dispatch(isAuthChange())
    })
  }, [])

  return <>
    {isAuthReady && <RouterProvider router={routes} />}
  </>
}

export default App