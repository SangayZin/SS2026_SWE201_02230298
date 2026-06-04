import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/config';
import type { Task } from '../types';

export async function loadTasks(): Promise<Task[]> {
  const rawValue = await AsyncStorage.getItem(STORAGE_KEYS.tasks);

  if (!rawValue) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(rawValue) as Task[];
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(tasks));
}

export async function getTaskById(taskId: string): Promise<Task | undefined> {
  const tasks = await loadTasks();
  return tasks.find((task) => task.id === taskId);
}

export async function upsertTask(task: Task): Promise<Task[]> {
  const tasks = await loadTasks();
  const index = tasks.findIndex((existingTask) => existingTask.id === task.id);

  if (index >= 0) {
    tasks[index] = task;
  } else {
    tasks.unshift(task);
  }

  await saveTasks(tasks);
  return tasks;
}

export async function deleteTask(taskId: string): Promise<Task[]> {
  const tasks = await loadTasks();
  const nextTasks = tasks.filter((task) => task.id !== taskId);
  await saveTasks(nextTasks);
  return nextTasks;
}
