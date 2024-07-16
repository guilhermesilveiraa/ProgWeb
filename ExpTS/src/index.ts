import express, { Request, Response } from "express";
import dotenv from "dotenv";
import router from "./router/router";
import logger from "./middlewares/logger";
import { engine } from "express-handlebars";

dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 3333;

const logFormat = process.env.LOG_FORMAT === 'complete' ? 'complete' : 'simple';

app.engine("handlebars", engine());
app.engine("handlebars", engine({
    defaultLayout: 'main',
    layoutsDir: `${__dirname}/views/layouts/`,
    helpers: require(`${__dirname}/views/helpers/helpers.ts`)
}));

app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

app.engine("handlebars", engine({
helpers: require(`${__dirname}/views/helpers/helpers.ts`)
}));
app.set("views", `${__dirname}/views`);

app.use(logger(logFormat));
app.use(router);
app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});
