import express from 'express';
import dotenv from 'dotenv';
import methodOverride from "method-override";
import { engine } from 'express-handlebars';
import router from './router/router';
import logger from './middlewares/logger';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { v4 }  from "uuid";

declare module "express-session" {
  interface SessionData{
    uid : string;
  }
}

dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 4488;

app.engine('handlebars', engine({ 
  helpers: require('./views/helpers/helpers'),
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  extname: '.handlebars'
}));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);

app.use(logger('combined'));
app.use('/img', express.static(`${__dirname}/../public/img`));
app.use(cookieParser());
app.use(session({
  genid: () => v4(),
  secret: "SMd5hhsnBgdjj",
  saveUninitialized: true,
  resave: true, 
  cookie: { maxAge: 360000 },
}));

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use(router);


app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT}`);
});
