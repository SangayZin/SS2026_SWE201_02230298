# Task Reminder App

Expo SDK 54 mobile app plus a small Express backend for Expo push token registration and remote notification testing.

## Project Layout

- `App.tsx` mounts the React Navigation stack.
- `screens/` contains the home, detail, and settings screens.
- `components/` contains the task card, permission banner, and notification toggle.
- `notifications/` contains permission setup, listeners, and local scheduling helpers.
- `backend/` contains the Express API that stores Expo push tokens and sends remote notifications.

## Setup

1. Install app dependencies in the repository root.
2. Install backend dependencies in `backend/`.
3. Copy `backend/.env.example` to `backend/.env` and set `API_SECRET_KEY`.
4. Set the Expo public variables in your app environment:
   - `EXPO_PUBLIC_API_BASE_URL=http://localhost:3000`
   - `EXPO_PUBLIC_API_KEY=your_secret_key`

## Run

App:

```bash
npm run start
```

Backend:

```bash
cd backend
npm run dev
```

## Remote Notification Test

Send a push from the backend:

```bash
curl -X POST http://localhost:3000/api/send-notification \
  -H "Content-Type: application/json" \
  -H "x-api-key: your_secret_key" \
  -d '{"title":"Overdue Task!","body":"Your task is overdue","data":{"taskId":"123","screen":"TaskDetail"}}'
```

## Notes

- Local reminders are scheduled 10 minutes before the task due time.
- The app stores tasks in `AsyncStorage`.
- Expo push tokens are cached locally and registered with the backend when permissions are granted.
