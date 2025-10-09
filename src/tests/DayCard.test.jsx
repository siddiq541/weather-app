import { render, screen } from '@testing-library/react';
import DayCard from '../components/DayCard';

describe('DayCard Component', () => {
  const mockProps = {
    date: '2025-10-08',
    icon: '☀️',
    summary: 'Sunny and clear',
    tempMax: 75,
    tempMin: 58,
    windSpeed: 8
  };

  test('renders DayCard with all props', () => {
    render(<DayCard {...mockProps} />);
    
    // Check if date is formatted and displayed
    expect(screen.getByText(/Oct 8/)).toBeInTheDocument();
    
    // Check if weather icon is displayed
    expect(screen.getByRole('img', { name: /sunny and clear/i })).toBeInTheDocument();
    
    // Check if summary is displayed
    expect(screen.getByText('Sunny and clear')).toBeInTheDocument();
    
    // Check if temperatures are displayed with degree symbols
    expect(screen.getByText('75°')).toBeInTheDocument();
    expect(screen.getByText('58°')).toBeInTheDocument();
    
    // Check if wind speed is displayed
    expect(screen.getByText('Wind: 8 mph')).toBeInTheDocument();
  });

  test('formats date correctly for different dates', () => {
    const differentDate = { ...mockProps, date: '2025-12-25' };
    render(<DayCard {...differentDate} />);
    
    expect(screen.getByText(/Dec 25/)).toBeInTheDocument();
  });

  test('rounds temperatures correctly', () => {
    const decimalTemps = { 
      ...mockProps, 
      tempMax: 75.7, 
      tempMin: 58.3 
    };
    render(<DayCard {...decimalTemps} />);
    
    expect(screen.getByText('76°')).toBeInTheDocument();
    expect(screen.getByText('58°')).toBeInTheDocument();
  });

  test('rounds wind speed correctly', () => {
    const decimalWind = { ...mockProps, windSpeed: 8.7 };
    render(<DayCard {...decimalWind} />);
    
    expect(screen.getByText('Wind: 9 mph')).toBeInTheDocument();
  });

  test('applies dark mode classes correctly', () => {
    const { container } = render(<DayCard {...mockProps} />);
    const cardElement = container.firstChild;
    
    expect(cardElement).toHaveClass('dark:bg-gray-800');
    expect(cardElement).toHaveClass('dark:border-gray-700');
  });

  test('has proper accessibility attributes', () => {
    render(<DayCard {...mockProps} />);
    
    const iconElement = screen.getByRole('img', { name: /sunny and clear/i });
    expect(iconElement).toHaveAttribute('aria-label', 'Sunny and clear');
  });
});