import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const MovieCard = ({ genre, movies }) => {
  const navigate = useNavigate();

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const scrollLeft = () => {
    document.getElementById(genre).scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    document.getElementById(genre).scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="genre-section">
      <div className="genre-container">
        <div className="frame-7">
          <span className="genre-title">{genre}</span>
        </div>
        <div className="line"></div>
        <div className="scroll-button" onClick={scrollLeft}>
          <div className="scroll-icon">&#9664;</div>
        </div>
        <div className="scroll-button" onClick={scrollRight}>
          <div className="scroll-icon">&#9654;</div>
        </div>
      </div>
      <div className="genre-movies" id={genre}>
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="movie-image" />
            <button onClick={() => handleMovieClick(movie.id)}>{movie.title}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCard;
