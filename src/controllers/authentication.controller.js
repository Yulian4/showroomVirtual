import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import bcryptjs from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import JsonWebToken from "jsonwebtoken";
import dotenv from "dotenv"; //variables de entorno
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersPath = path.join(__dirname, "../data/users.json");

async function login(req, res) {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).send({
			status: "Error",
			message: "Los campos estan incompletos",
		});
	}

	// Leer json
	let users = [];
	try {
		users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
	} catch (e) {
		users = [];
	}

	const valUser = users.find((user) => user.email === email);

	if (!valUser) {
		return res.status(400).send({
			status: "Error - 400",
			message: "Error al iniciar sesion",
		});
	}

	const isPasswordValid = await bcryptjs.compare(password, valUser.password);

	if (!isPasswordValid) {
		return res.status(401).send({
			status: "Error",
			message: "Contraseña incorrecta",
		});
	}

    const token = JsonWebToken.sign(
        {email: valUser.email}, 
        process.env.JWT_SECRET,
        {expiresIn: process.env.TOKEN_EXPIRATION});

    const cookieOptions = {
        expiresIn: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRATION * 24 * 60 * 60 * 1000),
        path: "/",
    }

    res.cookie("jwt", token, cookieOptions); 

	return res.redirect("/");
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

    
	return res.redirect("/login");

}

export const methods = {
	login,
	register,
};
