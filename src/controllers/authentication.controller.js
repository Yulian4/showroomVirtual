import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import bcryptjs from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersPath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));

async function login(req, res) {
    
}

async function register(req, res) {
	const { name, lastName, email, password, confirmPassword } = req.body;

	if (!name || !lastName || !email || !password || !confirmPassword) {
		return res.status(400).send({
			status: "Error",
			message: "Los campos estan incompletos",
		});
	}

	if (password !== confirmPassword) {
		return res.status(400).send({
			status: "Error",
			message: "Las contraseñas no coinciden",
		});
	}

	// Leer usuarios actualizados
	let users = [];
	try {
		users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
	} catch (e) {
		users = [];
	}

	const valUser = users.find((user) => user.email === email);

	if (valUser) {
		return res.status(400).send({
			status: "Error - 400",
			message: "Este usuario ya existe",
		});
	}

	const salt = await bcryptjs.genSalt(5);
	const hashPassword = await bcryptjs.hash(password, salt);

	const newUser = {
		id: uuidv4(),
		name,
		lastName,
		email,
		password: hashPassword,
	};

	users.push(newUser);

	fs.writeFileSync(usersPath, JSON.stringify(users, null, 2), "utf-8");

	res.status(201).send({
		status: "OK - 201",
		message: "Usuario registrado correctamente",
		redirect: "/",
	});
}

export const methods = {
	login,
	register,
};
