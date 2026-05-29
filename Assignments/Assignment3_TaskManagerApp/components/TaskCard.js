import { Pressable, StyleSheet, Text, View } from 'react-native';

import { formatDate } from '../utils/formatters';

const STATUS_STYLES = {
  todo: { backgroundColor: '#312e81', color: '#e0e7ff' },
  'in-progress': { backgroundColor: '#7c2d12', color: '#ffedd5' },
  done: { backgroundColor: '#14532d', color: '#dcfce7' },
};

export default function TaskCard({ task, categoryName, onPress }) {
  const statusStyle = STATUS_STYLES[task.status] || STATUS_STYLES.todo;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={2}>
          {task.title}
        </Text>
        <View style={[styles.statusBadge, { backgroundColor: statusStyle.backgroundColor }]}>
          <Text style={[styles.statusText, { color: statusStyle.color }]}>{task.status}</Text>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={3}>
        {task.description}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.meta}>{categoryName || 'Uncategorized'}</Text>
        <Text style={styles.meta}>{formatDate(task.dueDate)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#1e293b',
    padding: 16,
    gap: 12,
  },
  pressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.92,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    alignItems: 'flex-start',
  },
  title: {
    flex: 1,
    color: '#f8fafc',
    fontSize: 17,
    fontWeight: '800',
  },
  statusBadge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  description: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  meta: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '600',
  },
});
