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

const AnimationDemoScreen: React.FC = () => {
  // Bounce animation
  const bounceAnim = useRef(new Animated.Value(0)).current;

  // Rotate animation
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Pulse animation
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Slide animation
  const slideAnim = useRef(new Animated.Value(-300)).current;

  // Fade animation
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Bounce animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -50,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Rotate animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();

    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Slide animation
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Fade animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const rotateZ = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleRestartAnimations = () => {
    bounceAnim.setValue(0);
    rotateAnim.setValue(0);
    pulseAnim.setValue(1);
    slideAnim.setValue(-300);
    fadeAnim.setValue(0);

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Animation Showcase</Text>
        <Text style={styles.headerSubtitle}>React Native Animations in Action</Text>
      </View>

      {/* Bounce Animation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bounce Animation</Text>
        <View style={styles.animationContainer}>
          <Animated.View
            style={[
              styles.animatedBox,
              styles.bounceBox,
              {
                transform: [{ translateY: bounceAnim }],
              },
            ]}
          >
            <Ionicons name="arrow-down" size={32} color="#007AFF" />
          </Animated.View>
        </View>
        <Text style={styles.animationDesc}>Bouncing motion with continuous loop</Text>
      </View>

      {/* Rotate Animation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rotate Animation</Text>
        <View style={styles.animationContainer}>
          <Animated.View
            style={[
              styles.animatedBox,
              styles.rotateBox,
              {
                transform: [{ rotate: rotateZ }],
              },
            ]}
          >
            <Ionicons name="refresh" size={32} color="#FF6B6B" />
          </Animated.View>
        </View>
        <Text style={styles.animationDesc}>Continuous 360° rotation</Text>
      </View>

      {/* Pulse Animation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pulse Animation</Text>
        <View style={styles.animationContainer}>
          <Animated.View
            style={[
              styles.animatedBox,
              styles.pulseBox,
              {
                transform: [{ scale: pulseAnim }],
              },
            ]}
          >
            <Ionicons name="heart" size={32} color="#E74C3C" />
          </Animated.View>
        </View>
        <Text style={styles.animationDesc}>Scale pulsing effect</Text>
      </View>

      {/* Slide Animation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Slide Animation</Text>
        <View style={styles.animationContainer}>
          <Animated.View
            style={[
              styles.animatedBox,
              styles.slideBox,
              {
                transform: [{ translateX: slideAnim }],
              },
            ]}
          >
            <Ionicons name="arrow-forward" size={32} color="#4ECDC4" />
          </Animated.View>
        </View>
        <Text style={styles.animationDesc}>Slide from left to right</Text>
      </View>

      {/* Fade Animation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fade Animation</Text>
        <View style={styles.animationContainer}>
          <Animated.View
            style={[
              styles.animatedBox,
              styles.fadeBox,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <Ionicons name="eye" size={32} color="#FFE66D" />
          </Animated.View>
        </View>
        <Text style={styles.animationDesc}>Fade in effect</Text>
      </View>

      {/* Restart Button */}
      <Pressable
        onPress={handleRestartAnimations}
        style={({ pressed }) => [
          styles.restartButton,
          pressed && styles.restartButtonPressed,
        ]}
      >
        <Ionicons name="refresh-circle" size={24} color="#fff" />
        <Text style={styles.restartButtonText}>Restart All Animations</Text>
      </Pressable>

      <View style={styles.spacer} />
    </ScrollView>
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
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#e0e0e0',
    marginTop: 4,
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 12,
    marginHorizontal: 12,
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  animationContainer: {
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 12,
  },
  animatedBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bounceBox: {
    backgroundColor: '#E3F2FD',
  },
  rotateBox: {
    backgroundColor: '#FFE5E5',
  },
  pulseBox: {
    backgroundColor: '#FFE5E5',
  },
  slideBox: {
    backgroundColor: '#E0F7F6',
  },
  fadeBox: {
    backgroundColor: '#FFF9E6',
  },
  animationDesc: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
  },
  restartButton: {
    backgroundColor: '#007AFF',
    marginHorizontal: 16,
    marginVertical: 20,
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  restartButtonPressed: {
    opacity: 0.8,
  },
  restartButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  spacer: {
    height: 20,
  },
});

export default AnimationDemoScreen;
