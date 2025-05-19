import { render, screen, fireEvent } from '@testing-library/react';
import MovieForm from '../components/MovieForm';
import { Movie } from '../types';

describe('MovieForm Component', () => {
  const mockSubmit = jest.fn();
  const mockCancel = jest.fn();
  
  const initialData: Movie = {
    id: '1',
    title: 'Película de Prueba',
    year: '2023',
    poster: 'https://example.com/poster.jpg'
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renderiza correctamente el formulario vacío', () => {
    render(<MovieForm onMovieSubmit={mockSubmit} />);
    
    expect(screen.getByLabelText(/título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/año/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/póster \(url\)/i)).toBeInTheDocument();
    expect(screen.getByText(/agregar película/i)).toBeInTheDocument();
  });
  
  test('renderiza con datos iniciales en modo edición', () => {
    render(
      <MovieForm 
        onMovieSubmit={mockSubmit} 
        initialData={initialData} 
        isEditMode={true} 
        onCancelEdit={mockCancel} 
      />
    );
    
    expect(screen.getByLabelText(/título/i)).toHaveValue('Película de Prueba');
    expect(screen.getByLabelText(/año/i)).toHaveValue('2023');
    expect(screen.getByLabelText(/póster \(url\)/i)).toHaveValue('https://example.com/poster.jpg');
    expect(screen.getByText(/guardar cambios/i)).toBeInTheDocument();
    expect(screen.getByText(/cancelar/i)).toBeInTheDocument();
  });
  
  test('muestra error cuando se envía el formulario con campos vacíos', () => {
    render(<MovieForm onMovieSubmit={mockSubmit} />);
    
    const submitButton = screen.getByText(/agregar película/i);
    fireEvent.click(submitButton);
    
    expect(screen.getByText(/todos los campos son obligatorios/i)).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });
  
  test('valida el formato del año correctamente', () => {
    render(<MovieForm onMovieSubmit={mockSubmit} />);
    
    const titleInput = screen.getByLabelText(/título/i);
    const yearInput = screen.getByLabelText(/año/i);
    const posterInput = screen.getByLabelText(/póster \(url\)/i);
    const submitButton = screen.getByText(/agregar película/i);
    
    fireEvent.change(titleInput, { target: { value: 'Película Test' } });
    fireEvent.change(yearInput, { target: { value: 'abc' } });
    fireEvent.change(posterInput, { target: { value: 'https://example.com/test.jpg' } });
    fireEvent.click(submitButton);
    
    expect(screen.getByText(/el año debe ser un número de 4 dígitos/i)).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });
  
  test('envía el formulario correctamente con datos válidos', () => {
    render(<MovieForm onMovieSubmit={mockSubmit} />);
    
    const titleInput = screen.getByLabelText(/título/i);
    const yearInput = screen.getByLabelText(/año/i);
    const posterInput = screen.getByLabelText(/póster \(url\)/i);
    const submitButton = screen.getByText(/agregar película/i);
    
    fireEvent.change(titleInput, { target: { value: 'Película Test' } });
    fireEvent.change(yearInput, { target: { value: '2023' } });
    fireEvent.change(posterInput, { target: { value: 'https://example.com/test.jpg' } });
    fireEvent.click(submitButton);
    
    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'Película Test',
      year: '2023',
      poster: 'https://example.com/test.jpg'
    });
  });
  
  test('llama a onCancelEdit cuando se hace clic en Cancelar', () => {
    render(
      <MovieForm 
        onMovieSubmit={mockSubmit} 
        initialData={initialData} 
        isEditMode={true} 
        onCancelEdit={mockCancel} 
      />
    );
    
    const cancelButton = screen.getByText(/cancelar/i);
    fireEvent.click(cancelButton);
    
    expect(mockCancel).toHaveBeenCalled();
  });
});
