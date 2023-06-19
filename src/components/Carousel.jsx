import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Container } from 'react-bootstrap';

const responsive = {
  0: { items: 3 },
  568: { items: 5 },
  1024: { items: 8 },
};

const Carousel = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }&page=1`
      );
      setMovies(response.data.results);
    };

    fetchMovies();
  }, []);

  const items = movies.map((movie) => (
    <>
      <div key={movie.id} className="item" data-value={movie.id}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="poster"
        />
        <a className="vote">{Math.round(movie?.vote_average * 10) / 10}</a>
        <h2 className="title">{movie.title}</h2>
      </div>
    </>
  ));

  return (
    <Container>
      <h2>Trending Movies</h2>
      <AliceCarousel
        mouseTracking
        items={items}
        responsive={responsive}
        controlsStrategy="responsive"
        autoPlayInterval="1000"
        autoPlay
        disableButtonsControls
        infinite
      />
    </Container>
  );
};

export default Carousel;
