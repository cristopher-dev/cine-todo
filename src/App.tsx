import { useState, useEffect, useCallback } from 'react';
import './App.css';
import type { Movie } from './types.ts';
import MovieForm from './components/MovieForm.tsx';
import MovieList from './components/MovieList.tsx';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoaded, setIsLoaded] = useState(false); // Nuevo estado para rastrear la carga inicial
  const [sortOrder, setSortOrder] = useState<'alphabetical' | 'year'>('alphabetical');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null); // Estado para la película en edición

  // useEffect para localStorage (sin cambios)
  useEffect(() => {
    console.log("Intentando cargar películas desde localStorage...");
    const storedMovies = localStorage.getItem('movies');
    if (storedMovies) {
      try {
        const parsedMovies = JSON.parse(storedMovies);
        console.log("Películas parseadas correctamente:", parsedMovies);
        setMovies(parsedMovies);
      } catch (error) {
        console.error("Error al parsear películas desde localStorage:", error);
        // localStorage.removeItem('movies');
      }
    } else {
      console.log("No se encontraron películas en localStorage.");
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      console.log("Intentando guardar películas en localStorage:", movies);
      localStorage.setItem('movies', JSON.stringify(movies));
      console.log("Películas guardadas en localStorage.");
    }
  }, [movies, isLoaded]);

  const addMovie = useCallback((movie: Omit<Movie, 'id'>) => {
    setMovies(prevMovies => [...prevMovies, { ...movie, id: crypto.randomUUID() }]);
  }, []);

  const deleteMovie = useCallback((id: string) => {
    setMovies(prevMovies => prevMovies.filter(movie => movie.id !== id));
  }, []);

  const editMovieInternal = useCallback((updatedMovie: Movie) => {
    setMovies(prevMovies => prevMovies.map(movie => movie.id === updatedMovie.id ? updatedMovie : movie));
  }, []);

  // Maneja el envío del formulario tanto para agregar como para editar
  // Se elimina useCallback para probar si resuelve el problema de 'undefined'
  const handleFormSubmit = (movieData: Omit<Movie, 'id'>) => {
    if (editingMovie) {
      editMovieInternal({ ...movieData, id: editingMovie.id });
      setEditingMovie(null); // Sale del modo edición, resetea el formulario vía 'key'
    } else {
      addMovie(movieData);
    }
  };

  // Inicia el modo edición para una película
  const handleStartEdit = useCallback((movie: Movie) => {
    setEditingMovie(movie);
  }, [setEditingMovie]); // setEditingMovie es estable

  // Cancela el modo edición
  // Se elimina useCallback para probar si resuelve el problema de 'undefined'
  const handleCancelEdit = () => {
    setEditingMovie(null); // Sale del modo edición, resetea el formulario vía 'key'
  };

  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (sortOrder === 'alphabetical') {
      return a.title.localeCompare(b.title);
    }
    return parseInt(a.year) - parseInt(b.year);
  });

  return (
    <div className="App">
      <h1>{editingMovie ? 'Editar Película' : 'Mis Películas Favoritas'}</h1>
      <MovieForm
        key={editingMovie ? editingMovie.id : 'add-form'} // Clave para forzar reseteo del estado interno del formulario
        onMovieSubmit={handleFormSubmit} // Prop unificada para submit
        initialData={editingMovie || undefined} // Datos iniciales para edición
        isEditMode={!!editingMovie} // Indica si está en modo edición
        onCancelEdit={handleCancelEdit} // Prop para manejar la cancelación
      />
      <div className="controls">
        <input 
          type="text" 
          placeholder="Buscar por título..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div>
          <label htmlFor="sortOrder">Ordenar por: </label>
          <select id="sortOrder" value={sortOrder} onChange={(e) => setSortOrder(e.target.value as 'alphabetical' | 'year')}>
            <option value="alphabetical">Alfabéticamente</option>
            <option value="year">Año</option>
          </select>
        </div>
      </div>
      <MovieList
        movies={sortedMovies}
        onDeleteMovie={deleteMovie}
        onEditMovie={handleStartEdit} // Prop para iniciar la edición
      />
    </div>
  );
}

export default App;
