import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import SignupForm from './components/SignUpForm';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';
import CircularWithValueLabel from './components/CircularWithValueLabel';
import { SparklesCore } from './components/Sparkles';
import './App.css';
import './MovieDetail.css';
import image from './assets/image.jpg';

const App = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=81f382d33088c6d52099a62eab51d967&language=en-US');
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setTimeout(() => setIsLoading(false), 2000);
      }
    };

    fetchMovies();
  }, []);

  const genreMapping = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western'
  };

  const getGenreNameById = (id) => {
    return genreMapping[id] || 'Unknown';
  };

  const groupMoviesByGenre = (movies) => {
    const genres = {};

    movies.forEach(movie => {
      movie.genre_ids.forEach(genreId => {
        const genre = getGenreNameById(genreId);
        if (!genres[genre]) {
          genres[genre] = [];
        }
        genres[genre].push(movie);
      });
    });

    return genres;
  };

  const genres = groupMoviesByGenre(movies);
  
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#ffffff'
      }}>
        <CircularWithValueLabel />
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <SparklesCore
          particleColor="#ffffff"
          particleDensity={150}
          background="#0d47a1"
          minSize={1}
          maxSize={3}
          speed={4}
        />
        <NavBar setShowSignUp={setShowSignUp} />
        <SignupForm open={showSignUp} onClose={() => setShowSignUp(false)} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="background-container">
                  <img src={image} alt="Background" />
                  <div className="overlay"></div>
                  <div className="content">
                    <h1>MovieStreamer</h1>
                  </div>
                  <div className="content1">
                    <h3>Enjoy Watching</h3>
                  </div>
                  <div className="content2">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod<br />
                    tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci<br />
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod<br />
                    tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud<br />
                    exerc.
                  </div>
                  <div className="content3">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod<br />
                    tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci<br />
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod<br />
                    tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud<br />
                    exerc.
                  </div>
                </div>
                <div className="movie-cards-container">
                  {Object.keys(genres).map((genre) => (
                    <MovieCard
                      key={genre}
                      genre={genre}
                      movies={genres[genre]}
                    />
                  ))}
                </div>
              </>
            }
          />
          <Route path="/movie/:movieId" element={<MovieDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
