import './styles.scss'
import { createBrowserRouter,RouterProvider,Route,Outlet, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import LeftBar from './components/LeftBar/LeftBar'
import RightBar from './components/RightBar/RightBar'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Profile from './pages/Profile/Profile'
import Home from './pages/Home/Home';
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext.jsx';
import { AuthContext } from './context/authContext';
import { QueryClient,QueryClientProvider,useQuery } from '@tanstack/react-query';
import Search from "./pages/Search/Search"
import Spinner from './components/Spinner/Spinner';
import Activity from './pages/Activity/Activity';
function App() {

  const {currentUser, loading} = useContext(AuthContext)
  const {darkMode} = useContext(DarkModeContext)

  const queryClient = new QueryClient()

const Layout = ()=>{
  return (
    <QueryClientProvider   client={queryClient}>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <Navbar />
      <div style={{display:'flex'}}>
        <LeftBar />
        <div style={{flex:6}} >
          <Outlet />
        </div>
        <RightBar />
      </div>
    </div>
     </QueryClientProvider>
    
  )
}

const ProtectedRoute = ({children})=>{
  if(!currentUser){
    return <Navigate  to="/login" />
  }
  return children
}

const router = createBrowserRouter([
  {
    path:"/",
    element: <ProtectedRoute>
    <Layout />
  </ProtectedRoute> ,
    children:[
      {
        path:"/",
        element:<Home />
      },
      {
        path:"/profile/:id",
        element:<Profile />
      },
      {
        path:"/search/:searchTerm",
        element:<Search />,
      },
      {
        path:"/activity",
        element:<Activity />
      }
    ]
  },
  {
    path:"/login",
    element: <Login/>,
  },{
    path:"/register",
    element: <Register/>,
  }
])



  return <div>
   {loading ? (
    <Spinner />
   ): (
    <RouterProvider router={router} />
   )
   }
 
 

</div>
}

export default App;
