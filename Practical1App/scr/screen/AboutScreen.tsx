// Import React (required for writing JSX)
import React from 'react';
// Import React Native components: View (container), Text (shows text), StyleSheet (styles), Button (clickable button)
import { View, Text, StyleSheet, Button } from 'react-native';

// AboutScreen component - this is the second screen users can navigate to
// The 'navigation' prop allows going back to previous screens
function AboutScreen({ navigation }: any) {
    return (
        // View is a container like a div in web - it holds other components
        <View style={styles.container}>
            {/* Display the title text using the title style */}
            <Text style={styles.title}>About Screen</Text>
            {/* Display the description text using the text style */}
            <Text style={styles.text}>This is a simple React Native app using Expo and navigation.</Text>
            {/* Button: when pressed, goes back to the previous screen (Home) */}
            <Button 
                title="Go Back" 
                onPress={() => navigation.goBack()} // goBack() returns to the previous screen
                color='#007AFF' // Set button color to blue
            />
        </View>
    );
}

// StyleSheet creates optimized styles for components - similar to CSS in web development
const styles = StyleSheet.create({
    container: {
        flex: 1, // Take up all available space
        backgroundColor: '#f5f5f5', 
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
        padding: 20, // Add space inside the container (in pixels)
    },
    title: {
        fontSize: 28, // Size of the text in pixels
        fontWeight: 'bold', // Make text bold/thick
        marginBottom: 16, // Space below the title
    },
    text: {
        fontSize: 16, // Size of the text in pixels
        textAlign: 'center', // Center the text horizontally
        marginBottom: 20, // Space below the text
    },
});

// Export this component so it can be used as a screen
export default AboutScreen;