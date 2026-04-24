import cors from 'cors';
import express from 'express';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/v1/summary', (req, res) => {
  const period = String(req.query.period ?? 'month');

  res.json({
    period,
    totals: {
      income: 0,
      expense: 0,
      balance: 0
    },
    byCategory: []
  });
});
