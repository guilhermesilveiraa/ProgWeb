import fs from 'fs';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createLink } from './util.mjs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = [];
const arquivos = [];

process.argv.forEach((val, index) => {
    args.push(val);
});

const dirPath = path.join(__dirname, args[2]);

fs.readdir(dirPath, (err, files) => {
    if (err) {
        console.log(err);
    } else {
        files.forEach(file => {
            arquivos.push(file);
        });
    }
});

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.statusCode = 200;
        res.setHeader("Content-type", "text/html");
        const links = arquivos.reduce((acc, curr) => acc + createLink(curr), '');
        res.end(links);
    } else {
        const filePath = path.join(dirPath, req.url);
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 404;
                res.setHeader("Content-type", "text/plain");
                res.end("File not found");
            } else {
                res.statusCode = 200;
                res.setHeader("Content-type", "text/html");
                res.end(`<pre>${data}</pre><br><a href="/">Voltar</a>`);
            }
        });
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
