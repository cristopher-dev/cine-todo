import React, { useState, useEffect } from 'react';
import type { Movie } from '../types';

interface MovieFormProps {
  onMovieSubmit: (movie: Omit<Movie, 'id'>) => void;
  initialData?: Movie;
  isEditMode?: boolean;
  onCancelEdit?: () => void;
}

const MovieForm: React.FC<MovieFormProps> = ({ onMovieSubmit, initialData, isEditMode, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [poster, setPoster] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setYear(initialData.year || '');
      setPoster(initialData.poster || '');
      setError('');
    } else {
      setTitle('');
      setYear('');
      setPoster('');
      setError('');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !year || !poster) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    if (!/^\d{4}$/.test(year)) {
      setError('El año debe ser un número de 4 dígitos.');
      return;
    }
    try {
      new URL(poster);
    } catch {
      setError('La URL del póster no es válida.');
      return;
    }
    setError('');
    // Guarda los datos de la película
    if (typeof onMovieSubmit === 'function') {
      onMovieSubmit({ title, year, poster });
    } else {
      setError('Error interno: La acción de guardar no está disponible en este momento.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="movie-form">
      {error && <p className="error">{error}</p>}
      <div>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="year">Año:</label>
        <input
          type="text"
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="poster">Póster (URL):</label>
        <input
          type="text"
          id="poster"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
        />
      </div>
      <div className="form-buttons">
        <button type="submit">{isEditMode ? 'Guardar Cambios' : 'Agregar Película'}</button>
        {isEditMode && onCancelEdit && (
          <button type="button" onClick={onCancelEdit} className="cancel-button">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default MovieForm;
