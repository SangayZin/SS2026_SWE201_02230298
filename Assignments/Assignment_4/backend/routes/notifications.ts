import { Router } from 'express';
import fs from 'fs/promises';
import path from 'path';
import type { PushTokenRecord } from '../../types';

interface RegisterTokenRequestBody {
  token?: string;
  deviceId?: string;
}

interface SendNotificationRequestBody {
  deviceId?: string;
  title?: string;
  body?: string;
  data?: Record<string, unknown>;
}

interface StoredTokenFile {
  records: PushTokenRecord[];
}

const router = Router();
const tokenFilePath = path.resolve(process.cwd(), 'data', 'pushTokens.json');
const expoPushUrl = 'https://exp.host/api/v2/push/send';

async function ensureDataFile(): Promise<void> {
  await fs.mkdir(path.dirname(tokenFilePath), { recursive: true });

  try {
    await fs.access(tokenFilePath);
  } catch {
    const initialFile: StoredTokenFile = { records: [] };
    await fs.writeFile(tokenFilePath, JSON.stringify(initialFile, null, 2), 'utf8');
  }
}

async function readTokenFile(): Promise<StoredTokenFile> {
  await ensureDataFile();
  const rawValue = await fs.readFile(tokenFilePath, 'utf8');

  try {
    const parsedValue = JSON.parse(rawValue) as StoredTokenFile;
    if (Array.isArray(parsedValue.records)) {
      return parsedValue;
    }
  } catch {
    // Fall through to the empty store.
  }

  return { records: [] };
}

async function writeTokenFile(file: StoredTokenFile): Promise<void> {
  await ensureDataFile();
  await fs.writeFile(tokenFilePath, JSON.stringify(file, null, 2), 'utf8');
}

function requireApiKey(request: express.Request, response: express.Response, next: express.NextFunction): void {
  const apiKey = request.header('x-api-key');

  if (!apiKey || apiKey !== process.env.API_SECRET_KEY) {
    response.status(401).json({ error: 'Unauthorized' });
    return;
  }

  next();
}

async function sendExpoPushNotification(messages: Array<Record<string, unknown>>): Promise<unknown> {
  const response = await fetch(expoPushUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messages.length === 1 ? messages[0] : messages),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Expo push request failed with status ${response.status}`);
  }

  return await response.json();
}

router.post('/register-token', requireApiKey, async (request, response) => {
  const body = request.body as RegisterTokenRequestBody;
  const token = body.token?.trim();
  const deviceId = body.deviceId?.trim();

  if (!token || !deviceId) {
    response.status(400).json({ error: 'token and deviceId are required' });
    return;
  }

  const store = await readTokenFile();
  const existingIndex = store.records.findIndex((record) => record.deviceId === deviceId);
  const record: PushTokenRecord = {
    token,
    deviceId,
    registeredAt: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    store.records[existingIndex] = record;
  } else {
    store.records.push(record);
  }

  await writeTokenFile(store);
  response.json(record);
});

router.post('/send-notification', requireApiKey, async (request, response) => {
  const body = request.body as SendNotificationRequestBody;
  const title = body.title?.trim();
  const bodyText = body.body?.trim();

  if (!title || !bodyText) {
    response.status(400).json({ error: 'title and body are required' });
    return;
  }

  const store = await readTokenFile();
  const selectedRecords = body.deviceId
    ? store.records.filter((record) => record.deviceId === body.deviceId)
    : store.records;

  if (selectedRecords.length === 0) {
    response.status(404).json({ error: 'No registered push tokens were found' });
    return;
  }

  const messages = selectedRecords.map((record) => ({
    to: record.token,
    title,
    body: bodyText,
    data: body.data ?? {},
    sound: 'default',
    channelId: 'task-reminders',
  }));

  const expoResponse = await sendExpoPushNotification(messages);
  response.json({ success: true, sentCount: messages.length, expoResponse });
});

export default router;
