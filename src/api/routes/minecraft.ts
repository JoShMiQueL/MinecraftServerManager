import { Hono } from 'hono';

const minecraft = new Hono();

minecraft.get('/', (c) => {
  return c.json({
    online: true,
    players: []
  });
});

export default minecraft;
