import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { useColorScheme } from '../hooks/use-color-scheme';
import type { CategoriesStackParamList, RootTabParamList } from '../navigation/types';
import AnimationDemoScreen from './screens/AnimationDemoScreen';
import CategoriesListScreen from './screens/CategoriesListScreen';
import CategoryDetailScreen from './screens/CategoryDetailScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator<RootTabParamList>();
const CategoriesStack = createNativeStackNavigator<CategoriesStackParamList>();

function CategoriesStackNavigator() {
  return (
    <CategoriesStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <CategoriesStack.Screen
        name="CategoriesList"
        component={CategoriesListScreen}
        options={{ title: 'Study Categories' }}
      />
      <CategoriesStack.Screen
        name="CategoryDetail"
        component={CategoryDetailScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
    </CategoriesStack.Navigator>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'home';

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Categories') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'Animations') {
              iconName = focused ? 'sparkles' : 'sparkles-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#999',
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '600',
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Student Hub',
          }}
        />
        <Tab.Screen
          name="Categories"
          component={CategoriesStackNavigator}
          options={{
            headerShown: false,
            title: 'Categories',
          }}
        />
        <Tab.Screen
          name="Animations"
          component={AnimationDemoScreen}
          options={{
            title: 'Animations Demo',
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'Profile',
          }}
        />
      </Tab.Navigator>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
