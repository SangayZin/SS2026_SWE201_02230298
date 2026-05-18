import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    PanResponder,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { AnimatedButton } from '../../components/AnimatedButton';
import { AnimatedProgressBar } from '../../components/AnimatedProgressBar';
import { Card } from '../../components/Card';

const HomeScreen: React.FC = () => {
  const fadeInAnim = useRef(new Animated.Value(0)).current;
  const headerSlideAnim = useRef(new Animated.Value(-50)).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
    })
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeInAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(headerSlideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const mockTasks = [
    { id: '1', title: 'Mathematics Homework', subtitle: 'Due tomorrow', progress: 65 },
    { id: '2', title: 'Programming Assignment', subtitle: 'Due in 3 days', progress: 40 },
    { id: '3', title: 'Literature Essay', subtitle: 'Due in 5 days', progress: 20 },
  ];

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Animated.View
        style={[
          styles.header,
          {
            opacity: fadeInAnim,
            transform: [{ translateY: headerSlideAnim }],
          },
        ]}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Welcome back! </Text>
            <Text style={styles.userName}>Sangay Tenzin</Text>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>5</Text>
              <Text style={styles.statLabel}>Tasks</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>78%</Text>
              <Text style={styles.statLabel}>Progress</Text>
            </View>
          </View>
        </View>
      </Animated.View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Animated.View
          style={{
            opacity: fadeInAnim,
          }}
        >
          <Text style={styles.sectionTitle}>Today's Tasks</Text>

          {mockTasks.map((task, index) => (
            <View key={task.id}>
              <Card
                title={task.title}
                subtitle={task.subtitle}
                delay={200 + index * 100}
                onPress={() => {}}
              />
              <AnimatedProgressBar progress={task.progress} color="#007AFF" />
            </View>
          ))}

          <Text style={[styles.sectionTitle, { marginTop: 24 }] }>
            Quick Actions
          </Text>

          <AnimatedButton
            title="+ Add New Task"
            onPress={() => {}}
            variant="primary"
          />
          <AnimatedButton
            title="View Schedule"
            onPress={() => {}}
            variant="secondary"
          />

          <View style={styles.motivationalCard}>
            <Ionicons name="star" size={32} color="#FFD700" />
            <Text style={styles.motivationalText}>Keep up the great work! </Text>
            <Text style={styles.motivationalSubtext}>
              You're 78% on track to complete this week's goals
            </Text>
          </View>

          <View style={styles.spacer} />
        </Animated.View>
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
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
  },
  headerContent: {
    gap: 16,
  },
  greeting: {
    fontSize: 14,
    color: '#e0e0e0',
    fontWeight: '500',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 24,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: '#e0e0e0',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  motivationalCard: {
    backgroundColor: '#FFF9E6',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 20,
    alignItems: 'center',
    gap: 8,
  },
  motivationalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  motivationalSubtext: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
  spacer: {
    height: 20,
  },
});

export default HomeScreen;
