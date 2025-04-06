import { Hono } from 'hono';
import minecraft from './routes/minecraft';
import status from './routes/status';

const app = new Hono();

app.route('/status', status);
app.route('/minecraft', minecraft);

app.get('/', (c) =>
  c.json({
    message: 'Minecraft Discord Bot API',
    version: '1.0.0'
  })
);

async function startServer(initialPort = 3000, maxAttempts = 10) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const port = initialPort + attempt;
    try {
      Bun.serve({
        fetch: app.fetch,
        port
      });

      return port;
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      const nodeError = error as NodeJS.ErrnoException;
      if (nodeError.code === 'EADDRINUSE') {
        console.log(`Port ${port} is in use, trying port ${port + 1}...`);
        continue;
      }
      throw error;
    }
  }
  throw new Error(`Could not find an available port after ${maxAttempts} attempts`);
}

startServer()
  .then((port) => {
    console.log(`API Server running at http://localhost:${port}`);
  })
  .catch((error) => {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  });
