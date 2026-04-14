// screens/ScheduleScreen.tsx
// Schedule Screen - Shows weekly class timetable
// Displays courses with times, days, and rooms

import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native'; // Mobile UI components
import { Ionicons } from '@expo/vector-icons'; // Icon library
import { useTheme } from '../context/ThemeContext'; // Get theme colors

// Weekly schedule data - array of classes
const schedule = [
  { id: '1', day: 'Monday', course: 'Cross Platform Development', time: '09:00 - 11:00', room: 'Lab 301' },
  { id: '2', day: 'Monday', course: 'Software Engineering', time: '11:00 - 13:00', room: 'Hall 205' },
  { id: '3', day: 'Tuesday', course: 'Database Systems', time: '09:00 - 11:00', room: 'Lab 102' },
  { id: '4', day: 'Tuesday', course: 'Research Methodology', time: '14:00 - 16:00', room: 'Hall 101' },
  { id: '5', day: 'Wednesday', course: 'Cross Platform Development', time: '10:00 - 12:00', room: 'Lab 301' },
  { id: '6', day: 'Thursday', course: 'Database Systems', time: '09:00 - 11:00', room: 'Lab 102' },
  { id: '7', day: 'Friday', course: 'Project Work', time: '09:00 - 12:00', room: 'Lab 205' },
];

// Function: Get a unique color for each day of the week
// Different colors make the schedule easier to read
const getDayColor = (day: string) => {
  switch(day) {
    case 'Monday': return '#3498db';    // Blue
    case 'Tuesday': return '#2ecc71';   // Green
    case 'Wednesday': return '#e67e22'; // Orange
    case 'Thursday': return '#9b59b6';  // Purple
    case 'Friday': return '#e74c3c';    // Red
    default: return '#7f8c8d';          // Gray (fallback)
  }
};

// ScheduleItem Component - Shows one class card
// This component is reused for each class in the schedule
const ScheduleItem = ({ day, course, time, room, colors }: any) => {
  return (
    <View style={[styles.scheduleCard, { backgroundColor: colors.card }]}>
      
      {/* Day Badge - Colored box on left side with day abbreviation */}
      <View style={[styles.dayBadge, { backgroundColor: getDayColor(day) }]}>
        {/* substring(0, 3) gets first 3 letters: Monday -> Mon, Tuesday -> Tue, etc. */}
        <Text style={styles.dayText}>
          {day.substring(0, 3)}
        </Text>
      </View>
      
      {/* Schedule Information - Course name, time, and room */}
      <View style={styles.scheduleInfo}>
        {/* Course name - bold and larger */}
        <Text style={[styles.courseName, { color: colors.text }]}>
          {course}
        </Text>
        
        {/* Class time with clock icon */}
        <Text style={[styles.details, { color: colors.subtext }]}>
          <Ionicons name="time-outline" size={14} color={colors.subtext} /> {time}
        </Text>
        
        {/* Room/location with location icon */}
        <Text style={[styles.details, { color: colors.subtext }]}>
          <Ionicons name="location-outline" size={14} color={colors.subtext} /> {room}
        </Text>
      </View>
    </View>
  );
};

// Main Schedule Screen
const ScheduleScreen = () => {
  // Get colors from theme (light or dark mode)
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Title */}
      <Text style={[styles.title, { color: colors.text }]}>
        Weekly Schedule
      </Text>
      
      {/* FlatList - Efficiently displays the schedule items */}
      {/* FlatList is like a scrollable list that only shows visible items */}
      <FlatList
        data={schedule} // Array of schedule items to display
        renderItem={({ item }) => (
          // For each schedule item, create a ScheduleItem component
          <ScheduleItem 
            day={item.day} 
            course={item.course} 
            time={item.time} 
            room={item.room}
            colors={colors}
          />
        )}
        keyExtractor={(item) => item.id} // React needs unique ID for efficient updates
        showsVerticalScrollIndicator={false} // Hide the scroll bar
      />
    </View>
  );
};

// Styles - control how everything looks
const styles = StyleSheet.create({
  container: {
    flex: 1, // Fill entire screen
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold', // Make bold
    marginBottom: 20, // Space below title
  },
  scheduleCard: {
    flexDirection: 'row', // Arrange items horizontally: [dayBadge | info]
    borderRadius: 12, // Round corners
    marginBottom: 12, // Space between cards
    overflow: 'hidden', // Don't let content spill outside rounded corners
    // Shadow styling
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  dayBadge: {
    width: 70, // Fixed width for day badge
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  dayText: {
    color: 'white',
    fontWeight: 'bold', // Make bold
    fontSize: 16,
  },
  scheduleInfo: {
    flex: 1, // Take remaining space
    padding: 12, // Padding inside info section
  },
  courseName: {
    fontSize: 16,
    fontWeight: 'bold', // Make bold
    marginBottom: 4, // Space below course name
  },
  details: {
    fontSize: 12, // Smaller font for time and room
    marginTop: 2, // Small space between lines
  },
});

export default ScheduleScreen;