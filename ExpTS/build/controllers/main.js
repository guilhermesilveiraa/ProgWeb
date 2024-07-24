"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lorem_ipsum_1 = require("lorem-ipsum");
const technologies = [
    { name: 'Express', type: 'Framework', poweredByNodejs: true },
    { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
    { name: 'React', type: 'Library', poweredByNodejs: true },
    { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
    { name: 'Django', type: 'Framework', poweredByNodejs: false },
    { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
    { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
];
const hb1 = (req, res) => {
    res.render("main/hb1", { mensagem: "ola mundo" });
};
const hb2 = (req, res) => {
    res.render("main/hb2", { mensagem: "express framework" });
};
const createCookie = (req, res) => {
    if (!("nomeCookie" in req.cookies)) {
        res.cookie("nomeCookie", 'valorCookie');
        res.send("Voce ainda nao tinha o cookie. Criando...");
    }
    else {
        res.send("Voce ja tinha esse cookie.");
    }
};
const hb3 = (req, res) => {
    const profs = [
        { name: "David Fernandes", room: 321 },
        { name: "Altigram Soares", room: 224 },
        { name: "Elaine Harada", room: 341 },
        { name: "Horacio Fernandes", room: 148 },
    ];
    res.render("main/hb3", { profs });
};
const hb4 = (req, res) => {
    res.render('main/hb4', { layout: 'main', technologies });
};
const bemvindo = (req, res) => {
    res.send(`seja bem vindo(a) ${req.params.nome}`);
};
const about = (req, res) => {
    res.send("pagina about");
};
const lorem = (req, res) => {
    const { numParagraphs } = req.params;
    const numberOfParagraphs = parseInt(numParagraphs, 10);
    const ipsumText = (0, lorem_ipsum_1.loremIpsum)({
        count: numberOfParagraphs,
        format: 'html',
        units: 'paragraphs',
    });
    res.send(`<p>${ipsumText.replace(/\n\n/g, '</p><p>')}</p>`);
};
exports.default = { hb1, hb2, hb3, hb4, bemvindo, about, lorem, createCookie };
