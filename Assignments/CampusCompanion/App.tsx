// App.tsx - Main entry point with ThemeProvider

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './navigation/MainStack';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    // ThemeProvider wraps everything - makes theme available everywhere
    <ThemeProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </ThemeProvider>
  );
}