import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import AppButton from '../components/AppButton';
import EmptyState from '../components/EmptyState';
import FeedbackBanner from '../components/FeedbackBanner';
import ScreenShell from '../components/ScreenShell';
import { TASK_PRIORITIES } from '../data/taskOptions';
import { useAppStore } from '../store/useAppStore';
import { formatDate } from '../utils/formatters';

export default function TaskDetailScreen() {
  const taskId = useAppStore((state) => state.selectedTaskId);
  const task = useAppStore((state) =>
    state.tasks.find((entry) => String(entry.id) === String(state.selectedTaskId)),
  );
  const category = useAppStore((state) =>
    state.categories.find((entry) => String(entry.id) === String(task?.categoryId)),
  );
  const loading = useAppStore((state) => state.loading);
  const error = useAppStore((state) => state.error);
  const successMessage = useAppStore((state) => state.successMessage);
  const openEditTask = useAppStore((state) => state.openEditTask);
  const removeTask = useAppStore((state) => state.removeTask);
  const goToList = useAppStore((state) => state.goToList);
  const clearFeedback = useAppStore((state) => state.clearFeedback);

  if (!task) {
    return (
      <ScreenShell>
        <EmptyState
          title="Task not found"
          message="The item may have been deleted or the backend does not have this record anymore."
          actionLabel="Back to list"
          onAction={goToList}
        />
      </ScreenShell>
    );
  }

  const priorityLabel = TASK_PRIORITIES.find((item) => item.value === task.priority)?.label || task.priority;
  const categoryLabel = category?.name === 'School' ? 'Academic' : category?.name;

  const handleDelete = () => {
    Alert.alert('Delete task?', 'This action cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => removeTask(taskId),
      },
    ]);
  };

  return (
    <ScreenShell>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Task detail</Text>
          <Text style={styles.title}>{task.title}</Text>
          <Text style={styles.subtitle}>{task.description}</Text>
        </View>

        <FeedbackBanner
          type="success"
          title="Success"
          message={successMessage}
          onPress={clearFeedback}
        />

        <FeedbackBanner
          type="error"
          title="Problem loading task"
          message={error?.message}
          onPress={clearFeedback}
        />

        <View style={styles.card}>
          <DetailRow label="Category" value={categoryLabel || 'Uncategorized'} />
          <DetailRow label="Status" value={task.status} />
          <DetailRow label="Priority" value={priorityLabel} />
          <DetailRow label="Due date" value={formatDate(task.dueDate)} />
          <DetailRow label="Created" value={formatDate(task.createdAt)} />
        </View>

        <View style={styles.actions}>
          <AppButton label="Edit task" onPress={() => openEditTask(task.id)} disabled={loading.remove} />
          <AppButton label="Delete task" onPress={handleDelete} variant="danger" disabled={loading.remove} />
          <AppButton label="Back to list" onPress={goToList} variant="secondary" />
        </View>
      </ScrollView>
    </ScreenShell>
  );
}

function DetailRow({ label, value }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 24,
    gap: 16,
  },
  header: {
    gap: 8,
  },
  eyebrow: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  title: {
    color: '#f8fafc',
    fontSize: 30,
    fontWeight: '900',
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    borderRadius: 24,
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#1e293b',
    padding: 16,
    gap: 14,
  },
  detailRow: {
    gap: 4,
  },
  detailLabel: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  detailValue: {
    color: '#f8fafc',
    fontSize: 15,
    fontWeight: '600',
  },
  actions: {
    gap: 10,
  },
});
