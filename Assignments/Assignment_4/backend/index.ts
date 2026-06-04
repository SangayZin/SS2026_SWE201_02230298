import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import notificationsRouter from './routes/notifications';

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(cors());
app.use(express.json());
app.use('/api', notificationsRouter);

app.get('/health', (_request, response) => {
  response.json({ ok: true });
});

app.listen(port, () => {
  console.log(`Task Reminder backend running on PORT ${port}`);
});
