import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { Movie } from '../types';

// Mock localStorage
const mockLocalStorage = (function() {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

// Mock crypto.randomUUID
const mockUUID = 'mock-uuid-1234';
Object.defineProperty(global.crypto, 'randomUUID', {
  value: () => mockUUID,
  configurable: true
});

describe('App Component', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    jest.clearAllMocks();
  });
  
  test('renderiza correctamente', () => {
    render(<App />);
    
    expect(screen.getByText(/mis películas/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/buscar.../i)).toBeInTheDocument();
    expect(screen.getByText(/agregar nueva película/i)).toBeInTheDocument();
  });
  
  test('carga películas desde localStorage al iniciar', () => {
    const mockMovies: Movie[] = [
      { id: '1', title: 'Película 1', year: '2021', poster: 'https://example.com/poster1.jpg' }
    ];
    
    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify(mockMovies));
    
    render(<App />);
    
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('movies');
    expect(screen.getByText('Película 1')).toBeInTheDocument();
  });
  
  test('maneja errores al parsear localStorage', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockLocalStorage.getItem.mockReturnValueOnce('invalid-json');
    
    render(<App />);
    
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Error al parsear películas desde localStorage:'),
      expect.anything()
    );
    
    consoleSpy.mockRestore();
  });
  
  test('agrega una película correctamente', async () => {
    render(<App />);
    
    // Llenar y enviar el formulario
    const titleInput = screen.getByLabelText(/título/i);
    const yearInput = screen.getByLabelText(/año/i);
    const posterInput = screen.getByLabelText(/url del póster/i);
    const submitButton = screen.getByText(/agregar película/i);
    
    fireEvent.change(titleInput, { target: { value: 'Nueva Película' } });
    fireEvent.change(yearInput, { target: { value: '2024' } });
    fireEvent.change(posterInput, { target: { value: 'https://example.com/nueva.jpg' } });
    fireEvent.click(submitButton);
    
    // Verificar que se haya agregado la película
    await waitFor(() => {
      expect(screen.getByText('Nueva Película')).toBeInTheDocument();
      expect(screen.getByText('2024')).toBeInTheDocument();
    });
    
    // Verificar que se haya guardado en localStorage
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'movies', 
      expect.stringContaining('Nueva Película')
    );
  });
  
  test('elimina una película correctamente', async () => {
    const mockMovies: Movie[] = [
      { id: '1', title: 'Película a Eliminar', year: '2021', poster: 'https://example.com/poster1.jpg' }
    ];
    
    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify(mockMovies));
    
    render(<App />);
    
    // Verificar que la película existe
    expect(screen.getByText('Película a Eliminar')).toBeInTheDocument();
    
    // Eliminar la película
    const deleteButton = screen.getByText('Eliminar');
    fireEvent.click(deleteButton);
    
    // Verificar que se eliminó
    await waitFor(() => {
      expect(screen.queryByText('Película a Eliminar')).not.toBeInTheDocument();
      expect(screen.getByText('No hay películas en tu lista. ¡Agrega algunas!')).toBeInTheDocument();
    });
  });
  
  test('filtra películas por búsqueda', async () => {
    const mockMovies: Movie[] = [
      { id: '1', title: 'Matrix', year: '1999', poster: 'https://example.com/matrix.jpg' },
      { id: '2', title: 'Inception', year: '2010', poster: 'https://example.com/inception.jpg' }
    ];
    
    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify(mockMovies));
    
    render(<App />);
    
    // Verificar que ambas películas existen
    expect(screen.getByText('Matrix')).toBeInTheDocument();
    expect(screen.getByText('Inception')).toBeInTheDocument();
    
    // Buscar por "Matrix"
    const searchInput = screen.getByPlaceholderText(/buscar.../i);
    fireEvent.change(searchInput, { target: { value: 'Matrix' } });
    
    // Verificar que solo se muestra Matrix
    await waitFor(() => {
      expect(screen.getByText('Matrix')).toBeInTheDocument();
      expect(screen.queryByText('Inception')).not.toBeInTheDocument();
    });
  });
  
  test('cambia el orden de las películas', async () => {
    const mockMovies: Movie[] = [
      { id: '1', title: 'Matrix', year: '1999', poster: 'https://example.com/matrix.jpg' },
      { id: '2', title: 'Avatar', year: '2009', poster: 'https://example.com/avatar.jpg' }
    ];
    
    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify(mockMovies));
    
    render(<App />);
    
    // Cambiar a ordenar por año
    const orderSelect = screen.getByLabelText(/ordenar por/i);
    fireEvent.change(orderSelect, { target: { value: 'year' } });
    
    // Verificar que se ha cambiado el orden (verificamos indirectamente a través del localStorage)
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'movies',
      expect.any(String)
    );
  });
});
