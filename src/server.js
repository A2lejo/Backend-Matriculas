import express from "express";
import cors from "cors";
import routerUsuario from "./routes/usuarios.routes.js";
import routerEstudiante from "./routes/estudiantes.routes.js";
import routerMateria from "./routes/materias.routes.js";
import routerMatricula from "./routes/matriculas.routes.js";
import "dotenv/config";
import morgan from "morgan";
import { createServer } from "http";

const app = express();
app.use(morgan("dev"));

app.use(
	cors({
		origin: "*",
	})
);
app.use(express.json());

app.get("/", (_, res) => res.send("Server on"));

app.use("/api", routerUsuario);
app.use("/api", routerEstudiante);
app.use("/api", routerMateria);
app.use("/api", routerMatricula);
app.use((_, res) => res.status(404).json({ res: "404 - Endpoint not found" }));

const server = createServer(app);

export default server;
