// Import React (required for writing JSX)
import React from "react";
// Import React Native components: View (container), Text (shows text), StyleSheet (styles), Button (clickable button)
import { View, Text, StyleSheet, Button } from "react-native";

// HomeScreen component - this is the first screen users see
// The 'navigation' prop allows moving to other screens
function HomeScreen({ navigation }: any) {
    return (
        // View is a container like a div in web - it holds other components
        <View style={styles.container}>
            {/* Display the title text using the title style */}
            <Text style={styles.title}>Home Screen</Text>
            {/* Display the welcome message using the text style */}
            <Text style={styles.text}>Welcome to the basic multi-screen application.</Text>
            {/* Button: when pressed, navigates to the About screen */}
            <Button 
                title="Go to About" 
                onPress={() => navigation.navigate('About')} // navigate() takes you to another screen
                color='#007AFF' // Set button color to blue
            />
        </View>
    );
}

// StyleSheet creates optimized styles for components - similar to CSS in web development
const styles = StyleSheet.create({
    container: {
        flex: 1, // Take up all available space
        backgroundColor: '#f5f5f5', // Light gray background color
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
export default HomeScreen;