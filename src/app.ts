import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { medtechRouter } from './features/medtech-strategy';

const app = express();

// Vercel serverless 환경에서 __dirname이 불안정할 수 있어 process.cwd() 우선 사용
const PUBLIC_DIR = path.join(process.cwd(), 'public');

app.use(express.json());
app.use(express.static(PUBLIC_DIR));
app.use('/api/medtech', medtechRouter);

app.get('*', (_req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

// 전역 에러 핸들러 — next(err) 호출 시 일관된 JSON 응답 보장
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[MedStrategy Error]', err.message);
  res.status(500).json({ success: false, error: err.message ?? '서버 오류가 발생했습니다.' });
});

export default app;
