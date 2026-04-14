// App.js - Main Entry Point
// This is the first file that runs when the app starts
// Think of it like the opening chapter of a book that introduces the whole story

import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Imports navigation system that handles moving between screens
import MainStack from './navigation/MainStack'; // Imports the navigation structure (like a map of where you can go in the app)

// This Component: The starting point of our entire application
export default function App() {
  return (
    // NavigationContainer = Sets up the navigation system for the entire app
    // It's like the engine that lets screens talk to each other
    <NavigationContainer>
      {/* MainStack = Where all our screens are organized (Stack, Tabs, etc.) */}
      <MainStack />
    </NavigationContainer>
  );
}
