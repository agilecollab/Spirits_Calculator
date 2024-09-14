
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { useTheme } from "@/components/theme-provider";

jest.mock("@/components/theme-provider", () => ({
  useTheme: jest.fn(),
}));

describe("DarkModeToggle", () => {
  const setThemeMock = jest.fn();

  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({ theme: "light", setTheme: setThemeMock });
  });

  it("renders the Sun and Moon icons", () => {
    render(<DarkModeToggle />);
    
    expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
    expect(screen.getByTestId("moon-icon")).toBeInTheDocument();
  });

  it("renders Switch as unchecked when theme is 'light'", () => {
    render(<DarkModeToggle />);
    
    const switchToggle = screen.getByRole("switch");
    expect(switchToggle).not.toBeChecked();
  });

  it("renders Switch as checked when theme is 'dark'", () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: "dark", setTheme: setThemeMock });
    render(<DarkModeToggle />);
    
    const switchToggle = screen.getByRole("switch");
    expect(switchToggle).toBeChecked();
  });

  it("calls setTheme with 'dark' when Switch is toggled on", () => {
    render(<DarkModeToggle />);
    
    const switchToggle = screen.getByRole("switch");
    
    fireEvent.click(switchToggle);
    expect(setThemeMock).toHaveBeenCalledWith("dark");
  });

  it("calls setTheme with 'light' when Switch is toggled off", () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: "dark", setTheme: setThemeMock });
    render(<DarkModeToggle />);
    
    const switchToggle = screen.getByRole("switch");

    fireEvent.click(switchToggle);
    expect(setThemeMock).toHaveBeenCalledWith("light");
  });

  it("has proper accessibility attributes", () => {
    render(<DarkModeToggle />);

    const switchToggle = screen.getByRole("switch");
    
    expect(switchToggle).toHaveAttribute("aria-checked", "false");
  });
});
