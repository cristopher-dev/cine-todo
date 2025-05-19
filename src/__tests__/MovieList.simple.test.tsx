import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieList from '../components/MovieList';

describe('MovieList Component (Simple)', () => {
  test('muestra mensaje cuando no hay películas', () => {
    render(
      <MovieList 
        movies={[]} 
        onDeleteMovie={() => {}} 
        onEditMovie={() => {}} 
      />
    );
    
    expect(screen.getByText('No hay películas en tu lista. ¡Agrega algunas!')).toBeInTheDocument();
  });
});
