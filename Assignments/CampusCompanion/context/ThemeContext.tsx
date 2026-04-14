// context/ThemeContext.tsx
// Theme Context - Manages light/dark mode for the entire app
// Think of this like a "shared settings" that all screens can access
// Any screen can check isDarkMode or colors without passing props back and forth

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the theme context
// TypeScript needs to know what data and functions are available
type ThemeContextType = {
  isDarkMode: boolean;      // Current theme state: false = light mode, true = dark mode
  toggleTheme: () => void;  // Function to switch between light and dark
  colors: {                 // Colors that change with theme
    background: string;     // Background color
    text: string;           // Text color
    subtext: string;        // Secondary text color (dimmer)
    card: string;           // Card/container background color
    header: string;         // Header background color
    border: string;         // Border/separator color
  };
};

// Create the context
// Context is like a "broadcast channel" that all screens can listen to
// Initial value is undefined - will be set by ThemeProvider
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ThemeProvider Component - Wraps the entire app to provide theme data
// This component should be placed in App.js wrapping all other components
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // State: isDarkMode - boolean that tracks if dark mode is ON or OFF
  // false = light mode (default), true = dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle between light and dark mode
  // This switches isDarkMode from false to true or true to false
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode); // The ! operator flips the boolean value
  };

  // Colors object - changes based on theme
  // When isDarkMode = true:  dark background, light text
  // When isDarkMode = false: light background, dark text
  // This creates the light and dark mode experience
  const colors = {
    background: isDarkMode ? '#1a1a2e' : '#f5f5f5',       // Dark gray vs light gray
    text: isDarkMode ? '#ffffff' : '#2c3e50',             // White vs dark blue
    subtext: isDarkMode ? '#aaaaaa' : '#7f8c8d',          // Light gray vs medium gray
    card: isDarkMode ? '#16213e' : '#ffffff',             // Dark blue vs white
    header: isDarkMode ? '#0f3460' : '#3498db',           // Dark blue vs bright blue
    border: isDarkMode ? '#2c3e50' : '#e0e0e0',           // Dark vs light gray
  };

  // Provide the theme data to all child components
  // value={{ isDarkMode, toggleTheme, colors }} = broadcast this data to all screens
  // {children} = place all the wrapped components here
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom Hook: useTheme - Let any component easily access the theme data
// Example usage in a screen:
//   const { isDarkMode, toggleTheme, colors } = useTheme();
// This is much easier than passing props through 10 different components
export const useTheme = () => {
  // Get the theme context value
  const context = useContext(ThemeContext);
  
  // Safety check: if useTheme is used without wrapping in ThemeProvider, show error
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  // Return the theme data (isDarkMode, toggleTheme, colors)
  return context;
};