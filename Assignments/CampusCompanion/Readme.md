# Campus Companion App

## Overview

Campus Companion is a mobile app for College of Science and Technology students to access important campus information including contacts, class schedules, and campus resources. The app features dark mode, responsive design, and call/email functionality.

**Main Features:**
- Contact directory with call and email options
- Weekly class schedule with color-coded days
- Campus resources (library hours, cafeteria, map, Bus Schedule)
- Dark/Light mode toggle
- Bottom tab navigation

## Installation

### Prerequisites
- Node.js installed
- Expo Go app on your phone (or emulator)

### Steps

```bash
# Clone or download the project
cd CampusCompanion

# Install dependencies
npm install

# Install navigation packages
npx expo install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler
npx expo install @expo/vector-icons

# Start the app
npx expo start --clear

```

## Run on Device
Scan QR code with Expo Go app (Android) or camera (iOS)

Press a for Android emulator

Press i for iOS simulator (Mac only)

## Known Issues
Call and email functions only work on physical phones (not emulators)

Contact and schedule data are currently hardcoded (sample data)

Theme preference resets when app restarts

## Tech Stack
React Native (Expo)

TypeScript

React Navigation (Stack + Bottom Tabs)

Expo Vector Icons