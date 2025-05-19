import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieList from '../components/MovieList';

describe('MovieList Component', () => {
  const mockMovies = [
    { id: '1', title: 'Película 1', year: '2021', poster: 'https://example.com/poster1.jpg' },
    { id: '2', title: 'Película 2', year: '2022', poster: 'https://example.com/poster2.jpg' },
  ];

  const mockOnDeleteMovie = jest.fn();
  const mockOnEditMovie = jest.fn();

  test('muestra mensaje cuando no hay películas', () => {
    render(
      <MovieList movies={[]} onDeleteMovie={mockOnDeleteMovie} onEditMovie={mockOnEditMovie} />
    );
    expect(screen.getByText('No hay películas en tu lista. ¡Agrega algunas!')).toBeInTheDocument();
  });

  test('muestra la lista de películas correctamente', () => {
    render(
      <MovieList
        movies={mockMovies}
        onDeleteMovie={mockOnDeleteMovie}
        onEditMovie={mockOnEditMovie}
      />
    );

    expect(screen.getByText('Película 1')).toBeInTheDocument();
    expect(screen.getByText('Película 2')).toBeInTheDocument();
    expect(screen.getByText('2021')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });

  test('llama a onDeleteMovie cuando se hace clic en el botón Eliminar', () => {
    render(
      <MovieList
        movies={mockMovies}
        onDeleteMovie={mockOnDeleteMovie}
        onEditMovie={mockOnEditMovie}
      />
    );

    const deleteButtons = screen.getAllByText('Eliminar');
    fireEvent.click(deleteButtons[0]);
    expect(mockOnDeleteMovie).toHaveBeenCalledWith('1');
  });

  test('llama a onEditMovie cuando se hace clic en el botón Editar', () => {
    render(
      <MovieList
        movies={mockMovies}
        onDeleteMovie={mockOnDeleteMovie}
        onEditMovie={mockOnEditMovie}
      />
    );

    const editButtons = screen.getAllByText('Editar');
    fireEvent.click(editButtons[1]);
    expect(mockOnEditMovie).toHaveBeenCalledWith(mockMovies[1]);
  });
});
