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
import { AnimatedButton } from '../../components/AnimatedButton';

const ProfileScreen: React.FC = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const profileStats = [
    { label: 'Streak', value: '15', icon: 'flame' as const },
    { label: 'Level', value: '8', icon: 'trophy' as const },
    { label: 'Hours', value: '124', icon: 'time' as const },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View
        style={[
          styles.profileHeader,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={48} color="#fff" />
          </View>
        </View>
        <Text style={styles.profileName}>Sangay Tenzin</Text>
        <Text style={styles.profileEmail}>sangay@gmail.com</Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.statsGrid,
          {
            opacity: fadeAnim,
            transform: [
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
        {profileStats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <Ionicons name={stat.icon} size={32} color="#007AFF" />
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </Animated.View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Learning Path</Text>
        <View style={styles.learningPath}>
          {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map((level, index) => (
            <View key={index} style={styles.pathItem}>
              <View
                style={[
                  styles.pathCircle,
                  index < 2 && styles.pathCircleActive,
                ]}
              >
                <Ionicons
                  name={index < 2 ? 'checkmark' : 'chevron-forward'}
                  size={16}
                  color={index < 2 ? '#fff' : '#999'}
                />
              </View>
              <Text style={[styles.pathLabel, index < 2 && styles.pathLabelActive]}>
                {level}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <SettingItem icon="notifications" label="Notifications" />
        <SettingItem icon="moon" label="Dark Mode" />
        <SettingItem icon="language" label="Language" />
        <SettingItem icon="lock-open" label="Privacy" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.aboutText}>
          Student Hub v1.0.0
        </Text>
        <Text style={styles.aboutSubtext}>
          personal productivity companion for academic success
        </Text>
      </View>

      <AnimatedButton
        title="Log Out"
        onPress={() => {}}
        variant="secondary"
      />

      <View style={styles.spacer} />
    </ScrollView>
  );
};

const SettingItem: React.FC<{ icon: string; label: string }> = ({ icon, label }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.settingItem,
        {
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.settingContent}
      >
        <Ionicons name={icon as any} size={24} color="#007AFF" />
        <Text style={styles.settingLabel}>{label}</Text>
        <View style={styles.settingArrow}>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  profileHeader: {
    backgroundColor: '#007AFF',
    paddingVertical: 32,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#0056CC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  profileEmail: {
    fontSize: 14,
    color: '#e0e0e0',
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 12,
    marginTop: -20,
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#007AFF',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  learningPath: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pathItem: {
    alignItems: 'center',
    flex: 1,
  },
  pathCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  pathCircleActive: {
    backgroundColor: '#007AFF',
  },
  pathLabel: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  pathLabelActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
  settingItem: {
    marginBottom: 8,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginLeft: 16,
    flex: 1,
  },
  settingArrow: {
    marginLeft: 'auto',
  },
  aboutText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  aboutSubtext: {
    fontSize: 13,
    color: '#999',
  },
  spacer: {
    height: 20,
  },
});

export default ProfileScreen;
