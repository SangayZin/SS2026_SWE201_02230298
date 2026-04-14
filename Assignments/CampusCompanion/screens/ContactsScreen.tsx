// screens/ContactsScreen.tsx
// Contacts Screen - Shows a list of important people and offices at the college
// Tap on any contact to see full details (phone, email, call/email buttons)

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'; // Mobile UI components
import { Ionicons } from '@expo/vector-icons'; // Icon library
import { useTheme } from '../context/ThemeContext'; // Get theme colors
import { spacing, fonts, scaleWidth, isTablet } from '../utils/responsive'; // Responsive design helpers

// Array of contacts - each contact has a unique ID, name, role, phone, and email
const contacts = [
  { id: '1', name: 'Dr. Sangay Tenzin', role: 'Head of Academics', phone: '+975 788 123 001', email: 's.kim@campus.rw' },
  { id: '2', name: 'IT Helpdesk', role: 'Technical Support', phone: '+975 788 123 002', email: 'helpdesk@campus.rw' },
  { id: '3', name: 'Student Services', role: 'Student Affairs', phone: '+975 788 123 003', email: 'students@campus.rw' },
  { id: '4', name: 'Library Desk', role: 'Library Services', phone: '+975 788 123 004', email: 'library@campus.rw' },
  { id: '5', name: 'Security Office', role: 'Campus Security', phone: '+975 788 123 005', email: 'security@campus.rw' },
  { id: '6', name: "Registrar's Office", role: 'Student Records', phone: '+975 788 123 006', email: 'registrar@campus.rw' },
  { id: '7', name: 'Financial Aid Office', role: 'Scholarships & Fees', phone: '+975 788 123 007', email: 'finaid@campus.rw' },
];

// Make cards take up full width on phones, but narrower on tablets (for better appearance)
const cardWidth = isTablet() ? '80%' : '100%';

// ContactItem Component - Shows a single contact card
// This component is reused for each contact in the list
const ContactItem = ({ name, role, phone, email, onPress, colors }: any) => {
  return (
    // TouchableOpacity makes the card clickable - when pressed, it navigates to contact details
    <TouchableOpacity 
      style={[styles.contactCard, { backgroundColor: colors.card, alignSelf: 'center', width: cardWidth }]} 
      onPress={onPress} // When tapped, navigate to ContactDetailScreen
    >
      {/* Avatar - Person icon on the left */}
      <View style={styles.avatar}>
        <Ionicons name="person-circle" size={scaleWidth(50)} color="#3498db" />
      </View>
      
      {/* Contact information in the middle */}
      <View style={styles.contactInfo}>
        {/* Contact name - bold and larger */}
        <Text style={[styles.contactName, { color: colors.text, fontSize: fonts.lg }]}>
          {name}
        </Text>
        {/* Role/position - smaller text in blue */}
        <Text style={[styles.contactRole, { fontSize: fonts.sm }]}>
          {role}
        </Text>
        {/* Phone number with phone icon */}
        <Text style={[styles.contactPhone, { fontSize: fonts.xs }]}>
          <Ionicons name="call-outline" size={scaleWidth(14)} color="#27ae60" /> {phone}
        </Text>
      </View>
      
      {/* Arrow icon on the right - indicates this card is clickable */}
      <Ionicons name="chevron-forward" size={scaleWidth(24)} color={colors.subtext} />
    </TouchableOpacity>
  );
};

// Main Contacts Screen
const ContactsScreen = ({ navigation }: any) => {
  // Get colors from theme (light or dark mode)
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Title - "Important Contacts" */}
      <Text style={[styles.title, { color: colors.text, fontSize: fonts.huge }]}>
        Important Contacts
      </Text>
      
      {/* Subtitle - instructions to user */}
      <Text style={[styles.subtitle, { color: colors.subtext, fontSize: fonts.md }]}>
        Tap any contact to view full details
      </Text>
      
      {/* FlatList - Efficiently displays the list of contacts */}
      {/* FlatList is like a scrollable list that only shows what's visible on screen */}
      <FlatList
        data={contacts} // Array of contact objects to display
        renderItem={({ item }) => (
          // For each contact, create a ContactItem component
          <ContactItem 
            name={item.name} 
            role={item.role} 
            phone={item.phone}
            email={item.email}
            colors={colors}
            onPress={() => navigation.navigate('ContactDetail', { contact: item })} // Pass entire contact object to detail screen
          />
        )}
        keyExtractor={(item) => item.id} // React needs a unique ID for efficient updating
        showsVerticalScrollIndicator={false} // Hide the scroll bar
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

// Styles - control how everything looks
const styles = StyleSheet.create({
  container: {
    flex: 1, // Fill entire screen
    padding: spacing.lg, // Add padding around edges
  },
  title: {
    fontWeight: 'bold', // Make bold
    marginBottom: spacing.xs, // Space below title
  },
  subtitle: {
    marginBottom: spacing.lg, // Space below subtitle
  },
  listContainer: {
    paddingBottom: spacing.xl, // Add padding at bottom of list
  },
  contactCard: {
    flexDirection: 'row', // Arrange items horizontally: [avatar | content | arrow]
    alignItems: 'center', // Vertically center the items
    padding: spacing.md, // Padding inside card
    borderRadius: scaleWidth(12), // Round corners
    marginBottom: spacing.md, // Space between cards
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow position
    shadowOpacity: 0.1, // Shadow transparency
    shadowRadius: 4, // Shadow blur
    elevation: 3, // Android shadow
  },
  avatar: {
    marginRight: spacing.md, // Space between avatar and content
  },
  contactInfo: {
    flex: 1, // Take up remaining space (push arrow to right)
  },
  contactName: {
    fontWeight: 'bold', // Make bold
  },
  contactRole: {
    color: '#3498db', // Blue color for role/position
    marginTop: spacing.xs, // Space below name
  },
  contactPhone: {
    color: '#27ae60', // Green color for phone number
    marginTop: spacing.xs, // Space below role
  },
});

export default ContactsScreen;