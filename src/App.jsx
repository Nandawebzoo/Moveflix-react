import React, { useState, useEffect, createContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import AppShell from './components/appshell';
import Homepage from './pages/Homepage';
import Library from './pages/Library';
import Contact from './pages/Contact';
import Authenticated from './pages/Authenticated';
import axios from 'axios';

export const SessionContext = createContext(null);
export const FavoriteContext = createContext(null);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AppShell />}>
        <Route index element={<Homepage />} />
        <Route path="Library" element={<Library />} />
        <Route path="Contact" element={<Contact />} />
      </Route>
      <Route path="authenticated" element={<Authenticated />}></Route>
    </>
  )
);

function App() {
  const [session, setSession] = useState(null);
  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    const sessionId = localStorage.getItem('sessionId');

    if (sessionId) {
      getUserDetails(sessionId);
    }
  }, []);

  async function getUserDetails(sessionId) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/account?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }&session_id=${sessionId}`
      );
      const userDetails = response.data;
      setSession({ sessionId, userDetails });

      const favoriteRes = await axios.get(
        `https://api.themoviedb.org/3/account/${userDetails.id}/favorite/movies?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }&session_id=${sessionId}`
      );
      const favorites = favoriteRes.data.results;
      setFavorites(favorites);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <SessionContext.Provider value={session}>
        <FavoriteContext.Provider value={{ favorites, setFavorites }}>
          <RouterProvider router={router} />
        </FavoriteContext.Provider>
      </SessionContext.Provider>
    </>
  );
}

export default App;
