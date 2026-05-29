import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function FeedbackBanner({ type = 'info', title, message, onPress }) {
  if (!message) {
    return null;
  }

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.banner,
        type === 'error' && styles.error,
        type === 'success' && styles.success,
      ]}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
      <Text style={styles.action}>Dismiss</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderRadius: 18,
    padding: 14,
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    alignItems: 'center',
  },
  error: {
    backgroundColor: '#3f1d1d',
    borderColor: '#7f1d1d',
  },
  success: {
    backgroundColor: '#0f3d2f',
    borderColor: '#14532d',
  },
  content: {
    flex: 1,
    gap: 4,
  },
  title: {
    color: '#f8fafc',
    fontSize: 14,
    fontWeight: '800',
  },
  message: {
    color: '#e2e8f0',
    fontSize: 13,
    lineHeight: 18,
  },
  action: {
    color: '#cbd5e1',
    fontSize: 12,
    fontWeight: '700',
  },
});
