import './App.css'
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useUser } from './context/userContext/userContext';
import { useAuth } from './context/authContext/authContext';
import axios from 'axios';
import apiService from './utilities/apiService.mjs';



// Pages
import AuthPage from './pages/AuthPage/AuthPage';
import Dashboard from './pages/DashBoard/DashBoard';
import HomePage from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/SearchPage';

// Components
import ProtectedRoutes from './components/ProtectedRoutes';
import Nav from './components/Nav/Nav';

function App() {
  const { cookies, logout } = useAuth();
  const { setUser } = useUser();

  async function getData() {
    try {
      if (cookies.token) {
        let res = await apiService.getUser(cookies.token);

        setUser(res);
      }
    } catch (err) {
      logout();
      console.error(err.message);
    }
  }

  useEffect(() => {
    getData
  }, [cookies.token])




  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route element={<ProtectedRoutes />} >
          <Route path='/dash' element={<Dashboard />} />
        </Route>
      </Routes>


    </>
  )
}

export default App
