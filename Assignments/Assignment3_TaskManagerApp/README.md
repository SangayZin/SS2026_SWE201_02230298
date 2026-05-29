# TaskManager

TaskManager is a single-domain CRUD mobile app built with Expo and React Native. It manages tasks through a REST API and includes a lightweight authentication flow, category filtering, form validation, persistent session state, and loading/error handling.

## Domain

Chosen domain: Task manager

Primary entity:
- Task
  - id
  - title
  - description
  - dueDate
  - status
  - priority
  - categoryId
  - createdAt

Secondary entity:
- Category
  - id
  - name
  - color

## State Management

The app uses Zustand for global state and AsyncStorage for persistence.

What is stored globally:
- Auth token and user profile
- Task list and category list
- Selected task and UI screen state
- Search and filter state
- Loading and error state

What is persisted:
- Auth token
- User profile
- Last selected filters

## Backend

The backend is a MockAPI REST service.

Base URL:
- `https://6a189cf61878294b597d6631.mockapi.io`

Set `EXPO_PUBLIC_API_URL` in `.env` to your actual MockAPI project URL.

Main endpoints:
- `GET /tasks` - list all tasks
- `GET /tasks/:id` - get a single task
- `POST /tasks` - create a task
- `PUT /tasks/:id` - update a task
- `DELETE /tasks/:id` - delete a task
- `GET /categories` - list categories

## Features Implemented

- Sign-in with local token storage
- Create task form with validation
- Read task list from the backend
- Detail view for a task
- Search and filter by status/category
- Update task form
- Delete with confirmation dialog
- Loading indicators for network operations
- Friendly error and success messages
- Empty states
- Pull-to-refresh and retry behavior

## Project Structure

- `api/` - REST API client and endpoint wrappers
- `components/` - reusable UI elements
- `config/` - app configuration
- `data/` - task filter options
- `hooks/` - reusable hooks
- `screens/` - authentication, list, detail, and form screens
- `store/` - Zustand global state
- `utils/` - validation and formatting helpers
- `backend/` - no longer used after switching to MockAPI

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment file

Copy `.env.example` to `.env` and update the API URL if needed.

### 3. Configure MockAPI

Create a MockAPI project with two resources:
- `tasks`
- `categories`

Copy your MockAPI base URL into `.env` as `EXPO_PUBLIC_API_URL`.

### 4. Start the Expo app

```bash
npm start
```

For Android:

```bash
npm run android
```

For iOS:

```bash
npm run ios
```

## Sign In

Enter any valid email/password pair of at least 6 characters to create a local token session.

## Known Limitations

- Authentication is local and token-based, not a real backend auth system.
- The app depends on a live MockAPI project, so your `.env` must contain the correct base URL.
- Screenshots still need to be captured for final submission.



