import { API_BASE_URL, API_KEY } from '../constants/config';

export type PendingServerNotification = {
  title: string;
  body: string;
  data?: Record<string, unknown>;
};

// Polls backend for pending notifications.
// Since backend endpoints may vary by assignment version,
// this function is defensive: it returns [] on any failure.
export async function fetchPendingNotifications(deviceId: string): Promise<PendingServerNotification[]> {
  // There is a notifications router in backend/routes/notifications.ts,
  // but this client assumes a polling endpoint might not exist.
  // So we try a couple of common paths and safely fallback.
  const candidatePaths = ['/notifications/pending', '/notifications/poll', '/notifications'];

  for (const path of candidatePaths) {
    try {
      const url = `${API_BASE_URL}${path}`;

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(API_KEY ? { 'x-api-key': API_KEY } : {}),
        },
        body: JSON.stringify({ deviceId }),
      });

      if (!res.ok) {
        // Try next candidate.
        continue;
      }

      const json = (await res.json()) as unknown;

      if (Array.isArray(json)) {
        return json as PendingServerNotification[];
      }

      // If backend returns {notifications: [...]}
      if (typeof json === 'object' && json !== null) {
        const maybe = (json as Record<string, unknown>).notifications;
        if (Array.isArray(maybe)) {
          return maybe as PendingServerNotification[];
        }
      }

      return [];
    } catch {
      // Continue to next candidate.
    }
  }

  return [];
}

