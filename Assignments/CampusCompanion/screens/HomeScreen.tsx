// screens/HomeScreen.tsx
// Home Screen - Welcome page with app logo, title, and theme (light/dark mode) toggle button
// This is the first screen users see when they tap the Home tab

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'; // Basic mobile UI components
import { Ionicons } from '@expo/vector-icons'; // Icon library
import { useTheme } from '../context/ThemeContext'; // Get theme colors from global state
import { scaleWidth, scaleHeight, scaleFont, spacing, fonts, isTablet } from '../utils/responsive'; // Functions to make UI responsive

// Main Home Screen Component
const HomeScreen = () => {
  // Get theme data: isDarkMode (boolean), toggleTheme (function), colors (object with color values)
  const { isDarkMode, toggleTheme, colors } = useTheme();

  // Make logo bigger on tablets, smaller on phones
  const logoSize = isTablet() ? scaleWidth(250) : scaleWidth(180);

  // Return the UI layout
  return (
    // Main container with background color that changes with theme
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      
      {/* College Logo - Responsive size (bigger on tablets) */}
      <Image 
        source={require('../assets/logo.png')} // Load the logo from assets folder
        style={[styles.logo, { width: logoSize, height: logoSize }]} // Size changes based on device
        resizeMode="contain" // Keep image proportions, don't stretch it
      />
      
      {/* College Name - Main heading with responsive font size */}
      <Text style={[styles.collegeName, { color: colors.text, fontSize: fonts.xxxl }]}>
        College of Science and Technology
      </Text>
      
      {/* App Name - Subheading with responsive font size */}
      <Text style={[styles.appName, { color: colors.subtext, fontSize: fonts.xl }]}>
        Campus Companion
      </Text>
      
      {/* Dark/Light Mode Toggle Button - Responsive width */}
      <TouchableOpacity 
        style={[styles.toggleButton, { backgroundColor: colors.header, width: isTablet() ? '50%' : '70%' }]} 
        onPress={toggleTheme} // Call toggleTheme function when pressed
      >
        {/* Show sun icon if dark mode is ON, moon icon if light mode is ON */}
        <Ionicons 
          name={isDarkMode ? 'sunny' : 'moon'} 
          size={scaleFont(24)} 
          color="white" 
        />
        {/* Show button text based on current mode */}
        <Text style={[styles.toggleButtonText, { fontSize: fonts.lg }]}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </Text>
      </TouchableOpacity>
      
    </View>
  );
};

// StyleSheet - CSS-like styling for the components
const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up full available space
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    padding: spacing.xl, // Add padding around edges
  },
  logo: {
    marginBottom: spacing.xxl, // Space below logo
    borderRadius: scaleWidth(100), // Make corners rounded
  },
  collegeName: {
    fontWeight: 'bold', // Make text bold
    textAlign: 'center', // Center the text
    marginBottom: spacing.sm, // Space below text
  },
  appName: {
    textAlign: 'center', // Center the text
    marginBottom: spacing.xxxl, // Space below text
  },
  toggleButton: {
    flexDirection: 'row', // Arrange children horizontally (icon and text side by side)
    alignItems: 'center', // Vertically center icon and text
    justifyContent: 'center', // Horizontally center icon and text
    padding: spacing.md, // Padding inside button
    borderRadius: scaleWidth(25), // Make corners rounded (like a pill)
    gap: spacing.sm, // Space between icon and text
  },
  toggleButtonText: {
    color: 'white', // White text
    fontWeight: '600', // Semi-bold text
  },
});

export default HomeScreen;