# Welcome to your Expo app 

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory.

This repository for the practical uses React Navigation (stack navigator) and demonstrates responsive layout techniques in the `screens` folder. It does not use `expo-router`.

Responsive concepts demonstrated:

- Flexbox layout (`flex`, `flexDirection`, `justifyContent`, `alignItems`) to adapt to screen space.
- Percentage-based and flexible dimensions (`width: '100%'`, `flex: 1`) to avoid fixed pixel sizes.
- `ScrollView` plus `SafeAreaView` to enable safe scrolling and avoid notches/system UI overlap.
- `useWindowDimensions()` to read current `width`/`height` and switch layouts at a breakpoint (`width >= 600`) — column on small screens, row on wider screens.

Files to review:

- `screens/DashboardScreen.tsx` — responsive card layout and navigation button.
- `screens/DetailsScreen.tsx` — device info and feature boxes that switch layout with screen size.

Quick start:

```bash
npm install
npx expo start
```

Testing notes:

- Open on a phone (portrait) and a tablet or emulator (landscape). The dashboard cards stack vertically on narrow screens and lay out side-by-side on wide screens.
- The Details screen reports device width/height and orientation; its feature boxes switch from column to row at the breakpoint.
- Using `flex` and percentages prevents horizontal clipping; `ScrollView` allows vertical scroll on small screens.

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.


