import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { tmdbService } from '../services/tmdb.service';
import { SessionContext, FavoriteContext } from '../App';

function MovieModal(props) {
  const [movie, setMovie] = useState();
  const session = useContext(SessionContext);
  const { favorites, setFavorites } = useContext(FavoriteContext);

  const handleClose = () => {
    props.onHide();
  };

  useEffect(() => {
    // Call API
    const fetchMovie = async () => {
      const data = await tmdbService.getMovie(props.movieId);
      setMovie(data);
    };

    if (props.movieId !== undefined) {
      fetchMovie();
    }

    console.log(session);
  }, [props.movieId]);

  const markAsFavorite = async (value, movie) => {
    try {
      await tmdbService.markAsFavorite(value, movie.id, session.userDetails.id, session.sessionId);
      if (value) {
        setFavorites([...favorites, movie]);
      } else {
        setFavorites(favorites.filter((x) => x.id !== movie.id));
      }
    } catch (error) {}
  };

  return (
    <>
      <Modal show={props.show} onHide={() => props.onHide()} className="movie-modal">
        <Modal.Body>
          <button type="button" className="btn-close" onClick={handleClose} aria-label="Close" />

          <div className="slider-box">
            <div className="slider-img">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                alt="poster"
                id="mainImage"
              />
            </div>

            <div className="slider-details">
              <strong id="modal-title">{movie?.title}</strong>
              <div className="btn-rat-fav">
                <div className="rating">{Math.round(movie?.vote_average * 10) / 10} </div>
                {favorites?.find((x) => x.id === movie?.id) ? (
                  <Button onClick={() => markAsFavorite(false, movie)}>
                    <i className="bi bi-heart-fill fav-btn"></i>
                  </Button>
                ) : (
                  <Button onClick={() => markAsFavorite(true, movie)}>
                    <i className="bi bi-heart fav-btn"></i>
                  </Button>
                )}
              </div>
              <p className="overview">{movie?.overview}</p>
              <div className="movie-cast" style={{ display: 'flex' }}>
                {movie?.credits.cast.slice(0, 6).map((actor) => (
                  <div key={actor.id}>
                    {actor.profile_path !== null && (
                      <img
                        title={actor.name}
                        src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="actions">
                <Button variant="secondary">Watch Trailer</Button>
                <Button variant="primary">
                  <i className="bi bi-play-fill p-btn" />
                  Play Now
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MovieModal;
