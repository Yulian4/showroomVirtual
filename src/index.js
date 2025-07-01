import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import Router from './routers/router.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.set("port", 4000);

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usar el router principal
app.use("/", Router);

app.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get("port")}`);
    console.log(`http://localhost:${app.get("port")}`);
});