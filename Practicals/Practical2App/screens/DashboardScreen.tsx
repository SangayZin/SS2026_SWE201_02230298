// Icons library used for simple visual symbols
import { MaterialCommunityIcons } from '@expo/vector-icons';
// Type for the navigation prop so TypeScript knows which screens exist
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';
import type { RootStackParamList } from '../navigation/types';

// Navigation prop type: tells TypeScript what navigation methods are available
type DashboardScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Dashboard'
>;

interface DashboardScreenProps {
  navigation: DashboardScreenNavigationProp;
}

// Simple list of categories shown as cards on the dashboard
const CATEGORIES: { key: 'Carnivore' | 'Herbivore' | 'Omnivore'; title: string; icon: string }[] = [
  { key: 'Carnivore', title: 'Carnivore animals', icon: 'paw' },
  { key: 'Herbivore', title: 'Herbivore animals', icon: 'leaf' },
  { key: 'Omnivore', title: 'Omnivore animals', icon: 'food' },
];

// Main screen showing the category cards. Tapping a card opens `Details`.
export default function DashboardScreen({ navigation }: DashboardScreenProps) {
  const { width } = useWindowDimensions();
  const isLarge = width >= 600;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.container, { padding: isLarge ? 24 : 16 }]}>
          <Text style={[styles.title, { fontSize: isLarge ? 28 : 22 }]}>Animals by Category</Text>

          {/* Small helpers shown to help understand layout while testing */}
          <Text style={styles.widthInfo}>Screen width: {Math.round(width)}px</Text>
          <Text style={styles.layoutInfo}>{isLarge ? 'Side-by-side layout' : 'Stacked layout'}</Text>

          {/* Card list: stacked on small screens, side-by-side on larger widths */}
          <View style={[styles.cardContainer, isLarge && styles.cardContainerRow]}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.key}
                style={styles.card}
                activeOpacity={0.85}
                // Navigate to Details and pass the selected category as a param
                onPress={() => navigation.navigate('Details', { category: cat.key })}
              >
                <MaterialCommunityIcons name={cat.icon as any} size={36} color="#1a1a2e" />
                <Text style={styles.cardTitle}>{cat.title}</Text>
                <Text style={styles.cardSubtitle}>Tap to view animals</Text>
              </TouchableOpacity>
            ))}
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
    color: '#1a1a2e',
  },
  widthInfo: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 4,
  },
  layoutInfo: {
    fontSize: 14,
    textAlign: 'center',
    color: '#007AFF',
    marginBottom: 24,
    fontWeight: '500',
  },
  cardContainer: {
    flexDirection: 'column',
    marginBottom: 24,
  },
  cardContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    flex: 1,
    minHeight: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginHorizontal: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a2e',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
});
