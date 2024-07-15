import express, { Request, Response } from "express";
import dotenv from "dotenv";

import logger from "./middlewares/logger";

dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 3333;

const logFormat = process.env.LOG_FORMAT === 'complete' ? 'complete' : 'simple';

app.use(logger(logFormat));

app.get("/", (req: Request, res: Response) => {
    res.send("Olá Mundo");
});

app.get("/about", (req: Request, res: Response) => {
    res.send("Página about");
});

app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});
