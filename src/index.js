import express from 'express';

import path from 'path';
import { fileURLToPath } from 'url';
import { methods as authentication } from './controllers/authentication.controller.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.set("port",4000);


app.listen(app.get("port"), () => {
  console.log(`Server is running on port ${app.get("port")}`);
  console.log(`http://localhost:${app.get("port")}`);
});

app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json())

// Rutas
app.get("/", (req, res) => {  res.sendFile(__dirname + "/views/index.html");});
app.get("/catalog", (req, res) => {  res.sendFile(__dirname + "/views/catalogo.html");});
app.get("/register", (req, res) => {  res.sendFile(__dirname + "/views/register.html");});
app.post("/api/register", authentication.register);
app.get("/login", (req, res) => {  res.sendFile(__dirname + "/views/login.html");});
app.post("/api/login", authentication.login);