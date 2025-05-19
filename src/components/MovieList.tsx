import React from 'react';
import type { Movie } from '../types';

interface MovieListProps {
  movies: Movie[];
  onDeleteMovie: (id: string) => void;
  onEditMovie: (movie: Movie) => void;
}

const MovieList: React.FC<MovieListProps> = ({ movies, onDeleteMovie, onEditMovie }) => {
  if (movies.length === 0) {
    return <p>No hay películas en tu lista. ¡Agrega algunas!</p>;
  }

  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <li key={movie.id} className="movie-item">
          <>
            <img src={movie.poster} alt={movie.title} />
            <div className="movie-details">
              <h2>{movie.title}</h2>
              <p>{movie.year}</p>
            </div>
            <div className="movie-actions">
              <button onClick={() => onEditMovie(movie)}>Editar</button>
              <button onClick={() => onDeleteMovie(movie.id)}>Eliminar</button>
            </div>
          </>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
