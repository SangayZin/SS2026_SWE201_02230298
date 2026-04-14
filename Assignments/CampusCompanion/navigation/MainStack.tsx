// navigation/MainStack.tsx - Stack Navigator Setup
// A Stack Navigator is like a deck of cards
// You can push new cards on top, and go back to cards underneath
// Here: BottomTabs is the base card, ContactDetail slides on top when needed

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'; // Creates a stack-style navigation
import BottomTabs from './BottomTabs'; // Import the 4-tab bottom navigation
import ContactDetailScreen from '../screens/ContactDetailScreen'; // Import the detailed contact screen

// Create a Stack Navigator object (like setting up the card deck system)
const Stack = createStackNavigator();

// Main navigation structure - defines all possible screens and how they connect
const MainStack = () => {
  return (
    <Stack.Navigator
      id="MainStack"
      screenOptions={{
        // These settings control how the top header bar looks
        headerStyle: {
          backgroundColor: '#3498db', // Header background color (blue)
        },
        headerTintColor: '#fff', // Text color in header (white)
        headerTitleStyle: {
          fontWeight: 'bold', // Make header text bold
        },
      }}
    >
      {/* 
        First Screen: BottomTabs (the main 4-tab navigation)
        This is the base screen - the bottom of the card deck
        It shows the Home, Contacts, Schedule, Resources tabs
      */}
      <Stack.Screen 
        name="MainTabs" 
        component={BottomTabs} 
        options={{ headerShown: false }} // Hide header so BottomTabs can use its own headers
      />
      
      {/* 
        Second Screen: ContactDetail (pops up over MainTabs when you select a contact)
        It's like placing a new card on top of the deck
        User can go back to MainTabs by pressing Android back or iOS back arrow
      */}
      <Stack.Screen 
        name="ContactDetail" 
        component={ContactDetailScreen} 
        options={{ title: 'Contact Details' }} // Show "Contact Details" in the header
      />
    </Stack.Navigator>
  );
};

export default MainStack;