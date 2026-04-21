// React is used to create components
import React from 'react';
// We use the native stack navigator to move between full-screen pages (screens)
// A "stack" means screens are pushed on top of each other like pages in a book.
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Import the two screens we navigate between
import DashboardScreen from '../screens/DashboardScreen';
import DetailsScreen from '../screens/DetailsScreen';
// Type definition listing the screens (helps with safety in TypeScript)
import type { RootStackParamList } from './types';

// Create the navigator and give it the list of screens (types help TypeScript)
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainStack() {
  return (
    // The Navigator wraps all screens and handles moving between them
    <Stack.Navigator initialRouteName="Dashboard">
      {/* Dashboard: main overview screen (first shown) */}
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: 'Dashboard', headerTitleAlign: 'center' }}
      />
      {/* Details: shows more information about a selected item */}
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: 'Details', headerTitleAlign: 'center' }}
      />
    </Stack.Navigator>
  );
}