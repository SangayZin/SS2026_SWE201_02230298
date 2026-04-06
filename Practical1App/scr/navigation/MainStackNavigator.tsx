// Import createNativeStackNavigator - this creates a navigation system for moving between screens
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Import the AboutScreen and HomeScreen components
import AboutScreen from "../screen/AboutScreen";
import HomeScreen from "../screen/HomeScreen";

// Create a Stack navigator - this handles navigation like a stack of cards (Home on top, then About, etc.)
const Stack = createNativeStackNavigator();

// This function defines all the screens in the app and how to navigate between them
function MainStackNavigator() {
  return (
    // Stack.Navigator creates a navigation container that manages all screens
    <Stack.Navigator 
      initialRouteName="Home" // The first screen shown when the app opens is "Home"
      screenOptions={{
        headerShown: false // Hide the default header bar at the top of each screen
      }}>
      {/* Define the Home screen - when you navigate to "Home", it shows HomeScreen component */}
      <Stack.Screen name="Home" component={HomeScreen}/>
      {/* Define the About screen - when you navigate to "About", it shows AboutScreen component */}
      <Stack.Screen name="About" component={AboutScreen}/>
    </Stack.Navigator>
  );
}

// Export this component so it can be used in App.tsx
export default MainStackNavigator;