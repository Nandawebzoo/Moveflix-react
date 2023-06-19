import React, { useEffect, useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import MoveflixCard from '../components/MoveflixCard';
import { tmdbService } from '../services/tmdb.service';
import MovieModal from '../components/MovieModal';

function Library() {
  const [movieList, setMovieList] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const [movieId, setMovieId] = useState(undefined);
  const handleClose = () => setMovieId(undefined);

  useEffect(() => {
    if (selectedGenre === null) {
      tmdbService.getMoviesbyGenre().then((data) => {
        setMovieList(data.items);
      });
    } else {
      tmdbService.getMoviesbyGenre(selectedGenre).then((data) => {
        setMovieList(data.items);
      });
    }
  }, [selectedGenre]);

  const genres = [
    { title: 'Select Genre', id: null },
    { title: 'Action', id: 28 },
    { title: 'Western', id: 37 },
    { title: 'Sci-fi', id: 878 },
    { title: 'Comedy', id: 35 },
    { title: 'Horror', id: 27 },
    { title: 'Fantasy', id: 14 },
    { title: 'Thriller', id: 53 },
  ];

  const options = genres.map((genre) => (
    <option value={genre.id} key={genre.id}>
      {genre.title}
    </option>
  ));

  const handleGenreChange = (event) => {
    setSelectedGenre(parseInt(event.target.value));
  };

  return (
    <>
      <h1>Library</h1>

      <Form.Select aria-label="Default select example" onChange={handleGenreChange}>
        {options}
      </Form.Select>

      <br />

      <div className="row movie-row">
        {movieList.map((item) => (
          <MoveflixCard
            key={item.id}
            imageUrl={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
            onShowDetails={() => setMovieId(item.id)}
            className="movie-img"
          />
        ))}
      </div>
      <MovieModal show={movieId !== undefined} movieId={movieId} onHide={handleClose} />
    </>
  );
}

export default Library;
