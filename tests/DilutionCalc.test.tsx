
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { DilutionCalc } from '@/components/DilutionCalc';

describe('DilutionCalc Component', () => {

  it('renders the initial component state', () => {
    render(<DilutionCalc />);

    expect(screen.getByText(/Dilution/)).toBeInTheDocument();
    expect(screen.getByText(/Calculates the amount of water required/)).toBeInTheDocument();

  });

  it('handles input changes for amount, alcohol percentages, and temperature', () => {
    render(<DilutionCalc />);

    const amountInput = screen.getByLabelText(/Amount/);
    fireEvent.change(amountInput, { target: { value: '1500' } });
    expect((amountInput as HTMLInputElement).value).toBe('1500');

    const fromAlcoholInput = screen.getByLabelText(/From % Alcohol/);
    fireEvent.change(fromAlcoholInput, { target: { value: '60' } });
    expect((fromAlcoholInput as HTMLInputElement).value).toBe('60');

    const toAlcoholInput = screen.getByLabelText(/To % Alcohol/);
    fireEvent.change(toAlcoholInput, { target: { value: '40' } });
    expect((toAlcoholInput as HTMLInputElement).value).toBe('40');

    const alcoholTempInput = screen.getByLabelText(/Alcohol Temp \(°C\)/);
    fireEvent.change(alcoholTempInput, { target: { value: '25' } });
    expect((alcoholTempInput as HTMLInputElement).value).toBe('25');

    const waterTempInput = screen.getByLabelText(/Water Temp \(°C\)/);
    fireEvent.change(waterTempInput, { target: { value: '10' } });
    expect((waterTempInput as HTMLInputElement).value).toBe('10');
  });

  it('calculates water to add based on inputs', () => {
    render(<DilutionCalc />);

    const waterToAddMass = screen.getByTestId('waterToAddMass');
    const waterToAddVolume = screen.getByTestId('waterToAddVolume');

    const amountInput = screen.getByLabelText(/Amount/);
    fireEvent.change(amountInput, { target: { value: '1500' } });

    expect (waterToAddVolume).toHaveTextContent('570.3 L');
    expect (waterToAddMass).toHaveTextContent('569.2 Kg');

    const fromAlcoholInput = screen.getByLabelText(/From % Alcohol/);
    fireEvent.change(fromAlcoholInput, { target: { value: '60' } });

    expect (waterToAddVolume).toHaveTextContent('847.8 L');
    expect (waterToAddMass).toHaveTextContent('846.3 Kg');

    const toAlcoholInput = screen.getByLabelText(/To % Alcohol/);
    fireEvent.change(toAlcoholInput, { target: { value: '50' } });

    expect (waterToAddVolume).toHaveTextContent('342.3 L');
    expect (waterToAddMass).toHaveTextContent('341.6 Kg');

    const alcoholTempInput = screen.getByLabelText(/Alcohol Temp \(°C\)/);
    fireEvent.change(alcoholTempInput, { target: { value: '25' } });

    expect (waterToAddVolume).toHaveTextContent('342.3 L');
    expect (waterToAddMass).toHaveTextContent('341.6 Kg');

    const waterTempInput = screen.getByLabelText(/Water Temp \(°C\)/);
    fireEvent.change(waterTempInput, { target: { value: '10' } });

    expect (waterToAddVolume).toHaveTextContent('341.7 L');
    expect (waterToAddMass).toHaveTextContent('341.6 Kg');


  });


});
