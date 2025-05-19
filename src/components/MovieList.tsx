import React, { useState } from 'react';
import type { Movie } from '../types'; // Changed to type-only import
import MovieForm from './MovieForm'; // Import MovieForm for editing

interface MovieListProps {
  movies: Movie[];
  onDeleteMovie: (id: string) => void;
  onEditMovie: (movie: Movie) => void;
}

const MovieList: React.FC<MovieListProps> = ({ movies, onDeleteMovie, onEditMovie }) => {
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  const handleEdit = (movie: Movie) => {
    setEditingMovie(movie);
  };

  const handleSaveEdit = (editedMovieData: Omit<Movie, 'id'>) => {
    if (editingMovie) {
      onEditMovie({ ...editedMovieData, id: editingMovie.id });
      setEditingMovie(null); // Close the edit form
    }
  };

  if (movies.length === 0) {
    return <p>No hay películas en tu lista. ¡Agrega algunas!</p>;
  }

  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <li key={movie.id} className="movie-item">
          {editingMovie && editingMovie.id === movie.id ? (
            <MovieForm 
              onMovieSubmit={handleSaveEdit} 
              initialData={movie} 
              isEditMode 
              onCancelEdit={() => setEditingMovie(null)}
            />
          ) : (
            <>
              <img src={movie.poster} alt={movie.title} />
              <div className="movie-details">
                <h2>{movie.title}</h2>
                <p>{movie.year}</p>
              </div>
              <div className="movie-actions">
                <button onClick={() => handleEdit(movie)}>Editar</button>
                <button onClick={() => onDeleteMovie(movie.id)}>Eliminar</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
