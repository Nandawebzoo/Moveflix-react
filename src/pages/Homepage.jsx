import React from 'react';
import Hero from '../components/Hero';
import Carousel from '../components/Carousel';
import FavoriteMovies from '../components/FavoriteMovies';
import { SessionContext } from '../App';
import { useContext } from 'react';

function Homepage() {
  const session = useContext(SessionContext);

  return (
    <>
      <Hero />
      <Carousel />
      {session !== null && <FavoriteMovies />}
    </>
  );
}

export default Homepage;
