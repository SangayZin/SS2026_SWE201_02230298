// NavigationContainer puts all the screens and navigation logic together.
import { NavigationContainer } from '@react-navigation/native';
// StatusBar controls the top status bar appearance (time, battery, etc.).
import { StatusBar } from 'expo-status-bar';
// React is the library we use to write UI components.
import React from 'react';
// Gesture handler enables touch gestures used by navigation and UI.
import 'react-native-gesture-handler';
// SafeAreaProvider helps the app avoid notches and system UI areas.
import { SafeAreaProvider } from 'react-native-safe-area-context';
// MainStack is where we declare our app screens (Dashboard, Details).
import MainStack from './navigation/MainStack';

export default function App() {
  return (
    // SafeAreaProvider makes sure content is placed where it's visible (not behind notches)
    <SafeAreaProvider>
      {/* NavigationContainer makes navigation (moving between screens) work */}
      <NavigationContainer>
        {/* MainStack contains the list of screens and how to move between them */}
        <MainStack />
      </NavigationContainer>
      {/* StatusBar shows system status icons; style="auto" lets the system pick a good look */}
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}