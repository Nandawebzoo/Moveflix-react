import React, { useEffect, useState } from 'react';
import { tmdbService } from '../services/tmdb.service';
import { Alert } from 'react-bootstrap';

function Hero() {
  const [hero, setHero] = useState();

  useEffect(() => {
    const fetchHero = async () => {
      const data = await tmdbService.getMovie(603692);
      setHero(data);
    };

    fetchHero();
  }, []);

  return (
    <div className="container movie-details">
      <>
        <Alert variant="primary" className="alert">
          The new movie was added!
        </Alert>
      </>
      {hero !== undefined ? (
        <div className="row">
          <div className="col-md-6 left-box">
            <h1>{hero.title}</h1>
            <p>
              Sinopsis:
              <br />
              {hero.overview}
            </p>

            <p>
              <strong>
                Rating: <span>{(Math.round(hero.vote_average * 10) / 10) * 10}%</span>
              </strong>
            </p>

            <p>Cast:</p>
            <div className="casting">
              <img src="img/john-cast1.jpeg" title="Keanu Reeves" className="casting-img" />
              <img src="img/john-cast2.jpeg" title="Donnie Yen" className="casting-img" />
              <img src="img/john-cast3.jpeg" title="Scott Adkins" className="casting-img" />
              <img src="img/john-cast4.jpeg" title="Bill Skarsgard" className="casting-img" />
              <img src="img/john-cast5.jpeg" title="Asia Kate Dillon" className="casting-img" />
            </div>
            <a href="#" className="play-btn">
              <i className="bi bi-play-fill"></i>
              Watch Now
            </a>
          </div>
          <div className="col-md-6 text-center">
            <img src={`https://image.tmdb.org/t/p/w500${hero.poster_path}`} className="movie-img" />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Hero;
