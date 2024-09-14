import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { VolumeCalc } from '../src/components/VolumeCalc';
import { toast } from 'sonner';

jest.mock('sonner', () => ({
  toast: jest.fn(),
}));

describe('VolumeCalc Component', () => {
  it('renders the initial component state', () => {
    render(<VolumeCalc />); 
    
    expect(screen.getByText(/Volume/)).toBeInTheDocument();
    expect(screen.getByText(/Calculates the volume of spirit at 20°C/)).toBeInTheDocument();
  
  });

  it('handles input changes for amount, specific gravity, and temperature', () => {
    render(<VolumeCalc />);
    
    const volumeSpirits = screen.getByTestId('volumeSpirits');
    const volumeAlcohol = screen.getByTestId('volumeAlcohol');
    const alcoholPercentage = screen.getByTestId('alcoholPercentage');

    const amountInput = screen.getByLabelText(/Amount/);
    fireEvent.change(amountInput, { target: { value: '1500' } });
    expect((amountInput as HTMLInputElement).value).toBe('1500');
    
    expect (volumeSpirits).toHaveTextContent('1532.3 L');
    expect (volumeAlcohol).toHaveTextContent('216.0 L');
    expect (alcoholPercentage).toHaveTextContent('14.1 %');

    const specificGravityInput = screen.getByLabelText(/Specific Gravity/);
    fireEvent.change(specificGravityInput, { target: { value: '800.0' } });
    expect((specificGravityInput as HTMLInputElement).value).toBe('800.0');

    expect (volumeSpirits).toHaveTextContent('1877.5 L');
    expect (volumeAlcohol).toHaveTextContent('1836.2 L');
    expect (alcoholPercentage).toHaveTextContent('97.8 %');

    const temperatureInput = screen.getByLabelText(/Temp \(°C\)/);
    fireEvent.change(temperatureInput, { target: { value: '25.0' } });
    expect((temperatureInput as HTMLInputElement).value).toBe('25.0');

    expect (volumeSpirits).toHaveTextContent('1867.7 L');
    expect (volumeAlcohol).toHaveTextContent('1807.9 L');
    expect (alcoholPercentage).toHaveTextContent('96.8 %');

  });

  it('displays toast when specific gravity is out of range', () => {
    render(<VolumeCalc />);

    const specificGravityInput = screen.getByLabelText(/Specific Gravity/);
    fireEvent.blur(specificGravityInput, { target: { value: '750.0' } });

    expect(toast).toHaveBeenCalledWith("Specific Gravity must be greater than 780.0");
  });

  // ...
});

