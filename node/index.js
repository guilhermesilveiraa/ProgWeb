const fs = require('fs');
const http = require('http');

require('dotenv').config();

const args = [];
const arquivos = [];

process.argv.forEach((val,index) =>{
    args.push(val);
});

const path = `${__dirname}${args[2]}`;

const filesLs = fs.readdir(path, async(err, files) =>{
    if(err)
        console.log(err);
    else{
        files.forEach(file=>{
            arquivos.push(file);
        })
    }
});

const server = http.createServer((req,res)=>{
    res.statusCode = 200;
    res.setHeader("Content-type", "text/plain");
    res.end(arquivos.reduce((acc,curr) => acc + String(curr) + '\n', ''));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('Servidor rodando');
});