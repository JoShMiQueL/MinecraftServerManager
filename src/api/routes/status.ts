import { Hono } from 'hono';

const status = new Hono();

status.get('/', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

export default status;
