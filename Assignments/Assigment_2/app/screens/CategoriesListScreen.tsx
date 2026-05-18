import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import type { CategoriesStackScreenProps } from '../../navigation/types';

const CategoriesListScreen: React.FC<CategoriesStackScreenProps<'CategoriesList'>> = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const categories = [
    {
      id: '1',
      name: 'Mathematics',
      icon: 'calculator',
      color: '#FF6B6B',
      count: 12,
    },
    {
      id: '2',
      name: 'Programming',
      icon: 'code-slash',
      color: '#4ECDC4',
      count: 8,
    },
    {
      id: '3',
      name: 'Literature',
      icon: 'book',
      color: '#FFE66D',
      count: 15,
    },
    {
      id: '4',
      name: 'Science',
      icon: 'flask',
      color: '#95E1D3',
      count: 10,
    },
    {
      id: '5',
      name: 'History',
      icon: 'time',
      color: '#C7CEEA',
      count: 7,
    },
    {
      id: '6',
      name: 'Languages',
      icon: 'language',
      color: '#B5EAD7',
      count: 9,
    },
  ];

  const handleCategoryPress = (id: string, name: string) => {
    navigation.navigate('CategoryDetail', { id, name });
  };

  const CategoryCard = ({ item, index }: { item: (typeof categories)[0]; index: number }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.96,
        useNativeDriver: true,
        speed: 50,
        bounciness: 12,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 50,
        bounciness: 12,
      }).start();
    };

    return (
      <Animated.View
        style={[
          styles.categoryCard,
          {
            opacity: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
            transform: [
              {
                scale: scaleAnim,
              },
              {
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [30, 0],
                }),
              },
            ],
          },
        ]}
      >
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => handleCategoryPress(item.id, item.name)}
          style={[styles.cardContent, { backgroundColor: item.color }]}
        >
          <Ionicons name={item.icon as any} size={40} color="#fff" />
          <Text style={styles.categoryName}>{item.name}</Text>
          <Text style={styles.categoryCount}>{item.count} items</Text>
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.grid}>
          {categories.map((category, index) => (
            <CategoryCard key={category.id} item={category} index={index} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    borderRadius: 12,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    marginTop: 12,
    textAlign: 'center',
  },
  categoryCount: {
    fontSize: 12,
    color: '#fff',
    marginTop: 4,
    opacity: 0.8,
  },
});

export default CategoriesListScreen;
