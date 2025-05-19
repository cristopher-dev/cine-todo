import React, { useState, useEffect } from 'react';
import type { Movie } from '../types';

interface MovieFormProps {
  onMovieSubmit: (movie: Omit<Movie, 'id'>) => void;
  initialData?: Movie; // Permitir que initialData sea Movie completa (con id)
  isEditMode?: boolean;
  onCancelEdit?: () => void; // Nueva prop para cancelar edición
}

const MovieForm: React.FC<MovieFormProps> = ({ onMovieSubmit, initialData, isEditMode, onCancelEdit }) => {
  // Inicializar los estados

  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [poster, setPoster] = useState('');
  const [error, setError] = useState('');

  // Efecto para actualizar el formulario cuando initialData cambia (para edición)
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setYear(initialData.year || '');
      setPoster(initialData.poster || '');
      setError(''); // Limpiar errores al cargar nuevos datos iniciales
    } else {
      // Limpiar formulario si no hay datos iniciales (ej. al cancelar edición o agregar nuevo)
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
    // La limpieza del formulario ahora se maneja con el cambio de 'key' en App.tsx
    // o con el useEffect si initialData se vuelve undefined.
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
