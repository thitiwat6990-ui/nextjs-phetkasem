import { createServer } from "http";
import next from "next";

const port = parseInt(process.env.PORT || "3000", 10);
const hostname = "0.0.0.0";

// ให้แน่ใจว่า next รู้ว่าโปรเจกต์อยู่โฟลเดอร์นี้
const app = next({ dev: false, hostname, port, dir: process.cwd() });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, hostname, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});