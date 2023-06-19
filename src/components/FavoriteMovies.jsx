import React, { useContext } from 'react';
import { FavoriteContext } from '../App';

const FavoriteMovies = () => {
  const { favorites } = useContext(FavoriteContext);

  return (
    <div className="row fav-row">
      <h1>My Favorite Movies</h1>
      <ul className="ul-favorite">
        {favorites?.map((movie) => (
          <li key={movie.id} className="col-md-2 li-favorite">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="poster-fav"
            />
            {movie.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteMovies;
