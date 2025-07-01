import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routers/router.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.set("port", 4000);

// Middlewares
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Rutas de autenticación (API)
app.use("/api", router);

app.listen(app.get("port"), () => {
  console.log(`Server is running on port ${app.get("port")}`);
  console.log(`http://localhost:${app.get("port")}`);
});