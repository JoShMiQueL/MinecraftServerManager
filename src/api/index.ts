import { Hono } from "hono";
import minecraft from "./routes/minecraft";
import status from "./routes/status";

const app = new Hono();

app.route("/status", status);
app.route("/minecraft", minecraft);

app.get("/", (c) =>
  c.json({
    message: "Minecraft Discord Bot API",
    version: "1.0.0",
  }),
);

Bun.serve({
  fetch: app.fetch,
  port: 3000,
});

console.log("API Server running at http://localhost:3000");
