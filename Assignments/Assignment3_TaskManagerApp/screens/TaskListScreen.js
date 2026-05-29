import { useMemo } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';

import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import ChoiceChips from '../components/ChoiceChips';
import EmptyState from '../components/EmptyState';
import FeedbackBanner from '../components/FeedbackBanner';
import ScreenShell from '../components/ScreenShell';
import TaskCard from '../components/TaskCard';
import { DEFAULT_FILTER, TASK_PRIORITIES, TASK_STATUSES } from '../data/taskOptions';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { useAppStore } from '../store/useAppStore';
import { formatTaskCount } from '../utils/formatters';

function displayCategoryName(categoryName) {
  return categoryName === 'School' ? 'Academic' : categoryName;
}

export default function TaskListScreen() {
  const user = useAppStore((state) => state.user);
  const tasks = useAppStore((state) => state.tasks);
  const categories = useAppStore((state) => state.categories);
  const filters = useAppStore((state) => state.filters);
  const loading = useAppStore((state) => state.loading);
  const error = useAppStore((state) => state.error);
  const successMessage = useAppStore((state) => state.successMessage);
  const setFilters = useAppStore((state) => state.setFilters);
  const refreshData = useAppStore((state) => state.refreshData);
  const openCreateTask = useAppStore((state) => state.openCreateTask);
  const openTaskDetail = useAppStore((state) => state.openTaskDetail);
  const signOut = useAppStore((state) => state.signOut);
  const clearFeedback = useAppStore((state) => state.clearFeedback);

  const debouncedQuery = useDebouncedValue(filters.query);

  const categoryOptions = useMemo(
    () => [
      { value: DEFAULT_FILTER, label: 'All categories' },
      ...categories.map((category) => ({
        value: String(category.id),
        label: category.name === 'School' ? 'Academic' : category.name,
      })),
    ],
    [categories],
  );

  const filteredTasks = useMemo(() => {
    const query = debouncedQuery.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesQuery =
        !query ||
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query);
      const matchesStatus = filters.status === DEFAULT_FILTER || task.status === filters.status;
      const matchesPriority =
        filters.priority === DEFAULT_FILTER || task.priority === filters.priority;
      const matchesCategory =
        filters.categoryId === DEFAULT_FILTER || String(task.categoryId) === String(filters.categoryId);

      return matchesQuery && matchesStatus && matchesPriority && matchesCategory;
    });
  }, [tasks, debouncedQuery, filters.status, filters.priority, filters.categoryId]);

  const taskCountLabel = formatTaskCount(filteredTasks.length);

  return (
    <ScreenShell>
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => {
          const category = categories.find((entry) => String(entry.id) === String(item.categoryId));

          return (
            <TaskCard
              task={item}
              categoryName={displayCategoryName(category?.name)}
              onPress={() => openTaskDetail(item.id)}
            />
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <View style={styles.headerBlock}>
            <View style={styles.headerRow}>
              <View style={styles.headerText}>
                <Text style={styles.title}>Hello, {user?.name || 'there'}</Text>
              </View>

              <View style={styles.headerActions}>
                <AppButton label="New" onPress={openCreateTask} style={styles.smallButton} />
                <AppButton label="Sign out" onPress={signOut} variant="secondary" style={styles.smallButton} />
              </View>
            </View>

            <FeedbackBanner
              type="success"
              title="Success"
              message={successMessage}
              onPress={clearFeedback}
            />

            <FeedbackBanner
              type="error"
              title="Network issue"
              message={error?.message}
              onPress={clearFeedback}
            />

            <AppTextInput
              label="Search"
              value={filters.query}
              onChangeText={(value) => setFilters({ query: value })}
              placeholder="Search tasks"
            />

            <ChoiceChips
              label="Status"
              value={filters.status}
              onChange={(value) => setFilters({ status: value })}
              options={[{ value: DEFAULT_FILTER, label: 'All statuses' }, ...TASK_STATUSES]}
            />

            <ChoiceChips
              label="Priority"
              value={filters.priority || DEFAULT_FILTER}
              onChange={(value) => setFilters({ priority: value })}
              options={[{ value: DEFAULT_FILTER, label: 'All priorities' }, ...TASK_PRIORITIES]}
            />

            <ChoiceChips
              label="Category"
              value={filters.categoryId}
              onChange={(value) => setFilters({ categoryId: value })}
              options={categoryOptions}
            />
          </View>
        }
        ListEmptyComponent={
          loading.data ? (
            <View style={styles.loadingBlock}>
              <ActivityIndicator size="large" color="#f8fafc" />
              <Text style={styles.loadingText}>Loading tasks...</Text>
            </View>
          ) : (
            <EmptyState title="No Tasks" />
          )
        }
        refreshControl={
          <RefreshControl refreshing={loading.data} onRefresh={refreshData} tintColor="#f8fafc" />
        }
        contentContainerStyle={[
          styles.content,
          filteredTasks.length === 0 && !loading.data && styles.emptyContent,
        ]}
        showsVerticalScrollIndicator={false}
      />
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 24,
  },
  emptyContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  headerBlock: {
    gap: 16,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerText: {
    flex: 1,
    gap: 0,
  },
  title: {
    color: '#f8fafc',
    fontSize: 28,
    fontWeight: '900',
  },
  headerActions: {
    gap: 10,
  },
  smallButton: {
    minWidth: 104,
  },
  separator: {
    height: 12,
  },
  loadingBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 32,
  },
  loadingText: {
    color: '#cbd5e1',
    fontSize: 14,
  },
});
