import { useState, useEffect, useCallback } from 'react';
import './App.css';
import type { Movie } from './types.ts';
import MovieForm from './components/MovieForm.tsx';
import MovieList from './components/MovieList.tsx';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [sortOrder, setSortOrder] = useState<'alphabetical' | 'year'>('alphabetical');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  // useEffect para localStorage
  useEffect(() => {
    const storedMovies = localStorage.getItem('movies');
    if (storedMovies) {
      try {
        const parsedMovies = JSON.parse(storedMovies);
        setMovies(parsedMovies);
      } catch (error) {
        console.error("Error al parsear películas desde localStorage:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('movies', JSON.stringify(movies));
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

  const handleFormSubmit = (movieData: Omit<Movie, 'id'>) => {
    if (editingMovie) {
      editMovieInternal({ ...movieData, id: editingMovie.id });
      setEditingMovie(null); // Sale del modo edición, resetea el formulario vía 'key'
    } else {
      addMovie(movieData);
    }
  };

  const handleStartEdit = useCallback((movie: Movie) => {
    setEditingMovie(movie);
  }, [setEditingMovie]);

  const handleCancelEdit = () => {
    setEditingMovie(null);
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
      <h1>{editingMovie ? 'Editar Película' : 'CineTODO'}</h1>
      <MovieForm
        key={editingMovie ? editingMovie.id : 'add-form'}
        onMovieSubmit={handleFormSubmit}
        initialData={editingMovie || undefined}
        isEditMode={!!editingMovie}
        onCancelEdit={handleCancelEdit}
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
        onEditMovie={handleStartEdit}
      />
    </div>
  );
}

export default App;
