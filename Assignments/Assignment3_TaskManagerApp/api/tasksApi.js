import api from './client';

function sortByNewest(items) {
  return [...items].sort(
    (left, right) => new Date(right.createdAt || 0) - new Date(left.createdAt || 0),
  );
}

function normalizeTasks(items) {
  return items.map((item, index) => ({
    ...item,
    id: item.id || item._id || item.taskId || `${item.createdAt || 'task'}-${item.title || index}`,
  }));
}

function normalizeCategories(items) {
  return items.map((item, index) => ({
    ...item,
    id: item.id || item._id || item.categoryId || `${item.name || 'category'}-${index}`,
  }));
}

export async function fetchTasks(signal) {
  const response = await api.get('/tasks', { signal });
  return sortByNewest(normalizeTasks(response.data || []));
}

export async function fetchTaskById(id, signal) {
  const response = await api.get(`/tasks/${id}`, { signal });
  return response.data;
}

export async function createTask(payload) {
  const response = await api.post('/tasks', {
    ...payload,
    createdAt: payload.createdAt || new Date().toISOString(),
  });
  return response.data;
}

export async function updateTask(id, payload) {
  const response = await api.put(`/tasks/${id}`, payload);
  return response.data;
}

export async function deleteTask(id) {
  await api.delete(`/tasks/${id}`);
}

export async function fetchCategories(signal) {
  const response = await api.get('/categories', { signal });
  return normalizeCategories(response.data || []);
}
