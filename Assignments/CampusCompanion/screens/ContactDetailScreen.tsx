// screens/ContactDetailScreen.tsx
// Contact Details Screen - Shows full information for one contact
// Displays name, role, phone, email, and buttons to Call or Email

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native'; // Mobile UI components
import { Ionicons } from '@expo/vector-icons'; // Icon library
import { useTheme } from '../context/ThemeContext'; // Get theme colors

// Main Contact Details Screen
const ContactDetailScreen = ({ route }: any) => {
  // Get the contact object that was passed from ContactsScreen
  const { contact } = route.params;
  
  // Get theme colors (light or dark mode)
  const { colors } = useTheme();

  // Function to make a phone call
  const makeCall = async () => {
    // Create a tel: URL (like tel:+975788123001)
    const phoneUrl = `tel:${contact.phone}`;
    
    // Check if the device can handle phone calls
    const canOpen = await Linking.canOpenURL(phoneUrl);
    
    if (canOpen) {
      // If yes, open the phone app and dial the number
      await Linking.openURL(phoneUrl);
    } else {
      // If no, show an error message to the user
      Alert.alert('Error', 'Your device cannot make calls');
    }
  };

  // Function to send an email
  const sendEmail = async () => {
    // Create a mailto: URL (like mailto:example@email.com)
    const emailUrl = `mailto:${contact.email}`;
    
    // Check if the device can handle emails
    const canOpen = await Linking.canOpenURL(emailUrl);
    
    if (canOpen) {
      // If yes, open the email app
      await Linking.openURL(emailUrl);
    } else {
      // If no, show an error message
      Alert.alert('Error', 'No email app found');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      
      {/* Avatar Circle - Shows the first letter of person's name */}
      <View style={[styles.avatarCircle, { backgroundColor: colors.header }]}>
        {/* charAt(0) gets the first character of the name */}
        <Text style={styles.avatarText}>
          {contact.name.charAt(0)}
        </Text>
      </View>
      
      {/* Person's full name - centered and bold */}
      <Text style={[styles.name, { color: colors.text }]}>
        {contact.name}
      </Text>
      
      {/* Person's position/role - blue and smaller */}
      <Text style={styles.role}>
        {contact.role}
      </Text>
      
      {/* Card showing phone and email information */}
      <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
        
        {/* Phone number row - icon + phone number */}
        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={22} color="#27ae60" /> {/* Green phone icon */}
          <Text style={[styles.infoText, { color: colors.text }]}>
            {contact.phone}
          </Text>
        </View>
        
        {/* Email address row - icon + email address */}
        <View style={styles.infoRow}>
          <Ionicons name="mail-outline" size={22} color="#3498db" /> {/* Blue mail icon */}
          <Text style={[styles.infoText, { color: colors.text }]}>
            {contact.email}
          </Text>
        </View>
      </View>
      
      {/* Two buttons: Call and Email */}
      <View style={styles.buttonContainer}>
        
        {/* Call Button - Green, with phone icon */}
        <TouchableOpacity 
          style={[styles.button, styles.callButton]} 
          onPress={makeCall} // Call the makeCall function when pressed
        >
          <Ionicons name="call" size={24} color="white" />
          <Text style={styles.buttonText}>Call</Text>
        </TouchableOpacity>
        
        {/* Email Button - Blue, with mail icon */}
        <TouchableOpacity 
          style={[styles.button, styles.emailButton]} 
          onPress={sendEmail} // Call the sendEmail function when pressed
        >
          <Ionicons name="mail" size={24} color="white" />
          <Text style={styles.buttonText}>Email</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
};

// Styles - all the visual styling
const styles = StyleSheet.create({
  container: {
    flex: 1, // Fill entire screen
    alignItems: 'center', // Center all content horizontally
    padding: 20, // Padding around edges
  },
  avatarCircle: {
    width: 100, // Circle diameter
    height: 100,
    borderRadius: 50, // Make it a circle (50% of width/height)
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    marginTop: 30,
    marginBottom: 20,
    shadowColor: '#000', // Shadow styling
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Android shadow
  },
  avatarText: {
    fontSize: 40, // Large font
    fontWeight: 'bold',
    color: 'white',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8, // Space below name
    textAlign: 'center',
  },
  role: {
    fontSize: 16,
    color: '#3498db', // Blue color
    marginBottom: 30,
    textAlign: 'center',
  },
  infoCard: {
    borderRadius: 12, // Round corners
    padding: 20,
    width: '100%', // Full width
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row', // Arrange icon and text horizontally
    alignItems: 'center', // Vertically center
    marginBottom: 15,
    gap: 15, // Space between icon and text
  },
  infoText: {
    fontSize: 16,
    flex: 1, // Take up remaining space
  },
  buttonContainer: {
    flexDirection: 'row', // Two buttons side by side
    justifyContent: 'space-around', // Space them evenly
    width: '100%',
    gap: 15, // Space between buttons
  },
  button: {
    flex: 1, // Both buttons get equal width
    flexDirection: 'row', // Icon and text side by side
    alignItems: 'center', // Center vertically
    justifyContent: 'center', // Center horizontally
    padding: 15,
    borderRadius: 10, // Rounded corners
    gap: 10, // Space between icon and text
  },
  callButton: {
    backgroundColor: '#27ae60', // Green for call
  },
  emailButton: {
    backgroundColor: '#3498db', // Blue for email
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ContactDetailScreen;