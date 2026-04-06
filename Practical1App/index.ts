// Import registerRootComponent from Expo - this function starts the React Native app
import { registerRootComponent } from 'expo';

// Import the main App component
import App from './App';

// registerRootComponent tells Expo to start the app with the App component
// This function sets up the app to run properly whether in Expo Go or a native build
// This is the entry point - the first thing that runs when the app starts
registerRootComponent(App);
