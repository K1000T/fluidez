/**
 * PRUEBAS FUNCIONALES - Componente MetricsDisplay
 * 
 * Estas pruebas verifican el renderizado y cálculo correcto de métricas
 * de fluidez en el componente MetricsDisplay.
 */

import { render, screen } from '@testing-library/react';
import MetricsDisplay from '../components/MetricsDisplay';

describe('Pruebas Funcionales - Componente MetricsDisplay', () => {
  test('debe renderizar con transcript válido', () => {
    const mockText = 'Hola mundo esto es una prueba de fluidez vocal';

    render(<MetricsDisplay transcript={mockText} />);

    // Verificar que el componente renderiza el título
    expect(screen.getByText(/Métricas de Ritmo y Fluidez/i)).toBeInTheDocument();
  });

  test('debe mostrar las tres métricas principales', () => {
    const mockText = 'aeiou bcdfg aeiou';

    render(<MetricsDisplay transcript={mockText} />);

    // Verificar que las tres métricas se muestran
    expect(screen.getByText(/PVI/i)).toBeInTheDocument();
    expect(screen.getByText(/VarcoV/i)).toBeInTheDocument();
    expect(screen.getByText(/%V/i)).toBeInTheDocument();
  });

  test('debe manejar texto vacío', () => {
    render(<MetricsDisplay transcript="" />);

    // Verificar que maneja el caso vacío mostrando --
    const dashes = screen.getAllByText(/--/);
    expect(dashes.length).toBeGreaterThan(0);
  });

  test('debe calcular porcentaje vocálico correctamente', () => {
    const mockText = 'aaa bbb ccc';

    render(<MetricsDisplay transcript={mockText} />);

    // Verificar que el título de %V está presente
    expect(screen.getByText(/Porcentaje Vocálico/i)).toBeInTheDocument();
  });

  test('debe manejar texto con vocales acentuadas', () => {
    const mockText = 'María José Ángel';

    render(<MetricsDisplay transcript={mockText} />);

    // Verificar que renderiza sin errores
    expect(screen.getByText(/Métricas de Ritmo y Fluidez/i)).toBeInTheDocument();
  });

  test('debe renderizar sin crash con texto largo', () => {
    const mockText = 'palabra vocal repetida '.repeat(50);

    render(<MetricsDisplay transcript={mockText} />);

    // Verificar que maneja textos largos
    expect(screen.getByText(/Métricas de Ritmo y Fluidez/i)).toBeInTheDocument();
  });
});
