// Import NavigationContainer - this component manages all navigation in the app
import { NavigationContainer } from "@react-navigation/native";
// Import the MainStackNavigator which defines how screens are organized and connected
import MainStackNavigator from "./scr/navigation/MainStackNavigator";
// Import React (required for writing JSX)
import React from "react";

// This is the main App component - the root of the entire application
export default function App() {
  return (
    // NavigationContainer wraps our entire app to handle all screen navigation
    <NavigationContainer>
      {/* MainStackNavigator contains the screens and handles switching between them */}
      <MainStackNavigator />
    </NavigationContainer>
  );
}