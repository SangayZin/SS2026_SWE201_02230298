// Icon set used for the list items (simple symbols instead of emoji)
import { MaterialCommunityIcons } from '@expo/vector-icons';
// RouteProp and NativeStackNavigationProp types help TypeScript know route params
import type { RouteProp } from '@react-navigation/native';
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

type DetailsRouteProp = RouteProp<RootStackParamList, 'Details'>;
type DetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Details'>;

interface DetailsScreenProps {
  route: DetailsRouteProp;
  navigation: DetailsNavigationProp;
}

// Lists of animals grouped by category shown in this screen
const ANIMALS: Record<'Carnivore' | 'Herbivore' | 'Omnivore', string[]> = {
  Carnivore: [
    'Lion',
    'Tiger',
    'Leopard',
    'Cheetah',
    'Wolf',
    'Polar Bear',
    'Crocodile',
  ],
  Herbivore: [
    'Elephant',
    'Giraffe',
    'Zebra',
    'Cow',
    'Deer',
    'Rabbit',
    'Gorilla',
  ],
  Omnivore: [
    'Bear',
    'Pig',
    'Raccoon',
    'Hedgehog',
    'Ostrich',
    'Squirrel',
    'Human',
  ],
};

// Map animal names to icon names. If an icon is missing, we fall back to 'paw'.
const ICON_MAP: Record<string, string> = {
  Lion: 'cow',
  Tiger: 'tiger',
  Leopard: 'cat',
  Cheetah: 'cat',
  Wolf: 'wolf',
  'Polar Bear': 'bear',
  Crocodile: 'alligator',
  Elephant: 'elephant',
  Giraffe: 'giraffe',
  Zebra: 'horse',
  Cow: 'cow',
  Deer: 'deer',
  Rabbit: 'rabbit',
  Gorilla: 'gorilla',
  Bear: 'bear',
  Pig: 'pig',
  Raccoon: 'raccoon',
  Hedgehog: 'hedgehog',
  Ostrich: 'owl',
  Squirrel: 'squirrel',
  Human: 'account',
};

// This screen shows the list for the category passed in `route.params.category`.
// It adapts layout for small and large screens using `useWindowDimensions()`.
export default function DetailsScreen({ route, navigation }: DetailsScreenProps) {
  const { width, height } = useWindowDimensions();
  const isLarge = width >= 600;
  const isLandscape = width > height;

  const category = route.params.category;
  const animals = ANIMALS[category];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.container, { padding: isLarge ? 24 : 16 }]}> 
          <Text style={[styles.title, { fontSize: isLarge ? 28 : 22 }]}>
            {category} Animals
          </Text>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Animals in this category</Text>
            <Text style={styles.infoValue}>Showing {animals.length} animals</Text>
          </View>

          <View style={[styles.featureContainer, isLarge && styles.featureContainerRow]}>
            {animals.map((name) => (
              <View key={name} style={styles.featureBox}>
                <MaterialCommunityIcons name={(ICON_MAP[name] || 'paw') as any} size={28} color="#1a1a2e" />
                <Text style={styles.featureTitle}>{name}</Text>
                <Text style={styles.featureText}>{category}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Text style={styles.backButtonText}>← Back to Dashboard</Text>
          </TouchableOpacity>
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
    marginBottom: 24,
    textAlign: 'center',
    color: '#1a1a2e',
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 16,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 15,
    color: '#666',
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  featureContainer: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 24,
    width: '100%',
  },
  featureContainerRow: {
    flexDirection: 'row',
    gap: 12,
  },
  featureBox: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featureEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  featureText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#34C759',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  backButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});