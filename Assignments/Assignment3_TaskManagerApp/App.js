import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { APP_NAME } from './config/appConfig';
import AuthScreen from './screens/AuthScreen';
import TaskDetailScreen from './screens/TaskDetailScreen';
import TaskFormScreen from './screens/TaskFormScreen';
import TaskListScreen from './screens/TaskListScreen';
import { useAppStore } from './store/useAppStore';

function BootScreen() {
  return (
    <View style={styles.bootScreen}>
      <ActivityIndicator size="large" color="#f8fafc" />
      <Text style={styles.bootTitle}>Loading {APP_NAME}...</Text>
      <Text style={styles.bootSubtitle}>Rehydrating state and preparing the app shell.</Text>
    </View>
  );
}

export default function App() {
  const [hydrationReady, setHydrationReady] = useState(useAppStore.persist.hasHydrated());
  const bootstrapped = useAppStore((state) => state.bootstrapped);
  const bootstrapApp = useAppStore((state) => state.bootstrapApp);
  const screen = useAppStore((state) => state.screen);
  const markHydrated = useAppStore((state) => state.markHydrated);

  useEffect(() => {
    const unsubscribe = useAppStore.persist.onFinishHydration(() => {
      markHydrated();
      setHydrationReady(true);
    });

    if (useAppStore.persist.hasHydrated()) {
      markHydrated();
      setHydrationReady(true);
    }

    return unsubscribe;
  }, [markHydrated]);

  useEffect(() => {
    if (hydrationReady && !bootstrapped) {
      bootstrapApp();
    }
  }, [hydrationReady, bootstrapped, bootstrapApp]);

  if (!hydrationReady || !bootstrapped || screen === 'loading') {
    return (
      <SafeAreaProvider>
        <StatusBar style="light" />
        <SafeAreaView style={styles.root}>
          <BootScreen />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <SafeAreaView style={styles.root}>
        {screen === 'auth' ? (
          <AuthScreen />
        ) : screen === 'detail' ? (
          <TaskDetailScreen />
        ) : screen === 'form' ? (
          <TaskFormScreen />
        ) : (
          <TaskListScreen />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#020617',
  },
  bootScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 12,
    backgroundColor: '#020617',
  },
  bootTitle: {
    color: '#f8fafc',
    fontSize: 20,
    fontWeight: '800',
  },
  bootSubtitle: {
    color: '#cbd5e1',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
});
