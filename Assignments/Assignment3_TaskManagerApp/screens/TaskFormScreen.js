import { useEffect, useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import ChoiceChips from '../components/ChoiceChips';
import FeedbackBanner from '../components/FeedbackBanner';
import ScreenShell from '../components/ScreenShell';
import { TASK_PRIORITIES, TASK_STATUSES } from '../data/taskOptions';
import { useAppStore } from '../store/useAppStore';
import { validateTaskForm } from '../utils/validation';

const emptyForm = {
  title: '',
  description: '',
  dueDate: '',
  status: TASK_STATUSES[0].value,
  priority: TASK_PRIORITIES[1].value,
  categoryId: '',
};

export default function TaskFormScreen() {
  const taskId = useAppStore((state) => state.selectedTaskId);
  const task = useAppStore((state) =>
    state.tasks.find((entry) => String(entry.id) === String(state.selectedTaskId)),
  );
  const categories = useAppStore((state) => state.categories);
  const loading = useAppStore((state) => state.loading.submit);
  const error = useAppStore((state) => state.error);
  const successMessage = useAppStore((state) => state.successMessage);
  const saveTask = useAppStore((state) => state.saveTask);
  const cancelTaskForm = useAppStore((state) => state.cancelTaskForm);
  const clearFeedback = useAppStore((state) => state.clearFeedback);

  const [form, setForm] = useState(emptyForm);
  const [fieldErrors, setFieldErrors] = useState({});

  const isEditing = Boolean(taskId);
  const firstCategoryId = categories[0]?.id ? String(categories[0].id) : '';

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || '',
        description: task.description || '',
        dueDate: task.dueDate || '',
        status: task.status || TASK_STATUSES[0].value,
        priority: task.priority || TASK_PRIORITIES[1].value,
        categoryId: String(task.categoryId || firstCategoryId),
      });
      return;
    }

    setForm((current) => ({
      ...emptyForm,
      categoryId: current.categoryId || firstCategoryId,
    }));
  }, [task, firstCategoryId]);

  useEffect(() => {
    if (!task && firstCategoryId && !form.categoryId) {
      setForm((current) => ({
        ...current,
        categoryId: firstCategoryId,
      }));
    }
  }, [task, firstCategoryId, form.categoryId]);

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => ({
        value: String(category.id),
        label: category.name === 'School' ? 'Academic' : category.name,
      })),
    [categories],
  );

  const updateField = (field) => (value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: null }));
  };

  const handleSubmit = async () => {
    const errors = validateTaskForm(form);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    await saveTask(taskId, {
      ...form,
      categoryId: form.categoryId,
    });
  };

  return (
    <ScreenShell>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>{isEditing ? 'Update the record' : 'Add a new task'}</Text>
          </View>

          <FeedbackBanner
            type="success"
            title="Success"
            message={successMessage}
            onPress={clearFeedback}
          />

          <FeedbackBanner
            type="error"
            title="Validation or network issue"
            message={error?.message}
            onPress={clearFeedback}
          />

          <View style={styles.card}>
            <AppTextInput
              label="Title"
              value={form.title}
              onChangeText={updateField('title')}
              placeholder="Enter task title"
              error={fieldErrors.title}
            />

            <AppTextInput
              label="Description"
              value={form.description}
              onChangeText={updateField('description')}
              placeholder="Describe what needs to be done"
              error={fieldErrors.description}
              multiline
              numberOfLines={5}
              inputStyle={styles.multilineInput}
            />

            <AppTextInput
              label="Due date"
              value={form.dueDate}
              onChangeText={updateField('dueDate')}
              placeholder="YYYY/MM/DD"
              error={fieldErrors.dueDate}
            />

            <ChoiceChips
              label="Status"
              value={form.status}
              onChange={updateField('status')}
              options={TASK_STATUSES}
            />

            <ChoiceChips
              label="Priority"
              value={form.priority}
              onChange={updateField('priority')}
              options={TASK_PRIORITIES}
            />

            <ChoiceChips
              label="Category"
              value={form.categoryId}
              onChange={updateField('categoryId')}
              options={categoryOptions}
            />

            {fieldErrors.categoryId ? <Text style={styles.inlineError}>{fieldErrors.categoryId}</Text> : null}
            {fieldErrors.status ? <Text style={styles.inlineError}>{fieldErrors.status}</Text> : null}
            {fieldErrors.priority ? <Text style={styles.inlineError}>{fieldErrors.priority}</Text> : null}

            <AppButton
              label={loading ? 'Saving...' : isEditing ? 'Update task' : 'Create task'}
              onPress={handleSubmit}
              disabled={loading}
            />
            <AppButton
              label="Cancel"
              onPress={cancelTaskForm}
              variant="secondary"
              disabled={loading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    paddingBottom: 24,
    gap: 16,
  },
  header: {
    gap: 0,
  },
  title: {
    color: '#f8fafc',
    fontSize: 28,
    fontWeight: '900',
  },
  card: {
    gap: 14,
    padding: 18,
    borderRadius: 28,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#334155',
  },
  multilineInput: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  inlineError: {
    color: '#fca5a5',
    fontSize: 12,
    marginTop: -6,
  },
});
