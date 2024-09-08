import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactStars from 'react-stars';
import '../MovieDetail.css';
import CircularWithValueLabel from './CircularWithValueLabel';
import calIcon from '../assets/cal.png';
import genIcon from '../assets/gen.png';
import langIcon from '../assets/lang.png';
import starIcon from '../assets/Star 5.png';
import notfound from '../assets/notfound.png';  
import TrailerModal from './TrailerModal';

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imdbRating, setImdbRating] = useState(null);
  const [streamvibeRating, setStreamvibeRating] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null); // State to store the trailer key
  const [showTrailer, setShowTrailer] = useState(false); // State to control trailer modal visibility

  const fetchMovieDetails = async () => {
    try {
      const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=81f382d33088c6d52099a62eab51d967&language=en-US`);
      const movieData = movieResponse.data;
      setMovie(movieData);

      const imdb = movieData.vote_average / 2;

      if (imdb === 0) {
        setImdbRating('0.0');
        setStreamvibeRating('0.0');
      } else {
        setImdbRating(imdb.toFixed(1));

        const randomOffset = (Math.random() * (0.8 - 0.3) + 0.3).toFixed(1);
        const streamvibe = (imdb - parseFloat(randomOffset)).toFixed(1);
        setStreamvibeRating(streamvibe);
      }

      const languagesResponse = await axios.get(`https://api.themoviedb.org/3/configuration/languages?api_key=81f382d33088c6d52099a62eab51d967`);
      setLanguages(languagesResponse.data);

      // Fetch trailer information
      const trailerResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=81f382d33088c6d52099a62eab51d967`);
      const trailerData = trailerResponse.data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
      if (trailerData) {
        setTrailerKey(trailerData.key);
      }

    } catch (error) {
      console.error('Error fetching movie details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return (
      <div className="loading-container">
        <CircularWithValueLabel value={80} /> 
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="notfound-container">
        <img src={notfound} alt="Not Found" className="notfound" />
      </div>
    );
  }

  const backgroundImage = movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : 
                      movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : 
                      notfound;

  return (
    <div>
      <div className="background-container1">
        <img src={backgroundImage} alt={movie.title} />
        <div className="overlay1"></div>
        <div className="contentDetail">
          <h1>{movie.title}</h1>
          <p className="overview">{movie.overview}</p>
          <button className="play-now-button" onClick={() => setShowTrailer(true)}>Play Now</button>
        </div>
      </div>
      <div className="additional-info">
        <div className="info-frame">
          <h3>Description</h3>
          <p className="description-p">{movie.overview}</p>
        </div>
        <div className="info-frame">
          <h3><img src={calIcon} alt="Calendar Icon" className="cal-icon" />Release Year</h3>
          <p className="infop"><strong></strong> {new Date(movie.release_date).getFullYear()}</p>
          <h3><img src={langIcon} alt="Language Icon" className="lang-icon" />Original Language</h3>
          <p className="lang-tag"><strong></strong> {movie.original_language.toUpperCase()}</p>
        </div>
        <div className="info-frame rating-frame">
          <h3><img src={starIcon} alt="Star Icon" className="star-icon" />Ratings</h3>
          <div className="rating-container">
            <div className="rating-sub-container">
              <h3>IMDb</h3>
              <div className="stars-container">
                <ReactStars
                  count={5}
                  value={parseFloat(imdbRating)}
                  size={24}
                  color2={'#E50000'}
                  half={true}
                  edit={false}
                />
                <span>{imdbRating}</span>
              </div>
            </div>
            <div className="rating-sub-container">
              <h3 className="streamvibe-heading">StreamVibe</h3>
              <div className="stars-container">
                <ReactStars
                  count={5}
                  value={parseFloat(streamvibeRating)}
                  size={24}
                  color2={'#E50000'}
                  half={true}
                  edit={false}
                />
                <span>{streamvibeRating}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="info-frame genre-frame">
          <h3><img src={genIcon} alt="Genre Icon" className="gen-icon" />Genres</h3>
          <div className="genres-container">
            {movie.genres.map(genre => (
              <span key={genre.id} className="genre-tag">{genre.name}</span>
            ))}
          </div>
        </div>
      </div>

      {trailerKey && (
        <TrailerModal 
          show={showTrailer} 
          trailerKey={trailerKey} 
          onClose={() => setShowTrailer(false)} 
        />
      )}
    </div>
  );
};

export default MovieDetail;