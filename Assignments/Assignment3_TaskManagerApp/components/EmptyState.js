import { StyleSheet, Text, View } from 'react-native';

export default function EmptyState({ title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderRadius: 24,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },
});
