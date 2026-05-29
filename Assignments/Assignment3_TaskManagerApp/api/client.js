import axios from 'axios';

import { API_BASE_URL } from '../config/appConfig';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function setApiToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    return;
  }

  delete api.defaults.headers.common.Authorization;
}

export function normalizeApiError(error) {
  if (error?.code === 'ERR_CANCELED') {
    return {
      type: 'cancelled',
      message: 'Request was cancelled.',
    };
  }

  if (error?.code === 'ECONNABORTED') {
    return {
      type: 'timeout',
      message: 'The request timed out. Check the backend and try again.',
    };
  }

  if (!error?.response) {
    return {
      type: 'network',
      message: 'Cannot reach the backend. Start the backend server and try again.',
    };
  }

  const status = error.response.status;
  const payload = error.response.data;
  const serverMessage =
    payload?.message ||
    payload?.error ||
    (typeof payload === 'string' ? payload : null) ||
    (status === 404
      ? 'The requested record was not found.'
      : 'The server returned an error.');

  return {
    type: status >= 400 && status < 500 ? 'validation' : 'server',
    status,
    message: serverMessage,
    details: payload?.errors || null,
  };
}

export default api;
