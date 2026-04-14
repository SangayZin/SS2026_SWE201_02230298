// navigation/BottomTabs.tsx - Bottom Tab Navigation Setup
// This file creates the 4 tabs at the bottom of the app:
// Home | Contacts | Schedule | Resources
// Tapping each tab switches to a different screen

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Creates bottom tab navigation
import { Ionicons } from '@expo/vector-icons'; // Imports icons for the tabs

// Import all 5 screen components
import HomeScreen from '../screens/HomeScreen'; // Main welcome screen with theme toggle
import ContactsScreen from '../screens/ContactsScreen'; // List of important contacts
import ScheduleScreen from '../screens/ScheduleScreen'; // Weekly class schedule
import ResourcesScreen from '../screens/ResourcesScreen'; // Campus services and info

// Create a Tab Navigator object (like setting up the tab bar system)
const Tab = createBottomTabNavigator();

// Main bottom tab navigation structure
const BottomTabs = () => {
  return (
    <Tab.Navigator
      id="BottomTabs"
      screenOptions={({ route }) => ({
        // This function decides which icon to show for each tab
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          
          // Choose different icons based on which tab we're looking at
          if (route.name === 'Home') {
            // Home tab shows filled or outline home icon
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Contacts') {
            // Contacts tab shows people icon
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Schedule') {
            // Schedule tab shows calendar icon
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Resources') {
            // Resources tab shows book icon
            iconName = focused ? 'book' : 'book-outline';
          }
          
          // Return the actual icon to display
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        // Colors for the tab bar
        tabBarActiveTintColor: '#3498db', // Blue when tab is selected
        tabBarInactiveTintColor: 'gray', // Gray when tab is not selected
        // Settings for header styling
        headerStyle: {
          backgroundColor: '#3498db', // Blue header
        },
        headerTintColor: '#fff', // White text in header
        headerTitleStyle: {
          fontWeight: 'bold', // Bold header text
        },
        // Hide header on Home screen so the logo and app name can show
        // Show header on other screens to display the screen title
        headerShown: route.name === 'Home' ? false : true,
      })}
    >
      {/* Tab 1: Home Screen */}
      <Tab.Screen name="Home" component={HomeScreen} />
      
      {/* Tab 2: Contacts Screen */}
      <Tab.Screen name="Contacts" component={ContactsScreen} />
      
      {/* Tab 3: Schedule Screen */}
      <Tab.Screen name="Schedule" component={ScheduleScreen} />
      
      {/* Tab 4: Resources Screen */}
      <Tab.Screen name="Resources" component={ResourcesScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;