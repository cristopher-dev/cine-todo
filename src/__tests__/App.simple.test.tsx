import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Prueba simplificada de App
describe('App Component (Simple)', () => {
  beforeEach(() => {
    // Limpiamos cualquier mock anterior
    jest.clearAllMocks();
    
    // Configurar localStorage mock
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(),
        clear: jest.fn()
      },
      writable: true
    });
  });
  
  test('renderiza los elementos principales', () => {
    render(<App />);
    
    // Verificamos que los elementos básicos estén presentes
    expect(screen.getByText(/CineTodo/i)).toBeInTheDocument();
    expect(screen.getByText(/No hay películas en tu lista/i)).toBeInTheDocument();
  });
});
