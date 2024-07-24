import { Request, Response } from "express";
import { Router } from "express"
import { compile } from 'handlebars';
import { loremIpsum } from "lorem-ipsum";
import fs from 'fs';
import path from 'path';
import { Technologie } from "../views/helpers/helpersTypes";

const technologies: Technologie[] = [
    { name: 'Express', type: 'Framework', poweredByNodejs: true },
    { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
    { name: 'React', type: 'Library', poweredByNodejs: true },
    { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
    { name: 'Django', type: 'Framework', poweredByNodejs: false },
    { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
    { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
  ];



const hb1 = (req:Request, res:Response) => {
    res.render("main/hb1", { mensagem: "Home :)"});
}

const hb2 = (req:Request, res:Response) => {
    res.render("main/hb2", { mensagem: "express framework"});
}

const createCookie = (req: Request, res: Response) => {
    if (!("nomeCookie" in req.cookies)) {
        res.cookie("nomeCookie", 'valorCookie');
        res.send("Voce ainda nao tinha o cookie. Criando...")
    }else {
        res.send("Voce ja tinha esse cookie.")
    }
}

const hb3 = (req:Request, res:Response) => {
    const profs = [
        { name: "David Fernandes", room: 321},
        { name: "Altigram Soares", room: 224},
        { name: "Elaine Harada", room: 341},
        { name: "Horacio Fernandes", room: 148},
    ];
    res.render("main/hb3", { profs});
}

const hb4 = (req: Request, res: Response) => {
    res.render('main/hb4', { layout: 'main', technologies });
};

const bemvindo = (req:Request,res:Response) => {
    res.send(`seja bem vindo(a) ${req.params.nome}`);
}

const about = (req:Request, res:Response) => {
    res.send("pagina about");
}

const lorem = (req:Request, res:Response) => {
    const { numParagraphs } = req.params;
    const numberOfParagraphs = parseInt(numParagraphs, 10);

    const ipsumText = loremIpsum({
        count: numberOfParagraphs,
        format: 'html',
        units: 'paragraphs',
    });

    res.send(`<p>${ipsumText.replace(/\n\n/g, '</p><p>')}</p>`);
}

export default { hb1, hb2, hb3, hb4, bemvindo, about, lorem, createCookie };