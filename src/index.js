import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
dotenv.config();
import router from './routers/router.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.set("port",process.env.PORT || 4000);

// Middlewares para servir archivos estáticos y parsear cookies
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Usar el router principal
app.use("/", router);

app.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get("port")}`);
    console.log(`http://localhost:${app.get("port")}`);
});