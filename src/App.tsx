import { useState, useEffect } from 'react';
import './App.css';
import type { Movie } from './types.ts';
import MovieForm from './components/MovieForm.tsx';
import MovieList from './components/MovieList.tsx';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [sortOrder, setSortOrder] = useState<'alphabetical' | 'year'>('alphabetical');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedMovies = localStorage.getItem('movies');
    if (storedMovies) {
      setMovies(JSON.parse(storedMovies));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  const addMovie = (movie: Omit<Movie, 'id'>) => {
    setMovies([...movies, { ...movie, id: crypto.randomUUID() }]);
  };

  const deleteMovie = (id: string) => {
    setMovies(movies.filter(movie => movie.id !== id));
  };

  const editMovie = (updatedMovie: Movie) => {
    setMovies(movies.map(movie => movie.id === updatedMovie.id ? updatedMovie : movie));
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
      <h1>Mis Películas Favoritas</h1>
      <MovieForm onAddMovie={addMovie} />
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
      <MovieList movies={sortedMovies} onDeleteMovie={deleteMovie} onEditMovie={editMovie} />
    </div>
  );
}

export default App;
