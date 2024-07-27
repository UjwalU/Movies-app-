import React from "react";
import MovieCard from "./components/MovieCard";

const MovieList = () => {
  const movies = [
    {
      image: "path/to/comedy.jpg",
      title: "Comedy Movie",
      genre: "comedy",
    },
    {
      image: "path/to/thriller.jpg",
      title: "Thriller Movie",
      genre: "thriller",
    },
    {
      image: "path/to/drama.jpg",
      title: "Drama Movie",
      genre: "drama",
    },
  ];

  return (
    <div>
      {movies.map((movie, index) => (
        <MovieCard key={index} {...movie} />
      ))}
    </div>
  );
};

export default MovieList;
