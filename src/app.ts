import express from 'express';
import path from 'path';
import { medtechRouter } from './features/medtech-strategy';

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api/medtech', medtechRouter);

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

export default app;
