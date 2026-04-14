// screens/ResourcesScreen.tsx
// Resources Screen - Shows campus services, libraries, cafeteria, shuttle times, etc.
// Information that students need to know about campus facilities

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native'; // Mobile UI components
import { Ionicons } from '@expo/vector-icons'; // Icon library
import { useTheme } from '../context/ThemeContext'; // Get theme colors

// Main Resources Screen
const ResourcesScreen = () => {
  // Get colors from theme (light or dark mode)
  const { colors } = useTheme();

  return (
    // ScrollView makes content scrollable if it doesn't fit on one screen
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      showsVerticalScrollIndicator={false} // Hide scroll bar
    >
      {/* Title */}
      <Text style={[styles.title, { color: colors.text }]}>
        Campus Resources
      </Text>
      
      {/* ===== Library Hours Card ===== */}
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        {/* Card Header with icon and title */}
        <View style={styles.cardHeader}>
          <Ionicons name="library" size={28} color="#3498db" /> {/* Library icon */}
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Library Hours
          </Text>
        </View>
        {/* Library information */}
        <Text style={[styles.cardText, { color: colors.subtext }]}>
          Monday - Friday: 8:00 AM - 10:00 PM
        </Text>
        <Text style={[styles.cardText, { color: colors.subtext }]}>
          Saturday: 9:00 AM - 6:00 PM
        </Text>
        <Text style={[styles.cardText, { color: colors.subtext }]}>
          Sunday: 1:00 PM - 6:00 PM
        </Text>
        <Text style={[styles.cardText, { color: colors.subtext }]}>
          24/7 Study Room Available
        </Text>
      </View>
      
      {/* ===== Cafeteria Hours Card ===== */}
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        {/* Card Header with icon and title */}
        <View style={styles.cardHeader}>
          <Ionicons name="restaurant" size={28} color="#3498db" /> {/* Cafeteria icon */}
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Cafeteria Hours
          </Text>
        </View>
        {/* Meal times */}
        <Text style={[styles.cardText, { color: colors.subtext }]}>
          Breakfast: 7:00 - 9:00 AM
        </Text>
        <Text style={[styles.cardText, { color: colors.subtext }]}>
          Lunch: 12:00 - 2:00 PM
        </Text>
        <Text style={[styles.cardText, { color: colors.subtext }]}>
          Dinner: 5:00 - 7:00 PM
        </Text>
      </View>
      
      {/* ===== Campus Map Card ===== */}
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        {/* Card Header with icon and title */}
        <View style={styles.cardHeader}>
          <Ionicons name="map" size={28} color="#3498db" /> {/* Map icon */}
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Campus Map
          </Text>
        </View>
        {/* Building locations */}
        <Text style={[styles.cardText, { color: colors.subtext }]}>
          Main Building - Lecture Halls
        </Text>
        <Text style={[styles.cardText, { color: colors.subtext }]}>
          Science Block - Labs
        </Text>
        <Text style={[styles.cardText, { color: colors.subtext }]}>
          Library - 3rd Floor
        </Text>
        <Text style={[styles.cardText, { color: colors.subtext }]}>
          Student Center - Ground Floor
        </Text>
      </View>
      
      {/* ===== Shuttle/Bus Schedule Card ===== */}
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        {/* Card Header with icon and title */}
        <View style={styles.cardHeader}>
          <Ionicons name="bus" size={28} color="#3498db" /> {/* Bus icon */}
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Bus Schedule
          </Text>
        </View>
        {/* Bus routes and times */}
        <Text style={[styles.cardText, { color: colors.subtext }]}>
          To Lhawang(Boys Hostel): 7:00, 12:00, 17:00
        </Text>
        <Text style={[styles.cardText, { color: colors.subtext }]}>
          To College: Every 30 min
        </Text>
      </View>
      
    </ScrollView>
  );
};

// Styles - control how everything looks
const styles = StyleSheet.create({
  container: {
    flex: 1, // Fill entire screen
    padding: 20, // Padding around edges
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold', // Make bold
    marginBottom: 20, // Space below title
  },
  card: {
    borderRadius: 12, // Round corners
    padding: 15, // Padding inside card
    marginBottom: 15, // Space between cards
    // Shadow styling to make cards stand out
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  cardHeader: {
    flexDirection: 'row', // Arrange icon and title horizontally
    alignItems: 'center', // Vertically center
    marginBottom: 12, // Space below header
    gap: 10, // Space between icon and title
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold', // Make bold
  },
  cardText: {
    fontSize: 14,
    marginTop: 5, // Space between lines
    marginLeft: 5, // Indent text
  },
});

export default ResourcesScreen;