import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';

import { createTask, deleteTask, fetchCategories, fetchTasks, updateTask } from '../api/tasksApi';
import { normalizeApiError, setApiToken } from '../api/client';
import { normalizeDueDate } from '../utils/validation';

const EMPTY_FILTERS = {
  query: '',
  status: 'all',
  categoryId: 'all',
};

function sortByNewest(tasks) {
  return [...tasks].sort(
    (left, right) => new Date(right.createdAt || 0) - new Date(left.createdAt || 0),
  );
}

function getTaskOwnerEmail(task) {
  return task?.ownerEmail?.trim().toLowerCase() || null;
}

function filterTasksForCurrentUser(tasks, user) {
  const currentUserEmail = user?.email?.trim().toLowerCase();

  if (!currentUserEmail) {
    return [];
  }

  return tasks.filter((task) => getTaskOwnerEmail(task) === currentUserEmail);
}

function createSession(email) {
  const cleanEmail = email?.trim().toLowerCase() || 'user';

  return {
    name: cleanEmail.split('@')[0] || 'User',
    email: cleanEmail,
  };
}

const initialLoadingState = {
  auth: false,
  data: false,
  submit: false,
  remove: false,
};

export const useAppStore = create(
  persist(
    (set, get) => ({
      hydrated: false,
      bootstrapped: false,
      screen: 'loading',
      authToken: null,
      user: null,
      tasks: [],
      categories: [],
      selectedTaskId: null,
      filters: EMPTY_FILTERS,
      loading: initialLoadingState,
      error: null,
      successMessage: null,

      markHydrated: () => set({ hydrated: true }),

      setScreen: (screen) => set({ screen }),

      setFilters: (partialFilters) =>
        set((state) => ({
          filters: {
            ...state.filters,
            ...partialFilters,
          },
        })),

      clearFeedback: () => set({ error: null, successMessage: null }),

      bootstrapApp: async () => {
        const { authToken, bootstrapped, user } = get();

        if (bootstrapped) {
          return;
        }

        if (!authToken) {
          set({ bootstrapped: true, screen: 'auth' });
          return;
        }

        setApiToken(authToken);
        set((state) => ({
          loading: {
            ...state.loading,
            data: true,
          },
          error: null,
          screen: 'loading',
        }));

        try {
          const [tasks, categories] = await Promise.all([fetchTasks(), fetchCategories()]);

          set({
            tasks: sortByNewest(filterTasksForCurrentUser(tasks, user)),
            categories,
            screen: 'list',
          });
        } catch (error) {
          set({
            error: normalizeApiError(error),
            screen: 'list',
          });
        } finally {
          set((state) => ({
            bootstrapped: true,
            loading: {
              ...state.loading,
              data: false,
            },
          }));
        }
      },

      refreshData: async () => {
        const { authToken, user } = get();

        if (!authToken) {
          return;
        }

        setApiToken(authToken);
        set((state) => ({
          loading: {
            ...state.loading,
            data: true,
          },
          error: null,
        }));

        try {
          const [tasks, categories] = await Promise.all([fetchTasks(), fetchCategories()]);

          set({
            tasks: sortByNewest(filterTasksForCurrentUser(tasks, user)),
            categories,
          });
        } catch (error) {
          set({ error: normalizeApiError(error) });
        } finally {
          set((state) => ({
            loading: {
              ...state.loading,
              data: false,
            },
          }));
        }
      },

      signIn: async ({ email, password }) => {
        set((state) => ({
          loading: {
            ...state.loading,
            auth: true,
          },
          error: null,
        }));

        try {
          const token = `taskflow-${Date.now()}`;
          const user = createSession(email);

          set({
            authToken: token,
            user,
          });

          setApiToken(token);
          await get().refreshData();

          set({
            screen: 'list',
            successMessage: 'Signed in successfully.',
          });
        } catch (error) {
          set({ error: normalizeApiError(error) });
          throw error;
        } finally {
          set((state) => ({
            loading: {
              ...state.loading,
              auth: false,
            },
          }));
        }
      },

      signOut: () => {
        setApiToken(null);
        set({
          authToken: null,
          user: null,
          tasks: [],
          categories: [],
          selectedTaskId: null,
          screen: 'auth',
          error: null,
          successMessage: null,
        });
      },

      openCreateTask: () =>
        set({
          selectedTaskId: null,
          screen: 'form',
          error: null,
          successMessage: null,
        }),

      openEditTask: (taskId) =>
        set({
          selectedTaskId: taskId,
          screen: 'form',
          error: null,
          successMessage: null,
        }),

      openTaskDetail: (taskId) =>
        set({
          selectedTaskId: taskId,
          screen: 'detail',
          error: null,
          successMessage: null,
        }),

      goToList: () =>
        set({
          selectedTaskId: null,
          screen: 'list',
        }),

      cancelTaskForm: () =>
        set((state) => ({
          screen: state.selectedTaskId ? 'detail' : 'list',
        })),

      saveTask: async (taskId, values) => {
        set((state) => ({
          loading: {
            ...state.loading,
            submit: true,
          },
          error: null,
        }));

        try {
          const currentUser = get().user;
          const payload = {
            title: values.title.trim(),
            description: values.description.trim(),
            dueDate: normalizeDueDate(values.dueDate),
            status: values.status,
            priority: values.priority,
            categoryId: values.categoryId,
            ownerEmail: currentUser?.email?.trim().toLowerCase() || null,
          };

          const savedTask = taskId
            ? await updateTask(taskId, {
                ...payload,
                id: taskId,
                ownerEmail:
                  getTaskOwnerEmail(get().tasks.find((task) => String(task.id) === String(taskId))) ||
                  payload.ownerEmail,
                createdAt:
                  get().tasks.find((task) => String(task.id) === String(taskId))?.createdAt ||
                  new Date().toISOString(),
              })
            : await createTask(payload);

          set((state) => ({
            tasks: sortByNewest(
              taskId
                ? state.tasks.map((task) =>
                    String(task.id) === String(taskId) ? savedTask : task,
                  )
                : [...state.tasks, savedTask],
            ),
            selectedTaskId: savedTask.id,
            screen: 'detail',
            successMessage: taskId ? 'Task updated.' : 'Task created.',
          }));

          return savedTask;
        } catch (error) {
          const apiError = normalizeApiError(error);
          set({ error: apiError });
          throw apiError;
        } finally {
          set((state) => ({
            loading: {
              ...state.loading,
              submit: false,
            },
          }));
        }
      },

      removeTask: async (taskId) => {
        set((state) => ({
          loading: {
            ...state.loading,
            remove: true,
          },
          error: null,
        }));

        try {
          await deleteTask(taskId);

          set((state) => ({
            tasks: state.tasks.filter((task) => String(task.id) !== String(taskId)),
            selectedTaskId: null,
            screen: 'list',
            successMessage: 'Task deleted.',
          }));
        } catch (error) {
          set({ error: normalizeApiError(error) });
        } finally {
          set((state) => ({
            loading: {
              ...state.loading,
              remove: false,
            },
          }));
        }
      },
    }),
    {
      name: 'taskflow-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        authToken: state.authToken,
        user: state.user,
        filters: state.filters,
      }),
    },
  ),
);
