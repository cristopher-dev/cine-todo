import React, { useState } from 'react';
import type { Movie } from '../types'; // Use type-only import

interface MovieFormProps {
  onAddMovie: (movie: Omit<Movie, 'id'>) => void;
  initialData?: Omit<Movie, 'id'>;
  isEditMode?: boolean;
}

const MovieForm: React.FC<MovieFormProps> = ({ onAddMovie, initialData, isEditMode }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [year, setYear] = useState(initialData?.year || '');
  const [poster, setPoster] = useState(initialData?.poster || '');
  const [error, setError] = useState('');

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
    onAddMovie({ title, year, poster });
    if (!isEditMode) {
        setTitle('');
        setYear('');
        setPoster('');
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
      <button type="submit">{isEditMode ? 'Guardar Cambios' : 'Agregar Película'}</button>
    </form>
  );
};

export default MovieForm;
