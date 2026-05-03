import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { AnimatedProgressBar } from '../../components/AnimatedProgressBar';
import type { CategoriesStackScreenProps } from '../../navigation/types';

const CategoryDetailScreen: React.FC<CategoriesStackScreenProps<'CategoryDetail'>> = ({
  route,
}) => {
  const { name, id } = route.params;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const materials = [
    {
      id: '1',
      title: 'Introduction to the Subject',
      progress: 100,
      lessons: 5,
    },
    { id: '2', title: 'Advanced Concepts', progress: 75, lessons: 8 },
    { id: '3', title: 'Practice Problems', progress: 45, lessons: 12 },
    { id: '4', title: 'Real-world Applications', progress: 20, lessons: 6 },
  ];

  const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#C7CEEA', '#B5EAD7'];
  const categoryColor = colors[parseInt(id) % colors.length];

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.header,
          {
            backgroundColor: categoryColor,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.headerTitle}>{name}</Text>
        <Text style={styles.headerSubtitle}>Progress & Materials</Text>
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View
          style={[
            styles.overallProgress,
            {
              opacity: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ]}
        >
          <Text style={styles.progressLabel}>Overall Progress</Text>
          <AnimatedProgressBar progress={60} color={categoryColor} />
          <Text style={styles.progressStats}>12 of 20 lessons completed</Text>
        </Animated.View>

        <Text style={styles.materialsTitle}>Study Materials</Text>

        {materials.map((material, index) => (
          <Animated.View
            key={material.id}
            style={{
              opacity: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50 + index * 10, 0],
                  }),
                },
              ],
            }}
          >
            <Pressable
              style={({ pressed }) => [
                styles.materialCard,
                pressed && styles.materialCardPressed,
              ]}
            >
              <View style={styles.materialHeader}>
                <View style={styles.materialInfo}>
                  <Text style={styles.materialTitle}>{material.title}</Text>
                  <Text style={styles.lessonCount}>{material.lessons} lessons</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#999" />
              </View>
              <AnimatedProgressBar
                progress={material.progress}
                color={categoryColor}
              />
            </Pressable>
          </Animated.View>
        ))}

        <View style={styles.actionCards}>
          <Pressable
            style={({ pressed }) => [
              styles.actionCard,
              styles.primaryAction,
              pressed && styles.actionCardPressed,
            ]}
          >
            <Ionicons name="play" size={24} color="#fff" />
            <Text style={styles.actionCardText}>Start Learning</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.actionCard,
              styles.secondaryAction,
              pressed && styles.actionCardPressed,
            ]}
          >
            <Ionicons name="download" size={24} color={categoryColor} />
            <Text style={[styles.actionCardText, { color: categoryColor }]}>
              Download
            </Text>
          </Pressable>
        </View>

        <View style={styles.spacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  overallProgress: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    marginBottom: 24,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  progressStats: {
    fontSize: 13,
    color: '#999',
    marginTop: 8,
  },
  materialsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  materialCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  materialCardPressed: {
    opacity: 0.7,
  },
  materialHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  materialInfo: {
    flex: 1,
  },
  materialTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  lessonCount: {
    fontSize: 13,
    color: '#999',
  },
  actionCards: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    marginBottom: 20,
  },
  actionCard: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    gap: 8,
  },
  actionCardPressed: {
    opacity: 0.8,
  },
  primaryAction: {
    backgroundColor: '#007AFF',
  },
  secondaryAction: {
    backgroundColor: '#f0f0f0',
  },
  actionCardText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
  spacer: {
    height: 20,
  },
});

export default CategoryDetailScreen;
