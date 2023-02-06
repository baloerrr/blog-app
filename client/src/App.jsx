import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useNavigate,
  Navigate,
  Route,
  Routes,
  BrowserRouter,
} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Write from './pages/Write.jsx'
import { Layout } from './components/'
import './style.scss'
import { useContext } from 'react'
import { AuthContext } from './context/authContext.jsx'

// const Layout = () => {
//   return (
//     <>
//       <Navbar />
//       <Footer />
//     </>
//   )
// }

// const router = createBrowserRouter([

//   {
//     path:"/",
//     element: <Layout/>,
//     children: [
//       {
//         path: "/",
//         element: (
//           user ? <Home/> : <Navigate to="/login"/>
//         )
//       },
//       {
//         path: "/post/:id",
//         element: <Single/>,
//       },
//       {
//         path: "/write",
//         element: <Write/>,
//       },
//     ]
//   },
//   {
//     path: "/register",
//     element: <Register/>,
//   },
//   {
//     path: "/login",
//     element: <Login/>,
//   },
// ]);

const App = () => {
  const { user } = useContext(AuthContext)
  return (
    <div className="app">
      <div className="container">
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route
                path="/"
                element={user ? <Home /> : <Navigate to="/login" />}
              />
              <Route
                path="/write"
                element={user ? <Write /> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/register"
                element={!user ? <Register /> : <Navigate to="/" />}
              />
            </Routes>
          </Layout>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
